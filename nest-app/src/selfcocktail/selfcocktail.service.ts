import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { InsertCocktailDto } from 'src/admin/dto/insertCocktail.Dto';
import { CocktailEntity } from 'src/entities/cocktail.entity';
import { JuiceRecipeEntity } from 'src/entities/juiceRecipe.entity';
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
        private readonly adminService : AdminService
    ){}

    async findAll(){
        return await this.selfCocktailRepository.find();
    }

    async insert(insertDto:InsertCocktailDto, header){
        try{
            const token = this.jwtService.decode(header);

            const res = await this.insertSelfCocktail(insertDto,token['id']);
         
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

    async insertSelfCocktail(insertDto:InsertCocktailDto,userId){
        const queryRunner = this.dataSource.createQueryRunner(); //queryRunner 생성
        await queryRunner.connect();  //queryRunner 연결
        await queryRunner.startTransaction(); //트랜잭션 시작

        try{
            const cocktail = new CocktailEntity();
            cocktail.name = insertDto.name;
            cocktail.imgUrl = insertDto.imgUrl;
            cocktail.dosu = insertDto.dosu;

            const res = await queryRunner.query(
                "insert into selfCocktail(name, dosu, imgUrl,userId) values ('"+cocktail.name+"',"+cocktail.dosu+",'"+cocktail.imgUrl+"',"+ userId+")"
            );

            console.log(res['insertId']);
            const id = res['insertId'];
            
            const resAlcho = await this.insertSelfAlchoRecipe(id,insertDto.alcho, queryRunner);
            const resJuice = await this.insertSelfJuiceRecipe(id,insertDto.juice,queryRunner);

            if(resAlcho.success && resJuice.success){
                console.log("트랜잭션 커밋")
                await queryRunner.commitTransaction();
                return {success:true};
            }else{
                console.log("트랜잭션 롤백")
                await queryRunner.rollbackTransaction();
                return {success:false , msg:"칵테일 삽입 중 에러 발생"};
            }

        }catch(err){
            this.logger.error(err);
            this.logger.log('transaction rollback!!');
            return {success:false, msg:'칵테일 삽입 중 에러 발생'};
        }finally{
            await queryRunner.release();
        }
    }

    async insertSelfAlchoRecipe(id,insertDto,queryRunner){
        try{

            if(insertDto!=null){
                return {success:true};
            }
            await queryRunner.query(
                'insert into selfAlchoRecipe(amount,only,selfCocktailId,unitNumId,alchoId) '
                +'values ('+insertDto[0].amount+','+insertDto[0].only+','+id+','+insertDto[0].unit+','+insertDto[0].name+')'
            );

            return {success:true};
        }catch(err){
            this.logger.error(err);
            return {success:false,msg:err};
        }
    }

    async insertSelfJuiceRecipe(id,insertDto,queryRunner){
        try{

            if(insertDto!=null){
                return {success:true};
            }

            const juiceRecipe = new JuiceRecipeEntity();

            console.log(insertDto[0]);
            console.log(insertDto[0].id);

            juiceRecipe.cocktail = id;
            juiceRecipe.amount = insertDto.amount;
            juiceRecipe.juice = insertDto.id;
            juiceRecipe.unitNum = insertDto.unit;
            
            for(let i = 0; i<insertDto.length;i++){
                await queryRunner.query(
                    'insert into selfJuiceRecipe(amount, juiceId, selfCocktailId, unitNumId) '
                    +'values ('+insertDto[i].amount+','+insertDto[i].name+','+id+','+insertDto[i].unit+')'
                );
            }
            
            
            return {success:true};
        }catch(err){
            this.logger.error(err);
            return {success:false,msg:err};
        }
    }

    async getCategory(){
        try{
            const alchoCategory = await this.adminService.alchoCategory();
            const unitCategory = await this.adminService.unitCategory();
            const juiceCategory = await this.adminService.juiceCategory();

            const res = {
                alchoCategory,
                unitCategory,
                juiceCategory,
            }

            return res;
        }catch(err){
            this.logger.error(err);
            return {success:false};
        }
    }


    async select(id:number){
        try{
            const res = await this.selfCocktailRepository.createQueryBuilder()
                        .where("id=:id",{id:id})
                        .getOne();
            
            return res;
            
        }catch(err){
            this.logger.error(err);
            return {success : false};
        }
    }
}
