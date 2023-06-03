import { Test, TestingModule } from '@nestjs/testing';
import { CocktailCommentService } from './cocktailComment.service';
import { JwtService } from '@nestjs/jwt';
import { CocktailRepository } from './repository/Cocktail.repository';
import { AlchoRecipteRepository } from './repository/AlchoRecipe.repository';
import { JuiceRecipeRepository } from './repository/JuiceRecipe.repository';
import { alchoRepository } from 'src/alcohol/repository/alcho.repository';
import { RatingRepository } from './repository/Rating.repository';
import { CocktailCommentRepository } from './repository/CocktailComment.repository';
import { UserRepository } from './repository/User.repository';
import { FavoriteRepository } from 'src/user/repository/favorite.repository';

describe('CocktailCommentService',() => {
    let service: CocktailCommentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [CocktailCommentService,JwtService,CocktailCommentRepository],
        }).compile();
    
        service = module.get<CocktailCommentService>(CocktailCommentService); 
      });
    
      it('should be defined', () => {
        expect(service).toBeDefined();
      });
})