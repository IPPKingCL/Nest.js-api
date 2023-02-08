import { Test, TestingModule } from '@nestjs/testing';
import { SelfcocktailService } from './selfcocktail.service';

describe('SelfcocktailService', () => {
  let service: SelfcocktailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelfcocktailService],
    }).compile();

    service = module.get<SelfcocktailService>(SelfcocktailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
