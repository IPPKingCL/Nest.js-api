import { FavoriteEntity,  } from "src/entities/favoritList.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('Alcho')
export class AlchoEntity{
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column({length:100})
    name : string;

    @Column({length:50})
    category : string;

    @Column()
    sugar : number;

    @Column({length:50})
    color : string;

    @Column()
    dosu : number;

    @Column()
    price : number;

    @Column({length:500})
    imgUrl : string;

    @Column()
    likeOne : number;

    @OneToMany((type)=> FavoriteEntity,(favoriteEntity)=>favoriteEntity.alcho)
    favoriteEntitys : FavoriteEntity[];

}