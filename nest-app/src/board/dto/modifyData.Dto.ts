import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class modifyDto{
    @IsString()
    readonly id:number;

    @IsString()
    readonly title:string;

    @IsString()
    readonly contents:string;

    @IsNumber()
    readonly userId : number;

    /*@IsDate()
    readonly dateTime:Date;

    @IsBoolean()
    readonly isDeleted:boolean;

    @IsBoolean()
    readonly isModified:boolean;
*/
    @IsString()
    readonly boardType:string;

}