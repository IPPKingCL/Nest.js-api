import { Module } from '@nestjs/common';
import { TypeOrmExModule } from './repository/typeorm-ex.module';
import { UserRepository } from './repository/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports:[TypeOrmExModule.forCustomRepository([UserRepository])],
    controllers:[UserController],
    providers : [UserService],
})
export class UserModule {}
