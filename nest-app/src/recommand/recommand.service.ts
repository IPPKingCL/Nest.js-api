import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { dataEntity } from './entities/data.entity';
import {dataRepository} from './repository/data.repository'

@Injectable()
export class RecommandService {
    private readonly logger = new Logger(RecommandService.name);
    constructor(
        private readonly dataRepository : dataRepository,
        private readonly jwtService : JwtService
    ){}


     tokenDecoding(header) : number {
        const token = header.split(' ');
        const info = this.jwtService.decode(token[1]);
        const id = info["id"];
        return parseInt(id);
    }
}
