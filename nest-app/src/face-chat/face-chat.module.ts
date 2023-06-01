import { Module } from '@nestjs/common';
import { FaceChatService } from './face-chat.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { FaceChatController } from './face-chat.controller';
import { FaceChatMemRepository } from './repository/faceChatMem.repository';
import { FaceChatRepository } from './repository/faceChat.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FaceChatEntity } from '@src/entities/faceChat.entity';
import { FaceChatMemEntity } from '@src/entities/faceChatMem.entity';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([FaceChatMemRepository,FaceChatRepository]),
    TypeOrmModule.forFeature([
      FaceChatMemEntity,FaceChatEntity
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
  controllers : [FaceChatController],
  providers: [FaceChatService]
})
export class FaceChatModule { }
