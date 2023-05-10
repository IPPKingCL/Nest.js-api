import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FaceChatMemEntity } from "./faceChatMem.entity";
import { AlchoCategoryEntity } from "./alchoCategory.entity";
import { UserEntity } from "./user.entity";

@Entity('faceChat')
export class FaceChatEntity{
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column({length:100})
    roomName : string;

    @Column()
    dateTime : Date;

    @Column({length:100})
    detailComment:string;
    
    @OneToMany((type) => FaceChatMemEntity,(faceChatMemEntity)=>faceChatMemEntity.faceChat)
    faceChatMemEntitys : FaceChatMemEntity[];

    @ManyToOne((type)=>AlchoCategoryEntity,(alchoCategoryEntity)=>alchoCategoryEntity.faceChat)
    alchoCategory : AlchoCategoryEntity;

    @ManyToOne((type)=>UserEntity,(userEntity)=>userEntity.faceChatEntitys)
    user : UserEntity;
}
