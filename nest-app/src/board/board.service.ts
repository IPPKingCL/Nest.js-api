import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { deleteDto } from './dto/delete.Dto';
import { imgDto } from './dto/img.Dto';
import { modiOneDto } from './dto/modiOne.Dto';
import { readOneDto } from './dto/readOne.Dto';
import { BoardEntity } from '../entities/board.entity';
import { CommentEntity } from '../entities/comment.entity';
import { BoardRepository } from './repository/board.repository';
import { CommentRepository } from './repository/comment.repository';
import { ImgRepositoy } from './repository/img.repository';
import { BoardRecommandRepository } from './repository/boardRecommand.repository';
import { BoardRecommandEntity } from 'src/entities/boardRecommand.entity';
import { DataSource } from 'typeorm';
import { CommentRecommendRepository } from './repository/commentRecommend.repository';
import { BoardVideoEntity } from 'src/entities/boardVideo.entity';
import { BoardVideoRepository } from './repository/boardVideo.repository';
import { ImgEntity } from 'src/entities/img.entity';
import { userStatus } from 'src/user/enumType/userStatus';
import { UserRepository } from 'src/user/repository/user.repository';
import { CheckAuth } from 'src/util/checkAuth';
const { generateUploadURL } = require('../util/s3');

@Injectable()
export class BoardService {
    private readonly logger = new Logger(BoardService.name);
    constructor(
        private readonly repository: BoardRepository,  //게시글 
        private readonly coRepository: CommentRepository,
        private readonly imgRepository: ImgRepositoy,
        private readonly recommandRepository: BoardRecommandRepository,
        private jwtService: JwtService,
        private dataSource : DataSource,
        private readonly commentRecommendRepository : CommentRecommendRepository,
        private readonly boardVideoRepository : BoardVideoRepository,
        private readonly userRepository :UserRepository,
    ) { }  //댓글

    async getAll(header): Promise<BoardEntity[]> {
        try {
            const token = await this.jwtService.decode(header);
            return await this.repository.query(
                "select a.id, a.title, a.contents, a.isModified, a.dateTime, a.boardType, r.userId, a.img ,a.nickname "+
                "from ("+
                "select b.id, b.title, b.contents, b.isModified, b.dateTime, b.boardType, b.isDeleted, u.img, u.nickname "+
                "from alcohol.board b , alcohol.user u "+
                "where b.userId=u.id) a "+
                "left join alcohol.boardRecommand r "+
                "on a.id = r.boardId and r.userId="+token['id'] +" "+
                "where a.isDeleted=false "+
                "order by dateTime desc;"
            )
                
        } catch (err) {
            this.logger.error("게시판 목록 조회 중 에러 발생")
        }

    }

    async getTypeBoard(type: string,header): Promise<BoardEntity[] | object> {
        try {
            const token = await this.jwtService.decode(header);

            return await this.repository.query(
                "select a.id, a.title, a.contents, a.isModified, a.dateTime, a.boardType, r.userId, a.img ,a.nickname "+
                "from ("+
                "select b.id, b.title, b.contents, b.isModified, b.dateTime, b.boardType, b.isDeleted, u.img, u.nickname "+
                "from alcohol.board b , alcohol.user u "+
                "where b.userId=u.id) a "+
                "left join alcohol.boardRecommand r "+
                "on a.id = r.boardId and r.userId="+token['id'] +" "+
                "where a.isDeleted=false "+
                "and a.boardType='"+type+"' "+ 
                "order by dateTime desc;"
            );
        } catch (err) {
            this.logger.log(err)
            this.logger.error("게시글 조회 중 에러 발생")
            //return {success:false, msg : "게시글 조회 중 에러 발생"}
        }
    }

    testAll(): Promise<CommentEntity[]> {
        return this.coRepository.find();
    }

