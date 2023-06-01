import { Module } from '@nestjs/common';
import { ConfigService,ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmExModule } from 'src/movies/repository/typeorm-ex.module';
import { JwtStrategy } from './jwt/jwt.strategy';
import { FavoriteRepository } from './repository/favorite.repository';
import { UserRepository } from './repository/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DataSource } from 'typeorm';

@Module({
    imports:[
        TypeOrmExModule.forCustomRepository([UserRepository,FavoriteRepository,DataSource]),
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
    controllers :[UserController],
    providers : [UserService,JwtStrategy]
})
export class UserModule {}
