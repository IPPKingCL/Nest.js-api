import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CocktailEntity } from "./cocktail.entity";
import { JuiceEntity } from "./juice.entity";

@Entity('juiceRecipe')
export class JuiceRecipeEntity{
    @PrimaryGeneratedColumn('increment')
    id : number;

    @ManyToOne((type) => JuiceEntity,(juiceEntity) => juiceEntity.juiceRecipeEntitys)
    juice : JuiceEntity;

    @ManyToOne((type) => CocktailEntity, (cocktailEntity)=>cocktailEntity.juiceRecipeEntitys)
    cocktail : CocktailEntity;

    @Column()
    amount : number;  //1000이 넘어갈시 나누기 10000을 해줘야함
}