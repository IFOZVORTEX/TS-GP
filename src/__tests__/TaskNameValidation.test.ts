import { describe, it, expect } from "vitest";
import { TaskNameValidation } from "../validators/strategies/TaskNameValidation";

describe("TaskNameValidation", () => {
  const validator = new TaskNameValidation();

  it("should validate a good name", () => {
    expect(validator.validate("Buy milk")).toBe(true);
  });

  it("should reject empty or non-string names", () => {
    expect(validator.validate("")).toBe(false);
    // @ts-ignore - intentional wrong type
    expect(validator.validate(undefined)).toBe(false);
  });

  it("should reject too short or too long names", () => {
    expect(validator.validate("a")).toBe(false);
    const long = "x".repeat(101);
    expect(validator.validate(long)).toBe(false);
  });
});
