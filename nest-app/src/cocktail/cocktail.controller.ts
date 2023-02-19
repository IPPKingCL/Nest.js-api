import { Body, Controller, Get, Logger, Param, Post, UseGuards, Headers, Head } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { commentDto } from 'src/board/dto/comment.Dto';
import { delCommentDto } from 'src/board/dto/delComment.Dto';
import { JwtAuthGuard } from 'src/user/jwt/jwt.guard';
import { getToken } from 'src/util/token';
import { CocktailService } from './cocktail.service';
import { AlchoCockDto } from './Dto/alchoCock.Dto';
import { RatingDto } from './dto/rating.Dto';
import { CocktailEntity } from 'src/entities/cocktail.entity';

import * as NodeCache from 'node-cache';
import { CocktailCommentService } from './cocktailComment.service';
import { ContentFilteringService } from './contentFiltering.service';

@Controller('/cocktail')
export class CocktailController {
    cache:NodeCache;
    constructor(private readonly cocktailService : CocktailService,
                private readonly cocktailCoService : CocktailCommentService,
                private readonly contentFilteringService : ContentFilteringService
                ){
        this.cache = new NodeCache();
    }
    private readonly logger = new Logger(CocktailController.name);

    @ApiOperation({summary: ' 전체 조회'})
    @Get('/')
    async getAll(){
        this.logger.log("---------------select all cocktail ");
        const cacheKey = 'cocktail';
        let value = this.cache.get<CocktailEntity[]|object>(cacheKey);

        if(!value){
            const result = await this.cocktailService.getAll();
            value = result;
            this.cache.set(cacheKey,result,60*60);
        }
        return value;
    } 

    @ApiOperation({summary:' 칵테일 조회(기주 + 음료 까지)'})
    @Get('/:id')
    async getOne(@Param("id") id:number){
        this.logger.log("---------------select one cocktail ");
        return await this.cocktailService.getOne(id);
    }

    @ApiOperation({summary: '칵테일 검색'})
    @Get('/search/:text')
    async search(@Param("text") text:number){
        this.logger.log("---------------search cocktail ");
        const cachekey ="search/"+text;
        let value = this.cache.get<CocktailEntity[]|object>(cachekey);

        if(!value){
            const result = await this.cocktailService.search(text);
            value = result;
            this.cache.set(cachekey,result,60*60);
        }
        return value; 
    }

    @ApiOperation({summary: " 해당 술이 사용된 칵테일 조회"})
    @Post('/alchoCock')
    async alchoCock(@Body() alchoDto:AlchoCockDto){
        this.logger.log("---------------select all cocktail using drink");
        return await this.cocktailService.alchoCock(alchoDto);
    }

    @ApiOperation({summary: " 해당 카테고리 술이 사용된 칵테일 조회"})
    @Get('/categoryCock/:category')
    async categoryCock(@Param("category") category:string){
        this.logger.log("---------------select all cocktail using category");
        return await this.cocktailService.categoryCock(category);
    }

    @ApiOperation({summary: " 칵테일 추천"})
    @UseGuards(JwtAuthGuard)
    @Get('/likeOne/:id')
    async likeOne(@Param("id") id:number){
        this.logger.log("---------------like one cocktail ");
        return await this.cocktailService.likeOne(id);
    }

    @ApiOperation({summary: " 칵테일 별점"})
    @UseGuards(JwtAuthGuard)
    @Post('/rating')
    async rating(@Body() rating:RatingDto,@Headers() header){
        this.logger.log("---------------like one cocktail ");
        return await this.cocktailService.rating(rating, getToken(header));
    }

    @ApiOperation({summary:"24시간 별점 조회"})
    @Get('/rating/day')
    async ratingDay(){
        this.logger.log("---------------select rating 1 day ");
        return await this.cocktailService.ratingDay();
    }

    @ApiOperation({summary:"별점 수 카운트"})
    @Get('/rating/count')
    async ratingCount(){
        this.logger.log("---------------count rating ");
        return await this.cocktailService.ratingCount();
    }

    @ApiOperation({summary: "칵테일 댓글 인서트"})
    @UseGuards(JwtAuthGuard)
    @Post('comment/insert')
    async commentInsert(@Body() commentDto:commentDto, @Headers() header){
        this.logger.log("---------------insert cocktail comment ");
        return await this.cocktailCoService.commentInsert(commentDto, getToken(header));
    }

    @ApiOperation({summary: " 댓글 조회"})
    @Get('comment/all/:id')
    async commentAll(@Param("id") id:number){
        this.logger.log("---------------select cocktail comment ");
        return await this.cocktailCoService.commentAll(id);
    }

    @ApiOperation({summary : " 댓글 삭제"})
    @UseGuards(JwtAuthGuard)
    @Post('comment/delete')
    async deleteComment(@Body() delComment:delCommentDto, @Headers() header){
        this.logger.log("---------------delete cocktail comment ");
        return await this.cocktailCoService.deleteComment(delComment,getToken(header));
    }
    //@Get('/juice/:id')

    @ApiOperation({summary : "칵테일 추천"})
    @UseGuards(JwtAuthGuard)
    @Get('/recommend')
    async recommendCocktail(@Headers() header){
        this.logger.log("---------------contents filtering recommend ");
        const res = await this.cocktailService.countRecommend(getToken(header));
    }

    @ApiOperation({summary : "컨텐츠 기반 필터링 추천"})
    @UseGuards(JwtAuthGuard)
    @Get('/recommend/contentFiltering')
    async contentFilteringRecommend(@Headers() header) {
        this.logger.log(header.authorization);
        this.logger.log("---------------contents filtering recommend ");

        const cacheKey = header.authorization;
        let value = this.cache.get(cacheKey);

        if(!value){
            const result = await this.contentFilteringService.CFR(getToken(header));
            value = result;
            this.cache.set(cacheKey, result, 60*60);
        }
        
        return value;
    }

    @ApiOperation({summary : "컨텐츠 기반 필터링 다시 추천 받기"})
    @UseGuards(JwtAuthGuard)
    @Get('/recommend/contentFiltering/again')
    async contentFilteringAgain(@Headers() header){
        this.logger.log(header.authorization);
        this.logger.log("---------------contents filtering recommend again");

        const cacheKey = header.authorization;

        const result = await this.contentFilteringService.CFR(getToken(header));
        this.cache.set(cacheKey, result, 60*60);

        return result;
    }

    @ApiOperation({summary : "내가 평가한 칵테일"})
    @Get('/myCocktail/List')
    async myCocktailList(@Headers() header){
        this.logger.log("---------------my cocktail list");
        return await this.cocktailService.myCocktailList(getToken(header));
    }

    
}

