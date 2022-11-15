import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';
@Injectable()
export class UserService {
    //constructor 하면서 에러남
    constructor(private readonly repository : UserRepository) {}

    getAll() : Promise<UserEntity[]>{
        return this.repository.find();
    }

    async insertUser(userData:UserCreateDto) :Promise<object> {
        /*Dto를 entitiy에 저장*/
        let user = new UserEntity();
        user.name = userData.name;
        user.age = userData.age;
        user.birth = new Date(userData.birth);
        user.sex = userData.sex;
        user.nickname = userData.nickname;
        user.userId = userData.userId;
        user.password = userData.password;
        user.email = userData.email;
        user.job = userData.job;
                
        try{
            await this.repository.save(user);
            return {success:true}
        }catch(err){
            return {success:false}
        }
    }
}
