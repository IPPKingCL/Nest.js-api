import { Repository } from "typeorm";
import { CommentEntity } from "../../entities/comment.entity";
import { CustomRepository } from "../../typeorm-ex.decorator";

@CustomRepository(CommentEntity)
export class CommentRepository extends Repository<CommentEntity>{}