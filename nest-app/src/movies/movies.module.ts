import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TestRepository } from './repository/testRepository';
//import { UserRepository } from "./repository/user.repository";
import { TypeOrmExModule } from "./repository/typeorm-ex.module";

@Module({
    //imports:[TypeOrmExModule.forCustomRepository([UserRepository])],
    controllers:[MoviesController],
    providers : [MoviesService],
})
export class MoviesModule {}
