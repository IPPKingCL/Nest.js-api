import { Controller, Get } from '@nestjs/common';
import { AlcoholService } from './alcohol.service';

@Controller('alcohol')
export class AlcoholController {
    
    constructor(private readonly alchoService : AlcoholService){}
    
    @Get('/')
    async getTest(){
        return await this.alchoService.getAll();
    }
}
