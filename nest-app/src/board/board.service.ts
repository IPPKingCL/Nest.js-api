import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { commentDto } from './dto/comment.Dto';
import { deleteDto } from './dto/delete.Dto';
import { imgDto } from './dto/img.Dto';
import { modiOneDto } from './dto/modiOne.Dto';
import { readOneDto } from './dto/readOne.Dto';
import { BoardEntity } from '../entities/board.entity';
import { CommentEntity } from '../entities/comment.entity';
import { BoardRepository } from './repository/board.repository';
import { CommentRepository } from './repository/comment.repository';
import { ImgRepositoy } from './repository/img.repository';
const { generateUploadURL } = require('../util/s3');

@Injectable()
export class BoardService {
    private readonly logger = new Logger(BoardService.name);
    constructor(
        private readonly repository : BoardRepository,  //게시글 
        private readonly coRepository : CommentRepository,
        private readonly imgRepository : ImgRepositoy,
        private jwtService: JwtService
        ){}  //댓글
    
    getAll() : Promise<BoardEntity[]>{
        try{
            return this.repository.createQueryBuilder('board')
                    .leftJoinAndSelect('board.user', 'user.id')
                    .andWhere("isDeleted=false")
                    .orderBy("dateTime","DESC")
                    .getMany();
        }catch(err){
            this.logger.error("게시판 목록 조회 중 에러 발생")
        }
        
    }

    getTypeBoard(type:string): Promise<BoardEntity[] | object>{
        try{
            return this.repository.createQueryBuilder('board')
                    .leftJoinAndSelect('board.user', 'user.id')
                    .where('boardType=:type',{type:type})
                    .andWhere("isDeleted=false")
                    .orderBy("dateTime","DESC")
                    .getMany()
        }catch(err){
            this.logger.log(err)
            this.logger.error("게시글 조회 중 에러 발생")
            //return {success:false, msg : "게시글 조회 중 에러 발생"}
        }
    }

    testAll() : Promise<CommentEntity[]>{
        return this.coRepository.find();
    }

    async write(writeData , header) : Promise<object>{
        
        const token = this.jwtService.decode(header);
        console.log('\n'+token["id"]+'\n');
        const board = new BoardEntity();
        board.title = writeData.title;
        board.contents = writeData.contents;
        board.dateTime = new Date();
        board.isDeleted = false;
        board.isModified = false;
        board.user = token["id"];
        board.boardType = writeData.boardType;
        
        this.logger.log(board);
        try{
            const res = await this.repository.save(board);
            const imgRes = await this.writeImg(writeData.imgUrl, res.id);
            if(imgRes['success']){
                return {success:true};
            }else{
                return {success:false, msg: '이미지 등록 중 에러 발생'}
            }
            
        }catch(err){
            this.logger.error(err);
            return {success:false, msg : "게시판 글 등록 중 에러발생"}
        }
        
    }

    async writeImg(url:string, id:number) : Promise<object>{
        try{
            const imgdto = new imgDto();
            imgdto.boardId = id;
            imgdto.boardType = 'b';
            imgdto.imgUrl = url;
            await this.imgRepository.save(imgdto);
            
            return {success:true};
        }catch(err){
            console.log(err);
            return {success : false};
        }
    }

    async readOne(id:number) : Promise<readOneDto | object>{
        try{
            const res = await this.repository.createQueryBuilder('board')
            .leftJoinAndSelect('board.user', 'user.id')
            .where('board.id=:id',{id : id})
            .getOne();

            const resImg = await this.imgRepository.createQueryBuilder('img')
            .where('boardType=:type',{type:'b'})
            .andWhere('boardId=:id',{id:res.id})
            .getOne();
            
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
            if(resImg!==null){
                readOne.imgUrl = resImg.imgUrl;
            }
            
            this.logger.log(readOne);

            return readOne;
        }catch(err){
            this.logger.error(err);
            return {success:false, msg:"글 조회 중 에러 발생"};
        }
    }

    async modiOne(modiOne:modiOneDto,header) : Promise<readOneDto | object>{
        try{
            
            const token = this.jwtService.decode(header);

            const res = await this.repository.createQueryBuilder('board')
            .leftJoinAndSelect('board.user', 'user.id')
            .where('board.id=:id',{id : modiOne.id})
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
            
            const tokenNumberId:number =parseInt(token["id"]);
            console.log(tokenNumberId);
            console.log(res.user.id)
            if(tokenNumberId==res.user.id){
                return readOne;
            }else{
                return {success:true, auth:false, msg:"권한이 없습니다"};
            }

        }catch(err){
            this.logger.error(err);
            return {success:true,msg:"에러 발생"};
        }
    }

