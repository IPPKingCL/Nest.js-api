import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FaceChatEntity } from "./faceChat.entity";
import { UserEntity } from "./user.entity";

@Entity('faceChatMem')
export class FaceChatMemEntity{
    @PrimaryGeneratedColumn('increment')
    id : number

    @ManyToOne((type) => FaceChatEntity,(faceChatEntity)=>faceChatEntity.faceChatMemEntitys)
    faceChat : FaceChatEntity;

    @ManyToOne((type)=> UserEntity,(userEntity)=>userEntity.faceChatMemEntitys)
    user : UserEntity;
}