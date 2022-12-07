import { Test, TestingModule } from '@nestjs/testing';
import { RecommandController } from './recommand.controller';

describe('RecommandController', () => {
  let controller: RecommandController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecommandController],
    }).compile();

    controller = module.get<RecommandController>(RecommandController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
