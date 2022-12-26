import { Injectable, Logger } from '@nestjs/common';
import { alchoRepository } from 'src/alcohol/repository/alcho.repository';
import { AlchoRecipteRepository } from './repository/AlchoRecipe.repository';
import { CocktailRepository } from './repository/Cocktail.repository';
import { JuiceRepository } from './repository/Juice.repository';
import { JuiceRecipeRepository } from './repository/JuiceRecipe.repository';

@Injectable()
export class CocktailService {
    private readonly logger = new Logger(CocktailService.name);
    constructor(
        private readonly cockRepository : CocktailRepository,
        private readonly alchoRecipeRepository : AlchoRecipteRepository,
        private readonly juiceRecipeRepository : JuiceRecipeRepository,
        private readonly juiceRepository : JuiceRepository,
        private readonly alchoRepository : alchoRepository,
    ){}
    

    async getOne(id:number) {
        try{
            // const res = await this.cockRepository.query(
            //     "select c.id,c.name,c.imgUrl,c.dosu,c.likeOne,j.juiceId,j.amount juiceamout, a.alchoId, a.amount alchoamout "
            //    +"from juiceRecipe j,cocktail c, alchoRecipe a "
            //     +"where j.cocktailId=c.id and c.id=a.cocktailId and c.id=1;"
            // )

            const resCock = await this.cockRepository.createQueryBuilder('cocktail')
                    .where("id=:id",{id:id})
                    .getOne();
            
            const resJuice = await this.juiceRecipeRepository.query(
                "select j.id, j.name, j.type, r.amount, j.imgUrl "
                +"from Juice j, juiceRecipe r "
                +"where j.id=r.juiceId and r.cocktailId="+id+";"
            );

            const resAlcho = await this.alchoRecipeRepository.query(
                "select a.id, a.name, a.category, a.imgUrl, r.amount "
                +"from Alcho a, alchoRecipe r "
                +"where a.id=r.alchoId and r.cocktailId=1; "
            );
            console.log(resAlcho)

            const res = {
                cocktail : resCock,
                cockJuice : resJuice,
                cockAlcho : resAlcho,
            }
            
            return res;
            
        }catch(err){
            this.logger.error(err);
            return {success:false}
        }
    }
}
