import { AlchoCommentEntity } from "src/entities/alchoComment.entity";
import { CustomRepository } from "src/typeorm-ex.decorator";
import { Repository } from "typeorm";

@CustomRepository(AlchoCommentEntity)
export class alchoCommentRepository extends Repository<AlchoCommentEntity>{}