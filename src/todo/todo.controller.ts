import { Controller,Get,Post,Delete, Body, Req, Param, Patch, Put } from '@nestjs/common';
import { Todo } from './model/ToDo.model';
import { TodoDto } from './dto/ToDoDto.dto';
import { UpdateTodoDto } from './dto/UpdateTodoDto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
    constructor( private todoService: TodoService){}

    @Get()
    getToDos(){
        return(this.todoService.getAll())
    }
    @Post()
    addTodo(@Body() todoDto:TodoDto){
        this.todoService.addTodo(todoDto)
    }
    @Get("/:id")
    getTodoById( @Param() params):Todo{
        
        return this.todoService.getTodoById(params.id); 


    }
    @Delete('delete/:id')
    deleteById(@Param() params){
        this.todoService.deleteTodo(params.id)

    }
    @Patch('update/:id')
    update(@Param('id') id,@Body() updateTodoDto: UpdateTodoDto){
        this.todoService.updateTodo(id,updateTodoDto); 
    }
}
