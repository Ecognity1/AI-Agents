import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "test-results",
  fullyParallel: true,
  forbidOnly: true,
  timeout: 15_000,
  retries: 0,
  reporter: [["line"], ["html", { outputFolder: "playwright-report", open: "never" }]],
  use: {
    baseURL: "http://127.0.0.1:4173",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "desktop-chrome", use: { ...devices["Desktop Chrome"], channel: "chrome" } },
    { name: "tablet-chrome", grep: /TC-018/, use: { ...devices["iPad (gen 7)"], browserName: "chromium", channel: "chrome" } },
    { name: "mobile-chrome", grep: /TC-018/, use: { ...devices["iPhone 13"], browserName: "chromium", channel: "chrome" } },
  ],
});
