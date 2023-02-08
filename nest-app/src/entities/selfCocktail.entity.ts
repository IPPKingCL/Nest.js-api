import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SelfAlchoRecipeEntity } from "./selfAlchoRecipe.Entity";

@Entity('selfCocktail')
export class SelfCocktailEntity{
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column({length:100})
    name : string;

    @Column()
    dosu : number;

    @Column({length:1000})
    imgUrl : string;

    @Column()
    likeOne : number;

    @Column()
    views : number;

    @Column()
    only : boolean;

    @Column({length:1500})
    comment : string;

    @OneToMany((type)=>(SelfAlchoRecipeEntity),(selfAlchoRecipeEntity)=>selfAlchoRecipeEntity.selfCocktail)
    selfAlchoRecipeEntitys : SelfAlchoRecipeEntity[];



}