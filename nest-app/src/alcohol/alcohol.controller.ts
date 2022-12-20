import { Controller, Get, Logger, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AlcoholService } from './alcohol.service';

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

    @ApiOperation({summary: "술 추천"})
    @Get('/like/:id')
    async like(@Param('id') id:number){
        this.logger.log("---------------recommend alcohol id : "+id);
        return await this.alchoService.like(id);
    }

    

    
}
