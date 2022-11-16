import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardRepository } from './repository/board.repository';
import { TypeOrmExModule } from './repository/typeorm-ex.module';
@Module({
    imports:[TypeOrmExModule.forCustomRepository([BoardRepository])],
    controllers :[BoardController],
    providers : [BoardService]
})
export class BoardModule {}
