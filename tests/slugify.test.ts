import { describe, expect, it } from "vitest";
import { slugify } from "../src/lib/slugify";

describe("slugify", () => {
  it("lowercases and replaces spaces", () => {
    expect(slugify("Hello World"))
      .toBe("hello-world");
  });

  it("strips non-alphanumerics", () => {
    expect(slugify("ML & AI 101"))
      .toBe("ml-ai-101");
  });
});
