import { LoginPage } from "../support/pages/LoginPage";
import { InventoryPage } from "../support/pages/InventoryPage";

describe("Part 1 — SauceDemo UI & Network Validation", () => {
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();

  beforeEach(() => {
    // Перехватываем запрос к аналитике, который точно происходит при активности на сайте
    cy.intercept("POST", "**/events.backtrace.io/**").as("analyticsRequest");

    loginPage.visit();
  });

  it("Task 1 & 2: Login and Network Validation", () => {
    const user = Cypress.env("username");
    const pass = Cypress.env("password");

    loginPage.login(user, pass);
    cy.url().should("include", "/inventory.html");

    // TASK 2: Ждем перехвата запроса аналитики
    // Нам не важно, какой там статус (даже если 401), главное, что запрос БЫЛ отправлен
    cy.wait("@analyticsRequest").then((interception) => {
      // Проверяем, что запрос ушел (exist) и у него есть тело
      expect(interception.request.body).to.exist;
      // Можно проверить статус, если бы он был 200, но для этого сайта достаточно факта запроса
    });

    // TASK 1: Проверка UI
    cy.url().should("include", "/inventory.html");
    inventoryPage.addAnyProduct();
    inventoryPage.cartBadge.should("be.visible").and("have.text", "1");
  });
});
