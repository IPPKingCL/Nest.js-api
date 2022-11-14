import { Controller, Get } from '@nestjs/common';
import { InsertQueryBuilder } from 'typeorm';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService){}
    @Get('/')
    getTest(){
        this.userService.getAll();
    }

    @Get('/insert')
    insert(){
        this.userService.insert();
    }
}
