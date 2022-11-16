import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
enum STATUS{
    ALCOHOL = "A",
    FREE ="F"
}
@Entity('board')
export class BoardEntity {

    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column({length : 50})
    title : string;

    @Column({length : 10000})
    contents : string;

    @Column()
    dateTime : Date;
    
    @Column({ type:'enum' ,enum:"STATUS"})
    boardType :string; 

    @Column()
    isDeleted : Boolean;

    @Column()
    isModified : Boolean;
}