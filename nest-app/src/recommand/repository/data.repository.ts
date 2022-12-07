import { Repository } from "typeorm";
import { CustomRepository } from "../../typeorm-ex.decorator";
import { dataEntity } from "../entities/data.entity";

@CustomRepository(dataEntity)
export class dataRepository extends Repository<dataEntity> {}