import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AlchoEntity } from "./alcho.entity";
import { AlchoRecipeEntity } from "./alchoRecipe.entity";
import { JuiceRecipeEntity } from "./juiceRecipe.entity";

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

    @OneToMany((type)=> AlchoRecipeEntity,(alchoRecipeEntity)=>alchoRecipeEntity.cocktail)
    alchoRecipeEntitys : AlchoRecipeEntity[];

    @OneToMany((type) => JuiceRecipeEntity,(juiceRecipeEntity)=>juiceRecipeEntity.cocktail)
    juiceRecipeEntitys : JuiceRecipeEntity[];

}