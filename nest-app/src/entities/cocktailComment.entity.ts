import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CocktailEntity } from "./cocktail.entity";
import { UserEntity } from "./user.entity";

@Entity('cocktailComment')
export class CocktailCommentEntity{
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column({length : 1000})
    contents : string;

    @Column()
    dateTime : Date;

    @Column({length:50})
    nickname : string;

    @Column()
    isDeleted : Boolean;

    @ManyToOne((type) => CocktailEntity,(cocktailEntity)=>cocktailEntity.cocktailCommentEntitys)
    cocktail : CocktailEntity;

    @ManyToOne((type)=>UserEntity, (userEntity)=>userEntity.cocktailCommentEntitys)
    user : UserEntity;
}