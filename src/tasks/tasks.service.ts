import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { User } from "src/auth/user.entity"

@Injectable()
export class TasksService {
  // Dependency injection TasksRepository
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    // Use createTask function coming from the tasks.repository file
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async getTaskById(id, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: {id, user} });

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return found;
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async updateTaskStatusById(id: string, status: TaskStatus, user: User): Promise<Task> {
    // Find task
    const task = await this.getTaskById(id, user);
    // Update status
    task.status = status;
    // Save task
    await this.tasksRepository.save(task);
    // Return
    return task;
  }
}
