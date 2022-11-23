import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { BoardService } from './board.service';
import { modifyDto } from './dto/modifyData.Dto';
import { writeDataDto } from './dto/writeData.Dto';

@Controller('board')
export class BoardController {

    constructor(private readonly boardService : BoardService){}

    @Get('/')
    async getTest(){
        return await this.boardService.getAll();
    }

    @ApiOperation({summary:' 게시판 타입 별 조회'})
    @Post('/')
    async getTypeBoard(@Body() type){
        console.log("---------------게시글 타입 별 조회")
        return await this.boardService.getTypeBoard(type.boardType);
    }

    @ApiOperation({summary:' 게시판 글작성'})
    @Post('/write')
    async write(@Body() boardData:writeDataDto){
        console.log("---------------게시글 등록")
        return await this.boardService.write(boardData);
    }

    @ApiOperation({summary:' 게시글 열람'})
    @Get('/read/:id')
    async readOne(@Param("id") id:number){
        console.log('---------------'+id +' 게시글 열람');
        return await this.boardService.readOne(id);
    }

    @Post('/modify')
    async modifyBiard(@Body() modifyData:modifyDto){
        console.log('---------------'+modifyData.id +' 게시글 수정');
        return await this.boardService.modifyBoard(modifyData);
    }

    /** 댓글 레포지토리 테스트**/
    @Get('test')
    async test(){
        return await this.boardService.testAll();
    }

  
}

