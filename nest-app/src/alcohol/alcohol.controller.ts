import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AlcoholService } from './alcohol.service';

@Controller('alcohol')
export class AlcoholController {
    
    constructor(private readonly alchoService : AlcoholService){}
    
    @ApiOperation({summary:' 술 정보 리스트 조회'})
    @Get('/')
    async getTest(){
        return await this.alchoService.getAll();
    }

    @ApiOperation({summary:' 술 정보 디테일 조회'})
    @Get('/detail/:id')
    async getDetail(@Param('id') id:number){
        return await this.alchoService.getOne(id);
    }

    @ApiOperation({summary:' 술 정보 카테고리 별 조회'})
    @Get('/category/:category')
    async getCategory(@Param('category') category:string){
        return await this.alchoService.getCategory(category);
    }

    @ApiOperation({summary:' 카테고리 종류 조회'})
    @Get('/category')
    async getAllCategory(){
        return await this.alchoService.getAllCategory();
    }

    
}
