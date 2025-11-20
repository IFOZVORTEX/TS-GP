export type TaskCreateInput = Omit<Task, "id" | "created_at" | "completed">;
export type TaskPriority = "not important" | "normal" | "very important";
interface Task {
    id: string;
    name: string;
    description?: string;
    priority: TaskPriority;
    completed: boolean;
    created_at: Date;
}
export default Task;
//# sourceMappingURL=task.types.d.ts.map