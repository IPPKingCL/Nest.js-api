import { Test, TestingModule } from '@nestjs/testing';
import { CocktailController } from './cocktail.controller';

describe('CocktailController', () => {
  let controller: CocktailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CocktailController],
    }).compile();

    controller = module.get<CocktailController>(CocktailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
