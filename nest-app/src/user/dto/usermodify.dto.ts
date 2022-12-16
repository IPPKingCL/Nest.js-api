import { stringList } from "aws-sdk/clients/datapipeline";
import { IsArray, IsNumber, IsString } from "class-validator";

export class UserModifyDto{

    @IsString()
    readonly age : string;

    @IsString()
    readonly birth : string;

    @IsString()
    readonly nickname : string;

    @IsString()
    readonly sex : string;

    @IsString()
    readonly job : string;

    @IsString()
    readonly price : string;

    @IsString()
    readonly password : string;

    @IsArray()
    readonly favorite : number[];
}