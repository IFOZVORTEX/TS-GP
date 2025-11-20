"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskValidator = void 0;
class TaskValidator {
    constructor() {
        this.strategies = new Map();
    }
    addRule(field, strategy) {
        var _a;
        if (!this.strategies.has(field)) {
            this.strategies.set(field, []);
        }
        (_a = this.strategies.get(field)) === null || _a === void 0 ? void 0 : _a.push(strategy);
        return this; // Permet le chaînage
    }
    validate(data) {
        const errors = {};
        for (const [field, strategies] of this.strategies.entries()) {
            const fieldErrors = [];
            const value = data[field];
            for (const strategy of strategies) {
                if (!strategy.validate(value)) {
                    fieldErrors.push(strategy.getErrorMessage());
                }
            }
            if (fieldErrors.length > 0) {
                errors[field] = fieldErrors;
            }
        }
        return {
            valid: Object.keys(errors).length === 0,
            errors,
        };
    }
    validateField(field, value) {
        const strategies = this.strategies.get(field) || [];
        const errors = [];
        for (const strategy of strategies) {
            if (!strategy.validate(value)) {
                errors.push(strategy.getErrorMessage());
            }
        }
        return {
            valid: errors.length === 0,
            errors,
        };
    }
}
exports.TaskValidator = TaskValidator;
//# sourceMappingURL=TaskValidator.js.map