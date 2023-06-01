import { Test, TestingModule } from '@nestjs/testing';
import { FaceChatController } from './face-chat.controller';
import { FaceChatService } from './face-chat.service';
import { FaceChatModule } from './face-chat.module';
import { FaceChatMemRepository } from './repository/faceChatMem.repository';
import { FaceChatRepository } from './repository/faceChat.repository';
import { JwtService } from '@nestjs/jwt';

describe('FaceChatController', () => {
  let controller: FaceChatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports:[FaceChatModule],
      controllers: [FaceChatController],
      providers : [FaceChatService,FaceChatMemRepository,FaceChatRepository,JwtService]
    }).compile();

    controller = module.get<FaceChatController>(FaceChatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
