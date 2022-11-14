import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {

    @PrimaryColumn()
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

    @Column({length:30})
    password : string;

    @Column({length:40})
    email : string;

    @Column({length:20})
    job : string;

}