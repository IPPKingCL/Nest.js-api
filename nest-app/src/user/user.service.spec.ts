import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { FavoriteRepository } from './repository/favorite.repository';
import { DataSource } from 'typeorm';

describe('UserService', () => {
  let service: UserService;

  /**테스트를 하기 전 실행 되는 것들 */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,UserRepository,JwtService,FavoriteRepository,DataSource],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


 
});
