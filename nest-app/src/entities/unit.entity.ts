import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AlchoRecipeEntity } from "./alchoRecipe.entity";
import { JuiceRecipeEntity } from "./juiceRecipe.entity";
import { SelfAlchoRecipeEntity } from "./selfAlchoRecipe.Entity";
import { SelfJuiceRecipeEntity } from "./selfJuiceRecipe.entity";

@Entity('unit')
export class UnitEntity{
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column({length:50})
    name : string;

    @OneToMany((type) => JuiceRecipeEntity,(juiceRecipeEntity) => juiceRecipeEntity.unitNum)
    juiceRecipeEntitys : JuiceRecipeEntity[];

    @OneToMany((type) => AlchoRecipeEntity,(alchoRecipeEntity) => alchoRecipeEntity.unitNum)
    alchoRecipeEntitys : AlchoRecipeEntity[];

    @OneToMany((type) => SelfAlchoRecipeEntity,(selfAlchoRecipeEntity) => selfAlchoRecipeEntity.unitNum)
    selfAlchoRecipeEntitys : SelfAlchoRecipeEntity[];

    @OneToMany((type) => SelfJuiceRecipeEntity, selfJuiceRecipeEntity=>selfJuiceRecipeEntity.unitNum)
    selfJuiceRecipeEntitys : SelfJuiceRecipeEntity[];

}