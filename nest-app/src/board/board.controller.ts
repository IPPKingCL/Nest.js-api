import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { BoardService } from './board.service';
import { commentDto } from './dto/comment.Dto';
import { modifyDto } from './dto/modifyData.Dto';
import { writeDataDto } from './dto/writeData.Dto';

@Controller('board')
export class BoardController {

    constructor(private readonly boardService : BoardService){}

    @ApiOperation({summary:' 게시판 전체 조회'})
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

    @ApiOperation({summary:' 게시글 수정'})
    @Post('/modify')
    async modifyBiard(@Body() modifyData:modifyDto){
        console.log('---------------'+modifyData.id +' 게시글 수정');
        return await this.boardService.modifyBoard(modifyData);
    }

    @ApiOperation({summary:' 게시글 삭제'})
    @Get('/deleteBoard/:boardId')
    async deleteBoard(@Param("boardId") id:number){
        console.log('---------------'+id +' 번 게시글 삭제 ');
        return await this.boardService.deleteBoard(id);
    }

    @ApiOperation({summary:' 게시글 추천'})
    @Get('/recommendBoard/:boardId')
    async recommend(@Param("boardId") id:number){
        console.log('---------------'+id +' 번 게시글 추천 ');
        return await this.boardService.recommend(id);
    }

    /** 댓글 레포지토리 테스트**/
    @Get('test')
    async test(){
        return await this.boardService.testAll();
    }

    @ApiOperation({summary:' 게시글 댓글 열람'})
    @Get('/comment/:id')
    async commentAll(@Param("id") id:number){
        console.log('---------------'+id +' 게시글 댓글 열람');
        return await this.boardService.commentAll(id);
    }

    @ApiOperation({summary:' 게시글 댓글 저장'})
    @Post('/insertComment')
    async insertComment(@Body() commentData:commentDto){
        console.log('---------------'+commentData.boardId +' 게시글 댓글 저장');
        return await this.boardService.insertComment(commentData);
    }

    @ApiOperation({summary:' 게시글 댓글 삭제'})
    @Get('/deleteComment/:commentId')
    async deleteComment(@Param("commentId") id:number){
        console.log('---------------'+id +' 번 댓글 삭제 ');
        return await this.boardService.deleteComment(id);
    }
  
}

