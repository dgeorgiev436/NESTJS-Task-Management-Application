import { IsNotEmpty } from 'class-validator';

// Data Transfer Object for creating new task parameters
export class CreateTaskDto {
	@IsNotEmpty()
	title: string;
	
	@IsNotEmpty()
	description: string;
}