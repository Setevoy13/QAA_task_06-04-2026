export class LoginPage {
  get usernameInput() {
    return cy.get('[data-test="username"]');
  }
  get passwordInput() {
    return cy.get('[data-test="password"]');
  }
  get loginButton() {
    return cy.get('[data-test="login-button"]');
  }

  visit() {
    cy.visit("/");
  }

  login(username, password) {
    this.usernameInput.should("be.visible").type(username);
    this.passwordInput.should("be.visible").type(password);
    this.loginButton.click();
  }
}
