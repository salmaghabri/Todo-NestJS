import { Controller,Get,Post,Delete, Body, Req,Query, Param, Patch, Put, Version,Headers} from '@nestjs/common';
import { TodoModel } from './model/TodoModel.model';
import { TodoDto } from './dto/ToDoDto.dto';
import { UpdateTodoDto } from './dto/UpdateTodoDto';
import { TodoService } from './todo.service';
import { Todo } from './entity/ToDo.entity';
import { FilterTodoDto } from './dto/FilterTodoDto.dto';

@Controller('todo')
export class TodoController {
    constructor( private todoService: TodoService){}
    // paginated readAll 
    @Get('all/:pageNumber')
    readAll(@Param('pageNumber') n){
        const nTodos=2; 
        return this.todoService.paginatedGetAll(n,nTodos);
    }
    // filtered search status and enum 
    @Get('filter')
    @Version('1')
    filter(@Query() query: FilterTodoDto){
        return this.todoService.filter(query);

    }
    @Get('filter')
    @Version('2')
    filter2(@Query() query: FilterTodoDto){
        return this.todoService.filter2(query);

    }

    // get count of each status
    @Get('enumcount')
    getEnumCount(){
        return(this.todoService.enumCount());

    }

// read 
    @Get()
    @Version('1')
    getToDos(){
        return(this.todoService.getAll());
    }
    @Get()
    @Version('2')
    read(){
        return(this.todoService.read());
    }
    // create
    @Post()
    @Version('1')
    addTodo(@Body() todoDto:TodoDto){
        this.todoService.addTodo(todoDto);
    }
    @Post()
    @Version('2')
    create(@Body() todo:Todo, @Req() req){
        console.log("req: " ,req)
        this.todoService.create(todo, req["userId"]);
    }

    //read by id
    @Get("/:id")
    @Version('1')
    getTodoById( @Param() params):TodoModel{
        
        return this.todoService.getTodoById(params.id); 
    }
    @Get("/:id")
    @Version('2')
    readById( @Param() params){
        
        return this.todoService.readById(params.id); 
    }


// delete and restore
    @Delete('delete/:id')
    @Version('1')
    deleteById(@Param() params){
        this.todoService.deleteTodo(params.id)

    }
    @Delete('delete/:id')
    @Version('2')
    delete(@Param() params, @Req() req){
        console.log("req: " ,req)
        this.todoService.delete(params.id,req["userId"])

    }
    @Delete("softdelete/:id")
    softDelete(@Param() params){
        this.todoService.softDelete(params.id)
    }
    @Get("restore/:id")
    restore(@Param() params){
        this.todoService.restore(params.id)
    }
    //update 

    @Patch('update/:id')
    @Version('1')
    updateTodo(@Param('id') id,@Body() updateTodoDto: UpdateTodoDto){
        this.todoService.updateTodo(id,updateTodoDto); 
    }
    @Patch('update/:id')
    @Version('2')
    update(@Param('id') id,@Body() updateTodoDto: UpdateTodoDto, @Req() req){
        console.log("req: " ,req)
        this.todoService.update(id,updateTodoDto,req["userId"]); 
    }
}
