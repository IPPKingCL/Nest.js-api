import { IsArray, IsNumber, IsString } from "class-validator";
import { InsertAlchoDto } from "./insertAlcho.Dto";

export class InsertCocktailDto{
    @IsString()
    name:string;

    @IsString()
    imgUrl:string;

    @IsNumber()
    dosu : number;

    @IsArray()
    alcho :  InsertAlchoDto[];

    @IsArray()
    juice : InsertAlchoDto[];
}