import { Controller, Get, Post, Body, Param, Logger, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/jwt/jwt.guard';
import { getToken } from 'src/util/token';
import { BoardService } from './board.service';
import { commentDto } from './dto/comment.Dto';
import { delCommentDto } from './dto/delComment.Dto';
import { deleteDto } from './dto/delete.Dto';
import { modifyDto } from './dto/modifyData.Dto';
import { modiOneDto } from './dto/modiOne.Dto';
import { writeDataDto } from './dto/writeData.Dto';

@Controller('board')
export class BoardController {

    constructor(private readonly boardService : BoardService){}
    private readonly logger = new Logger(BoardController.name);

    @ApiOperation({summary:' 게시판 전체 조회'})
    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getTest(@Headers() header){
        return await this.boardService.getAll(getToken(header));
    }

    @ApiOperation({summary:' 토큰 여부 체크'})
    @UseGuards(JwtAuthGuard)
    @Get('/check')
    check(){
        return {success:true};
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
    async write(@Body() boardData:writeDataDto, @Headers() header){
        //console.log(header.authorization);
        this.logger.log("---------------게시글 등록")
        return await this.boardService.write(boardData, getToken(header));
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
    async modiOne(@Body() modiOne:modiOneDto, @Headers() header){
        this.logger.log("---------------게시글 수정 권한 여부")
        return await this.boardService.modiOne(modiOne, getToken(header));
    }

    @ApiOperation({summary:' 게시글 수정'})
    @UseGuards(JwtAuthGuard)
    @Post('/modify')
    async modifyBiard(@Body() modifyData:modifyDto, @Headers() header){
        this.logger.log('---------------'+modifyData.id +' 게시글 수정');
        return await this.boardService.modifyBoard(modifyData,getToken(header));
    }

    @ApiOperation({summary:' 게시글 삭제'})
    @UseGuards(JwtAuthGuard)
    @Post('/deleteBoard')
    async deleteBoard(@Body() deleteOne:deleteDto,@Headers() header){
        this.logger.log('--------------- 게시글 삭제 ');
        return await this.boardService.deleteBoard(deleteOne, getToken(header));
    }

    @ApiOperation({summary:' 게시글 추천'})
    @UseGuards(JwtAuthGuard)
    @Get('/recommendBoard/:boardId')
    async recommend(@Param("boardId") id:number,@Headers() header){
        this.logger.log('---------------'+id +' 번 게시글 추천 ');
        return await this.boardService.recommend(id,getToken(header));
    }

    @ApiOperation({summary:' 게시글 추천 순위 조회'})
    @Get('/recommend/count')
    async countRecommned(){
        return await this.boardService.countRecommend();
    }

    @ApiOperation({summary: " 게시글 추천 상위 조회"})
    @Get('/orderbyLimit')
    async orderbyLimit(){
        this.logger.log('--------------- 추천 상위 게시글 ');
        return await this.boardService.orderbyLimit();
    }

    @Get('/s3url')
    async s3url(){
        return await this.boardService.s3url();
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
    @UseGuards(JwtAuthGuard)
    @Post('/insertComment')
    async insertComment(@Body() commentData:commentDto, @Headers() header){
        this.logger.log('---------------'+commentData.boardId +' 게시글 댓글 저장');
        return await this.boardService.insertComment(commentData, getToken(header));
    }

    @ApiOperation({summary:' 게시글 댓글 삭제'})
    @UseGuards(JwtAuthGuard)
    @Post('/deleteComment')
    async deleteComment(@Body() delComment:delCommentDto,@Headers() header){
        this.logger.log('---------------'+delComment.id +' 번 댓글 삭제 ');
        return await this.boardService.deleteComment(delComment, getToken(header));
    }

    @ApiOperation({summary:' 게시글 댓글 추천'})
    @UseGuards(JwtAuthGuard)
    @Post('/recommendComment')
    async recommendComment(@Body() recommend:delCommentDto , @Headers() header){
        this.logger.log('---------------'+recommend.id +' 번 댓글 추천 ');
        return await this.boardService.recommendComment(recommend,getToken(header));
    }

    
}

