import { LoginPage } from "../support/pages/LoginPage";
import { InventoryPage } from "../support/pages/InventoryPage";

describe("Part 1 — SauceDemo UI & Network Validation", () => {
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();

  beforeEach(() => {
    //request interception
    cy.intercept("POST", "**/events.backtrace.io/**").as("analyticsRequest");

    loginPage.visit();
  });

  it("Task 1 & 2: Login and Network Validation", () => {
    const user = Cypress.env("username");
    const pass = Cypress.env("password");

    loginPage.login(user, pass);
    cy.url().should("include", "/inventory.html");

    cy.wait("@analyticsRequest").then((interception) => {
      //Task 2: Interception validation
      expect(interception.request.body).to.exist;
    });

    // Task 1: UI validation
    cy.url().should("include", "/inventory.html");
    inventoryPage.addAnyProduct();
    inventoryPage.cartBadge.should("be.visible").and("have.text", "1");
  });
});
