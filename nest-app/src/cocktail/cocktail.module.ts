import { Module } from '@nestjs/common';
import { CocktailController } from './cocktail.controller';
import { CocktailService } from './cocktail.service';
import { TypeOrmExModule } from 'src/movies/repository/typeorm-ex.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService,ConfigModule } from '@nestjs/config';
import { JwtStrategy } from 'src/user/jwt/jwt.strategy';
import { CocktailRepository } from './repository/Cocktail.repository';
import { AlchoRecipteRepository } from './repository/AlchoRecipe.repository';
import { JuiceRecipeRepository } from './repository/JuiceRecipe.repository';
import { JuiceRepository } from './repository/Juice.repository';
import { alchoRepository } from 'src/alcohol/repository/alcho.repository';
import { RatingRepository } from './repository/Rating.repository';
import { CocktailCommentRepository } from './repository/CocktailComment.repository';
import { UserRepository } from './repository/User.repository';
import { FavoriteRepository } from 'src/user/repository/favorite.repository';


@Module({
  imports:[
    TypeOrmExModule.forCustomRepository([CocktailRepository,AlchoRecipteRepository,
      JuiceRecipeRepository,JuiceRepository,
      alchoRepository,RatingRepository,CocktailCommentRepository,
      UserRepository,FavoriteRepository]),
    // session을 사용하지 않을 예정이기 때문에 false
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    // jwt 생성할 때 사용할 시크릿 키와 만료일자 적어주기
    JwtModule.registerAsync({
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          secret: config.get<string>('secretOrKey'),
          signOptions: { expiresIn: '1d' },
        }),
      }),
    /*JwtModule.register({
        secret: 'secret',
        signOptions: { expiresIn: '1y' },
    }),*/],
  controllers : [CocktailController],
  providers: [CocktailService,JwtStrategy]
})
export class CocktailModule {}
