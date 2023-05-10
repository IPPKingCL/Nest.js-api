import { Injectable, Logger } from '@nestjs/common';
import { FaceChatRepository } from './repository/faceChat.repository';
import { FaceChatMemRepository } from './repository/faceChatMem.repository';
import { FaceChatEntity } from 'src/entities/faceChat.entity';

@Injectable()
export class FaceChatService {
    private readonly logger = new Logger(FaceChatService.name);
    constructor(
        private readonly faceChatRepository : FaceChatRepository,
        private readonly faceChatMemRepository : FaceChatMemRepository
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

        }catch(err){
            this.logger.error(err);
            return {success:false};
        }

    }

}
