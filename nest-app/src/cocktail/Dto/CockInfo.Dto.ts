import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CockInfoDto{
    @IsNumber()
    id:number;

    @IsString()
    name :string;
    
    @IsNumber()
    dosu:number;

    @IsNumber()
    likeOne:number;

    @IsBoolean()
    only:boolean;

    @IsString()
    imgUrl:string;
}