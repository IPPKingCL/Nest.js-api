import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CommentEntity } from "./comment.entity";
import { UserEntity } from "./user.entity";

@Entity('commentRecommend')
export class CommentRecommendEntity{
    @PrimaryGeneratedColumn('increment')
    id : number;

    @ManyToOne((type)=>CommentEntity, (commentEntity)=>commentEntity.commentRecommendEntitys)
    comment : CommentEntity;

    @ManyToOne((type)=>UserEntity, (userEntity)=> userEntity.commentRecommendEntitys)
    user : UserEntity;
}