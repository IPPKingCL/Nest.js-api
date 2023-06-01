import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from './board.service';
import { BoardRepository } from './repository/board.repository';
import { CommentRepository } from './repository/comment.repository';
import { ImgRepositoy } from './repository/img.repository';
import { BoardRecommandRepository } from './repository/boardRecommand.repository';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';
import { CommentRecommendRepository } from './repository/commentRecommend.repository';
import { BoardVideoRepository } from './repository/boardVideo.repository';
import { UserRepository } from 'src/user/repository/user.repository';

describe('BoardService', () => {
  let service: BoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardService,BoardRepository,CommentRepository,ImgRepositoy,BoardRecommandRepository,JwtService,DataSource,CommentRecommendRepository,BoardVideoRepository,UserRepository],
    }).compile();

    service = module.get<BoardService>(BoardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
