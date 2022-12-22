import { IsNumber, IsString } from "class-validator";

export class AlchoCommentDto{
    @IsString()
    content : string;

    @IsNumber()
    alchoId : number;
}