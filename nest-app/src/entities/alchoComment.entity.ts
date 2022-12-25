import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AlchoEntity } from "./alcho.entity";
import { UserEntity } from "./user.entity";

@Entity('alchoComment')
export class AlchoCommentEntity{

    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column({length : 1000})
    content : string;

    @Column({length:50})
    nickname : string;

    @Column()
    dateTime : Date;

    @Column()
    isDeleted : Boolean;

    @ManyToOne((type)=>UserEntity, (userEntity) => userEntity.alchoCommentEntitys)
    user : UserEntity;

    @ManyToOne((type)=>AlchoEntity, (alchoEntity) => alchoEntity.alchoCommentEntitys)
    alcho : AlchoEntity;

}