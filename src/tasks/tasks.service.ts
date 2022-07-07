import { Injectable } from '@nestjs/common';
import {Task, TaskStatus} from "./task.model"
import {v4 as uuid} from "uuid"
import {CreateTaskDto} from "./dto/create-task.dto"

@Injectable()
export class TasksService {
	private tasks: Task[] = [];
	
	
	getAllTasks(): Task[] {
		return this.tasks
	}
	
	createTask(createTaskDto: CreateTaskDto): Task {
// 		Destructuring the createTaskDto
		const {title, description} = createTaskDto;
		
		const newTask: Task = {
			id: uuid(),
			title,
			description,
			status: TaskStatus.OPEN
		}
		
		this.tasks.push(newTask);
		
		return newTask;
	}
	
	getTaskById(id: string): Task {
		
		const task = this.tasks.find(task => task.id === id);
		
		return task;
	}
	
	deleteTaskById(id: string): void {
		
		const taskIndex = this.tasks.findIndex(task => task.id === id);
		
		this.tasks.splice(taskIndex, 1);
	}
	
	updateTaskStatusById(id: string, status: TaskStatus): Task {
		const task = this.getTaskById(id);
		
		task.status = status;
		
		return task;
	}
}
