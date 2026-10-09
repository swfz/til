import { defineNetworkFixture } from "@msw/playwright"
import { test as base, expect } from "@playwright/test"

import { handlers } from "../src/mocks/handler"

import type { NetworkFixture } from "@msw/playwright"

// playwright-mswはmsw v3に未対応のため、MSW公式の@msw/playwrightでモックする
const test = base.extend<{
  network: NetworkFixture
}>({
  network: [
    async ({ context }, use) => {
      const network = defineNetworkFixture({
        context,
        handlers: [...handlers],
      })

      await network.enable()
      await use(network)
      await network.disable()
    },
    { auto: true },
  ],
})

test.describe("Layout Integrity", () => {
  test("sample prismjs page", async ({ page, browserName }) => {
    await page.goto("/samples/prismjs/")

    // デスクトップWebKitのfullPageスクリーンショットはtoHaveScreenshot内部の処理で
    // 幅がviewportを超えて拡張され、OS間のスクロールバー差でサイズ不一致になるため
    // viewportの高さをドキュメント全体に合わせてfullPage:falseで撮影する
    // ref: https://github.com/microsoft/playwright/issues/29968
    const isDesktopWebkit = browserName === "webkit" && page.viewportSize()!.width > 1000
    if (isDesktopWebkit) {
      const height = await page.evaluate(() => document.documentElement.scrollHeight)
      await page.setViewportSize({ width: page.viewportSize()!.width, height })
    }
    await expect(page).toHaveScreenshot({
      fullPage: !isDesktopWebkit,
      timeout: 20000,
    })
  })
  test("sample markdown page", async ({ page, browserName }) => {
    await page.goto("/samples/markdown/")

    const isDesktopWebkit = browserName === "webkit" && page.viewportSize()!.width > 1000
    if (isDesktopWebkit) {
      const height = await page.evaluate(() => document.documentElement.scrollHeight)
      await page.setViewportSize({ width: page.viewportSize()!.width, height })
    }
    await expect(page).toHaveScreenshot({
      fullPage: !isDesktopWebkit,
      timeout: 20000,
    })
  })
})
