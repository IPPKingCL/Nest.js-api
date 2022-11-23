import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class commentDto{
    readonly id : number;

    @IsString()
    contents : string;

    @IsString()
    dateTime : Date;

    @IsString()
    nickname : string;

    @IsBoolean()
    isDeleted : boolean;

    @IsBoolean()
    isModified : boolean;

    @IsNumber()
    boardId : number;

    
}