    async write(writeData, header): Promise<object> {

        const token = this.jwtService.decode(header);
        this.logger.log('\n' + token["id"] + '\n');
        const board = new BoardEntity();
        board.title = writeData.title;
        board.contents = writeData.contents;
        board.dateTime = new Date();
        board.isDeleted = false;
        board.isModified = false;
        board.user = token["id"];
        board.boardType = writeData.boardType;

        this.logger.log(board);

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        this.logger.log("type of "+ typeof(queryRunner));
        try {
            const res = await queryRunner.query(
                "insert into board(title,contents,dateTime,isDeleted,isModified,userId,boardType) "
                +"values ('"+board.title+"','"+board.contents+"',CURRENT_TIMESTAMP,'"+board.isDeleted+"','"
                +board.isModified+"','"+board.user+"','"+board.boardType+"')"
            );
            
            const imgRes = await this.writeImg(writeData.imgUrl, res['insertId'], queryRunner);
            const videoRes = await this.writeVideo(writeData.videoUrl,res['insertId'], queryRunner);

            if (imgRes['success']&&videoRes['success']) {
                await queryRunner.commitTransaction();
                return { success: true };
            } else {
                await queryRunner.rollbackTransaction();
                return { success: false, msg: '이미지 등록 중 에러 발생' }
            }

        } catch (err) {
            this.logger.error(err);
            await queryRunner.rollbackTransaction();
            return { success: false, msg: "게시판 글 등록 중 에러발생" }
        } finally{
            await queryRunner.release();
        }

    }

    async writeImg(url: string, id: number, queryRunner): Promise<object> {
        try {
            if(url===''){
                return {success:true};
            }

            const imgdto = new imgDto();
            imgdto.boardId = id;
            imgdto.boardType = 'b';
            imgdto.imgUrl = url;

            
            await queryRunner.query(
                'insert into img(boardType,boardId,imgUrl) '
                +"values ('"+imgdto.boardType+"','"+imgdto.boardId+"','"+imgdto.imgUrl+"')"
            );

            return { success: true };
        } catch (err) {
            this.logger.error(err);
            return { success: false };
        }
    }

    async writeVideo(url:string, id, queryRunner) : Promise<object>{
        try{
            if(url===''){
                return {success:true};
            }

            const videoDto = new BoardVideoEntity();
            videoDto.id = id;
            videoDto.videoUrl = url;

            await queryRunner.query(
                "insert into boardVideo(videoUrl,boardId) values ('"+url+"','"+id+"')"
            );

            return {success : true};
            
        }catch(err){
            this.logger.error(err);
            return {success:false};
        }
    }

    async readOne(id: number): Promise<readOneDto | object> {
        try {
            const res = await this.repository.createQueryBuilder('board')
                .leftJoinAndSelect('board.user', 'user.id')
                .where('board.id=:id', { id: id })
                .getOne();

            const resImg = await this.readImg(id);  //이미지 조회
            const resVideo = await this.readVideo(id);   //비디오 조회

            this.logger.debug(res);
            const readOne = new readOneDto();

            readOne.title = res.title;
            readOne.contents = res.contents;
            readOne.dateTime = res.dateTime;
            readOne.boardType = res.boardType;
            readOne.isDeleted = res.isDeleted;
            readOne.isModified = res.isModified;
            readOne.userId = res.user.id;
            readOne.nickname = res.user.nickname;
            readOne.recommend = res.recommend;
            if (resImg !== null) {
                readOne.imgUrl = resImg['imgUrl'];
            }

            if (resVideo !== null){
                readOne.videoUrl = resVideo['videoUrl'];
            }

            this.logger.log(readOne);

            return readOne;
        } catch (err) {
            this.logger.error(err);
            return { success: false, msg: "글 조회 중 에러 발생" };
        }
    }

    async readImg(id:number) : Promise<ImgEntity|object>{
        try{
            const res = await this.imgRepository.createQueryBuilder('img')
                        .where('boardType=:type', { type: 'b' })
                        .andWhere('boardId=:id', { id: id })
                        .getOne();
            
            return res;
        }catch(err){
            this.logger.error(err);
            return {success :false, msg:"이미지 조회 중 에러 발생"};
        }
    }

    async readVideo(id:number) : Promise<BoardVideoEntity|object>{
        try{
            const res = await this.boardVideoRepository.createQueryBuilder("boardVideo")
                        .where('boardId=:id',{id:id})
                        .getOne();
            
            return res;
        }catch(err){
            this.logger.error(err);
            return {success : false, msg:"비디오 조회 중 에러 발생"};
        }
    }

