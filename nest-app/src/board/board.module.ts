import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/user/jwt/jwt.strategy';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardRepository } from './repository/board.repository';
import { CommentRepository } from './repository/comment.repository';
import { TypeOrmExModule } from './repository/typeorm-ex.module';
@Module({
    imports:[TypeOrmExModule.forCustomRepository([BoardRepository,CommentRepository]),
            // session을 사용하지 않을 예정이기 때문에 false
        PassportModule.register({ defaultStrategy: 'jwt', session: false }),
        // jwt 생성할 때 사용할 시크릿 키와 만료일자 적어주기
        JwtModule.register({
        secret: 'secret',
        signOptions: { expiresIn: '1y' },
        }),],
    controllers :[BoardController],
    providers : [BoardService,JwtStrategy]
})
export class BoardModule {}
