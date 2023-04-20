import { Test, TestingModule } from '@nestjs/testing';
import { FaceChatService } from './face-chat.service';

describe('FaceChatService', () => {
  let service: FaceChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FaceChatService],
    }).compile();

    service = module.get<FaceChatService>(FaceChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
