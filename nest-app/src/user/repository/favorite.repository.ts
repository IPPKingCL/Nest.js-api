import { CustomRepository } from "src/movies/repository/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { FavoriteEntity } from "../entities/favoritList.entity";

@CustomRepository(FavoriteEntity)
export class FavoriteRepository extends Repository<FavoriteEntity>{}