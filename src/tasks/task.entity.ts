import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task.model";

// Use the Entity decorator to tell typeorm that this is a database entity
@Entity()
export class Task {
    // The decorator below automatically generates the ID and treats it as a primary key.
    //  By passing uuid in it we tell it to use the uuid library for generating ids
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    // The column decorator tells typeorm that the property is a database column and not just a class property
    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;
}