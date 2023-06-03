import { Test, TestingModule } from '@nestjs/testing';
import { AlcoholService } from './alcohol.service';
import { alchoRepository } from './repository/alcho.repository';
import { alchoCategoryRepository } from './repository/alchoCategory.repository';

describe('AlcoholService', () => {
  let service: AlcoholService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlcoholService,alchoRepository,alchoCategoryRepository],
    }).compile();

    service = module.get<AlcoholService>(AlcoholService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
