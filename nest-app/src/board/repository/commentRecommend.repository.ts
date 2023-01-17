import { CommentRecommendEntity } from "src/entities/commentRecommend.entity";
import { CustomRepository } from "src/typeorm-ex.decorator";
import { Repository } from "typeorm";

@CustomRepository(CommentRecommendEntity)
export class CommentRecommendRepository extends Repository<CommentRecommendEntity>{}