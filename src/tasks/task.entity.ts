import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { User } from "src/auth/user.entity"

// Use the Entity decorator to tell typeorm that this is a database entity
// We are following the Data Mapper Pattern
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
	
// Many to one relation -- Many Tasks --> One user
// The ManyToOne decorator takes 3 arguments. 
// 1st is the type and 2nd how do we access the tasks from the user table.
	@ManyToOne(_type => User, user => user.tasks, { eager: false })
	user: User;
}