import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AlchoEntity } from "./alcho.entity";
import { CocktailEntity } from "./cocktail.entity";

@Entity('alchoRecipe')
export class AlchoRecipeEntity{
    @PrimaryGeneratedColumn("increment")
    id : number;

    @ManyToOne((type) => AlchoEntity, (alchoEntity)=>alchoEntity.alchoRecipeEntitys)
    alcho : AlchoEntity;

    @ManyToOne((type) => CocktailEntity, (cocktailEntity)=>cocktailEntity.alchoRecipeEntitys)
    cocktail : CocktailEntity;

    @Column()
    amount : number;

    @Column()
    only : boolean;
}