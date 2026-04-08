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
    // Failure diagnostics
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",

    // Actions timeout
    actionTimeout: 10000,
  },

  // General timeout
  timeout: 30000,

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
