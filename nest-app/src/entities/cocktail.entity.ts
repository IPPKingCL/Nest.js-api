import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AlchoEntity } from "./alcho.entity";
import { AlchoRecipeEntity } from "./alchoRecipe.entity";
import { JuiceRecipeEntity } from "./juiceRecipe.entity";
import { RatingEntity } from "./rating.entity";

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

    @Column()
    views : number;

    @Column()
    only : boolean; //꼭 이 술을 써야하는지 1 같은 종류의 다른 술을 써도 되는지 0

    @OneToMany((type)=> AlchoRecipeEntity,(alchoRecipeEntity)=>alchoRecipeEntity.cocktail)
    alchoRecipeEntitys : AlchoRecipeEntity[];

    @OneToMany((type) => JuiceRecipeEntity,(juiceRecipeEntity)=>juiceRecipeEntity.cocktail)
    juiceRecipeEntitys : JuiceRecipeEntity[];

    @OneToMany((type) => RatingEntity,(ratingEntity) => ratingEntity.cocktail)
    ratingEntitys : RatingEntity[];

}