import { Controller, Get, Logger ,Headers } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { getToken } from 'src/util/token';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
    private readonly logger = new Logger(AdminController.name);
    constructor(private readonly adminService : AdminService){};

    @ApiOperation({summary: '새로운 칵테일 페이지 추가 시 필요 작업'})
    @Get('/newCocktail')
    async newCocktail(@Headers() header){
        return await this.adminService.newCocktail(getToken(header));
    }
}
