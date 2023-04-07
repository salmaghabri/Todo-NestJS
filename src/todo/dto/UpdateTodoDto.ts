import { MinLength, MaxLength, IsNotEmpty, IsEnum, IsOptional } from "class-validator";
import { StatusEnum } from "../StatusEnum";
import { TodoDto } from "./ToDoDto.dto";
import { PartialType } from "@nestjs/mapped-types";
// extends PartialType(TodoDto)
export class UpdateTodoDto {
    @IsOptional()
    @MinLength(3,{ message: "nom min 3 !"})
    @MaxLength(10, { message:"nom max 10 !"})
    name: string;
    @IsOptional()
    @MinLength(10, {message:"min 10 !"})
    description: string; 
    @IsOptional()
    @IsEnum(StatusEnum)
   status:StatusEnum;
}


