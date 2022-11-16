import { Injectable } from '@nestjs/common';
import { BoardEntity } from './entities/board.entity';
import { BoardRepository } from './repository/board.repository';

@Injectable()
export class BoardService {
    constructor(private readonly repository : BoardRepository){}

    getAll() : Promise<BoardEntity[]>{
        return this.repository.find();
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
        
        try{
            await this.repository.save(board);
            return {success:true};
        }catch(err){
            console.log(err);
            return {success:false, msg : "자유게시판 등록 중 에러발생"}
        }
        
    }
}
