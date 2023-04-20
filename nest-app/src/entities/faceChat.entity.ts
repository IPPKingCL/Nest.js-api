import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FaceChatMemEntity } from "./faceChatMem.entity";

@Entity('faceChat')
export class FaceChatEntity{
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column({length:100})
    roomName : string;

    @OneToMany((type) => FaceChatMemEntity,(faceChatMemEntity)=>faceChatMemEntity.faceChat)
    faceChatMemEntitys : FaceChatMemEntity[];
}
