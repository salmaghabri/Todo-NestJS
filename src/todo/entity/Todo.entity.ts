import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { StatusEnum } from '../StatusEnum';
@Entity()
export class Todo{
    @PrimaryGeneratedColumn("uuid")
id: string;
@Column()
name: string;
@Column()
description: string;
@Column({
    type: "enum",
    enum: StatusEnum,
    default: StatusEnum.waiting
    })
status: StatusEnum; 
@CreateDateColumn()
createdAt: Date;
@UpdateDateColumn()
updatedAt: Date;
@DeleteDateColumn()
deletedAt: Date;



}