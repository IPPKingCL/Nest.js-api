import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { alchoRepository } from 'src/alcohol/repository/alcho.repository';
import { AlchoRecipteRepository } from 'src/cocktail/repository/AlchoRecipe.repository';
import { CocktailRepository } from 'src/cocktail/repository/Cocktail.repository';
import { JuiceRepository } from 'src/cocktail/repository/Juice.repository';
import { JuiceRecipeRepository } from 'src/cocktail/repository/JuiceRecipe.repository';

@Injectable()
export class AdminService {
    private readonly logger = new Logger(AdminService.name);
    constructor(
        private jwtService :JwtService,
        private readonly cockRepository : CocktailRepository,
        private readonly alchoRepository : alchoRepository,
        private readonly juiceRepository : JuiceRepository,
        private readonly alchoRecipeRepository : AlchoRecipteRepository,
        private readonly juiceRecipeRepository : JuiceRecipeRepository,

    ){}

    
}
