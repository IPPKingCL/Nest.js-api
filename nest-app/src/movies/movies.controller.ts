import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { get } from 'http';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies') //url의 엔트리 포인트 담당
export class MoviesController {

    constructor(private readonly moviesService : MoviesService){}
    
    @Get("/")
    getAll():Movie[]{
        return this.moviesService.getAll();
    }

    @Get('search')
    search(@Query("year") searchingYear:string){  //url에서 파라미터 값 받을 때
        return `we are searching for a movie after ${searchingYear}`
    }

    @Get('/:id')
    getOne(@Param("id") userId:number):Movie{//id 파라미터를 userId라는 argument에 string 타입으로 저장
        return this.moviesService.getOne(userId);
    }

    @Post()
    create(@Body() movieData:CreateMovieDto){  //json 데이터 바디 받을 때 쓰는 데코레이터
        
        return this.moviesService.create(movieData);
    }

    @Delete('/:id')
    remove(@Param("id") movieId:number){
        return this.moviesService.delete(movieId);
    }

    @Patch('/:id')//리소스의 일부분만 업데이트
    patch(@Param('id') movieId:number, @Body() updateData:UpdateMovieDto){
        return this.moviesService.update(movieId,updateData);

    }

    @Get('test')
    test(){
        return this.moviesService.test();
    }
    

    
}
