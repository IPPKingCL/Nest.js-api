import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ColumnMetadata } from "typeorm/metadata/ColumnMetadata";

@Entity('data')
export class dataEntity{

    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column()
    user : number;

    @Column()
    product : number;

    @Column()
    rating : number;

    @Column()
    time : number;

}