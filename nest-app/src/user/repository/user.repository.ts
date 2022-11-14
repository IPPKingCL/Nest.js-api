import { Repository } from "typeorm";
import { CustomRepository } from "../repository/typeorm-ex.decorator";
import { userEntity } from "../entities/user.entity";

@CustomRepository(userEntity)
export class UserRepository extends Repository<userEntity> {}