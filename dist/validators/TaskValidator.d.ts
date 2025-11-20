import { ValidationStrategy } from "./strategies/ValidationStrategy";
export declare class TaskValidator {
    private strategies;
    addRule(field: string, strategy: ValidationStrategy): TaskValidator;
    validate(data: Record<string, any>): {
        valid: boolean;
        errors: Record<string, string[]>;
    };
    validateField(field: string, value: any): {
        valid: boolean;
        errors: string[];
    };
}
//# sourceMappingURL=TaskValidator.d.ts.map