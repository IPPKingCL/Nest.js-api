import { Controller, Get } from '@nestjs/common';

@Controller('board')
export class BoardController {
    @Get('/')
    getTest(){
        return "test board";
    }
}

