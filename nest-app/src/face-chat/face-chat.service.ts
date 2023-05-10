import { Injectable, Logger } from '@nestjs/common';
import { FaceChatRepository } from './repository/faceChat.repository';
import { FaceChatMemRepository } from './repository/faceChatMem.repository';
import { FaceChatEntity } from 'src/entities/faceChat.entity';
import { JwtService } from '@nestjs/jwt';

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

            const faceChatEntity = new FaceChatEntity();

            faceChatEntity.roomName = addFaceChatDto.name;
            faceChatEntity.detailComment = addFaceChatDto.detailComment;
            faceChatEntity.alchoCategory = addFaceChatDto.category;
            faceChatEntity.user = token["id"];
            faceChatEntity.dateTime = new Date();
            
            await this.faceChatRepository.save(faceChatEntity);

            return {success:true};
            
        }catch(err){
            this.logger.error(err);
            return {success:false};
        }

    }

}
