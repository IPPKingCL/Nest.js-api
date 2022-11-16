import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { testEntity } from './entities/test.entity';
//import { UserRepository } from "./repository/user.repository";

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    //constructor(private readonly repository: UserRepository) { }

    // getAll(): Movie[] {

    //     const test = new testEntity();
    //     test.id = 'qudqud97';
    //     test.email = 'qudqud97@naver.com';
    //     test.name = 'hi';
    //     test.password = '1234';
    //     test.signupVerifyToken = 'true';

    //     return this.movies;
    // }

    //getAll(): Promise<testEntity[]> {

        //return this.repository.find();

    //}

    getOne(id: number): Movie {
        const movie = this.movies.find(movie => movie.id === (id));
        if (!movie) {
            throw new NotFoundException(`Movie with ID : ${id}`);
        }
        return movie;
    }

    insert() : void {
        const test = new testEntity();
        test.id = 'qudqud97';
        test.email = 'qudqud97@naver.com';
        test.name = 'hi';
        test.password = '1234';
        test.signupVerifyToken = 'true';
        
        //this.repository.save(test);
    }

    delete(id: number): boolean {
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== id);
        return true;
    }

    create(movieData: CreateMovieDto) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        })
    }

    update(id: number, updateData: UpdateMovieDto) {
        const movie = this.getOne(id);
        this.delete(id);
        this.movies.push({ ...movie, ...updateData });

    }

    test() {

    }
}
