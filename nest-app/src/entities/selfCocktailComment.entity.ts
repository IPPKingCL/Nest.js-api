import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SelfCocktailEntity } from "./selfCocktail.entity";
import { UserEntity } from "./user.entity";

@Entity('selfCocktailComment')
export class SelfCocktailCommentEntity{
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

    @ManyToOne((type) => SelfCocktailEntity,(selfCocktailEntity) =>selfCocktailEntity.selfCocktailCommentEntitys)
    selfCocktail : SelfCocktailEntity;

    @ManyToOne((type) => UserEntity, userEntity => userEntity.selfCocktailCommentEntitys)
    user : UserEntity;
}