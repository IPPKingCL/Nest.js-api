import { Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserEntity } from './entities/user.entity';
import { userStatus } from './enumType/userStatus';
import { UserRepository } from './repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { FavoriteEntity } from './entities/favoritList.entity';
import { FavoriteRepository } from './repository/favorite.repository';
import { getToken } from 'src/util/token';
import { UserModifyDto } from './dto/usermodify.dto';
import { UserEmailDto } from './dto/userEmail.dto';

@Injectable()
export class UserService {
    
    //constructor 하면서 에러남
    constructor(
        private readonly repository : UserRepository,
        private jwtService: JwtService,
        private fRepository : FavoriteRepository) {}
    private readonly logger = new Logger(UserService.name);

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
        user.price = userData.price;
        user.email = userData.email;
        user.job = userData.job;
        if(userData.loginType == 'g') {
            user.userLoginType = userStatus.google;
        }else {
            user.userLoginType = userStatus.default;
        }
        
        let favorite = new Array();
        
        
        favorite.push(userData.favorite);
        
        console.log("favor = " + favorite[0][0]["id"]);
        console.log("favor = " + userData.favorite);
        console.log(user.userLoginType);
              
        try{
            this.logger.debug("save console log" + (await this.repository.save(user)).name);
            const res = await this.repository.save(user);
               
            console.log(favorite);
            const fres = await this.insertFavorite(res, favorite)  

            if(fres['success']){
                const payload = { id:res.id, email: user.email, name: user.name, nickname : user.nickname , sub: '0' };
                const loginToken = this.jwtService.sign(payload); 
    
                return {success:true,token:loginToken}
            }
            
        }catch(err){
            this.logger.error(err)
            return {success:false, msg : "회원 가입 중 에러발생"}
        }
    }

    async insertFavorite(res, arr) : Promise<object>{
        const data = new FavoriteEntity();
        console.log("arr = " + arr);
        //console.log(id)
        try{
            let i = 0;
            for(i;i<arr[0].length;i++){
                console.log(arr[0][i].id);
                await this.fRepository.query(
                    `insert into favorite(userId,alchoId) values (`+res.id+`,`+arr[0][i].id+`)`,
                );
            }
            return {success:true};
        }catch(err){
            console.log(err)

            return {success:false}
        }
    }
    async test(){
        return await this.fRepository.find();
    }

    async checkUser(userId : string) : Promise<object>{
         
        //console.log("res : "+res.);
        try{
            this.logger.log(userId);
            const res = await this.repository.createQueryBuilder('user')
            .where('userId = :id',{id :userId})
            .getOne();
            
            if(res==null){
                return {success:true}
            }else{
                return {success :false , msg : "이미 존재하는 아이디 입니다"}
            }
            
        }catch(err){
            this.logger.error(err)
            return {success:false, msg:"회원 조회 중 에러발생"};
        }
        
    }

    async chectEmail(email : string) : Promise<object>{  //token 
        try{
            const res = await this.repository.createQueryBuilder("user")
            .where('email = :email',{email:email})
            .getOne();

           
            if(res==null){
                return {success:true};
            }else{
                const payload = {id:res.id, email: email, name: res.name, nickname : res.nickname , sub: '0' };
                const loginToken = this.jwtService.sign(payload);

                console.log(loginToken);
                console.log(this.jwtService.decode(loginToken))// 토큰 디코딩하는 방법
                return {success:false, msg:'존재하는 사용자',token : loginToken};
            }
        }catch(err){
            this.logger.error(err);
            return {success:false, msg:"회원 조회 중 에러발생"};
        }
    }


    async checkNickName(nickname : string) : Promise<object>{
         
        //console.log("res : "+res.);
        try{
            this.logger.log(nickname);
            const res = await this.repository.createQueryBuilder('user')
                        .where('nickname = :nickname',{nickname :nickname})
                        .getOne();
            
            if(res==null){
                return {success:true, msg : "사용 가능한 닉네임 입니다"};
            }else{
                return {success :false , msg : "이미 존재하는 닉네임 입니다"};
            }
            
        }catch(err){
            this.logger.error(err)
            return {success:false, msg:"회원 조회 중 에러발생"};
        }
        
    }

    async selectUser(header) : Promise<UserCreateDto|object>{
        
        const token = this.jwtService.decode(header);
        
        try{
            const res = await this.repository.createQueryBuilder('user')
                        .where('id=:id',{id:token['id']})
                        .getOne();
            return res;
        }catch(err){
            return {success:false}
        }
    }

    async selectFavorite(header) : Promise<FavoriteEntity|object>{
        const token = this.jwtService.decode(header);

        try{
            const res = await this.fRepository.createQueryBuilder('favorite')
                        .leftJoinAndSelect('favorite.alcho', 'alcho.id')
                        .where('userId=:id',{id:token['id']})
                        .getMany();
            console.log(res);
            return res;
        }catch(err){
            this.logger.error(err);
            return {success:false , msg : "좋아하는 술 목록 조회 실패"};
        }
        
    }

    async modify(header, body:UserModifyDto) {
        const token = this.jwtService.decode(header);
        let favorite = new Array();
        
        favorite.push(body.favorite);

        try{
            const user = new UserEntity();
            user.birth = new Date(body.birth);
            console.log(user.birth);
            await this.repository.query(
                'update user set age='+parseInt(body.age)+',birth=\''+user.birth+'\',nickname=\''+body.nickname+
                                '\',sex=\''+body.sex +'\',job=\''+body.job+'\',price='+body.price+
                                ' where id='+token['id']   
            );
            const dres = await this.deleteFavorite(token['id']);
            let fres;
            if(dres['success']){
                fres = await this.modifyFavorite(token['id'],favorite);
            }else{
                return {success:false, msg : "술 삭제 중 에러발생"}
            }

            
            if(fres['success']){
                return {success:true}
            }else{
                return {success:false, msg : "술 수정 중 에러발생"}
            }
            

        }catch(err){
            this.logger.error(err);
            return {success:false, msg : "수정 실패"};
        }
    }

    async deleteFavorite(id){
        try{
            await this.fRepository.query(
                'delete from favorite where userId='+id
            );
            return {success:true};
        }catch(err){
            this.logger.error(err)
            return {success:false};
        }
        
    }
    async modifyFavorite(id,arr){
        try{
            let i = 0;
            for(i;i<arr[0].length;i++){
                console.log(arr[0][i].id);
                await this.fRepository.query(
                    `insert into favorite(userId,alchoId) values (`+id+`,`+arr[0][i].id+`)`,    
                );
    
            }
            return {success:true};
        }catch(err){
            console.log(err)

            return {success:false}
        }
    }

    async emailLogin(emailLoginDto : UserEmailDto) {
        try{
            const res = await this.repository.createQueryBuilder("user")
            .where('email = :email',{email:emailLoginDto.email})
            .getOne();

           
            if(res==null){
                return {success:true};
            }else{
                const payload = {id:res.id, email: emailLoginDto.email, name: res.name, nickname : res.nickname , sub: '0' };
                const loginToken = this.jwtService.sign(payload);

                console.log(loginToken);
                console.log(this.jwtService.decode(loginToken))// 토큰 디코딩하는 방법
                return {success:false, msg:'존재하는 사용자',token : loginToken};
            }
        }catch(err){
            this.logger.error(err);
            return {success:false, msg:"회원 조회 중 에러발생"};
        }
    }


}
