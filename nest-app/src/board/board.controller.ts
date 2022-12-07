import { Controller, Get, Post, Body, Param, Logger, UseGuards, Req,Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/jwt/jwt.guard';
import { BoardService } from './board.service';
import { commentDto } from './dto/comment.Dto';
import { deleteDto } from './dto/delete.Dto';
import { modifyDto } from './dto/modifyData.Dto';
import { modiOneDto } from './dto/modiOne.Dto';
import { writeDataDto } from './dto/writeData.Dto';

@Controller('board')
export class BoardController {

    constructor(private readonly boardService : BoardService){}
    private readonly logger = new Logger(BoardController.name);

    @ApiOperation({summary:' 게시판 전체 조회'})
    @Get('/')
    async getTest(){
        return await this.boardService.getAll();
    }

    @ApiOperation({summary:' 게시판 타입 별 조회'})
    @Post('/')
    async getTypeBoard(@Body() type){
        this.logger.log("---------------게시글 타입 별 조회")
        return await this.boardService.getTypeBoard(type.boardType);
    }

    @ApiOperation({summary:' 게시판 글작성'})
    @UseGuards(JwtAuthGuard)
    //@UseGuards(AuthGuard())
    @Post('/write')
    async write(@Body() boardData:writeDataDto, @Req() req, @Headers() header){
        //console.log(header.authorization);
        this.logger.log("---------------게시글 등록")
        return await this.boardService.write(boardData, header.authorization);
    }

    @ApiOperation({summary:' 게시글 열람'})
    @Get('/read/:id')
    async readOne(@Param("id") id:number){
        this.logger.log('---------------'+id +' 게시글 열람');
        return await this.boardService.readOne(id);
    }

    @ApiOperation({summary:' 게시글 수정 권한 조회 및 불러오기'})
    @UseGuards(JwtAuthGuard)
    @Post('/modi')
    async modiOne(@Body() modiOne:modiOneDto){
        this.logger.log("---------------게시글 수정 권한 여부")
        return await this.boardService.modiOne(modiOne);
    }

    @ApiOperation({summary:' 게시글 수정'})
    @Post('/modify')
    async modifyBiard(@Body() modifyData:modifyDto, @Headers() header){
        this.logger.log('---------------'+modifyData.id +' 게시글 수정');
        return await this.boardService.modifyBoard(modifyData,header.authorization);
    }

    @ApiOperation({summary:' 게시글 삭제'})
    @UseGuards(JwtAuthGuard)
    @Post('/deleteBoard')
    async deleteBoard(@Body() deleteOne:deleteDto,@Headers() header){
        this.logger.log('--------------- 게시글 삭제 ');
        return await this.boardService.deleteBoard(deleteOne, header.authorization);
    }

    @ApiOperation({summary:' 게시글 추천'})
    @Get('/recommendBoard/:boardId')
    async recommend(@Param("boardId") id:number){
        this.logger.log('---------------'+id +' 번 게시글 추천 ');
        return await this.boardService.recommend(id);
    }

    @ApiOperation({summary: " 게시글 추천 상위 조회"})
    @Get('/orderbyLimit')
    async orderbyLimit(){
        this.logger.log('--------------- 추천 상위 게시글 ');
        return await this.boardService.orderbyLimit();
    }

    
    /** 댓글 레포지토리 테스트**/
    @Get('test')
    async test(){
        return await this.boardService.testAll();
    }

    @ApiOperation({summary:' 게시글 댓글 열람'})
    @Get('/comment/:id')
    async commentAll(@Param("id") id:number){
        this.logger.log('---------------'+id +' 게시글 댓글 열람');
        return await this.boardService.commentAll(id);
    }

    @ApiOperation({summary:' 게시글 댓글 저장'})
    @Post('/insertComment')
    async insertComment(@Body() commentData:commentDto){
        this.logger.log('---------------'+commentData.boardId +' 게시글 댓글 저장');
        return await this.boardService.insertComment(commentData);
    }

    @ApiOperation({summary:' 게시글 댓글 삭제'})
    @Get('/deleteComment/:commentId')
    async deleteComment(@Param("commentId") id:number){
        this.logger.log('---------------'+id +' 번 댓글 삭제 ');
        return await this.boardService.deleteComment(id);
    }

    
}

