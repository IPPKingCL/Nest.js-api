import { CustomRepository } from "src/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { ImgEntity } from "../../entities/img.entity";

@CustomRepository(ImgEntity)
export class ImgRepositoy extends Repository<ImgEntity>{}