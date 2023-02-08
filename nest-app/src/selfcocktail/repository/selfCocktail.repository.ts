import { SelfCocktailEntity } from "src/entities/selfCocktail.entity";
import { CustomRepository } from "src/movies/repository/typeorm-ex.decorator";
import { Repository } from "typeorm";

@CustomRepository(SelfCocktailEntity)
export class SelfCocktailRepository extends Repository<SelfCocktailEntity>{}