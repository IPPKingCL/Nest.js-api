import { AlchoCategoryEntity } from "src/entities/alchoCategory.entity";
import { AlchoCommentEntity } from "src/entities/alchoComment.entity";
import { CustomRepository } from "src/typeorm-ex.decorator";
import { Repository } from "typeorm";

@CustomRepository(AlchoCategoryEntity)
export class AlchoCategoryRepository extends Repository<AlchoCategoryEntity>{}