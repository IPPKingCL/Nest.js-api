import { IsArray, IsNumber, IsString } from "class-validator";
import { InsertAlchoDto } from "src/admin/dto/insertAlcho.Dto";

export class InsertSelfDto{
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

    @IsString()
    comment : string;
}