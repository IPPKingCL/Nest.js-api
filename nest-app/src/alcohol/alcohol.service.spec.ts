import { Test, TestingModule } from '@nestjs/testing';
import { AlcoholService } from './alcohol.service';

describe('AlcoholService', () => {
  let service: AlcoholService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlcoholService],
    }).compile();

    service = module.get<AlcoholService>(AlcoholService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
