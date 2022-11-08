import { Test, TestingModule } from '@nestjs/testing';
import { AlcoholController } from './alcohol.controller';

describe('AlcoholController', () => {
  let controller: AlcoholController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlcoholController],
    }).compile();

    controller = module.get<AlcoholController>(AlcoholController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
