import { Injectable } from '@nestjs/common';
import { InsertQueryBuilder } from 'typeorm';
import { userEntity } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
    constructor(private readonly repository: UserRepository) { }
    
    getAll(): Promise<userEntity[]>{
        return this.repository.find();
    }

    insert(): void {
        const user = new userEntity();
        user.userId ='test';
        this.repository.save(user);
    }
}
