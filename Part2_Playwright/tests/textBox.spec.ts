import { test, expect } from "@playwright/test";
import { TextBoxPage } from "../pages/TextBoxPage";

test.describe("Task 4 — Text Box Form", () => {
  test("should fill and submit the form correctly", async ({ page }) => {
    const textBoxPage = new TextBoxPage(page);

    // Данные для теста (можно вынести в константы)
    const testData = {
      fullName: "John Doe",
      email: "john@example.com",
      currentAddress: "123 Main St, New York",
      permanentAddress: "456 Second St, Boston",
    };

    await textBoxPage.goto();

    // Заполняем форму через метод Page Object
    await textBoxPage.fillForm(
      testData.fullName,
      testData.email,
      testData.currentAddress,
      testData.permanentAddress,
    );

    // TASK 4: Используем built-in Playwright expectations
    // Проверяем, что блок с результатом появился и содержит верные данные
    const output = page.locator("#output");

    await expect(output).toBeVisible();
    await expect(output.locator("#name")).toContainText(testData.fullName);
    await expect(output.locator("#email")).toContainText(testData.email);
    await expect(output.locator("#currentAddress")).toContainText(
      testData.currentAddress,
    );
    await expect(output.locator("#permanentAddress")).toContainText(
      testData.permanentAddress,
    );
  });
});
