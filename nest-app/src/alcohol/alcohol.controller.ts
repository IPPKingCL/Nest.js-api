import { Controller, Get, Param } from '@nestjs/common';
import { AlcoholService } from './alcohol.service';

@Controller('alcohol')
export class AlcoholController {
    
    constructor(private readonly alchoService : AlcoholService){}
    
    @Get('/')
    async getTest(){
        return await this.alchoService.getAll();
    }

    @Get('/detail/:id')
    async getDetail(@Param('id') id:number){
        return await this.alchoService.getOne(id);
    }
}
