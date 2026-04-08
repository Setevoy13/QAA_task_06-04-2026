describe("Task 3 — API Test (ReqRes)", () => {
  it("should validate GET /api/users?page=2", () => {
    const apiUrl = Cypress.env("reqresApiUrl");
    const apiKey = Cypress.env("reqresApiKey");
    // ВАЖНО для Senior: Полный URL без привязки к baseUrl из конфига
    cy.request({
      method: "GET",
      url: apiUrl,
      headers: {
        "x-api-key": apiKey,
        Accept: "application/json",
      },
      // Устанавливаем жесткий лимит ожидания, чтобы тест НЕ вис бесконечно
      timeout: 10000,
      failOnStatusCode: false,
    }).then((response) => {
      // Отладочный лог в консоль Cypress
      cy.log("Response Status:", response.status);

      // Проверка статуса (если 401 — значит ключ все же не подходит)
      expect(response.status, `Expected 200 but got ${response.status}`).to.eq(
        200,
      );

      // Проверка структуры массива
      expect(response.body).to.have.property("data");
      expect(response.body.data).to.be.an("array").and.have.length.at.least(1);

      // Глубокая валидация контракта (Senior-level)
      const firstUser = response.body.data[0];
      expect(firstUser).to.include.keys(
        "id",
        "email",
        "first_name",
        "last_name",
      );

      // Проверка типов данных
      expect(firstUser.id).to.be.a("number");
      expect(firstUser.email).to.match(/@/);
    });
  });
});
