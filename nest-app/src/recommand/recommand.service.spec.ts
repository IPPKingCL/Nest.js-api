import { Test, TestingModule } from '@nestjs/testing';
import { RecommandService } from './recommand.service';

describe('RecommandService', () => {
  let service: RecommandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecommandService],
    }).compile();

    service = module.get<RecommandService>(RecommandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
