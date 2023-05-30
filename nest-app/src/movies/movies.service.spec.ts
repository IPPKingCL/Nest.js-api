import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundError } from 'rxjs';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should be 4", () => {
    expect(2+2).toEqual(4);
  })

  // describe("getAll", () => {
  //   it("should return an array",()=>{
  //     const result = service.getAll();

  //     expect(result).toBeInstanceOf(Array);

  //   });
  // });

  describe("getOne",() =>{
    it("should return a movie",() => {
      service.create({
        title:"Text Movie",
        genres : ['test'],
        year:2000,
      })
      const movie = service.getOne(1)
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    
    it("should throw 404 error",() => {
      try{
        service.getOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID : 999`);
      }
    })
  })


  // describe("deleteOne", () => {
  //   it("deletes a movie", () => {
  //     service.create({
  //       title:"Text Movie",
  //       genres : ['test'],
  //       year:2000,
  //     });

  //     console.log(service.getAll());

  //     const allMovies = service.getAll();
  //     service.delete(1);
  //     const afterDelete = service.getAll();

  //     expect(afterDelete.length).toEqual(allMovies.length-1);

  //   })

  //   it("should return a 404",() => {
  //     try{
  //       service.delete(999)
  //     }catch(e){
  //       expect(e).toBeInstanceOf(NotFoundException);
  //       expect(e.message).toEqual(`Movie with ID : 999`);
  //     }
  //   })
  // })

  // describe("create", () => {
  //   it("should create a movie", () => {
  //     const beforeCreate = service.getAll().length;
  //     service.create(
  //       {
  //         title:"Text Movie",
  //         genres : ['test'],
  //         year:2000,
  //       }
  //     );
  //     const afterCreate = service.getAll().length;
  //     expect(afterCreate).toBeGreaterThan(beforeCreate);


  //   });
  // });

  describe("update",() => {
    it("should update a movie",() => {
      service.create(
        {
          title:"Text Movie",
          genres : ['test'],
          year:2000,
        }
      );

      service.update(1,{title:"updated test"});
      const movie = service.getOne(1);
      expect(movie.title).toEqual("updated test");

      
    })
    it("should throw a NotFoundException error",() => {
      try{
        service.update(999,{});
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
       
      }
    })
  })
});
