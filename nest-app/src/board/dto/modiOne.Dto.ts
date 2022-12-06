import { IsNumber, IsString } from "class-validator";

export class modiOneDto{
    @IsNumber()
    id:number;

    @IsString()
    token: string
}