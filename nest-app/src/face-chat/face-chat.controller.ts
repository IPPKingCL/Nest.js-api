import { Controller, Get, Logger, Param } from '@nestjs/common';
import { FaceChatService } from './face-chat.service';

@Controller('face-chat')
export class FaceChatController {
    private readonly logger = new Logger(FaceChatController.name)
    constructor(
        private readonly faceChatService : FaceChatService,
    ){}

    @Get('/list')
    async getFaceChatList(){
        this.logger.log('------------get Face Chat List');
        return await this.faceChatService.getAllFaceChat();
    }

    @Get('/faceChat/:id')
    async getFaceChat(@Param('id') id:number){
        this.logger.log('-------------get in the room');
        
    }
}
