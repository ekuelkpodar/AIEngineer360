import { describe, expect, it } from "vitest";
import { nextStatus } from "../src/lib/progress";

describe("nextStatus", () => {
  it("advances through the flow", () => {
    expect(nextStatus("not_started")).toBe("in_progress");
    expect(nextStatus("in_progress")).toBe("mastered");
    expect(nextStatus("mastered")).toBe("mastered");
  });
});
