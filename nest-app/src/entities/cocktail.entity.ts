import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cocktail')
export class CocktailEntity{
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column({length:100})
    name : string;

    @Column()
    dosu : number;

    @Column({length:500})
    imgUrl : string;

    @Column()
    likeOne : number;
}