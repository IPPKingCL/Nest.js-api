import { Controller, Get } from '@nestjs/common';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {

    constructor(private readonly boardService : BoardService){}

    @Get('/')
    async getTest(){
        return await this.boardService.getAll();
    }
}

