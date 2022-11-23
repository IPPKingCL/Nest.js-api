import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class commentDto{
    readonly id : number;

    @IsString()
    contents : string;

    @IsString()
    nickname : string;

    @IsString()
    boardId : string;

    
}