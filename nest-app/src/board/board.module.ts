import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/user/jwt/jwt.strategy';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardRepository } from './repository/board.repository';
import { CommentRepository } from './repository/comment.repository';
import { TypeOrmExModule } from '../typeorm-ex.module';
import { ImgRepositoy } from './repository/img.repository';
import { BoardRecommandRepository } from './repository/boardRecommand.repository';
@Module({
    imports:[
        TypeOrmExModule.forCustomRepository([BoardRepository,CommentRepository,ImgRepositoy,BoardRecommandRepository]),
           // session을 사용하지 않을 예정이기 때문에 false
        PassportModule.register({ defaultStrategy: 'jwt', session: false }),
        // jwt 생성할 때 사용할 시크릿 키와 만료일자 적어주기
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
              secret: config.get<string>('secretOrKey'),
              signOptions: { expiresIn: '1d' },
            }),
          }),/*https://velog.io/@daep93/Nestjs-secretOrPrivateKey-must-have-a-value * env 해결 블로그 */
        /*JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '1y' },
        }),*/],
    controllers :[BoardController],
    providers : [BoardService,JwtStrategy]
})
export class BoardModule {}
