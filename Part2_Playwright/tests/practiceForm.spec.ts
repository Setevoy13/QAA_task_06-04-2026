import { test, expect } from "@playwright/test";
import { PracticeFormPage } from "../pages/PracticeFormPage";

test.describe("Task 5 — Automation Practice Form", () => {
  let formPage: PracticeFormPage;

  test.beforeEach(async ({ page }) => {
    formPage = new PracticeFormPage(page);
    await formPage.goto();
  });

  test("Positive Case: Submit with valid required fields", async ({ page }) => {
    await formPage.fillRequiredFields(
      "Ivan",
      "Ivanov",
      "ivan@example.com",
      "1234567890",
    );
    await formPage.submit();

    // After successful submit validating that modal window appears
    const successModal = page.locator(".modal-content");
    await expect(successModal).toBeVisible();
    await expect(successModal).toContainText("Thanks for submitting the form");
  });

  test("Negative Case: Submit with invalid email format", async ({ page }) => {
    await formPage.fillRequiredFields(
      "Ivan",
      "Ivanov",
      "invalid-email",
      "1234567890",
    );
    await formPage.submit();

    // Validating CSS of boards for the email input field when invalid email format provided
    await expect(formPage.emailInput).toHaveCSS(
      "border-color",
      "rgb(220, 53, 69)",
    );

    // Validationg taht no madla window appears
    const successModal = page.locator(".modal-content");
    await expect(successModal).not.toBeVisible();
  });
});
