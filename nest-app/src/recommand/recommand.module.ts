import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmExModule } from '../typeorm-ex.module';
import { RecommandController } from './recommand.controller';
import { RecommandService } from './recommand.service';
import { dataRepository } from './repository/data.repository';
@Module({
    imports:[
        TypeOrmExModule.forCustomRepository([dataRepository]),
        // session을 사용하지 않을 예정이기 때문에 false
        PassportModule.register({ defaultStrategy: 'jwt', session: false }),
        // jwt 생성할 때 사용할 시크릿 키와 만료일자 적어주기
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
              secret: config.get<string>('secretOrKey'),
              signOptions: { expiresIn: '1d' },
            }),
          })    
    ],
    controllers :[RecommandController],
    providers : [RecommandService]
})
export class RecommandModule {}
