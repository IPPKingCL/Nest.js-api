import { AlchoCategoryEntity } from "src/entities/alchoCategory.entity";
import { CustomRepository } from "src/typeorm-ex.decorator";
import { Repository } from "typeorm";

@CustomRepository(AlchoCategoryEntity)
export class alchoCategoryRepository extends Repository<AlchoCategoryEntity>{}