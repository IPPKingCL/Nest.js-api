import { Controller, Get, Post, Body, Param, Logger, UseGuards, Headers, Req, Res,  } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { getToken } from 'src/util/token';
import { Query } from 'typeorm/driver/Query';
import { UserDto } from './dto/user.dto';
import { UserModifyDto } from './dto/usermodify.dto';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserEntity } from '../entities/user.entity';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { UserService } from './user.service';
import { async } from 'rxjs';
import { UserEmailDto } from './dto/userEmail.dto';

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
    async checkUser(@Body('id') id:string){
        this.logger.log("---------------checkUserId : "+id);
        return await this.userService.checkUser(id);
    }

    @ApiOperation({summary:'이메일 유뮤 체크(구글로그인)'})
    @Post('/checkEmail')
    async checkEmail(@Body('email') email:string){
        this.logger.log("---------------checkEmail : "+email);
        return await this.userService.chectEmail(email);
    }

    @ApiOperation({summary:'회원가입 중 닉네임 중복 체크'})
    @Post('/checkNickName')
    async checkNickName(@Body('nickname') nickname:string){
        this.logger.log("---------------checkNickName : "+nickname);
        console.log(nickname);
        return await this.userService.checkNickName(nickname);
    }

    @ApiOperation({summary:'마이페이지 유저정보 가져오기'})
    @UseGuards(JwtAuthGuard)
    @Get('/selectUser')
    async selectUser(@Headers() header){
        this.logger.log("---------------selectUser ");
        return await this.userService.selectUser(getToken(header));
    }

    @ApiOperation({summary:'유저 별 선호 주류 가져오기'})
    @UseGuards(JwtAuthGuard)
    @Get('/selectFavorite')
    async test(@Headers() header){
        this.logger.log("---------------selectFavorite ");
        return await this.userService.selectFavorite(getToken(header));
    }

    @ApiOperation({summary:'마이페이지 유저 데이터 수정'})
    @UseGuards(JwtAuthGuard)
    @Post('/modify')
    async modify(@Headers() header, @Body() modiData:UserModifyDto){
        this.logger.log("---------------modify userData ");
        return await this.userService.modify(getToken(header), modiData);
    }

    @ApiOperation({summary:'EmailLogin 모듈 (자체로그인)'})
    @Post('/EmailLogin')
    async emailLogin(@Body() emailData:UserEmailDto) {
        this.logger.log("---------------Email Login");
        return await this.userService.emailLogin(emailData);
    }

 
   

}
