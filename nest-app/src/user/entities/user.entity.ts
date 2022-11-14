import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class userEntity{
    @PrimaryColumn()
    id : number;

    @Column({length : 30})
    name : string;

    @Column({length:10})
    age : number;

    @Column({length :30})
    birth : Date;

    @Column({length:10})
    sex : String;

    @Column({length:30})
    userId : String;

    @Column({length:30})
    password : String;

    @Column({length:30})
    Email : String;

    @Column({length:30})
    job : String;
    
}