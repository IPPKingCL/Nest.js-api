import { Controller, Get, Logger ,Headers, Body, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { getToken } from 'src/util/token';
import { AdminService } from './admin.service';
import { InsertCocktailDto } from './dto/insertCocktail.Dto';

@Controller('admin')
export class AdminController {
    private readonly logger = new Logger(AdminController.name);
    constructor(private readonly adminService : AdminService){};

    @ApiOperation({summary: '새로운 칵테일 페이지 추가 시 필요 작업'})
    @Get('/newCocktail')
    async newCocktail(@Headers() header){
        return await this.adminService.newCocktail(getToken(header));
    }

    @ApiOperation({summary : "새로운 칵테일 입력"})
    @Post('/insert')
    async insert(@Body() insertDto:InsertCocktailDto, @Headers() header){
        
    }
}
