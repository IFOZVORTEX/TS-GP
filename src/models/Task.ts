import { DataStore } from "../storage/DataStore";
import Task from "../types/task.types";
import { TaskCreateInput } from "../types/task.types";
import { randomUUID } from "crypto";
import { validate } from "../decorators/validate";
import { timestamp } from "../decorators/timestamp";

export class TaskManager {
  private store: DataStore<Task>;

  constructor() {
    this.store = new DataStore<Task>("tasks");
  }

  @validate
  @timestamp
  createTask(task: TaskCreateInput): Task {
    const newTask: Task = {
      id: randomUUID(),
      name: task.name,
      description: task.description || "",
      priority: task.priority,
      completed: false,
      created_at: new Date(),
    };

    return this.store.create(newTask);
  }

  @validate
  @timestamp
  getTasks(id?: string): Task[] | undefined {
    if (id) {
      return this.store.find(id) as Task[];
    } else {
      return this.store.find() as Task[];
    }
  }

  @validate
  @timestamp
  updateTask(id: string, updates: Partial<Task>): Task | undefined {
    return this.store.update(id, updates);
  }

  @validate
  @timestamp
  deleteTask(id: string): boolean {
    return this.store.delete(id);
  }
}

export default TaskManager;
