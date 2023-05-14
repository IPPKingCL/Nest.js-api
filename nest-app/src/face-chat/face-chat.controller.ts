import { Body, Controller, Get, Logger, Param, Post,Headers, UseGuards } from '@nestjs/common';
import { FaceChatService } from './face-chat.service';
import { AddFaceChatDto } from './dto/AddFaceChat.Dto';
import { getToken } from 'src/util/token';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/user/jwt/jwt.guard';
import { IntoRoomDto } from './dto/IntoRoom.Dto';

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

    @UseGuards(JwtAuthGuard)
    @Get('/faceChat/:id')
    async getInFaceChat(@Param('id') id:number,@Headers() header){
        this.logger.log('-------------get in the room');
        return await this.faceChatService.getInFaceChat(id,getToken(header));
        
    }

    @UseGuards(JwtAuthGuard)
    @Post('/addFaceChat')
    async addFaceChat(@Body() addFaceChatDto : AddFaceChatDto, @Headers() header): Promise<{ success: boolean; }>{
        this.logger.log('-------------add room');
        return await this.faceChatService.addFaceChat(addFaceChatDto,getToken(header));
    }

    @UseGuards(JwtAuthGuard)
    @Post('/intoRoom')
    async intoRoom(@Body() intoRoomDto : IntoRoomDto, @Headers() header){
        this.logger.log('-------------get in the room');
    }

}
