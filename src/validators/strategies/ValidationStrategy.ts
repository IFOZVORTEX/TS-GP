export interface ValidationStrategy {
  validate(value: any): boolean;
  getErrorMessage(): string;
}
