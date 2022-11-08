import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { BoardController } from './board/board.controller';
import { BoardService } from './board/board.service';
import { BoardModule } from './board/board.module';
import { AlcoholController } from './alcohol/alcohol.controller';
import { AlcoholService } from './alcohol/alcohol.service';
import { AlcoholModule } from './alcohol/alcohol.module';


@Module({  //데코레이터는 클래스에 함수 기능을 추가할 수 있음
  imports: [MoviesModule, UserModule, BoardModule, AlcoholModule],
  controllers: [AppController, UserController, BoardController, AlcoholController], //컨트롤러는 express의 라우터 같은 존재 url을 가져오고 함수를 실행함
  providers: [UserService, BoardService, AlcoholService],
})
export class AppModule {}
