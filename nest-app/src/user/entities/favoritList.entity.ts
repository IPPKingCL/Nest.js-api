import { AlchoEntity } from "src/alcohol/entities/alcho.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('favorite')
export class FavoriteEntity{
    @PrimaryGeneratedColumn('increment')
    id:number;

    @ManyToOne((type) => UserEntity,(userEntity)=>userEntity.favoriteEntitys)
    user:UserEntity;

    @ManyToOne((type)=> AlchoEntity,(alchoEntity)=> alchoEntity.favoriteEntitys)
    alcho:AlchoEntity;
}