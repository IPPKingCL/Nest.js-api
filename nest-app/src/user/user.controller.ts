import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Query } from 'typeorm/driver/Query';
import { UserDto } from './dto/user.dto';
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
        console.log("---------------insertUser : "+userData.birth);
        console.log("---------------insertUser : "+userData.loginType);
        return await this.userService.insertUser(userData);
    }

    @ApiOperation({summary:'회원가입 중 아이디 중복 체크'})
    @Post('/checkUser')
    async checkUser(@Body('nickname') nickname:string){
        console.log("---------------checkNickName : "+nickname);
        return await this.userService.checkUser(nickname);
    }

    @ApiOperation({summary:'이메일 유뮤 체크'})
    @Post('/checkEmail')
    async checkEmail(@Body('email') email:string){
        console.log("---------------checkEmail : "+email);
        return await this.userService.chectEmail(email);
    }

}
