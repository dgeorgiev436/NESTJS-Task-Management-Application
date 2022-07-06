// Only allow one of 3 options in the status property of our task interface
export interface Task {
	id: string;
	title: string;
	description: string;
	status: TaskStatus;
}

// TS status enumeration
enum TaskStatus {
	OPEN = "OPEN",
	IN_PROGRESS = "IN_PROGRESS",
	DONE = "DONE"
}