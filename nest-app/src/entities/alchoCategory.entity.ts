import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { AlchoEntity } from "./alcho.entity";
import { FaceChatEntity } from "./faceChat.entity";

@Entity('alchoCategory')
export class AlchoCategoryEntity {
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column({length:50})
    category : string;

    @OneToMany((type) => AlchoEntity,(alchoEntity) => alchoEntity.alchoCategory)
    alcho : AlchoEntity[];

    @OneToMany((type)=>FaceChatEntity,(faceChatEntity)=>faceChatEntity.alchoCategory)
    faceChat : FaceChatEntity[];
}