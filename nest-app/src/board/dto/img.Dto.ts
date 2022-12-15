import { IsNumber, IsString } from "class-validator";

export class imgDto{
    @IsString()
    boardType:string;
    

    @IsNumber()
    boardId:number;

    @IsString()
    imgUrl:string;
}