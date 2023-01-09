import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { alchoRepository } from 'src/alcohol/repository/alcho.repository';
import { AlchoRecipteRepository } from 'src/cocktail/repository/AlchoRecipe.repository';
import { CocktailRepository } from 'src/cocktail/repository/Cocktail.repository';
import { JuiceRepository } from 'src/cocktail/repository/Juice.repository';
import { JuiceRecipeRepository } from 'src/cocktail/repository/JuiceRecipe.repository';
import { AlchoCategoryEntity } from 'src/entities/alchoCategory.entity';
import { AlchoCategoryRepository } from './repository/alchoCategory.repository';
import { UnitRepository } from './repository/unit.repository';

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
        private readonly unitRepository : UnitRepository,
        private readonly alchoCategoryRepository : AlchoCategoryRepository
    ){}

    async newCocktail(){

    }

    async alchoCategory():Promise<AlchoCategoryEntity[]|object>{
        try{
            const res = await this.alchoCategoryRepository.find();
            return res; 
        }catch(err){
            this.logger.error(err);
            return {success: false , msg :"alchoCategory 조회 중 에러"};
        }
    }

    async unitCategory(){
        try{
            const res = await this.unitRepository.find();
            return res;
        }catch(err){
            this.logger.error(err);
            return {success:false, msg : "unitCategory 조회 중 에러"};
        }
    }

    async juiceCategory(){
        try{
            const res = await this.juiceRepository.find();
            return res;
        }catch(err){
            this.logger.error(err);
            return {success:false, msg: "alcho 조회 중 에러"};
        }
    }
}
