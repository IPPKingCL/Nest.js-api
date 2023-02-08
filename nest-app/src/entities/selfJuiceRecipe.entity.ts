import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { JuiceEntity } from "./juice.entity";
import { SelfCocktailEntity } from "./selfCocktail.entity";
import { UnitEntity } from "./unit.entity";

@Entity('selfJuiceRecipe')
export class SelfJuiceRecipeEntity{
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column()
    amount : number;

    @ManyToOne((type) => JuiceEntity, (juiceEntity) => juiceEntity.selfJuiceRecipeEntitys)
    juice : JuiceEntity;

    @ManyToOne((type) => SelfCocktailEntity, (selfCocktialEntity) => selfCocktialEntity.selfJuiceRecipeEntitys)
    selfCocktail : SelfCocktailEntity;

    @ManyToOne((type) => UnitEntity, (unitEntity) => unitEntity.selfJuiceRecipeEntitys)
    unitNum : UnitEntity;
    
}