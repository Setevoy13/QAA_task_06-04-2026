import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // Базовый URL (требование по Environment-based configuration)
    baseUrl: "https://saucedemo.com",

    // Автоматические скриншоты при падении (требование Failure Diagnostics)
    screenshotOnRunFailure: true,

    // Отключаем видео, чтобы тесты бегали быстрее (Senior-подход)
    video: false,

    setupNodeEvents(on, config) {
      // Здесь можно будет настроить отчеты (например, Allure), если захочешь
    },
  },

  // Переменные окружения для credentials (требование ТЗ)
  env: {
    username: "standard_user",
    password: "secret_sauce",
    // Вставьте ваш публичный ключ сюда
    reqres_api_key:
      "pub_aec5f6bc8151341cd5ee0a3ebf91e383151f67356b4aecb86dc5784322c81a44",
  },

  // Настройка стабильности (увеличим дефолтный таймаут для слабых CI)
  defaultCommandTimeout: 10000,
});
