/* eslint-disable prettier/prettier */
import { v4 as uuidv4 } from 'uuid';
import { Inject } from "@nestjs/common";
import { StatusEnum } from "../StatusEnum";

export class TodoModel{

    id: string;
    name: string;
    description: string; 
    date: Date; 
   status: StatusEnum;
   @Inject('UUID') uuid: () => string;

   constructor(name: string, description: string) {
    // this.id=this.uuid();
    this.id= uuidv4();
    this.name = name;
    this.description = description;
    this.date= new Date(); 
    this.status=StatusEnum.waiting;
  }

}