import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class readOneDto{
    readonly id:number;

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
    userId:number;

    @IsString()
    nickname:string;

    @IsNumber()
    recommend:number;

    
    imgUrl:string|null;

    videoUrl : string|null;
}