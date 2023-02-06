import { IsNumber, IsString } from "class-validator";

export class VideoDto{
    @IsNumber()
    boardId : number;

    @IsString()
    url : string;
}