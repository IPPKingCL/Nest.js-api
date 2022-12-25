import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AlchoEntity } from "./alcho.entity";

@Entity('cocktail')
export class CocktailEntity{
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column({length:100})
    name : string;

    @Column()
    dosu : number;

    @Column({length:500})
    imgUrl : string;

    @Column()
    likeOne : number;

    @ManyToOne((type) => AlchoEntity,(alchoEntity)=>alchoEntity.cocktailEntitys)
    alcho : AlchoEntity;
}