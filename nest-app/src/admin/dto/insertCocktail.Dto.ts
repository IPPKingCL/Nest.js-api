import { IsArray, IsString } from "class-validator";
import { InsertAlchoDto } from "./insertAlcho.Dto";

export class InsertCocktailDto{
    @IsString()
    name:string;

    @IsString()
    imgUrl:string;

    @IsArray()
    alcho :  InsertAlchoDto[];

    @IsArray()
    juice : InsertAlchoDto[];
}