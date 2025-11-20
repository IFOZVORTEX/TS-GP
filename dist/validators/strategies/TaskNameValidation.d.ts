import { ValidationStrategy } from "./ValidationStrategy";
export declare class TaskNameValidation implements ValidationStrategy {
    private minLength;
    private maxLength;
    validate(name: string): boolean;
    getErrorMessage(): string;
}
//# sourceMappingURL=TaskNameValidation.d.ts.map