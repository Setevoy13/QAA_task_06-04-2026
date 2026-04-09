describe("Task 3 — API Test (ReqRes)", () => {
  it("should validate GET /api/users?page=2", () => {
    const apiUrl = Cypress.env("reqresApiUrl");
    const apiKey = Cypress.env("reqresApiKey");
    cy.request({
      method: "GET",
      url: apiUrl,
      headers: {
        "x-api-key": apiKey,
        Accept: "application/json",
      },
      timeout: 10000,
      failOnStatusCode: false,
    }).then((response) => {
      cy.log("Response Status:", response.status);

      expect(response.status, `Expected 200 but got ${response.status}`).to.eq(
        200,
      );

      //validation
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.be.an("array").and.have.length.at.least(1);

      const firstUser = response.body.data[0];
      expect(firstUser).to.include.keys(
        "id",
        "email",
        "first_name",
        "last_name",
      );

      //type validation
      expect(firstUser.id).to.be.a("number");
      expect(firstUser.email).to.match(/@/);
    });
  });
});
