import { Test } from "@nestjs/testing" // Import the NestJs testing package 
import { TasksService } from "./tasks.service"
import { TasksRepository } from "./tasks.repository"

// Create a mock of TasksRepository since we don't want to interact with the database in testing
const mockTasksRepository = () => ({
	getTasks: jest.fn()
})

// Mock user to be used in tests
const mockUser = {
	username: "Will",
	id: "randomId",
	password: "somePassword",
	tasks: []
}

describe("TasksService", () => {
	let tasksService: TasksService;
	let tasksRepository: jest.Mocked<TasksRepository>; 
	
// 	A function that executes before any time we testing
// 	It simulates a module
	beforeEach( async() => {
// 		Initialize a NestJs module with TasksService and TasksRepository
		const module = await Test.createTestingModule({
			providers: [
				TasksService,
				{provide: TasksRepository, useFactory: mockTasksRepository} // Tell NestJs to use the mockTasksRepository instead of TasksRepository
			],	
		}).compile(); //Compile the module
		
		tasksService = module.get(TasksService); // Assign TasksService to the tasksService variable
		tasksRepository = module.get(TasksRepository) // Assign TasksRepository to the tasksRepository veriable
	});
	
	describe("getTasks", () => {
		it("calls TasksRepository.getTasks and returns the result", async() => {
		
			tasksRepository.getTasks.mockResolvedValue("someValue"); // When calling getTasks this is the value we should get. MockResolvedValue is used due to the Promise return type
			const result = await tasksService.getTasks(null, mockUser) // Call tasksService.getTasks which will then call the repository getTasks
			expect(result).toEqual("someValue") // Define expected result 
		});
	});
});