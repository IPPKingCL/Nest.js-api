import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AlchoEntity } from "./alcho.entity";
import { CocktailEntity } from "./cocktail.entity";

@Entity('alchoRecipe')
export class alchoRecipe{
    @ManyToOne((type) => AlchoEntity, (alchoEntity)=>alchoEntity.alchoRecipes)
    alcho : AlchoEntity;

    @ManyToOne((type) => CocktailEntity, (alchoEntity)=>alchoEntity.alchoRecipes)
    alcho : AlchoEntity;

    
}