import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AlchoEntity } from "./alcho.entity";
import { SelfCocktailEntity } from "./selfCocktail.entity";
import { UnitEntity } from "./unit.entity";

@Entity('selfAlchoRecipe')
export class SelfAlchoRecipeEntity{
    @PrimaryGeneratedColumn("increment")
    id : number;

    @Column()
    amount : number;

    @Column()
    only : boolean; //꼭 이 술을 써야하는지 1 같은 종류의 다른 술을 써도 되는지 0

    @ManyToOne((type)=>UnitEntity,(unitEntity)=>unitEntity.selfAlchoRecipeEntitys)
    unitNum : UnitEntity;

    @ManyToOne((type) => AlchoEntity, (alchoEntity)=>alchoEntity.selfAlchoRecipeEntitys)
    alcho : AlchoEntity;

    @ManyToOne((type) => SelfCocktailEntity, (selfCocktailEntity)=>selfCocktailEntity.selfAlchoRecipeEntitys)
    selfCocktail : SelfCocktailEntity;
}