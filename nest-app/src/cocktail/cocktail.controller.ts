import { Controller, Get, Logger, Param, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/jwt/jwt.guard';
import { CocktailService } from './cocktail.service';

@Controller('cocktail')
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

    @ApiOperation({summary: " 해당 술이 사용된 칵테일 조회"})
    @Get('/alchoCock/:id')
    async alchoCock(@Param("id") id:number){
        this.logger.log("---------------select all cocktail using drink");
        return await this.cocktailService.alchoCock(id);
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
    //@Get('/juice/:id')
}
