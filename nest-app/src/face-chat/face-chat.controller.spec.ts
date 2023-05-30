import { Test, TestingModule } from '@nestjs/testing';
import { FaceChatController } from './face-chat.controller';
import { FaceChatService } from './face-chat.service';

describe('FaceChatController', () => {
  let controller: FaceChatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FaceChatController,FaceChatService],
    }).compile();

    controller = module.get<FaceChatController>(FaceChatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
