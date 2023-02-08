import { SelfJuiceRecipeEntity } from "src/entities/selfJuiceRecipe.entity";
import { CustomRepository } from "src/typeorm-ex.decorator";
import { Repository } from "typeorm";

@CustomRepository(SelfJuiceRecipeEntity)
export class SelfJuiceRepository extends Repository<SelfJuiceRecipeEntity>{}