import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InsertCocktailDto } from 'src/admin/dto/insertCocktail.Dto';
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

    async findAll(){
        return await this.selfCocktailRepository.find();
    }

    async insert(insertDto:InsertCocktailDto, header){
        try{
            const token = this.jwtService.decode(header);

            const res = await this.insertSelfCocktail(insertDto);

            if(res.success){
                return {success:true};
            }else{
                return {sucess:false, msg:'입력 도중 에러 발생'};
            }
        }catch(err){
            this.logger.error(err);
            return {success:false, msg:"칵테일 입력 실패"}
        }
    }

    async insertSelfCocktail(insertDto:InsertCocktailDto){
        try{

        }catch(err){
            this.logger.error(err);
            this.logger.log('transaction rollback!!');
            return {success:false, msg:'칵테일 삽입 중 에러 발생'};
        }
    }

    async insertSelfAlchoRecipe(id,insertDto,queryRunner){
        try{
            await queryRunner.query(
                'insert into selfAlchoRecipe(amount,only,unitNumId,alchoId,selfCocktailId) '
                +'values ('+insertDto[0].amount+','+insertDto[0].only+','+id+','+insertDto[0].unit+','+insertDto[0].name+')'
            );

            return {success:true};
        }catch(err){
            this.logger.error(err);
            return {success:false,msg:err};
        }
    }
}
