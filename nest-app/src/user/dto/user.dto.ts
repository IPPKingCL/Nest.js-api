import { IsDate, IsNumber, IsString } from "class-validator";

export class UserDto {
    
    readonly id:number;
    @IsString()
    readonly name:string;

    @IsNumber()
    readonly age:number;

    @IsDate()
    readonly birth : Date;

    @IsString()
    readonly sex : String;

    @IsString()
    readonly nickname : String;

    @IsString()
    readonly userId : String;

    @IsString()
    readonly password : String;

    @IsString()
    readonly email : String;

    @IsString()
    readonly job : String;
}