    async modifyBoard(writeData, header) : Promise<object>{
        
        const token = this.jwtService.decode(header);
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
        try{
            await this.repository.createQueryBuilder()
                    .update('board')
                    .set({title:board.title,
                        contents:board.contents,
                        dateTime:board.dateTime,
                        isDeleted:board.isDeleted,
                        isModified : true,
                        user : board.user,     
                        boardType : board.boardType
                    })
                    .where("id=:id",{id:board.id})
                    .execute();
            return {success:true};
        }catch(err){
            this.logger.error(err);
            return {success:false, msg : "게시판 글 등록 중 에러발생"}
        }
        
    }

    async deleteBoard(deleteOne:deleteDto, header) : Promise<object> {
        try{
            
            const token = this.jwtService.decode(header);
            console.log(deleteOne.userId)
            console.log(token["id"])
            if(deleteOne.userId==(token['id'])){
                await this.repository.createQueryBuilder()
                .update('board')
                .set({isDeleted : true})
                .where("id=:id",{id:deleteOne.id})
                .execute();
                return {success:true};
            }else{
                return {success:false, msg: '권한이 없습니다'};
            }
            
        }catch(err){
            this.logger.error(err);
            return {success:false, msg:"게시글 삭제 실패"};
        }
    }

    async s3url(){
        const url = await generateUploadURL();
        return {data:url};
    }

    //추천 orm update가 비효율적인거 같아 raw query로 작성
    async recommend(id:number) :Promise<object>{
        try{
            await this.repository.query(
                'update board set recommend=recommend+1 where id='+id
            )
            /*await this.repository.createQueryBuilder()
                .update('id',{recommend:()=>'recommend+1'})
                /*.set('recommend:recommend+1')
                .where("id=:id",{id:id})*/
                //.execute();
            return {success:true};
        }catch(err){
            this.logger.error(err);
            return {success:false, msg:"게시글 추천 실패"};
        }
    }

    async orderbyLimit(): Promise<BoardEntity[]|object>{
        try{
            const response = await this.repository.createQueryBuilder('board')
                .orderBy("recommend","DESC")
                .limit(5)
                .getMany();
                                
            return response;
        }catch(err){
            this.logger.error(err);
            return {success:false, msg:"게시글 상위 추천 조회 실패"};
        }
    }
    /*******************comment*******************/
    async insertComment(commentData, header): Promise<object>{
        
        const token = this.jwtService.decode(header);
        const comment = new CommentEntity();
        comment.contents = commentData.contents;
        comment.dateTime = new Date();
        comment.nickname = token['nickname'];
        comment.isDeleted = false;
        comment.isModified = false;
        comment.board = commentData.boardId;
        comment.user = token['id'];

        try{
            await this.coRepository.save(comment);
            return {success:true};
        }catch(err){
            this.logger.error(err);
            return {success:false, msg: "게시판 댓글 등록 중 에러 발생"}
        }
    }

    async commentAll(id:number): Promise<CommentEntity[] | object>{
        try{
            return await this.coRepository.createQueryBuilder('comment')
                    .leftJoinAndSelect('comment.user','user.id')
                    .where("boardId=:id",{id:id})
                    .andWhere("isDeleted=false")
                    .getMany();
        }catch(err){
            this.logger.error(err);
            return {success:false, msg: "게시판 조회 중 에러 발생"}
        }
    }

    async deleteComment(deleteComment, header:string) : Promise<object> {
        try{
            
            const token = this.jwtService.decode(header);
            if(deleteComment.userId==(token['id'])){
                await this.coRepository.createQueryBuilder()
                    .update('comment')
                    .set({isDeleted : true})
                    .where("id=:id",{id:deleteComment.id})
                    .execute();
                return {success:true};
            }else{
                return {success:false, msg: 'fail'};
            }
        }catch(err){
            this.logger.error(err);
            return {success:false, msg:"댓글 삭제 실패"};
        }
    }


/* raw 쿼리 이용하는 법
    async increaseViewCount(id: number): Promise<void> {
        await this.query(
            `UPDATE article SET view_count = view_count + 1 WHERE id=${id}`,
        );
    }*/

    
}
