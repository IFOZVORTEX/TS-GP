import { ValidationStrategy } from "./ValidationStrategy";

export class TaskNameValidation implements ValidationStrategy {
  private minLength = 2;
  private maxLength = 100;

  validate(name: string): boolean {
    if (!name || typeof name !== "string") return false;
    const trimmed = name.trim();
    if (this.minLength <= trimmed.length && trimmed.length <= this.maxLength) {
      return true;
    } else {
      return false;
    }
  }

  getErrorMessage(): string {
    return `Le nom doit contenir entre ${this.minLength} et ${this.maxLength} caractères`;
  }
}
