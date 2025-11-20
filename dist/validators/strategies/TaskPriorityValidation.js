"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskPriorityValidation = void 0;
class TaskPriorityValidation {
    constructor() {
        this.validPriorities = [
            "not important",
            "normal",
            "very important",
        ];
    }
    validate(priority) {
        return this.validPriorities.includes(priority);
    }
    getErrorMessage() {
        return `La priorité doit être: ${this.validPriorities.join(", ")}`;
    }
}
exports.TaskPriorityValidation = TaskPriorityValidation;
//# sourceMappingURL=TaskPriorityValidation.js.map