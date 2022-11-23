import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class modifyDto{
    @IsNumber()
    readonly id:number;

    @IsString()
    readonly title:string;

    @IsString()
    readonly contents:string;

    /*@IsDate()
    readonly dateTime:Date;

    @IsBoolean()
    readonly isDeleted:boolean;

    @IsBoolean()
    readonly isModified:boolean;
*/
    @IsNumber()
    readonly userId:number;

    @IsString()
    readonly boardType:string;
}