import { JuiceRecipeEntity } from "src/entities/juiceRecipe.entity";
import { CustomRepository } from "src/movies/repository/typeorm-ex.decorator";
import { Repository } from "typeorm";

@CustomRepository(JuiceRecipeEntity)
export class JuiceRecipeRepository extends Repository<JuiceRecipeEntity>{}