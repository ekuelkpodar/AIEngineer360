import { test, expect } from "@playwright/test";

test("landing renders", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.getByText("ModelPrep Hub")).toBeVisible();
  await expect(page.getByText("Browse topics")).toBeVisible();
});
