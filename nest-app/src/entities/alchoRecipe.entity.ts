import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AlchoEntity } from "./alcho.entity";
import { CocktailEntity } from "./cocktail.entity";
import { UnitEntity } from "./unit.entity";

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
    only : boolean; //꼭 이 술을 써야하는지 1 같은 종류의 다른 술을 써도 되는지 0

    @Column()
    unit : string;

    @ManyToOne((type)=>UnitEntity,(unitEntity)=>unitEntity.alchoRecipeEntitys)
    unitNum : UnitEntity;
}