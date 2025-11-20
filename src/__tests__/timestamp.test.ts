import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { timestamp } from "../decorators/timestamp";

describe("timestamp decorator", () => {
  let spy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    spy = vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    spy.mockRestore();
  });

  it("logs a timestamp and returns the original result", () => {
    class Dummy {
      @timestamp
      hello() {
        return "world";
      }
    }

    const d = new Dummy();
    const res = d.hello();
    expect(res).toBe("world");
    expect(spy).toHaveBeenCalled();
    const msg = spy.mock.calls[0][0] as string;
    expect(msg).toContain("Appel de hello()");
    expect(msg).toMatch(/\[.*\] Appel de hello\(\)/);
  });
});
