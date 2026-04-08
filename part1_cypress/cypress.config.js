import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    baseUrl: "https://saucedemo.com",

    // Failure diagnostics
    screenshotOnRunFailure: true,
    video: false,
  },

  // Credentials
  env: {
    username: "standard_user",
    password: "secret_sauce",
    reqresApiUrl: process.env.REQRES_API_URL,
    reqresApiKey: process.env.REQRES_API_KEY,
  },

  // Stability setup for a weak CI
  defaultCommandTimeout: 10000,
});
