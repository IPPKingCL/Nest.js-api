import { FavoriteEntity,  } from "src/entities/favoritList.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AlchoCategoryEntity } from "./alchoCategory.entity";
import { AlchoCommentEntity } from "./alchoComment.entity";
import { AlchoRecipeEntity } from "./alchoRecipe.entity";
import { CocktailEntity } from "./cocktail.entity";
import { SelfAlchoRecipeEntity } from "./selfAlchoRecipe.Entity";

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

    @OneToMany((type)=> AlchoCommentEntity,(alchoCommentEntity)=>alchoCommentEntity.alcho)
    alchoCommentEntitys : AlchoCommentEntity[];

    @OneToMany((type) => AlchoRecipeEntity,(alchoRecipeEntity)=>alchoRecipeEntity.alcho)
    alchoRecipeEntitys : AlchoRecipeEntity[];

    @ManyToOne((type) => AlchoCategoryEntity,(alchoCategoryEntity)=>alchoCategoryEntity.alcho)
    alchoCategory : AlchoCategoryEntity;

    @OneToMany((type)=> SelfAlchoRecipeEntity,(selfAlchoRecipeEntity)=>selfAlchoRecipeEntity.alcho)
    selfAlchoRecipeEntitys : SelfAlchoRecipeEntity[];
}