    async modiOne(modiOne: modiOneDto, header): Promise<readOneDto | object> {
        try {

            const token = this.jwtService.decode(header);

            const res = await this.repository.createQueryBuilder('board')
                .leftJoinAndSelect('board.user', 'user.id')
                .where('board.id=:id', { id: modiOne.id })
                .getOne();

            const readOne = new readOneDto();

            readOne.title = res.title;
            readOne.contents = res.contents;
            readOne.dateTime = res.dateTime;
            readOne.boardType = res.boardType;
            readOne.isDeleted = res.isDeleted;
            readOne.isModified = res.isModified;
            readOne.userId = res.user.id;
            readOne.nickname = res.user.nickname;
            readOne.recommend = res.recommend;

           
            //const checkAuthUser = checkAuth(token['id'], res.user.id);
            const checkAuthUser = CheckAuth.checkAuth(token['id'],res.user.id);
            
            if (checkAuthUser.success) {
                return readOne;
            } else {
                return { success: true, auth: false, msg: "권한이 없습니다" };
            }

        } catch (err) {
            this.logger.error(err);
            return { success: true, msg: "에러 발생" };
        }
    }

    async modifyBoard(writeData, header): Promise<object> {

        const token = this.jwtService.decode(header);
        this.logger.log(token['id']);
        this.logger.log(writeData);
        const checkAuthUser = checkAuth(token['id'], writeData.userId);

        if(!checkAuthUser.success){
            return {success:false, msg : "권한이 없습니다"};
        }

        const board = new BoardEntity();
        board.id = writeData.id;
        board.title = writeData.title;
        board.contents = writeData.contents;
        board.dateTime = new Date();
        board.isDeleted = false;
        board.isModified = false;
        board.user = writeData.userId;
        board.boardType = writeData.boardType;

        this.logger.log(board);
        try {
            await this.repository.createQueryBuilder()
                .update('board')
                .set({
                    title: board.title,
                    contents: board.contents,
                    dateTime: board.dateTime,
                    isDeleted: board.isDeleted,
                    isModified: true,
                    user: board.user,
                    boardType: board.boardType
                })
                .where("id=:id", { id: board.id })
                .execute();
            return { success: true };
        } catch (err) {
            this.logger.error(err);
            return { success: false, msg: "게시판 글 등록 중 에러발생" }
        }

    }

    async deleteBoard(deleteOne: deleteDto, header): Promise<object> {
        try {

            const token = this.jwtService.decode(header);
            this.logger.log(deleteOne.userId);
            this.logger.log(token["id"]);

            const checkUser = await this.checkUser(token['id']);
            const checkAuthUser = CheckAuth.checkAuth(token['id'], deleteOne.userId);

            if (checkAuthUser.success||checkUser['success']) {
                await this.repository.createQueryBuilder()
                    .update('board')
                    .set({ isDeleted: true })
                    .where("id=:id", { id: deleteOne.id })
                    .execute();
                return { success: true };
            } else {
                return { success: false, msg: '권한이 없습니다' };
            }

        } catch (err) {
            this.logger.error(err);
            return { success: false, msg: "게시글 삭제 실패" };
        }
    }

        /*유저 권한 체크*/
    async checkUser(id:number):Promise<object>{
        
        try{
            const res = await this.userRepository.createQueryBuilder('user')
                        .where("id=:id",{id:id})
                        .getOne();
            this.logger.log(res);
            this.logger.log(userStatus)
            if(res['userLoginType']===userStatus['admin']){
                return {success:true};
            }else{
                return {success:false};
            }
        }catch(err){
            this.logger.error(err);
            return {success:false ,msg:err};
        }
    }

    async s3url() {
        const url = await generateUploadURL();
        return { data: url };
    }

