import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../typeorm-ex.module';
import { RecommandController } from './recommand.controller';
import { RecommandService } from './recommand.service';
import { dataRepository } from './repository/data.repository';
@Module({
    imports:[
        TypeOrmExModule.forCustomRepository([dataRepository]),
        // session을 사용하지 않을 예정이기 때문에 false
        ],
    controllers :[RecommandController],
    providers : [RecommandService]
})
export class RecommandModule {}
