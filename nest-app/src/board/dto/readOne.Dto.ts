import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class readOneDto{
    readonly id:bigint;

    @IsString()
    title:string;

    @IsString()
    contents:string;

    @IsDate()
    dateTime:Date;

    @IsString()
    boardType:string;

    @IsBoolean()
    isDeleted:Boolean;

    @IsBoolean()
    isModified:Boolean;

    @IsNumber()
    userId:bigint;

    @IsString()
    nickname:string;

    @IsNumber()
    recommend:number;
}