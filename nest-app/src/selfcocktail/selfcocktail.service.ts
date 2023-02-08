import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { SelfAlchoRecipeRepository } from './repository/selfAlchoRecipe.repository';
import { SelfCocktailRepository } from './repository/selfCocktail.repository';
import { SelfJuiceRepository } from './repository/selfJuiceRecipe.repository';

@Injectable()
export class SelfcocktailService {
    private readonly logger = new Logger(SelfcocktailService.name);
    constructor(
        private dataSource : DataSource,
        private jwtService : JwtService,
        private readonly selfCocktailRepository : SelfCocktailRepository,
        private readonly selfAlchoRecipeRepository : SelfAlchoRecipeRepository,
        private readonly selfJuiceRecipeRepository : SelfJuiceRepository,  
    ){}


}
