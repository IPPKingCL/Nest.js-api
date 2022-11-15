import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService : UserService){}

    @Get('/')
    getTest(){
        return this.userService.getAll();
    }

    @Get('/insert')
    insertUser(){
        return this.userService.insertUser();
    }
}
