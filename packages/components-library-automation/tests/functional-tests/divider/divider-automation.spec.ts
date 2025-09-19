import { test, expect } from '@playwright/test'
import { WppDividerPage } from '../../../pages/divider.page'

const wppDividerPage = new WppDividerPage()
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppDividerPage.setPage(page)
  await wppDividerPage.init()
  await wppDividerPage.openPage('vc/divider')
  consoleErrors = await wppDividerPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Divider', () => {
//WPPLONOP-24199
  test('[WPPOPENDS-T634] Check vertical divider', async ({ page }) => {
    await expect(wppDividerPage.verticalDivider).toBeVisible()
    const verticalDividerWidth = await wppDividerPage.verticalDivider.boundingBox()
    await expect(verticalDividerWidth?.width).toBe(1)
  })
})
