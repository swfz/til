import { test as base, expect } from "@playwright/test"
import { createWorkerFixture } from "playwright-msw"

import { handlers } from "../src/mocks/handler"

import type { MockServiceWorker } from "playwright-msw"

const test = base.extend<{
  worker: MockServiceWorker
}>({
  worker: createWorkerFixture([...handlers]),
})

test.describe("Layout Integrity", () => {
  test("sample prismjs page", async ({ page }) => {
    await page.goto("/samples/prismjs/")

    await expect(page).toHaveScreenshot({ fullPage: true })
  })
  test("sample markdown page", async ({ page }) => {
    await page.goto("/samples/markdown/")

    await expect(page).toHaveScreenshot({ fullPage: true })
  })
})
