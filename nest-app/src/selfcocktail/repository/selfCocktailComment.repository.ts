import { SelfCocktailCommentEntity } from "src/entities/selfCocktailComment.entity";
import { CustomRepository } from "src/movies/repository/typeorm-ex.decorator";
import { Repository } from "typeorm";

@CustomRepository(SelfCocktailCommentEntity)
export class SelfCocktailCommentRepository extends Repository<SelfCocktailCommentEntity>{}