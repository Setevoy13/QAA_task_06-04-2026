import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  // 1. Global retry settings for CI (2 for remote and 0 for local)
  retries: process.env.CI ? 2 : 0,

  reporter: "html",

  use: {
    baseURL: "https://demoqa.com",
    // 2. Настройка диагностики (Task 7)
    // 'on-first-retry' запишет трассировку только когда тест упал и пошел на пересдачу
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",

    // Установим таймаут для действий (клик, ввод текста)
    actionTimeout: 10000,
  },

  // Тайм-аут для всего теста (30 секунд - стандарт)
  timeout: 30000,

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
