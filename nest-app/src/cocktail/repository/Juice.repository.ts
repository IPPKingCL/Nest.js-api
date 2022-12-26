import { JuiceEntity } from "src/entities/juice.entity";
import { CustomRepository } from "src/typeorm-ex.decorator";
import { Repository } from "typeorm";

@CustomRepository(JuiceEntity)
export class JuiceRepository extends Repository<JuiceEntity>{}