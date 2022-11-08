import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {

    @Get('/')
    getTest(){
        return "test user";
    }
}
