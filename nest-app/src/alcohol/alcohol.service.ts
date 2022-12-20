import { Injectable, Logger } from '@nestjs/common';
import { readAlchoDto } from './dto/readAlcho.Dto';
import { AlchoEntity } from '../entities/alcho.entity';
import { alchoRepository } from './repository/alcho.repository';

@Injectable()
export class AlcoholService {
    private readonly logger = new Logger(AlcoholService.name)
    constructor(
        private readonly alchoRepository : alchoRepository
    ){}

    getAll() : Promise<AlchoEntity[]>{
        return this.alchoRepository.find();
    }

    async getOne(id:number) : Promise<readAlchoDto | object>{
        try{
            const res = await this.alchoRepository.createQueryBuilder('alcho')
                        .where('id=:id',{id:id})
                        .getOne();
            let readOne = new readAlchoDto();
            readOne = res;
            
            return res;
        }catch(err){
            this.logger.error(err);
            return {success:false, msg:"글 조회 중 에러 발생"};
        }
    }

    async getCategory(category:string) : Promise<readAlchoDto[] | object>{
        try{
            const res = await this.alchoRepository.createQueryBuilder('alcho')
                        .where('category=:category',{category:category})
                        .getMany();
            return res;
        }catch(err){
            this.logger.error(err);
            return {success:false, msg:"목록 조회 중 에러 발생"};
        }
    }

    async getAllCategory() : Promise<object[]|object>{
        try{
            const res = await this.alchoRepository.query(
                'select id, category from Alcho group by category'
            )
            return res;
        }catch(err){
            this.logger.error(err);
            return {success:false, msg:"카테고리 종류 조회 중 에러 발생"}
        }

    }

    async search(name:string) : Promise<readAlchoDto[] | object>{
        try{
            const res = await this.alchoRepository.createQueryBuilder('Alcho')
                        .where("name=:name",{name:name})
                        .getMany();
            return res;
        }catch(err){
            this.logger.error(err);
            return {success:false, msg: '검색 오류 발생'};
        }
    }

    async like(id:number) : Promise<object>{
        try{
            await this.alchoRepository.query(
                'update Alcho set like=like+1 where id='+id
            )
            return {success:true}
        }catch(err){
            this.logger.log(err);
            return {success:false, msg:"추천 도중 오류 발생"}
        }
    }

}
