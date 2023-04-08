import { IsOptional, IsEnum } from "class-validator";
import { StatusEnum } from "../StatusEnum";

export class FilterTodoDto{
    @IsOptional()
    nameOrDescription: string; 
    @IsOptional()
    @IsEnum(StatusEnum)
    status: StatusEnum
}