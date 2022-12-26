import { Controller, Get, Logger, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CocktailService } from './cocktail.service';

@Controller('cocktail')
export class CocktailController {

    constructor(private readonly cocktailService : CocktailService){}
    private readonly logger = new Logger(CocktailController.name);

    @ApiOperation({summary:' 칵테일 조회(기주 + 음료 까지)'})
    @Get('/:id')
    getOne(@Param("id") id:number){
        return this.cocktailService.getOne(id);
    }

    //@Get('/juice/:id')
}
