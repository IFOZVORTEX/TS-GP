import { ValidationStrategy } from "./strategies/ValidationStrategy";

export class TaskValidator {
  private strategies: Map<string, ValidationStrategy[]> = new Map();

  addRule(field: string, strategy: ValidationStrategy): TaskValidator {
    if (!this.strategies.has(field)) {
      this.strategies.set(field, []);
    }
    this.strategies.get(field)?.push(strategy);
    return this; // Permet le chaînage
  }

  validate(data: Record<string, any>): {
    valid: boolean;
    errors: Record<string, string[]>;
  } {
    const errors: Record<string, string[]> = {};

    for (const [field, strategies] of this.strategies.entries()) {
      const fieldErrors: string[] = [];
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

  validateField(
    field: string,
    value: any,
  ): { valid: boolean; errors: string[] } {
    const strategies = this.strategies.get(field) || [];
    const errors: string[] = [];

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
