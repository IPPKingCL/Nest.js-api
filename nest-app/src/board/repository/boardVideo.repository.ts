import { BoardVideoEntity } from "src/entities/boardVideo.entity";
import { CustomRepository } from "src/movies/repository/typeorm-ex.decorator";
import { Repository } from "typeorm";

@CustomRepository(BoardVideoEntity)
export class BoardVideoRepository extends Repository<BoardVideoEntity>{}