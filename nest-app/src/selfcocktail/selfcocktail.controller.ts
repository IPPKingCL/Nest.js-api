import { Controller, Get, Logger, Post , Headers, Body, UseGuards, Param} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { InsertCocktailDto } from 'src/admin/dto/insertCocktail.Dto';
import { JwtAuthGuard } from 'src/user/jwt/jwt.guard';
import { getToken } from 'src/util/token';
import { InsertSelfDto } from './dto/insertSelf.Dto';
import { SelfcocktailService } from './selfcocktail.service';
import { commentDto } from 'src/board/dto/comment.Dto';
import { SelfCocktailCommentService } from './selfcocktailComment.service';

@Controller('selfcocktail')
export class SelfcocktailController {
    constructor(
        private readonly selfcocktailService : SelfcocktailService,
        private readonly selfCocktailCommentService : SelfCocktailCommentService,    
    ){}
    private readonly logger = new Logger(SelfcocktailController.name);

    @ApiOperation({summary:'자작 레시피 공개'})
    @Get('/')
    async findAll(){
        this.logger.log("---------------select all self cocktail ");
        return await this.selfcocktailService.findAll();
    }

    @ApiOperation({summary : "새로운 칵테일 레시피 입력"})
    @Post('/insert')
    async insert(@Body() insertDto:InsertSelfDto, @Headers() header){
        return await this.selfcocktailService.insert(insertDto,getToken(header));
    }

    @ApiOperation({summary : "카테고리 리스트 조회"})
    @UseGuards(JwtAuthGuard)
    @Get('/category')
    async getCategory(){
        return await this.selfcocktailService.getCategory();
    }

    @ApiOperation({summary : "자작 레시피 열람"})
    @Get('/select/:id')
    async select(@Param("id") id :number){
        return await this.selfcocktailService.select(id);
    }

    @ApiOperation({summary : "자작 레시피 댓글 달기"})
    @UseGuards(JwtAuthGuard)
    @Post('comment/insert')
    async commentInsert(@Body() commentDto:commentDto, @Headers() header){
        this.logger.log("---------------insert cocktail comment ");
        return await this.selfCocktailCommentService.commentInsert(commentDto, getToken(header));
    }

    @ApiOperation({summary: " 댓글 조회"})
    @Get('comment/all/:id')
    async commentAll(@Param("id") id:number){
        this.logger.log("---------------select cocktail comment ");
        return await this.selfCocktailCommentService.commentAll(id);
    }
}
