import { CustomRepository } from "src/movies/repository/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { AlchoEntity } from "../../entities/alcho.entity";

@CustomRepository(AlchoEntity)
export class alchoRepository extends Repository<AlchoEntity>{} 