import { Test, TestingModule } from '@nestjs/testing';
import { FaceChatService } from './face-chat.service';
import { FaceChatRepository } from './repository/faceChat.repository';
import { FaceChatMemRepository } from './repository/faceChatMem.repository';
import { JwtService } from '@nestjs/jwt';

describe('FaceChatService', () => {
  let service: FaceChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FaceChatService,FaceChatMemRepository,FaceChatRepository,JwtService],
    }).compile();

    service = module.get<FaceChatService>(FaceChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
