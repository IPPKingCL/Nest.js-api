import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/user/jwt/jwt.strategy';
import { AlcoholController } from './alcohol.controller';
import { AlcoholService } from './alcohol.service';
import { TypeOrmExModule } from 'src/movies/repository/typeorm-ex.module';
import { alchoRepository } from './repository/alcho.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService,ConfigModule } from '@nestjs/config';
import { alchoCommentRepository } from './repository/alchoComment.repository';
@Module(
    {imports:[
    TypeOrmExModule.forCustomRepository([alchoRepository,alchoCommentRepository]),
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
controllers :[AlcoholController],
providers : [AlcoholService,JwtStrategy]})
export class AlcoholModule {
    
}
