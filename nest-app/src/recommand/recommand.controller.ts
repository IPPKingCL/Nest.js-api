import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/user/jwt/jwt.guard';
import { RecommandService } from './recommand.service';

@Controller('recommand')
export class RecommandController {

    constructor(private readonly recommandService : RecommandService){}
    private readonly logger = new Logger(RecommandController.name);

    @ApiOperation({summary:'추천 알고리즘 토큰 여부 체크'})
    @UseGuards(JwtAuthGuard)
    @Get('')
    check(){
        return {success:true};
    }
}
