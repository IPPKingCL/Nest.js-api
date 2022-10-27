import { IsString, IsNumber } from "class-validator";
//실시간으로 코드의 유효성을 검사 가능
export class CreateMovieDto{
    @IsString() 
    readonly title :string;
    @IsNumber()
    readonly year : number;
    @IsString({each : true})
    readonly genres:string[];
}