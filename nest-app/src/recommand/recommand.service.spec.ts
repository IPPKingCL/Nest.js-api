import { Test, TestingModule } from '@nestjs/testing';
import { RecommandService } from './recommand.service';
import { dataRepository } from './repository/data.repository';
import { JwtService } from '@nestjs/jwt';

describe('RecommandService', () => {
  let service: RecommandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecommandService,dataRepository,JwtService],
    }).compile();

    service = module.get<RecommandService>(RecommandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
    