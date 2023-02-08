import { Test, TestingModule } from '@nestjs/testing';
import { SelfcocktailController } from './selfcocktail.controller';

describe('SelfcocktailController', () => {
  let controller: SelfcocktailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelfcocktailController],
    }).compile();

    controller = module.get<SelfcocktailController>(SelfcocktailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
