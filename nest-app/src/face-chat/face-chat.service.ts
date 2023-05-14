import { Injectable, Logger } from '@nestjs/common';
import { FaceChatRepository } from './repository/faceChat.repository';
import { FaceChatMemRepository } from './repository/faceChatMem.repository';
import { FaceChatEntity } from 'src/entities/faceChat.entity';
import { JwtService } from '@nestjs/jwt';
import { FaceChatMemEntity } from 'src/entities/faceChatMem.entity';

@Injectable()
export class FaceChatService {
    private readonly logger = new Logger(FaceChatService.name);
    constructor(
        private readonly faceChatRepository : FaceChatRepository,
        private readonly faceChatMemRepository : FaceChatMemRepository,
        private jwtService : JwtService
    ){}

    async getAllFaceChat() : Promise<FaceChatEntity[]|object>{
        try{
            return await this.faceChatRepository.find();
        }catch(err){
            this.logger.error(err);
            return {success:false};
        }
    }

    async getFaceChat(id:number){
        try{
            return await this.faceChatRepository.find()
                        
        }catch(err){
            this.logger.error(err);
            return {sucess:false};
        }
    }
    
    async addFaceChat(addFaceChatDto, header){
        try{
            const token = this.jwtService.decode(header);
            console.log(token["id"])
            const faceChatEntity = new FaceChatEntity();

            console.log(addFaceChatDto);

            faceChatEntity.roomName = addFaceChatDto.roomName;
            faceChatEntity.detailComment = addFaceChatDto.detailComment;
            faceChatEntity.alchoCategory = addFaceChatDto.category;
            faceChatEntity.user = token["id"];
            faceChatEntity.dateTime = new Date();
            
            const res = await this.faceChatRepository.save(faceChatEntity);

            return {success:true,id:res.id};

        }catch(err){
            this.logger.error(err);
            return {success:false};
        }

    }

    async getInFaceChat(faceChatId:number, header){
        try{
            const token = this.jwtService.decode(header);

            const res = await this.checkFaceChatMem(token['id'],faceChatId);

            if(!res.success){
                return {success:false};
            }else if(res.success==='yes'){
                return {success:true,msg:'이미 참여하고 계신 채팅방입니다.'};
            }else if(res.success==='no'){
                return await this.saveMem(token['id'],faceChatId);
            }else{
                return {success:false};
            }

        }catch(err){
            this.logger.error(err);
            return {success:false};
        }
    }

    async saveMem(userId,faceChatId){
        try{
            const faceMemEntity = new FaceChatMemEntity();

            faceMemEntity.user = userId;
            faceMemEntity.faceChat = faceChatId;

            await this.faceChatMemRepository.save(faceMemEntity);

            return {success:true,msg:'방에 입장하셨습니다'};

        }catch(err){
            this.logger.error(err);
            return {success:false};
        }
    }

    async checkFaceChatMem(userId:number,faceChatId:number){
        try{
            const res = await this.faceChatMemRepository.createQueryBuilder('faceChatMem')
                            .leftJoinAndSelect('faceChatMem.user','user.id')
                            .where("faceChatMem.userId=:userId",{userId:userId})
                            .andWhere("faceChatMem.faceChatId=:faceChatId",{faceChatId:faceChatId})
                            .getOne();
            console.log(res);
            return res!==null ? {success:'yes'}:{success:'no'};

        }catch(err){
            this.logger.error(err);
            return {success:false};
        }

    }

}
