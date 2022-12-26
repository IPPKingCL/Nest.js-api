import { AlchoRecipeEntity } from "src/entities/alchoRecipe.entity";
import { CustomRepository } from "src/typeorm-ex.decorator";
import { Repository } from "typeorm";

@CustomRepository(AlchoRecipeEntity)
export class AlchoRecipteRepository extends Repository<AlchoRecipeEntity>{}