import { RatingEntity } from "src/entities/rating.entity";
import { CustomRepository } from "src/typeorm-ex.decorator";
import { Repository } from "typeorm";

@CustomRepository(RatingEntity)
export class RatingRepository extends Repository<RatingEntity>{}