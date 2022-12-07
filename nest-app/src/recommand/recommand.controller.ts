import { Controller, Get, Logger } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { RecommandService } from './recommand.service';

@Controller('recommand')
export class RecommandController {

    constructor(private readonly recommandService : RecommandService){}
    private readonly logger = new Logger(RecommandController.name);

    @ApiOperation({summary: '추천 알고리즘 호출 부분'})
    @Get('/')
    async getRecommand() {
        this.logger.log("-------------------- 추천 받기")
        return await this.recommandService.getAll();
    }
}
