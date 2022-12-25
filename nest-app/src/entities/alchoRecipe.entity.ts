import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AlchoEntity } from "./alcho.entity";
import { CocktailEntity } from "./cocktail.entity";

@Entity('alchoRecipe')
export class AlchoRecipeEntity{
    @ManyToOne((type) => AlchoEntity, (alchoEntity)=>alchoEntity.alchoRecipeEntitys)
    alcho : AlchoEntity;

    @ManyToOne((type) => CocktailEntity, (cocktailEntity)=>cocktailEntity.alchoRecipeEntitys)
    cocktail : AlchoEntity;

    
}