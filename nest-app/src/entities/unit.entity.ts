import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JuiceRecipeEntity } from "./juiceRecipe.entity";

@Entity('unit')
export class UnitEntity{
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column({length:50})
    name : string;

    @OneToMany((type) => JuiceRecipeEntity,(juiceRecipeEntity) => juiceRecipeEntity.unitNum)
    juiceRecipeEntitys : JuiceRecipeEntity[];
}