import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FaceChatEntity } from "./faceChat.entity";

@Entity('faceChatMem')
export class FaceChatMemEntity{
    @PrimaryGeneratedColumn('increment')
    id : number

    @ManyToOne((type) => FaceChatEntity,(faceChatEntity)=>faceChatEntity.faceChatMemEntitys)
    faceChat : FaceChatEntity;
}