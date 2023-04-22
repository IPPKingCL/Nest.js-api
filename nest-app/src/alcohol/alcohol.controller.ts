import { Body, Controller, Get, Logger, Param, Post, UseGuards , Headers} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { delCommentDto } from 'src/board/dto/delComment.Dto';
import { JwtAuthGuard } from 'src/user/jwt/jwt.guard';
import { getToken } from 'src/util/token';
import { AlcoholService } from './alcohol.service';
import { AlchoCommentDto } from './dto/alchoComment.Dto';
import * as NodeCache from 'node-cache';
import { AlchoEntity } from 'src/entities/alcho.entity';
import { readAlchoDto } from './dto/readAlcho.Dto';
import { AlcoholCommentService } from './alcoholComment.service';

@Controller('alcohol')
export class AlcoholController {
    cache:NodeCache;
    constructor(private readonly alchoService : AlcoholService,
                private readonly alchoCommentService : AlcoholCommentService){
        this.cache = new NodeCache();
    }
    private readonly logger = new Logger(AlcoholController.name);
    
    @ApiOperation({summary:' 술 정보 리스트 조회'})
    @Get('/')
    async getTest(){
        this.logger.log("---------------select alcohol ");
        const cacheKey = 'alcohol';
        let value = this.cache.get<AlchoEntity[]>(cacheKey);

        
        if(!value){
            const result =  await this.alchoService.getAll();
            value = result;
            this.cache.set(cacheKey, result,60*60);
        }

        return value;
    }

    @ApiOperation({summary:' 술 정보 디테일 조회'})
    @Get('/detail/:id')
    async getDetail(@Param('id') id:number){
        this.logger.log("---------------select alcohol detail "+id);
        return await this.alchoService.getOne(id);
    }

    @ApiOperation({summary:' 술 정보 카테고리 별 조회'})
    @Get('/category/:category')
    async getCategory(@Param('category') category:number){
        this.logger.log("---------------select alcohol category : "+category);
        const cacheKey = 'category/'+category;
        let value = this.cache.get<readAlchoDto[]|object>(cacheKey);

        if(!value){
            const result = await this.alchoService.getCategory(category);
            value = result;
            this.cache.set(cacheKey,result,60*60);
        }

        return value;
    }

    @ApiOperation({summary:' 카테고리 종류 조회'})
    @Get('/category')
    async getAllCategory(){
        this.logger.log("---------------select just category ");
        const cacheKey = 'category';
        let value = this.cache.get<object[]|object>(cacheKey);

        if(!value){
            const result = await this.alchoService.getAllCategory();
            value = result;
            this.cache.set(cacheKey,result,60*60);
        }
        return value;
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
        return await this.alchoCommentService.insertComment(commentDto, getToken(header));
    }

    @ApiOperation({summary: "술 댓글 조회"})
    @Get('/commentAll/:id')
    async commentAll(@Param("id") id : number){
        this.logger.log("---------------comment alcohol id : "+id);
        return await this.alchoCommentService.commentAll(id);
    }

    @ApiOperation({summary: "댓글 삭제"})
    @UseGuards(JwtAuthGuard)
    @Post('delete')
    async deleteComment(@Body() deleteComment:delCommentDto, @Headers() header){
        this.logger.log("---------------delete comment alcohol ");
        return await this.alchoCommentService.deleteComment(deleteComment,getToken(header));
    }


    
}
