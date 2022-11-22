import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardRepository } from './repository/board.repository';
import { CommentRepository } from './repository/comment.repository';
import { TypeOrmExModule } from './repository/typeorm-ex.module';
@Module({
    imports:[TypeOrmExModule.forCustomRepository([BoardRepository,CommentRepository])],
    controllers :[BoardController],
    providers : [BoardService]
})
export class BoardModule {}
