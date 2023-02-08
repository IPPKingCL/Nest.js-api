import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JuiceRecipeEntity } from "./juiceRecipe.entity";
import { SelfJuiceRecipeEntity } from "./selfJuiceRecipe.entity";

@Entity('Juice')
export class JuiceEntity{
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column({length:50})
    name : string;

    @Column()
    type : number;  //1.탄산음료 2.칵테일용 탄산음료 3.즙 4.과일주스  5.시럽  6.소스 7. 첨가물  8.가니쉬 및 잎;;

    @Column({length:500})
    imgUrl : string;

    @OneToMany((type) => JuiceRecipeEntity, (juiceRecipeEntity)=>juiceRecipeEntity.juice)
    juiceRecipeEntitys : JuiceRecipeEntity[];

    @OneToMany((type) => SelfJuiceRecipeEntity,(selfJuiceRecipeEntity) => selfJuiceRecipeEntity.juice)
    selfJuiceRecipeEntitys : SelfJuiceRecipeEntity[];
}