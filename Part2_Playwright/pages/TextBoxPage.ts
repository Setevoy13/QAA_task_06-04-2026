import { Page, Locator, expect } from "@playwright/test";

export class TextBoxPage {
  // 1. Types and elements description for the page
  readonly page: Page;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly currentAddressInput: Locator;
  readonly permanentAddressInput: Locator;
  readonly submitButton: Locator;
  readonly outputName: Locator;
  readonly outputEmail: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fullNameInput = page.locator("#userName");
    this.emailInput = page.locator("#userEmail");
    this.currentAddressInput = page.locator("#currentAddress");
    this.permanentAddressInput = page.locator("#permanentAddress");
    this.submitButton = page.locator("#submit");

    // Output result elements
    this.outputName = page.locator("#name");
    this.outputEmail = page.locator("#email");
  }

  // 2. Method for page navigation
  async goto() {
    await this.page.goto("/text-box");
  }

  // 3. Method to fill form
  async fillForm(
    name: string,
    email: string,
    currentAddr: string,
    permAddr: string,
  ) {
    await this.fullNameInput.fill(name);
    await this.emailInput.fill(email);
    await this.currentAddressInput.fill(currentAddr);
    await this.permanentAddressInput.fill(permAddr);
    await this.submitButton.click();
  }

  // 4. Method to get text from result for future assertion
  async getResultName() {
    return this.outputName.innerText();
  }
}
