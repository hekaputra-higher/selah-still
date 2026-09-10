import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("Scripture, chapter, reflection, accessibility and local recovery", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Psalm 23:1–3" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Read the whole chapter" }).click();
  await expect(page.getByText(/Surely goodness/)).toBeVisible();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.getByRole("button", { name: "Begin D.W.E.L.L." }).click();
  await page
    .getByLabel("A prayer or intention")
    .fill("Fictional workshop reflection.");
  for (let i = 0; i < 4; i++)
    await page.getByRole("button", { name: "Continue →" }).click();
  await page.getByRole("button", { name: "Save reflection" }).click();
  await expect(
    page.getByRole("heading", { name: "Welcome back." }),
  ).toBeVisible();
  if (
    await page.getByRole("button", { name: "Enter local rehearsal" }).count()
  ) {
    await page.getByRole("button", { name: "Enter local rehearsal" }).click();
    await page.getByRole("button", { name: "Save reflection" }).click();
    await page
      .getByRole("button", { name: "My reflections", exact: true })
      .click();
    await expect(
      page.getByText("Fictional workshop reflection.", { exact: true }),
    ).toBeVisible();
  }
  expect(errors).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
