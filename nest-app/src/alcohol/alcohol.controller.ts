import { Body, Controller, Get, Logger, Param, Post, UseGuards , Headers} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { delCommentDto } from 'src/board/dto/delComment.Dto';
import { JwtAuthGuard } from 'src/user/jwt/jwt.guard';
import { getToken } from 'src/util/token';
import { AlcoholService } from './alcohol.service';
import { AlchoCommentDto } from './dto/alchoComment.Dto';

@Controller('alcohol')
export class AlcoholController {
    
    constructor(private readonly alchoService : AlcoholService){}
    private readonly logger = new Logger(AlcoholController.name);
    
    @ApiOperation({summary:' 술 정보 리스트 조회'})
    @Get('/')
    async getTest(){
        this.logger.log("---------------select alcohol ");
        return await this.alchoService.getAll();
    }

    @ApiOperation({summary:' 술 정보 디테일 조회'})
    @Get('/detail/:id')
    async getDetail(@Param('id') id:number){
        this.logger.log("---------------select alcohol detail "+id);
        return await this.alchoService.getOne(id);
    }

    @ApiOperation({summary:' 술 정보 카테고리 별 조회'})
    @Get('/category/:category')
    async getCategory(@Param('category') category:string){
        this.logger.log("---------------select alcohol category : "+category);
        return await this.alchoService.getCategory(category);
    }

    @ApiOperation({summary:' 카테고리 종류 조회'})
    @Get('/category')
    async getAllCategory(){
        this.logger.log("---------------select just category ");
        return await this.alchoService.getAllCategory();
    }

    @ApiOperation({summary: "술 추천하기"})
    @UseGuards(JwtAuthGuard)
    @Get('/like/:id')
    async like(@Param('id') id:number){
        this.logger.log("---------------recommend alcohol id : "+id);
        return await this.alchoService.like(id);
    }


    /************술 댓글***********/
    @ApiOperation({summary: "술 정보 댓글 달기"})
    @UseGuards(JwtAuthGuard)
    @Post('/insertComment')
    async insertComment(@Body() commentDto:AlchoCommentDto, @Headers() header){
        this.logger.log("---------------comment alcohol id : "+commentDto.alchoId);
        return await this.alchoService.insertComment(commentDto, getToken(header));
    }

    @ApiOperation({summary: "술 댓글 조회"})
    @Get('/commentAll/:id')
    async commentAll(@Param("id") id : number){
        this.logger.log("---------------comment alcohol id : "+id);
        return await this.alchoService.commentAll(id);
    }

    @ApiOperation({summary: "댓글 삭제"})
    @UseGuards(JwtAuthGuard)
    @Post('delete')
    async deleteComment(@Body() deleteComment:delCommentDto, @Headers() header){
        this.logger.log("---------------delete comment alcohol ");
        return await this.alchoService.deleteComment(deleteComment,getToken(header));
    }


    

    
}
