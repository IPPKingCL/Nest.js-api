import { Injectable, Logger } from '@nestjs/common';
import { CocktailRepository } from './repository/Cocktail.repository';

@Injectable()
export class CocktailService {
    private readonly logger = new Logger(CocktailService.name);
    constructor(
        private readonly cockRepository : CocktailRepository,
    ){}

}