    //추천 orm update가 비효율적인거 같아 raw query로 작성
    //여기 쿼리 분리하기
    async recommend(id, header): Promise<object> {
        // try{
        //     await this.repository.query(
        //         'update board set recommend=recommend+1 where id='+id
        //     )
        //     /*await this.repository.createQueryBuilder()
        //         .update('id',{recommend:()=>'recommend+1'})
        //         /*.set('recommend:recommend+1')
        //         .where("id=:id",{id:id})*/
        //         //.execute();
        //     return {success:true};
        // }catch(err){
        //     this.logger.error(err);
        //     return {success:false, msg:"게시글 추천 실패"};
        // }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const token = this.jwtService.decode(header);
            const res = await this.checkRecommand(id, token['id']);
            if (res.success && !res.isDeleted) {
                //추천 취소
                await this.recommandRepository.createQueryBuilder()
                    .update('boardRecommand')
                    .set({ isDeleted: true })
                    .where("boardId=:id", { id: id })
                    .andWhere("userId=:userId", { userId: token['id'] })
                    .execute();
                await queryRunner.commitTransaction();
                return { success: true, msg: '추천이 취소되었습니다' };

            } else if (res.success && res.isDeleted) {
                await this.recommandRepository.createQueryBuilder()
                    .update('boardRecommand')
                    .set({
                        isDeleted: false,
                        date: new Date()
                    })
                    .where("boardId=:id", { id: id })
                    .andWhere("userId=:userId", { userId: token['id'] })
                    .execute();
                await queryRunner.commitTransaction();    
                return { success: true, msg: '추천 완료' };

            } else {
                //추천
                const boardRecommand = new BoardRecommandEntity();
                boardRecommand.user = token['id'];
                boardRecommand.board = id;
                boardRecommand.date = new Date();
                boardRecommand.isDeleted = false;

                await this.recommandRepository.save(boardRecommand);
                await queryRunner.commitTransaction();
                return { success: true, msg: '추천 완료' }
            }
        } catch (err) {
            this.logger.error(err);
            await queryRunner.rollbackTransaction();
            return { success: false, msg: "게시글 추천 실패" };
        }finally{
            await queryRunner.release();
        }
    }

    async checkRecommand(boardId: number, userId: number) {
        try {
            const res = await this.recommandRepository.createQueryBuilder('boardRecommand')
                .where("userId=:userId", { userId: userId })
                .andWhere("boardId=:boardId", { boardId: boardId })
                .getOne();
            console.log(res);
            if (res !== null) {
                return { success: true, isDeleted: res.isDeleted };
            } else {
                return { success: false };
            }
        } catch (err) {
            this.logger.error(err);
            return { success: false, msg: "게시글 추천 여부 체크 중 에러" }
        }
    }

    async countRecommend(){
        try{
            const res = await this.recommandRepository.query(
                'select b.id, b.title, b.contents, u.nickname, count(r.boardId) recommend ' + 
                'from alcohol.user u, alcohol.board b, alcohol.boardRecommand r ' +
                'where u.id = b.userId ' +
                'and b.id = r.boardId ' +
                'and r.isDeleted=false ' +
                'and b.id in ( ' +
                'select boardId ' +
                'from (select rt.boardId from alcohol.boardRecommand rt '+
                'WHERE date BETWEEN DATE_ADD(NOW(), INTERVAL -10 DAY ) ' +
                'AND NOW() and isDeleted=false ' +
                'group by boardId limit 5' +
                ') temp ' +
                ') ' + 
                'group by r.boardId ' + 
                'order by recommend desc'
            );
            return res;
        }catch(err){
            this.logger.error(err);
            return {success:false}
        }
       
    }

    async orderbyLimit(): Promise<BoardEntity[] | object> {
        try {
            const response = await this.repository.createQueryBuilder('board')
                .orderBy("recommend", "DESC")
                .limit(5)
                .getMany();

            return response;
        } catch (err) {
            this.logger.error(err);
            return { success: false, msg: "게시글 상위 추천 조회 실패" };
        }
    }

    async myBoard(header):Promise<BoardEntity|object>{
        try{
            const token = this.jwtService.decode(header);
            const id = token['id'];

            const res = await this.repository.createQueryBuilder('board')
                        .where('userId=:id',{id:id})
                        .getMany();
            
            return res;
        }catch(err){
            this.logger.error(err);
            return {success : false, msg : "내가 쓴 게시글 조회 실패"}
        }
    }



    /* raw 쿼리 이용하는 법
        async increaseViewCount(id: number): Promise<void> {
            await this.query(
                `UPDATE article SET view_count = view_count + 1 WHERE id=${id}`,
            );
        }*/


}
