import { IsDate, IsNumber, IsString } from "class-validator";

export class UserCreateDto {
    
    readonly id:number;
    @IsString()
    readonly name:string;

    @IsNumber()
    readonly age:number;

    @IsString()
    readonly birth : string;

    @IsString()
    readonly sex : string;

    @IsString()
    readonly nickname : string;

    @IsString()
    readonly userId : string;

    @IsString()
    readonly password : string;

    @IsString()
    readonly email : string;

    @IsString()
    readonly job : string;
}
