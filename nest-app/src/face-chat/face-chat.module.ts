import { Module } from '@nestjs/common';
import { FaceChatService } from './face-chat.service';

@Module({
  providers: [FaceChatService]
})
export class FaceChatModule {}
