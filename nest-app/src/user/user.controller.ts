import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService : UserService){}

    @Get('/')
    getTest(){
        return this.userService.getAll();
    }

    @ApiOperation({summary:' 회원가입'})
    @Post('/insert')
    async insertUser(@Body() userData:UserCreateDto){
        console.log(userData);
        return await this.userService.insertUser(userData);
    }
}
