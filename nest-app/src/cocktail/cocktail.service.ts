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
            const res = await this.cockRepository.query(
                "select c.id,c.name,c.imgUrl,c.dosu,c.likeOne,j.juiceId,j.amount juiceamout, a.alchoId, a.amount alchoamout "
               +"from juiceRecipe j,cocktail c, alchoRecipe a "
                +"where j.cocktailId=c.id and c.id=a.cocktailId and c.id=1;"
            )
            return res;
            
        }catch(err){
            this.logger.error(err);
            return {success:false}
        }
    }
}
