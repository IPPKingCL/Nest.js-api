import { IsDate, IsNumber, IsString } from "class-validator";
import { userStatus } from "../enumType/userStatus";

export class UserCreateDto {
    
    readonly id:number;
    @IsString()
    readonly name:string;

    @IsString()
    readonly age:string;

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

    @IsString()
    readonly LoginType : userStatus;
}
