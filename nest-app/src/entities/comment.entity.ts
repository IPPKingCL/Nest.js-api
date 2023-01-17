import { UserEntity } from "src/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";
import { BoardEntity } from "./board.entity";
import { CommentRecommendEntity } from "./commentRecommend.entity";

@Entity('comment')
export class CommentEntity{

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

    @Column()
    isModified : Boolean;

    @ManyToOne((type) => BoardEntity,(boardEntity)=>boardEntity.commentEntitys)
    board : BoardEntity;

    @ManyToOne((type)=>UserEntity, (userEntitiy)=>userEntitiy.commentEntitiys)
    user : UserEntity;

    @OneToMany((type)=>CommentRecommendEntity, (commentRecommendEntity)=>commentRecommendEntity.user)
    commentRecommendEntitys : CommentRecommendEntity[];
}