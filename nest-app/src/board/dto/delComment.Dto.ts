import { IsNumber, IsString } from "class-validator";

export class delCommentDto{
    @IsNumber()
    id:number;

    @IsNumber()
    userId:number;

}