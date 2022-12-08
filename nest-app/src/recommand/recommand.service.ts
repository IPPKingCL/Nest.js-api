import { Injectable, Logger } from '@nestjs/common';
import { dataEntity } from './entities/data.entity';
import {dataRepository} from './repository/data.repository'

@Injectable()
export class RecommandService {
    private readonly logger = new Logger(RecommandService.name);
    constructor(
        private readonly dataRepository : dataRepository,
    ){}


    async tokenDecoding() : number {
        return 0;
    }
}
