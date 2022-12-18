import {IsString } from "class-validator";

export class UserEmailDto {
    
    @IsString()
    readonly email : String;

    @IsString()
    readonly password : String;

}
