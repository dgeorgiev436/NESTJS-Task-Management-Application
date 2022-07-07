import { Injectable } from '@nestjs/common';
import {Task, TaskStatus} from "./task.model"
import {v4 as uuid} from "uuid"
import {CreateTaskDto} from "./dto/create-task.dto"
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto"

@Injectable()
export class TasksService {
	private tasks: Task[] = [];
	
	
	getAllTasks(): Task[] {
		return this.tasks
	}
	
	getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
		const {status, search} = filterDto;
		
// 		Create a copy of current tasks
		let tasks = this.getAllTasks();
		
// 		Do something with status
		if(status){
// 			Leave the tasks with the given status
			tasks = tasks.filter(task => task.status === status)
		}
		
// 		Do something with search
// 		Check if search exists in task title or task description
		if(search){
			tasks = tasks.filter(task => {
				if(task.title.includes(search) || task.description.includes(search)){
					return true;
				}
				return false;
			})
		}
		
// 		Return final result
		return tasks;
		
		
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
