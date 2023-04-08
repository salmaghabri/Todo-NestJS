import { BadRequestException, Injectable } from '@nestjs/common';
import { Controller,Get,Post,Delete, Body, Req, Param, Patch } from '@nestjs/common';
import { TodoModel} from './model/TodoModel.model';
import { Todo } from './entity/ToDo.entity' ;
import { TodoDto } from './dto/ToDoDto.dto';
import { UpdateTodoDto } from './dto/UpdateTodoDto';
import { StatusEnum } from './StatusEnum';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { FilterTodoDto } from './dto/FilterTodoDto.dto';

@Injectable()
export class TodoService {
    paginatedGetAll(n: number, nTodos: number) {
        return this.todoRepository.find(
            {
                skip: (n-1)*nTodos,
                take: nTodos
            }
        )
    }
    async filter2(filterDto: FilterTodoDto) {
        return await this.todoRepository.find(
            {
                where:[ {
                    
                    name: Like(`%${filterDto.nameOrDescription}%`),
                },
                {
                    
                    description: Like(`%${filterDto.nameOrDescription}%`),
                },
                {
                    status: filterDto.status
                }
            
            ]

            }
        )

        
    }
   async  filter(filterDto: FilterTodoDto) {
    if (! filterDto.nameOrDescription) filterDto.nameOrDescription=''; // to not serach nameOrDescription == undefined
        return await this.todoRepository.find(
            {
                where:[ {
                    
                    name: Like(`%${filterDto.nameOrDescription}%`),
                    status: filterDto.status
                },
                {
                    
                    description: Like(`%${filterDto.nameOrDescription}%`),
                    status: filterDto.status
                }
            
            ]

            }
        )

        
    }
   async enumCount() {
    const waitingCount = await this.todoRepository.count({
        where: {
            status: In([StatusEnum.waiting])
        }
    });
    const actifCount = await this.todoRepository.count({
        where: {
            status: In([StatusEnum.actif])
        }
    });
    const doneCount = await this.todoRepository.count({
        where: {
            status: In([StatusEnum.done])
        }
    });



        return {
            "waitingCount" : waitingCount,
            "actifCount" : actifCount,
            "doneCount" : doneCount

        }
    }
   
   
   
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>,
      ) {}
    private todos: TodoModel[]=[]; 
// model todo
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
        this.todos.push( new TodoModel(todoDto.name, todoDto.description));
        

    }


    // entity todo
    async create(todo:Todo){
         
        return await this.todoRepository.save(todo);
    }
    async update(idd: string, updateTodoDto: UpdateTodoDto){
        const PartialTodo={
            id: idd,
            ...updateTodoDto
        }
        const todo = await this.todoRepository.preload(PartialTodo)

        return await this.todoRepository.save(todo);
         
    }
    async read(){
        
        return await this.todoRepository.find();
         
    }
    async delete(id: string){
        const todo = await this.todoRepository.preload({id: id})
        return await this.todoRepository.remove(todo)
    }
    async softDelete(id: any) {
        return await this.todoRepository.softDelete(id)
        
    }
    async restore(id: string) {
        return await this.todoRepository.restore(id)
    }
    async readById(id: string) {
        return await this.todoRepository.findOneBy({ id:id })
    }

   

    
}
