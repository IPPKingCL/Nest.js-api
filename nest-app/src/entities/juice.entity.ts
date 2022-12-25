import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Juice')
export class JuiceEntity{
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column({length:50})
    name : string;

    @Column()
    type : number;
}