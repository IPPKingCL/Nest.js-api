import { Injectable, Logger } from '@nestjs/common';
import { AlchoRecipteRepository } from './repository/AlchoRecipe.repository';
import { CocktailRepository } from './repository/Cocktail.repository';
import { JuiceRecipeRepository } from './repository/JuiceRecipe.repository';

@Injectable()
export class CocktailService {
    private readonly logger = new Logger(CocktailService.name);
    constructor(
        private readonly cockRepository : CocktailRepository,
        private readonly alchoRecipeRepository : AlchoRecipteRepository,
        private readonly juiceRecipeRepository : JuiceRecipeRepository
    ){}
    

    async getOne(id:number) {
        try{
            //const res = await this.cock
        }catch(err){
            this.logger.error(err);
            return {success:false}
        }
    }
}
