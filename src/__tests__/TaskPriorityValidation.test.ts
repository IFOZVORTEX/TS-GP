import { describe, it, expect } from "vitest";
import { TaskPriorityValidation } from "../validators/strategies/TaskPriorityValidation";

describe("TaskPriorityValidation", () => {
  const validator = new TaskPriorityValidation();

  it("should accept valid priorities", () => {
    expect(validator.validate("not important")).toBe(true);
    expect(validator.validate("normal")).toBe(true);
    expect(validator.validate("very important")).toBe(true);
  });

  it("should reject invalid priorities", () => {
    expect(validator.validate("urgent")).toBe(false);
    // @ts-ignore - allow wrong type
    expect(validator.validate(undefined)).toBe(false);
  });
});
