import { IsString, IsNumber } from "class-validator";
//실시간으로 코드의 유효성을 검사 가능
import { PartialType } from "@nestjs/mapped-types";
//해당 dto의 타입을 가져오지만 꼭 필수는 아니게 함 ? 기능 지원
import { CreateMovieDto } from "./create-movie.dto";
export class UpdateMovieDto extends PartialType(CreateMovieDto){
    
}