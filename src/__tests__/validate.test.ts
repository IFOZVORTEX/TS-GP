import { describe, it, expect } from "vitest";
import { validate } from "../decorators/validate";

describe("validate decorator", () => {
  class Dummy {
    @validate
    createTask(task: any) {
      return "created";
    }

    @validate
    updateTask(task: any) {
      return "updated";
    }

    @validate
    deleteTask(id: string) {
      return true;
    }
  }

  const d = new Dummy();

  it("throws when name missing on createTask", () => {
    expect(() => d.createTask({ priority: "normal" })).toThrow(
      "Le nom est obligatoire et doit être une chaîne",
    );
  });

  it("throws when name too short on createTask", () => {
    expect(() => d.createTask({ name: "a", priority: "normal" })).toThrow(
      /Le nom doit contenir entre 2 et 100 caractères/,
    );
  });

  it("throws when priority invalid on createTask", () => {
    expect(() =>
      // @ts-ignore
      d.createTask({ name: "Valid name", priority: "urgent" }),
    ).toThrow(/La priorité doit être:/);
  });

  it("accepts valid createTask", () => {
    const res = d.createTask({ name: "Task", priority: "normal" });
    expect(res).toBe("created");
  });

  it("throws when name missing on updateTask", () => {
    expect(() => d.updateTask({ priority: "normal" })).toThrow();
  });

  it("accepts valid updateTask", () => {
    const res = d.updateTask({ name: "Task", priority: "normal" });
    expect(res).toBe("updated");
  });

  it("throws on invalid id for deleteTask", () => {
    // empty string
    expect(() => d.deleteTask("")).toThrow(/ID invalide/);
    // @ts-ignore undefined
    expect(() => d.deleteTask(undefined)).toThrow(/ID invalide/);
  });

  it("accepts valid id for deleteTask", () => {
    expect(d.deleteTask("abc123")).toBe(true);
  });
});
