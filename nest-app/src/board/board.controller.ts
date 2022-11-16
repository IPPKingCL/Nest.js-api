import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { BoardService } from './board.service';
import { writeDataDto } from './dto/writeData.Dto';

@Controller('board')
export class BoardController {

    constructor(private readonly boardService : BoardService){}

    @Get('/')
    async getTest(){
        return await this.boardService.getAll();
    }

    @ApiOperation({summary:' 게시판 글작성'})
    @Post('/write')
    async write(@Body() boardData:writeDataDto){
        console.log("---------------게시글 등록")
        return await this.boardService.write(boardData);
    }
}

