import { Injectable } from '@nestjs/common';
import { readOneDto } from './dto/readOne.Dto';
import { BoardEntity } from './entities/board.entity';
import { CommentEntity } from './entities/comment.entity';
import { BoardRepository } from './repository/board.repository';
import { CommentRepository } from './repository/comment.repository';

@Injectable()
export class BoardService {
    constructor(
        private readonly repository : BoardRepository,
        private readonly coRepository : CommentRepository){}
    
    getAll() : Promise<BoardEntity[]>{
        try{
            return this.repository.createQueryBuilder('board')
                    .leftJoinAndSelect('board.user', 'user.id')
                    .getMany();
        }catch(err){
            console.log("게시판 목록 조회 중 에러 발생")
        }
        
    }

    getTypeBoard(type:string): Promise<BoardEntity[] | object>{
        try{
            return this.repository.createQueryBuilder('board')
                    .leftJoinAndSelect('board.user', 'user.id')
                    .where('boardType=:type',{type:type})
                    .getMany()
        }catch(err){
            console.log(err)
            console.log("게시글 조회 중 에러 발생")
            //return {success:false, msg : "게시글 조회 중 에러 발생"}
        }
    }

    testAll() : Promise<CommentEntity[]>{
        return this.coRepository.find();
    }

    async write(writeData) : Promise<object>{
        const board = new BoardEntity();
        board.title = writeData.title;
        board.contents = writeData.contents;
        board.dateTime = new Date();
        board.isDeleted = false;
        board.isModified = false;
        board.user = writeData.userId;
        board.boardType = writeData.boardType;
        
        console.log(board);
        try{
            await this.repository.save(board);
            return {success:true};
        }catch(err){
            console.log(err);
            return {success:false, msg : "게시판 글 등록 중 에러발생"}
        }
        
    }

    async readOne(id:number) : Promise<readOneDto | object>{
        try{
            const res = await this.repository.createQueryBuilder('board')
            .leftJoinAndSelect('board.user', 'user.id')
            .where('board.id=:id',{id : id})
            .getOne();

            console.log(res);
            const readOne = new readOneDto();
       
            readOne.title = res.title;
            readOne.contents = res.contents;
            readOne.dateTime = res.dateTime;
            readOne.boardType = res.boardType;
            readOne.isDeleted = res.isDeleted;
            readOne.isModified = res.isModified;
            readOne.userId = res.user.userId;
            readOne.nickname = res.user.nickname;

            console.log(readOne);

            return readOne;
        }catch(err){
            console.log(err);
            return {success:false, msg:"글 조회 중 에러 발생"};
        }
    }

    async modifyBoard(writeData) : Promise<object>{
        const board = new BoardEntity();
        board.id = writeData.id;
        board.title = writeData.title;
        board.contents = writeData.contents;
        board.dateTime = new Date();
        board.isDeleted = false;
        board.isModified = false;
        board.user = writeData.userId;
        board.boardType = writeData.boardType;
        
        console.log(board);
        try{
            await this.repository.update(board);
            return {success:true};
        }catch(err){
            console.log(err);
            return {success:false, msg : "게시판 글 등록 중 에러발생"}
        }
        
    }


/* raw 쿼리 이용하는 법
    async increaseViewCount(id: number): Promise<void> {
        await this.query(
            `UPDATE article SET view_count = view_count + 1 WHERE id=${id}`,
        );
    }*/

    
}
