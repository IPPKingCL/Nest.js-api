import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { get } from 'http';

@Controller('movies') //url의 엔트리 포인트 담당
export class MoviesController {

    @Get("/")
    getAll():string{
        return 'jo';
    }

    @Get('search')
    search(@Query("year") searchingYear:string){  //url에서 파라미터 값 받을 때
        return `we are searching for a movie after ${searchingYear}`
    }

    @Get('/:id')
    getOne(@Param("id") userId:string){//id 파라미터를 userId라는 argument에 string 타입으로 저장
        return `This will return one movie with : ${userId}`;
    }

    @Post()
    create(@Body() movieData){  //json 데이터 바디 받을 때 쓰는 데코레이터
        console.log(movieData)
        return movieData;
    }

    @Delete('/:id')
    remove(@Param("id") movieId:string){
        return `This will delete a movie with the id: ${movieId}`;
    }

    @Patch('/:id')//리소스의 일부분만 업데이트
    patch(@Param('id') movieId:string, @Body() updateData){
        return{
            updateMovie:movieId,
            ...updateData

        };

    }

    
}
