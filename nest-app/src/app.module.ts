import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { BoardModule } from './board/board.module';
import { AlcoholModule } from './alcohol/alcohol.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { testEntity } from './movies/entities/test.entity';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './entities/user.entity';
import { BoardEntity } from './entities/board.entity';
import { CommentEntity } from './entities/comment.entity';
import { WeatherModule } from './weather/weather.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './user/jwt/jwt.strategy';
import { RecommandModule } from './recommand/recommand.module';
import { dataEntity } from './entities/data.entity';
import { AlchoEntity } from './entities/alcho.entity';
import { FavoriteEntity } from './entities/favoritList.entity';
import { ImgEntity } from './entities/img.entity';
import { AlchoCommentEntity } from './entities/alchoComment.entity';
import { CocktailModule } from './cocktail/cocktail.module';
import { CocktailEntity } from './entities/cocktail.entity';
import { AlchoRecipeEntity } from './entities/alchoRecipe.entity';
import { JuiceEntity } from './entities/juice.entity';
import { JuiceRecipeEntity } from './entities/juiceRecipe.entity';
import { RatingEntity } from './entities/rating.entity';
import { BoardRecommandEntity } from './entities/boardRecommand.entity';
import { CocktailCommentEntity } from './entities/cocktailComment.entity';
import { AlchoCategoryEntity } from './entities/alchoCategory.entity';
import { AdminModule } from './admin/admin.module';
import { UnitEntity } from './entities/unit.entity';
import { CommentRecommendEntity } from './entities/commentRecommend.entity';
import { BoardVideoEntity } from './entities/boardVideo.entity';
import { SelfCocktailEntity } from './entities/selfCocktail.entity';
import { SelfAlchoRecipeEntity } from './entities/selfAlchoRecipe.Entity';
import { SelfJuiceRecipeEntity } from './entities/selfJuiceRecipe.entity';
import { SelfcocktailModule } from './selfcocktail/selfcocktail.module';

@Module({  //데코레이터는 클래스에 함수 기능을 추가할 수 있음
  
  imports: [MoviesModule, UserModule, BoardModule, AlcoholModule,WeatherModule, 
    RecommandModule, AlcoholModule, CocktailModule, AdminModule, SelfcocktailModule,

    JwtModule.register({
      secret : process.env.secretOrKey,
      signOptions : {expiresIn: '60s'},
    }),

    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.RDS_HOST,
      port: 3306,
      username: process.env.RDS_USER,
      password: process.env.RDS_PSWORD,
      database: process.env.RDS_DATABASE,
      entities: [testEntity,UserEntity, BoardEntity,CommentEntity,
                 dataEntity, AlchoEntity,FavoriteEntity,ImgEntity,
                 AlchoCommentEntity, CocktailEntity, AlchoRecipeEntity,
                 JuiceEntity,JuiceRecipeEntity,RatingEntity,BoardRecommandEntity,
                 CocktailCommentEntity,AlchoCategoryEntity,UnitEntity,CommentRecommendEntity,
                 BoardVideoEntity,SelfCocktailEntity,SelfAlchoRecipeEntity,SelfJuiceRecipeEntity
                ],
      synchronize: false,
      logging : true,
      
    }),
    
    
   
    ], 
  controllers: [AppController,], //컨트롤러는 express의 라우터 같은 존재 url을 가져오고 함수를 실행함
  providers: [JwtStrategy,],
}) 
export class AppModule {}   

