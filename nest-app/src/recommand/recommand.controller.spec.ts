import { Test, TestingModule } from '@nestjs/testing';
import { RecommandController } from './recommand.controller';
import { RecommandService } from './recommand.service';
import { dataRepository } from './repository/data.repository';
import { JwtService } from '@nestjs/jwt';

describe('RecommandController', () => {
  let controller: RecommandController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecommandController],
      providers : [RecommandService,dataRepository,JwtService]
    }).compile();

    controller = module.get<RecommandController>(RecommandController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
