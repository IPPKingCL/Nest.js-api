import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';
@Injectable()
export class UserService {
    //constructor 하면서 에러남
    constructor(private readonly repository : UserRepository) {}

    getAll() : Promise<UserEntity[]>{
        return this.repository.find();
    }

    insertUser() : object {
        const user = new UserEntity();
        user.name = 'hi'
        user.age = 18;
        user.sex = 'm';
        user.nickname = 'hi'
        user.userId = 'qudqud97';
        user.password ='1234';
        user.email = 'qudqud97@naver.com';
        user.job = '개발자'
        try{
            this.repository.save(user);
            return {success:true}
        }catch{
            return {success:false}
        }
    }
}
