import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;

  //   // 		Create a copy of current tasks
  //   let tasks = this.getAllTasks();

  //   // 		Do something with status
  //   if (status) {
  //     // 			Leave the tasks with the given status
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   // 		Do something with search
  //   // 		Check if search exists in task title or task description
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }

  //   // 		Return final result
  //   return tasks;
  // }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   // 		Destructuring the createTaskDto
  //   const { title, description } = createTaskDto;

  //   const newTask: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(newTask);

  //   return newTask;
  // }

  // getTaskById(id: string): Task {
  //   // 		Look for a task
  //   const foundTask = this.tasks.find((task) => task.id === id);

  //   // 		if task is not found
  //   if (!foundTask) {
  //     // 			Throw an nestjs exception error
  //     throw new NotFoundException(`Task with ID ${id} not found`);
  //   }

  //   return foundTask;
  // }

  // deleteTaskById(id: string): void {
  //   const foundTask = this.getTaskById(id);

  //   this.tasks = this.tasks.filter((task) => task.id !== foundTask.id);
  // }

  // updateTaskStatusById(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);

  //   task.status = status;

  //   return task;
  // }
}
