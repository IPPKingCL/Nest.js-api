import { Injectable, Logger } from '@nestjs/common';
import { AlchoEntity } from './entities/alcho.entity';
import { alchoRepository } from './repository/alcho.repository';

@Injectable()
export class AlcoholService {
    private readonly logger = new Logger(AlcoholService.name)
    constructor(
        private readonly alchoRepository : alchoRepository
    ){}

    getAll() : Promise<AlchoEntity[]>{
        return this.alchoRepository.find();
    }


}
