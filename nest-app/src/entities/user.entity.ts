import { BoardEntity } from 'src/entities/board.entity';
import { CommentEntity } from 'src/entities/comment.entity';
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { userStatus } from '../user/enumType/userStatus';
import { AlchoCommentEntity } from './alchoComment.entity';
import { BoardRecommandEntity } from './boardRecommand.entity';
import { CocktailCommentEntity } from './cocktailComment.entity';
import { CommentRecommendEntity } from './commentRecommend.entity';
import { FavoriteEntity, } from './favoritList.entity';
import { RatingEntity } from './rating.entity';
import { SelfCocktailEntity } from './selfCocktail.entity';
import { FaceChatMemEntity } from './faceChatMem.entity';
import { FaceChatEntity } from './faceChat.entity';

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column({length :30})
    name : string;

    @Column()
    age : number;

    @Column()
    birth : Date;

    @Column({length : 10})
    sex : string; 

    @Column({length:30})
    nickname : string;

    @Column({length :30})
    userId : string;

    @Column({length:100})
    password : string;

    @Column({length:40})
    email : string;

    @Column({length:20})
    job : string;

    @Column({type :'enum', enum:userStatus})
    userLoginType : userStatus;

    @Column()
    price : string;

    @Column()
    img : string;

    @OneToMany((type)=>BoardEntity, (boardEntity)=> boardEntity.user)
    boardEntitys : BoardEntity[];

    @OneToMany((type)=>CommentEntity, (commentEntity)=> commentEntity.user)
    commentEntitiys : CommentEntity[];

    @OneToMany((type)=>FavoriteEntity,(favoriteEntity)=>favoriteEntity.user)
    favoriteEntitys : FavoriteEntity[];

    @OneToMany((type)=>AlchoCommentEntity,(alchoCommentEntity)=> alchoCommentEntity.user)
    alchoCommentEntitys : AlchoCommentEntity[];

    @OneToMany((type)=>RatingEntity,(ratingEntity)=> ratingEntity.user)
    ratingEntitys : RatingEntity[];

    @OneToMany((type) => BoardRecommandEntity,(boardRecommandEntity) => boardRecommandEntity.user)
    boardRecommandEntitys : BoardRecommandEntity[];

    @OneToMany((type)=>CocktailCommentEntity, (cocktailCommentEntity)=>cocktailCommentEntity.user)
    cocktailCommentEntitys : CocktailCommentEntity[];

    @OneToMany((type) => CommentRecommendEntity,(commentRecommendEntity)=>commentRecommendEntity.user)
    commentRecommendEntitys : CommentRecommendEntity[];

    @OneToMany((type) => SelfCocktailEntity,(selfCocktailEntity) => selfCocktailEntity.user)
    selfCocktailEntitys : SelfCocktailEntity[];

    @OneToMany((type) => FaceChatMemEntity,(faceChatMemEntity)=>faceChatMemEntity.user)
    faceChatMemEntitys : FaceChatMemEntity[];

    @OneToMany((type) => FaceChatEntity,(faceChatEntity)=>faceChatEntity.user)
    faceChatEntitys : FaceChatEntity[];
       
}