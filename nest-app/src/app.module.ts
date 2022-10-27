import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';


@Module({  //데코레이터는 클래스에 함수 기능을 추가할 수 있음
  imports: [MoviesModule],
  controllers: [AppController], //컨트롤러는 express의 라우터 같은 존재 url을 가져오고 함수를 실행함
  providers: [],
})
export class AppModule {}
