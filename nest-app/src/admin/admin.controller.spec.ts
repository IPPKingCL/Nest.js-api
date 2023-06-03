import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { alchoRepository } from 'src/alcohol/repository/alcho.repository';
import { JuiceRepository } from 'src/cocktail/repository/Juice.repository';
import { UnitRepository } from './repository/unit.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';

describe('AdminController', () => {
  let controller: AdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController,],
      providers:[AdminService,DataSource,JwtService,alchoRepository,
                JuiceRepository,UnitRepository,UserRepository
                ]
    }).compile();

    controller = module.get<AdminController>(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
