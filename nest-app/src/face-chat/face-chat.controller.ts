import { Controller, Logger } from '@nestjs/common';
import { FaceChatService } from './face-chat.service';

@Controller('face-chat')
export class FaceChatController {
    private readonly logger = new Logger(FaceChatController.name)
    constructor(
        private readonly faceChatService : FaceChatService,
    ){}
}
