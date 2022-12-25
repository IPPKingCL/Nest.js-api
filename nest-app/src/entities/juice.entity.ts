import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JuiceRecipeEntity } from "./juiceRecipe.entity";

@Entity('Juice')
export class JuiceEntity{
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column({length:50})
    name : string;

    @Column()
    type : number;

    @OneToMany((type) => JuiceRecipeEntity, (juiceRecipeEntity)=>juiceRecipeEntity.juice)
    juiceRecipeEntitys : JuiceRecipeEntity[];
}