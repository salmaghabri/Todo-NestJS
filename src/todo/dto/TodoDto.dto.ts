import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class TodoDto{
    @MinLength(3,{ message: "nom min 3 !"})
    @MaxLength(10, { message:"nom max 10 !"})
    name: string;
    @IsNotEmpty({ message:"description obligatoire"}) //ceci avant
    @MinLength(10, {message:"min 10 !"})
    description: string; 
   
}