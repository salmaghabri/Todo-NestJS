import { BadRequestException, Injectable } from '@nestjs/common';
import { Controller,Get,Post,Delete, Body, Req, Param, Patch } from '@nestjs/common';
import { Todo } from './model/ToDo.model';
import { TodoDto } from './dto/ToDoDto.dto';
import { UpdateTodoDto } from './dto/UpdateTodoDto';
import { StatusEnum } from './StatusEnum';

@Injectable()
export class TodoService {
    private todos: Todo[]=[]; 
    updateTodo(params: string, updateTodoDto: UpdateTodoDto) {
        let todo=this.todos.filter((todo)=>todo.id.toString()===params); 
        if(todo.length==0) throw new BadRequestException();
        if (updateTodoDto.name) todo[0].name=updateTodoDto.name;
       if (updateTodoDto.description) todo[0].description=updateTodoDto.description;
       if (updateTodoDto.status)todo[0].status=StatusEnum[updateTodoDto.status];
    }
    deleteTodo(params: string) {
        let todo=this.todos.filter((todo)=>todo.id.toString()===params); 
        if(todo.length==0) throw new BadRequestException();
        this.todos=this.todos.filter(todo=>todo.id.toString()!==params);

    }
    getTodoById(params: string) {
        let todo=this.todos.filter((todo)=>todo.id.toString()===params); 
        if(todo.length==0) throw new BadRequestException();
        return todo[0]; 

        
    }
    getAll(){
        return this.todos;
    }
    addTodo(todoDto:TodoDto){
        this.todos.push( new Todo(todoDto.name, todoDto.description));
        

    }

    
}
