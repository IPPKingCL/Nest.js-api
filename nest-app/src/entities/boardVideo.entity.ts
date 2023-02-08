import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardEntity } from "./board.entity";

@Entity('boardVideo')
export class BoardVideoEntity{
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column({length:500})
    videoUrl : string;

    @ManyToOne((type)=> BoardEntity,(boardEntity)=>boardEntity.boardVideoEntitys)
    board : BoardEntity;
}