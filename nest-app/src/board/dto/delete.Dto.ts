import { IsNumber, IsString } from "class-validator";

export class deleteDto{
    @IsString()
    id:string;

    @IsNumber()
    userId:number;

    @IsString()
    token:string;
}