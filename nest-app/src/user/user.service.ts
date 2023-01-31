import { Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserCreateDto } from './dto/userCreate.dto';
import { UserEntity } from '../entities/user.entity';
import { userStatus } from './enumType/userStatus';
import { UserRepository } from './repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { FavoriteEntity } from '../entities/favoritList.entity';
import { FavoriteRepository } from './repository/favorite.repository';
import { getToken } from 'src/util/token';
import { UserModifyDto } from './dto/usermodify.dto';
import { UserEmailDto } from './dto/userEmail.dto';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    
    //constructor 하면서 에러남
    constructor(
        private readonly repository : UserRepository,
        private jwtService: JwtService,
        private fRepository : FavoriteRepository,
        private dataSource:DataSource)
         {}
    
    private readonly logger = new Logger(UserService.name);

    getAll() : Promise<UserEntity[]>{
        return this.repository.find();
    }

    //트랜잭션 수정 예정
    async insertUser(userData:UserCreateDto) :Promise<object> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        /*Dto를 entitiy에 저장*/
        let user = new UserEntity();
        user.name = userData.name;
        user.age = parseInt(userData.age);
        user.birth = new Date(userData.birth);
        user.sex = userData.sex;
        user.nickname = userData.nickname;
        user.userId = userData.userId;
        user.password = hashedPassword;
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
            
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();

        try{
            this.logger.debug("save console log" + (await this.repository.save(user)).name);
            const res = await this.repository.save(user);
               
            console.log(favorite);
            const fres = await this.insertFavorite(res, favorite)  

            if(fres['success']){
                const payload = { id:res.id, email: user.email, name: user.name, nickname : user.nickname , sub: '0' };
                const loginToken = this.jwtService.sign(payload); 
                await queryRunner.commitTransaction();
                return {success:true,token:loginToken}
            }
            
        }catch(err){
            this.logger.error(err);
            await queryRunner.rollbackTransaction();
            return {success:false, msg : "회원 가입 중 에러발생"}
        }finally{
            await queryRunner.release();
        }
    }

    async insertFavorite(res, arr) : Promise<object>{
        const data = new FavoriteEntity();
        this.logger.log("arr = " + arr);
        //console.log(id)
        try{
            let i = 0;
            for(i;i<arr[0].length;i++){
                await this.fRepository.query(
                    `insert into favorite(userId,alchoId) values (`+res.id+`,`+arr[0][i].id+`)`,
                );
            }
            return {success:true};
        }catch(err){
            this.logger.error(err)

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

                //console.log(loginToken);
                //console.log(this.jwtService.decode(loginToken))// 토큰 디코딩하는 방법
                return {success:false, msg:'존재하는 사용자',token : loginToken};
            }
        }catch(err){
            this.logger.error(err);
            return {success:false, msg:"회원 조회 중 에러발생"};
        }
    }


    async checkNickName(nickname : string) : Promise<object>{
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
            this.logger.error(err);
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

    //트랜잭션 수정 예정
    async modify(header, body:UserModifyDto) {
        const token = this.jwtService.decode(header);
        let favorite = new Array();
        
        favorite.push(body.favorite);

        this.logger.log("body : "+body.img)

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();

        try{
            const user = new UserEntity();
            user.birth = new Date(body.birth);
            this.logger.log(user.birth);
            if(body.img!==''){
                await this.repository.query(
                    'update user set age='+parseInt(body.age)+',birth=\''+user.birth+'\',nickname=\''+body.nickname+
                                    '\',sex=\''+body.sex +'\',job=\''+body.job+'\',price='+body.price+', img=\''+body.img+
                                    '\' where id='+token['id']   
                );
            }else{
                await this.repository.query(
                    'update user set age='+parseInt(body.age)+',birth=\''+user.birth+'\',nickname=\''+body.nickname+
                                    '\',sex=\''+body.sex +'\',job=\''+body.job+'\',price='+body.price+
                                    ' where id='+token['id']   
                );
            }
           
            const dres = await this.deleteFavorite(token['id']);
            let fres;
            if(dres['success']){
                fres = await this.modifyFavorite(token['id'],favorite);
            }else{
                await queryRunner.rollbackTransaction();
                return {success:false, msg : "술 삭제 중 에러발생"}
            }

            
            if(fres['success']){
                const payload = {id:token["id"], email: token['email'], name: token['name'], nickname : body.nickname , sub: '0' };
                const loginToken = this.jwtService.sign(payload);

                this.logger.log(payload);
                await queryRunner.commitTransaction();
                return {success:true, token : loginToken};
                
            }else{
                await queryRunner.rollbackTransaction();
                return {success:false, msg : "술 수정 중 에러발생"}
            }
            
            
        }catch(err){
            this.logger.error(err);
            await queryRunner.rollbackTransaction();
            return {success:false, msg : "수정 실패"};
        }finally{
            await queryRunner.release();
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
            this.logger.error(err)

            return {success:false}
        }
    }

    async emailLogin(emailLoginDto : UserEmailDto) {
        try{
            
            const res = await this.repository.createQueryBuilder("user")
            .where('email = :email',{email:emailLoginDto.email})
            .getOne();  //이 부분 쿼리 수정했는데 이메일 말고 아이디로 해야할듯?

            // const res = await this.repository.query(
            //     "select * from alcohol.user " +
            //     "where email = " + `"${emailLoginDto.email}"` + " " +
            //     "and password = " + `${emailLoginDto.password}` + ";"
            // )
           
            if(res==null){
                return {success:false};
            }else{
                if(await bcrypt.compare(emailLoginDto.password, res.password)){
                    const payload = {id:res.id, email: emailLoginDto.email, name: res.name, nickname : res.nickname , sub: '0' };
                    const loginToken = this.jwtService.sign(payload);
    
                    //console.log(this.jwtService.decode(loginToken))// 토큰 디코딩하는 방법
                    return {success:true, msg:'존재하는 사용자',token : loginToken};
                }else{
                    return {success:false};
                }
            }
        }catch(err){
            this.logger.error(err);
            return {success:false, msg:"회원 조회 중 에러발생"};
        }
    }


}
