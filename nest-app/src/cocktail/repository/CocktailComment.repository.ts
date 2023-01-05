import { CocktailCommentEntity } from "src/entities/cocktailComment.entity";
import { CustomRepository } from "src/movies/repository/typeorm-ex.decorator";
import { Repository } from "typeorm";

@CustomRepository(CocktailCommentEntity)
export class CocktailCommentRepository extends Repository<CocktailCommentEntity>{}