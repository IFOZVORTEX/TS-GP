import { ValidationStrategy } from "./ValidationStrategy";
import { TaskPriority } from "../../types/task.types";

export class TaskPriorityValidation implements ValidationStrategy {
  private validPriorities: TaskPriority[] = [
    "not important",
    "normal",
    "very important",
  ];

  validate(priority: string): boolean {
    return this.validPriorities.includes(priority as TaskPriority);
  }

  getErrorMessage(): string {
    return `La priorité doit être: ${this.validPriorities.join(", ")}`;
  }
}
