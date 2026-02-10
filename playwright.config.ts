import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
  testDir: "./vrt",
  snapshotDir: "./vrt/__snapshots__",
  snapshotPathTemplate: "{snapshotDir}/{testFilePath}/{testName}/{projectName}{ext}",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 30,
    },
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: "http://localhost:9000",
    trace: "on-first-retry",
  },
  webServer: {
    command: "yarn gatsby serve",
    url: "http://localhost:9000",
    reuseExistingServer: !process.env.CI,
    stdout: "pipe",
    stderr: "pipe",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "Desktop Chrome",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Desktop Firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "Desktop Safari",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "iPhone14 - Chrome",
      use: {
        browserName: "chromium",
        ...devices["iPhone 14"],
      },
    },
    {
      name: "iPhone14 - Safari",
      use: {
        browserName: "webkit",
        ...devices["iPhone 14"],
      },
    },
    {
      name: "Pixel7 - Chrome",
      use: {
        browserName: "chromium",
        ...devices["Pixel 7"],
      },
    },
  ],
})
