import { Page, Locator, expect } from "@playwright/test";

export class PracticeFormPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly genderRadio: Locator;
  readonly mobileInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator("#firstName");
    this.lastNameInput = page.locator("#lastName");
    this.emailInput = page.locator("#userEmail");
    this.genderRadio = page.getByText("Male", { exact: true });
    this.mobileInput = page.locator("#userNumber");
    this.submitButton = page.locator("#submit");
  }

  async goto() {
    await this.page.goto("/automation-practice-form");
    // remove ad's that could hoverover Submit button on DemoQA
    await this.page.addStyleTag({
      content: "#fixedban, footer { display: none !important; }",
    });
  }

  async fillRequiredFields(
    fname: string,
    lname: string,
    email: string,
    mobile: string,
  ) {
    await this.firstNameInput.fill(fname);
    await this.lastNameInput.fill(lname);
    await this.emailInput.fill(email);
    await this.genderRadio.click();
    await this.mobileInput.fill(mobile);
  }

  async submit() {
    // We can use force true or "scrollIntoViewIfNeeded" in case if the element id hidden
    await this.submitButton.scrollIntoViewIfNeeded();
    await this.submitButton.click();
  }
}
