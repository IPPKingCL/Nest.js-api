import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SelfAlchoRecipeEntity } from "./selfAlchoRecipe.Entity";
import { SelfJuiceRecipeEntity } from "./selfJuiceRecipe.entity";
import { UserEntity } from "./user.entity";

@Entity('selfCocktail')
export class SelfCocktailEntity{
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column({length:100})
    name : string;

    @Column()
    dosu : number;

    @Column({length:1000})
    imgUrl : string;

    @Column()
    likeOne : number;

    @Column()
    views : number;

    @Column()
    only : boolean;

    @Column({length:1500})
    comment : string;
 
    @Column()
    flag : boolean;

    @OneToMany((type)=>(SelfAlchoRecipeEntity),(selfAlchoRecipeEntity)=>selfAlchoRecipeEntity.selfCocktail)
    selfAlchoRecipeEntitys : SelfAlchoRecipeEntity[];

    @OneToMany((type) => (SelfJuiceRecipeEntity), (selfJuiceRecipeEntity) => selfJuiceRecipeEntity.selfCocktail)
    selfJuiceRecipeEntitys : SelfJuiceRecipeEntity[];

    @ManyToOne((type)=>(UserEntity),(userEntity)=>userEntity.selfCocktailEntitys)
    user : UserEntity;



}