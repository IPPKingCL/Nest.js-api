import { IsString, IsNumber,IsOptional } from "class-validator";
//실시간으로 코드의 유효성을 검사
export class CreateMovieDto{
    @IsString() 
    readonly title :string;
    @IsNumber()
    readonly year : number;
    @IsOptional()
    @IsString({each : true})
    readonly genres:string[];
}