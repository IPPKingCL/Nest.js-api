import { Body, Controller, Get, Logger, Param, Post,Headers, UseGuards } from '@nestjs/common';
import { FaceChatService } from './face-chat.service';
import { AddFaceChatDto } from './dto/AddFaceChat.Dto';
import { getToken } from 'src/util/token';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/user/jwt/jwt.guard';

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

    @UseGuards(JwtAuthGuard)
    @Post('/addFaceChat')
    async addFaceChat(@Body() addFaceChatDto : AddFaceChatDto, @Headers() header): Promise<{ success: boolean; }>{
        this.logger.log('-------------add room');
        return await this.faceChatService.addFaceChat(addFaceChatDto,getToken(header));
    }

}
