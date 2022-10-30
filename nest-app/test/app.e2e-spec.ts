import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist : true,  //유효성이 안맞으면 접근이 안되게
        forbidNonWhitelisted : true, //이상한걸 보내면 아예 막아버림
        transform : true, //유저가 보낸 데이터를 우리가 원하는 타입으로 바꿔줌 개꿀임
      })  //유효성을 검사하기 위한 일종의 미들웨어 api에서 받은걸 타입을 맞춰줌
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie');
  });

  
  describe("/movies",() => {
    it('GET', () => {
      return request(app.getHttpServer())
      .get("/movies")
      .expect(200)
      .expect([]);
    });

    it("POST", () => {
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title:'test',
        year : 2000,
        geners:['test']
      })
      .expect(201);
    });

    it("DELETE", () => {
      return request(app.getHttpServer())
      .delete('/movies')
      .expect(404)
    })
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer())
      .get("/movies/1")
      .expect(200)
    });
    it.todo('DELETE');
    it.todo('PATCH');
  })
});
