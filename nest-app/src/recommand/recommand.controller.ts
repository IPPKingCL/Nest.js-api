import { Controller, Get, Logger, UseGuards, Headers } from '@nestjs/common';
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
    recommand(@Headers() header){
        const id = this.recommandService.tokenDecoding(header.authorization);
        console.log(id);
        return {success:true, id: id};
    }
}
