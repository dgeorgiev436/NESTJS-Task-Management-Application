import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { User } from "src/auth/user.entity"

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
	
// 	Ensure only tasks made by the currently logged in user are returned
	query.where({user});

    if (status) {
      // :status is custom argument in the query
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      // Search in title and description for search term
      //   LOWER converts the property to lower caseF
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        // Wrapped in Percentage sign allows us to look for independent parts of the search term
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  // Create a task function
  // Moved in the tasks.repository to make the service file smaller
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
	  user
    });

    await this.save(task);

    return task;
  }
}
