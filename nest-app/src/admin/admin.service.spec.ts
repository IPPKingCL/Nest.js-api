import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CocktailRepository } from 'src/cocktail/repository/Cocktail.repository';
import { alchoRepository } from 'src/alcohol/repository/alcho.repository';
import { JuiceRepository } from 'src/cocktail/repository/Juice.repository';
import { AlchoRecipteRepository } from 'src/cocktail/repository/AlchoRecipe.repository';
import { JuiceRecipeRepository } from 'src/cocktail/repository/JuiceRecipe.repository';
import { UnitRepository } from './repository/unit.repository';
import { AlchoCategoryRepository } from './repository/alchoCategory.repository';
import { UserRepository } from 'src/user/repository/user.repository';

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminService,DataSource,JwtService,CocktailRepository,alchoRepository,JuiceRepository,AlchoRecipteRepository,JuiceRecipeRepository,UnitRepository,AlchoCategoryRepository,UserRepository],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
