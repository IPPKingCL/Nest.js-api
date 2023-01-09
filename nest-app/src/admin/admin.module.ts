import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { alchoRepository } from 'src/alcohol/repository/alcho.repository';
import { JuiceRepository } from 'src/cocktail/repository/Juice.repository';
import { TypeOrmExModule } from 'src/typeorm-ex.module';

import { ConfigService,ConfigModule } from '@nestjs/config';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { JwtStrategy } from 'src/user/jwt/jwt.strategy';
import { CocktailRepository } from 'src/cocktail/repository/Cocktail.repository';
import { AlchoRecipteRepository } from 'src/cocktail/repository/AlchoRecipe.repository';
import { JuiceRecipeRepository } from 'src/cocktail/repository/JuiceRecipe.repository';
import { AlchoCategoryEntity } from 'src/entities/alchoCategory.entity';
import { AlchoCategoryRepository } from './repository/alchoCategory.repository';
import { UnitRepository } from './repository/unit.repository';
import { UserRepository } from 'src/user/repository/user.repository';
@Module(
    {imports:[
        TypeOrmExModule.forCustomRepository([alchoRepository,JuiceRepository,CocktailRepository,AlchoRecipteRepository,
            JuiceRecipeRepository,AlchoCategoryRepository,UnitRepository,UserRepository]),
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
    controllers :[AdminController],
    providers : [AdminService,JwtStrategy]}
)
export class AdminModule {}
