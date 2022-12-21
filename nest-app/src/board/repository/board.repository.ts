import { Repository } from "typeorm";
import { CustomRepository } from "../../typeorm-ex.decorator";
import { BoardEntity } from "../../entities/board.entity";

@CustomRepository(BoardEntity)
export class BoardRepository extends Repository<BoardEntity> {}