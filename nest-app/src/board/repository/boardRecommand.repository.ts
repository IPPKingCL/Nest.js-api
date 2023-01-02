import { BoardRecommandEntity } from "src/entities/boardRecommand.entity";
import { CustomRepository } from "src/typeorm-ex.decorator";
import { Repository } from "typeorm";

@CustomRepository(BoardRecommandEntity)
export class BoardRecommandRepository extends Repository<BoardRecommandEntity>{}