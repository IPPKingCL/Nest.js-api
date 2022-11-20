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
        user.age = parseInt(userData.age);
        user.birth = new Date(userData.birth);
        user.sex = userData.sex;
        user.nickname = userData.nickname;
        user.userId = userData.userId;
        user.password = userData.password;
        user.email = userData.email;
        user.job = userData.job;
                
        try{
            console.log("save console log" + (await this.repository.save(user)).name);
            await this.repository.save(user);            
            return {success:true}
        }catch(err){
            console.log(err)
            return {success:false, msg : "회원 가입 중 에러발생"}
        }
    }

    async checkUser(userId : string) : Promise<object>{
         
        //console.log("res : "+res.);
        try{
            console.log(userId);
            const res = await this.repository.createQueryBuilder('user')
            .where('userId = :id',{id :userId})
            .getOne();
            
            if(res==null){
                return {success:true}
            }else{
                return {success :false , msg : "이미 존재하는 아이디 입니다"}
            }
            
        }catch(err){
            console.log(err)
            return {success:false, msg:"회원 조회 중 에러발생"};
        }
        
    }

    async chectEmail(email : string) : Promise<object>{
        try{
            const res = await this.repository.createQueryBuilder("user")
            .where('email = :email',{email:email})
            .getOne();

            if(res==null){
                return {success:true};
            }else{
                return {success:false, msg:'존재하는 사용자'};
            }
        }catch(err){
            return {success:false, msg:"회원 조회 중 에러발생"};
        }
    }


}
