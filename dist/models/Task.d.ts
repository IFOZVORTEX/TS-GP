import Task from "../types/task.types";
import { TaskCreateInput } from "../types/task.types";
export declare class TaskManager {
    private store;
    constructor();
    createTask(task: TaskCreateInput): Task;
    getTasks(id?: string): Task[] | undefined;
    updateTask(id: string, updates: Partial<Task>): Task | undefined;
    deleteTask(id: string): boolean;
}
export default TaskManager;
//# sourceMappingURL=Task.d.ts.map