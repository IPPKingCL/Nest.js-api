import { IsNumber } from "class-validator";

export class delCommentDto{
    @IsNumber()
    id:number;

}