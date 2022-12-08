import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { commentDto } from './dto/comment.Dto';
import { deleteDto } from './dto/delete.Dto';
import { modiOneDto } from './dto/modiOne.Dto';
import { readOneDto } from './dto/readOne.Dto';
import { BoardEntity } from './entities/board.entity';
import { CommentEntity } from './entities/comment.entity';
import { BoardRepository } from './repository/board.repository';
import { CommentRepository } from './repository/comment.repository';

@Injectable()
export class BoardService {
    private readonly logger = new Logger(BoardService.name);
    constructor(
        private readonly repository : BoardRepository,  //게시글 
        private readonly coRepository : CommentRepository,
        private jwtService: JwtService
        ){}  //댓글
    
    getAll() : Promise<BoardEntity[]>{
        try{
            return this.repository.createQueryBuilder('board')
                    .leftJoinAndSelect('board.user', 'user.id')
                    .andWhere("isDeleted=false")
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
        console.log(header)
        const head = header.split(' ');
        console.log(head[1])
        const token = this.jwtService.decode(head[1]);
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
            await this.repository.save(board);
            return {success:true};
        }catch(err){
            this.logger.error(err);
            return {success:false, msg : "게시판 글 등록 중 에러발생"}
        }
        
    }

    async readOne(id:number) : Promise<readOneDto | object>{
        try{
            const res = await this.repository.createQueryBuilder('board')
            .leftJoinAndSelect('board.user', 'user.id')
            .where('board.id=:id',{id : id})
            .getOne();

            this.logger.log(res);
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

            this.logger.log(readOne);

            return readOne;
        }catch(err){
            this.logger.error(err);
            return {success:false, msg:"글 조회 중 에러 발생"};
        }
    }

    async modiOne(modiOne:modiOneDto,header) : Promise<readOneDto | object>{
        try{
            const head = header.split(' ');
            const token = this.jwtService.decode(head[1]);

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
        const head = header.split(' ');
        const token = this.jwtService.decode(head[1]);
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
            const head = header.split(' ');
            const token = this.jwtService.decode(head[1]);
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
        const head = header.split(' ');
        const token = this.jwtService.decode(head[1]);
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
            const head = header.split(' ');
            const token = this.jwtService.decode(head[1]);
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
