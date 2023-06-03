import { Test, TestingModule } from '@nestjs/testing';
import { SelfcocktailService } from './selfcocktail.service';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { SelfCocktailRepository } from './repository/selfCocktail.repository';
import { SelfAlchoRecipeRepository } from './repository/selfAlchoRecipe.repository';
import { SelfJuiceRepository } from './repository/selfJuiceRecipe.repository';
import { AdminService } from 'src/admin/admin.service';

describe('SelfcocktailService', () => {
  let service: SelfcocktailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelfcocktailService,DataSource,JwtService,
                  SelfCocktailRepository,SelfAlchoRecipeRepository,
                  SelfJuiceRepository,AdminService
                ],
    }).compile();

    service = module.get<SelfcocktailService>(SelfcocktailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
