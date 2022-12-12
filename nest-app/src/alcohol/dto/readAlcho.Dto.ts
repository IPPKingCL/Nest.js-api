import { IsNumber, IsString } from "class-validator";

export class readAlchoDto{
    @IsNumber()
    id:bigint;

    @IsString()
    name : string;

    @IsString()
    category:string;

    @IsNumber()
    sugar:number;

    @IsString()
    color:string;

    @IsNumber()
    dosu : number;

    @IsNumber()
    price : number;

    @IsString()
    imgUrl:string;

}