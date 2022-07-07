import { Param, Body, Controller, Get, Post, Patch, Delete } from '@nestjs/common';
import {TasksService} from "./tasks.service"
import {Task, TaskStatus} from "./task.model"
import {CreateTaskDto} from "./dto/create-task.dto"

@Controller('tasks')
export class TasksController {
	constructor(private tasksService: TasksService){}
	
	@Get()
	getAllTasks(): Task[] {
		return this.tasksService.getAllTasks()
	}
	
	@Post()
	// 	Decorate each property and find it within the request body
	createTask(@Body() createTaskDto: CreateTaskDto): Task {
		return this.tasksService.createTask(createTaskDto);
	}
	
	@Get("/:id")
	getTaskById(@Param("id") id: string): Task {
		return this.tasksService.getTaskById(id);
	}
	
	@Delete("/:id")
	deleteTaskById(@Param("id") id: string): void {
		return this.tasksService.deleteTaskById(id);
	}
	
	@Patch("/:id/status")
	updateTaskStatusById(@Param("id") id: string, @Body("status") status: TaskStatus): Task {
		return this.tasksService.updateTaskStatusById(id, status)
	}
}
