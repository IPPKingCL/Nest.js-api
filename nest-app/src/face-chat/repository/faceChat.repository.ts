import { FaceChatEntity } from "src/entities/faceChat.entity";
import { CustomRepository } from "src/movies/repository/typeorm-ex.decorator";
import { Repository } from "typeorm";

@CustomRepository(FaceChatEntity)
export class FaceChatRepository extends Repository<FaceChatEntity>{}