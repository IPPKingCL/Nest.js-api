import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardEntity } from "./board.entity";
import { UserEntity } from "./user.entity";

@Entity('boardRecommand')
export class BoardRecommandEntity{
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column()
    date : Date;

    @Column()
    isDeleted : Boolean;

    @ManyToOne((type)=>UserEntity, (userEntity) => userEntity.boardRecommandEntitys)
    user : UserEntity;

    @ManyToOne((type)=>BoardEntity, (boardEntity) => boardEntity.boardRecommandEntitys)
    board : BoardEntity;
}