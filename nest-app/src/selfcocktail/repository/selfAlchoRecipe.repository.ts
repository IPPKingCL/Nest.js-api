import { SelfAlchoRecipeEntity } from "src/entities/selfAlchoRecipe.Entity";
import { CustomRepository } from "src/typeorm-ex.decorator";
import { Repository } from "typeorm";

@CustomRepository(SelfAlchoRecipeEntity)
export class SelfAlchoRecipeRepository extends Repository<SelfAlchoRecipeEntity>{}