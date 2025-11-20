import { describe, it, expect, afterAll } from "vitest";
import { DataStore } from "../storage/DataStore";
import fs from "fs";
import path from "path";

type SimpleItem = { id: string; name: string };

describe("DataStore", () => {
  const filename = "test_tasks_for_vitest";
  const store = new DataStore<SimpleItem>(filename);
  const dataFilePath = path.join(__dirname, "../data", `${filename}.json`);

  it("starts empty (array) and can create an item", () => {
    const all = store.find();
    expect(Array.isArray(all)).toBe(true);

    const created = store.create({ name: "sample" });
    expect(created).toHaveProperty("id");
    expect(created.name).toBe("sample");
  });

  it("can find by id, update and delete", () => {
    const created = store.create({ name: "to-update" });
    const found = store.find(created.id) as SimpleItem[];
    expect(found.length).toBeGreaterThanOrEqual(1);

    const updated = store.update(created.id, { name: "updated" });
    expect(updated).toBeDefined();
    expect(updated?.name).toBe("updated");

    const deleted = store.delete(created.id);
    expect(deleted).toBe(true);
  });

  afterAll(() => {
    // Cleanup file created by DataStore
    try {
      if (fs.existsSync(dataFilePath)) {
        fs.unlinkSync(dataFilePath);
      }
    } catch (err) {
      // ignore cleanup errors in tests
      console.warn("Cleanup failed:", err);
    }
  });
});
