import { Controller, Get, Post, Body, Param, Logger, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Query } from 'typeorm/driver/Query';
import { UserDto } from './dto/user.dto';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService : UserService){}
    private readonly logger = new Logger(UserController.name);
    
    @Get('/')
    getTest(){
        return this.userService.getAll();
    }

    @ApiOperation({summary:' 회원가입'})
    @Post('/insert')
    async insertUser(@Body() userData:UserCreateDto){
        this.logger.debug("---------------insertUser : "+userData.birth);
        this.logger.debug("---------------insertUser : "+userData.loginType);
        return await this.userService.insertUser(userData);
    }

    @ApiOperation({summary:'회원가입 중 아이디 중복 체크'})
    @Post('/checkUser')
    async checkUser(@Body('nickname') nickname:string){
        this.logger.log("---------------checkNickName : "+nickname);
        return await this.userService.checkUser(nickname);
    }

    @ApiOperation({summary:'이메일 유뮤 체크'})
    //@UseGuards(JwtAuthGuard)
    @Post('/checkEmail')
    async checkEmail(@Body('email') email:string){
        this.logger.log("---------------checkEmail : "+email);
        return await this.userService.chectEmail(email);
    }

}
