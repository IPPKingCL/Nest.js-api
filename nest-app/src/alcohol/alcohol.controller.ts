import { Controller, Get } from '@nestjs/common';

@Controller('alcohol')
export class AlcoholController {
    @Get('/')
    getTest(){
        return "test alcohol";
    }
}
