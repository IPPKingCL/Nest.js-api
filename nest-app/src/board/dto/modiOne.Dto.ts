import { IsNumber, IsString } from "class-validator";

export class modiOneDto{
    @IsString()
    id:string;

    @IsString()
    token: string;
}