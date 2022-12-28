import { IsNumber, IsString } from "class-validator";

export class AlchoCockDto{
    @IsNumber()
    id : number;

    @IsString()
    category : string;
}