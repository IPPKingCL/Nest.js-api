import { Controller, Get } from '@nestjs/common';
import { get } from 'http';

@Controller('movies') //url의 엔트리 포인트 담당
export class MoviesController {

    @Get()
    getAll():string{
        return 'jo';
    }

    @Get("/:id")
    getOne(){
        return "This will return one movie";
    }
    
}
