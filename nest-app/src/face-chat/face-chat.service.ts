import { Injectable, Logger } from '@nestjs/common';
import { FaceChatRepository } from './repository/faceChat.repository';
import { FaceChatMemRepository } from './repository/faceChatMem.repository';

@Injectable()
export class FaceChatService {
    private readonly logger = new Logger(FaceChatService.name);
    constructor(
        private readonly faceChatRepository : FaceChatRepository,
        private readonly faceChatMemRepository : FaceChatMemRepository
    ){}
}
