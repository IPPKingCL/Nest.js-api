
import { UnitEntity } from "src/entities/unit.entity";
import { CustomRepository } from "src/typeorm-ex.decorator";
import { Repository } from "typeorm";

@CustomRepository(UnitEntity)
export class UnitRepository extends Repository<UnitEntity>{}