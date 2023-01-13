import { IsBoolean, IsNumber } from "class-validator";

export class InsertAlchoDto{
 
    @IsNumber()
    name: number;

    @IsNumber()
    amount:number;

    @IsNumber()
    unit : number;

    @IsBoolean()
    only:boolean;

}