import { Repository } from "typeorm";
import { CustomRepository } from "../repository/typeorm-ex.decorator";
import { testEntity } from "../entities/test.entity";

@CustomRepository(testEntity)
export class UserRepository extends Repository<testEntity> {}