import { Repository } from "typeorm";
import { CustomRepository } from "./typeorm-ex.decorator";
import { UserEntity } from "../entities/user.entity";

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}