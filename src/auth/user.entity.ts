import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Task } from "../tasks/task.entity"

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;
	
	
// One to many relation -- One user --> Many tasks
// The OneToMany decorator takes 3 arguments. 
// 1st is the type and 2nd how do we access the user from the task table.
// 3rd argument when true ensures that when the user is fetched from the database all tasks are fetched aswell automatically.
	@OneToMany(_type => Task, task => task.user, {eager: true}) 
	tasks: Task[];
}