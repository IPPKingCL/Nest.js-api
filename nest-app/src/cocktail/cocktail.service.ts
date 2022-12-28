import { Injectable, Logger } from '@nestjs/common';
import { alchoRepository } from 'src/alcohol/repository/alcho.repository';
import { AlchoRecipeEntity } from 'src/entities/alchoRecipe.entity';
import { CocktailEntity } from 'src/entities/cocktail.entity';
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
    
    
    async getAll() : Promise<CocktailEntity[]|object>{
        try{
            const res = await this.cockRepository.find();
            return res;
        }catch(err){
            this.logger.error(err);
            return {success:false, msg : "전체 조회 중 에러발생"}
        }
    }
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
                +"where a.id=r.alchoId and r.cocktailId="+id+";"
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

    async alchoCock(id:number):Promise<AlchoRecipeEntity|object>{
        try{
            const res = await this.alchoRecipeRepository.createQueryBuilder('alchoRecipe')
                        .leftJoinAndSelect('alchoRecipe.cocktail',"cocktail.id")
                        .where("alchoId=:id",{id:id})
                        .getMany();
            console.log(res);
            return res;
        }catch(err){
            this.logger.error(err);
            return {success:false}
        }
    }

    async likeOne(id:number) : Promise<object>{ 
        try{
            await this.cockRepository.query(
                'update cocktail set likeOne=likeOne+1 where id ='+id
            );

            return {success:true};
        }catch(err){
            this.logger.error(err);
            return {success:false ,msg:"로그인 후 이용 가능합니다"};
        }
    }

    async categoryCock(category){
        try{
            //서브 쿼리로 갈지 아님 디비를 두번 갈지 나중에 성능보고 결정
            const res = await this.cockRepository.query(
                "select * "+
                'from cocktail c, '+
                '(select r.cocktailId '+
                'from alchoRecipe r '+
                'left join Alcho a '+
                'on a.id= r.alchoId '+
                "where a.category='"+category+"') a "+
                'where c.id = a.cocktailId'
            )
            return res;
        }catch(err){
            this.logger.error(err);
            return {success:true};
        }
    }
}

