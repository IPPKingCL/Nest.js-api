import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('img')
export class ImgEntity{
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column({length:10})
    boardType : string;

    @Column()
    boardId : number;

    @Column({length:200})
    imgUrl : string;
}