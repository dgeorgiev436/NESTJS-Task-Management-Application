import { Param, Body, Controller, Get, Post, Patch, Delete, Query } from '@nestjs/common';
import {TasksService} from "./tasks.service"
import {Task, TaskStatus} from "./task.model"
import {CreateTaskDto} from "./dto/create-task.dto"
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto"
import {UpdateTaskStatusDto} from "./dto/update-task-status.dto"

@Controller('tasks')
export class TasksController {
	constructor(private tasksService: TasksService){}
	
	@Get()
	getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
// 		Implementing simple filtering using Queries
// 		If filters are defined, call taskService.getTasksWithFilters
		if(Object.keys(filterDto).length){
			return this.tasksService.getTasksWithFilters(filterDto);
		}else{
		// 	Otherwise get all tasks
		return this.tasksService.getAllTasks()	
		}
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
	updateTaskStatusById(@Param("id") id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Task {
		const { status } = updateTaskStatusDto
		return this.tasksService.updateTaskStatusById(id, status)
	}
}
