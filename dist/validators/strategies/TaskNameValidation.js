"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskNameValidation = void 0;
class TaskNameValidation {
    constructor() {
        this.minLength = 2;
        this.maxLength = 100;
    }
    validate(name) {
        if (!name || typeof name !== "string")
            return false;
        const trimmed = name.trim();
        if (this.minLength <= trimmed.length && trimmed.length <= this.maxLength) {
            return true;
        }
        else {
            return false;
        }
    }
    getErrorMessage() {
        return `Le nom doit contenir entre ${this.minLength} et ${this.maxLength} caractères`;
    }
}
exports.TaskNameValidation = TaskNameValidation;
//# sourceMappingURL=TaskNameValidation.js.map