import { FaceChatMemEntity } from "src/entities/faceChatMem.entity";
import { CustomRepository } from "src/movies/repository/typeorm-ex.decorator";
import { Repository } from "typeorm";

@CustomRepository(FaceChatMemEntity)
export class FaceChatMemRepository extends Repository<FaceChatMemEntity>{}