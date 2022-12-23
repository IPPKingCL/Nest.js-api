import { IsNumber, IsString } from "class-validator";

export class AlchoCommentDto{
    @IsString()
    content : string;

    @IsString()
    alchoId : string;
}