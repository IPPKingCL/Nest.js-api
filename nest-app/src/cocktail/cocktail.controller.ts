import { Body, Controller, Get, Logger, Param, Post, UseGuards, Headers, Head } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { commentDto } from 'src/board/dto/comment.Dto';
import { delCommentDto } from 'src/board/dto/delComment.Dto';
import { JwtAuthGuard } from 'src/user/jwt/jwt.guard';
import { getToken } from 'src/util/token';
import { CocktailService } from './cocktail.service';
import { AlchoCockDto } from './Dto/alchoCock.Dto';
import { RatingDto } from './dto/rating.Dto';

@Controller('/cocktail')
export class CocktailController {

    constructor(private readonly cocktailService : CocktailService){}
    private readonly logger = new Logger(CocktailController.name);

    @ApiOperation({summary: ' 전체 조회'})
    @Get('/')
    async getAll(){
        this.logger.log("---------------select all cocktail ");
        return await this.cocktailService.getAll();
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
        console.log(text);
        return await this.cocktailService.search(text);
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
        return await this.cocktailService.commentInsert(commentDto, getToken(header));
    }

    @ApiOperation({summary: " 댓글 조회"})
    @Get('comment/all/:id')
    async commentAll(@Param("id") id:number){
        this.logger.log("---------------select cocktail comment ");
        return await this.cocktailService.commentAll(id);
    }

    @ApiOperation({summary : " 댓글 삭제"})
    @UseGuards(JwtAuthGuard)
    @Post('comment/delete')
    async deleteComment(@Body() delComment:delCommentDto, @Headers() header){
        this.logger.log("---------------delete cocktail comment ");
        return await this.cocktailService.deleteComment(delComment,getToken(header));
    }
    //@Get('/juice/:id')

    @ApiOperation({summary : "컨텐츠 기반 필터링 추천"})
    @UseGuards(JwtAuthGuard)
    @Get('/recommend/contentFiltering')
    async contentFilteringRecommend(@Headers() header) {
        this.logger.log("---------------contents filtering recommend ");
        return await this.cocktailService.CFR(getToken(header));
    }
}

