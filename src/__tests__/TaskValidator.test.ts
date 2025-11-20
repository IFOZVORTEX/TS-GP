import { describe, it, expect } from "vitest";
import { TaskValidator } from "../validators/TaskValidator";
import { TaskNameValidation } from "../validators/strategies/TaskNameValidation";
import { TaskPriorityValidation } from "../validators/strategies/TaskPriorityValidation";

describe("TaskValidator", () => {
  const validator = new TaskValidator();
  validator.addRule("name", new TaskNameValidation());
  validator.addRule("priority", new TaskPriorityValidation());

  it("validates a correct task", () => {
    const result = validator.validate({ name: "Do homework", priority: "normal" });
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("reports errors for invalid fields", () => {
    const result = validator.validate({ name: "", priority: "urgent" });
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveProperty("name");
    expect(result.errors).toHaveProperty("priority");
  });

  it("validateField works for single field", () => {
    const ok = validator.validateField("name", "abc");
    expect(ok.valid).toBe(true);

    const bad = validator.validateField("name", "");
    expect(bad.valid).toBe(false);
    expect(bad.errors.length).toBeGreaterThan(0);
  });
});
