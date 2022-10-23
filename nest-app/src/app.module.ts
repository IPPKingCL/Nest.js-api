import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';


@Module({  //데코레이터는 클래스에 함수 기능을 추가할 수 있음
  imports: [],
  controllers: [MoviesController], //컨트롤러는 express의 라우터 같은 존재 url을 가져오고 함수를 실행함
  providers: [MoviesService],
})
export class AppModule {}
