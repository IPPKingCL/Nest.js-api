import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CocktailEntity } from "./cocktail.entity";
import { UserEntity } from "./user.entity";

@Entity('rating')
export class RatingEntity{
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column()
    rating : number;

    @Column()
    date : Date;

    @ManyToOne((type)=>UserEntity, (userEntity) => userEntity.ratingEntitys)
    user : UserEntity;

    @ManyToOne((type)=>CocktailEntity, (cocktailEntity) => cocktailEntity.ratingEntitys)
    cocktail : CocktailEntity;
}