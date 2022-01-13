import { TasksService } from './tasks.service';
export declare class TaskController {
    private taskService;
    constructor(taskService: TasksService);
    checkDeposits(): void;
}
