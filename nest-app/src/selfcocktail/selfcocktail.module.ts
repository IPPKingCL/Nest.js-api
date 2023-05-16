import { Module } from '@nestjs/common';
import { SelfAlchoRecipeRepository } from './repository/selfAlchoRecipe.repository';
import { SelfCocktailRepository } from './repository/selfCocktail.repository';
import { SelfJuiceRepository } from './repository/selfJuiceRecipe.repository';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SelfcocktailController } from './selfcocktail.controller';
import { JwtStrategy } from 'src/user/jwt/jwt.strategy';
import { SelfcocktailService } from './selfcocktail.service';
import { AdminService } from 'src/admin/admin.service';
import { alchoRepository } from 'src/alcohol/repository/alcho.repository';
import { JuiceRepository } from 'src/cocktail/repository/Juice.repository';
import { CocktailRepository } from 'src/cocktail/repository/Cocktail.repository';
import { AlchoRecipteRepository } from 'src/cocktail/repository/AlchoRecipe.repository';
import { UnitRepository } from 'src/admin/repository/unit.repository';
import { AlchoCategoryRepository } from 'src/admin/repository/alchoCategory.repository';
import { JuiceRecipeRepository } from 'src/cocktail/repository/JuiceRecipe.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { SelfCocktailCommentRepository } from './repository/selfCocktailComment.repository';

@Module({
    imports:[ TypeOrmExModule.forCustomRepository([SelfCocktailRepository,SelfAlchoRecipeRepository,SelfJuiceRepository,
        alchoRepository,JuiceRepository,CocktailRepository,AlchoRecipteRepository,
        JuiceRecipeRepository,AlchoCategoryRepository,UnitRepository,UserRepository,SelfCocktailCommentRepository
    ]),
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
      controllers : [SelfcocktailController],
      providers : [SelfcocktailService, JwtStrategy,AdminService]
})
export class SelfcocktailModule {

}
