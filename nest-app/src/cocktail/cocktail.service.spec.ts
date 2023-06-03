import { Test, TestingModule } from '@nestjs/testing';
import { CocktailService } from './cocktail.service';
import { CocktailRepository } from './repository/Cocktail.repository';
import { JwtService } from '@nestjs/jwt';
import { AlchoRecipteRepository } from './repository/AlchoRecipe.repository';
import { JuiceRecipeRepository } from './repository/JuiceRecipe.repository';
import { RatingRepository } from './repository/Rating.repository';

describe('CocktailService', () => {
  let service: CocktailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CocktailService,JwtService,CocktailRepository,AlchoRecipteRepository,
                  JuiceRecipeRepository,RatingRepository
                ],
    }).compile();

    service = module.get<CocktailService>(CocktailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
