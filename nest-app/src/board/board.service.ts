import { Injectable } from '@nestjs/common';
import { BoardEntity } from './entities/board.entity';
import { BoardRepository } from './repository/board.repository';

@Injectable()
export class BoardService {
    constructor(private readonly repository : BoardRepository){}

    getAll() : Promise<BoardEntity[]>{
        return this.repository.find();
    }
}
