import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TestRepository } from './repository/testRepository';

@Module({
    imports:[TypeOrmModule.forFeature([TestRepository])],
    controllers:[MoviesController],
    providers : [MoviesService],
})
export class MoviesModule {}
