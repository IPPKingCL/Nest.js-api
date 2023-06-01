import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { FavoriteRepository } from './repository/favorite.repository';
import { DataSource } from 'typeorm';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers : [UserService,UserRepository,JwtService,FavoriteRepository,DataSource]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
