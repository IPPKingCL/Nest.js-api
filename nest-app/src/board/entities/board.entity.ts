import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
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

    @ManyToOne((type) => UserEntity,(userEntity)=>userEntity.boardEntitys)
    user : UserEntity;
}