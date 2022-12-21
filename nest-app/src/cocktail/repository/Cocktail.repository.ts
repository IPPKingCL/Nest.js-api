import { CocktailEntity } from "src/entities/cocktail.entity";
import { CustomRepository } from "src/movies/repository/typeorm-ex.decorator";
import { Repository } from "typeorm";

@CustomRepository(CocktailEntity)
export class CocktailRepository extends Repository<CocktailEntity>{}