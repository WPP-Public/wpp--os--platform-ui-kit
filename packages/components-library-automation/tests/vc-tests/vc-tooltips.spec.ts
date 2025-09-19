import { expect } from '@playwright/test'
import { WppTooltipsPage } from '../../pages/tooltips.page'
import test from './../../utils'

const wppTooltipsPage = new WppTooltipsPage()

test.beforeEach(async ({ page }) => {
  await wppTooltipsPage.setPage(page)
  await wppTooltipsPage.init()
  await wppTooltipsPage.openPage('vc/tooltips')
  await wppTooltipsPage.setViewportSize(1280, 720)
  await page.waitForTimeout(1000)
})

test.describe('WPP Tooltips', () => {
  test('[WPPOPENDS-T321] Check that the component passes the visual check - Right placement', async () => {
    await wppTooltipsPage.checkTooltip(wppTooltipsPage.rightTooltipButton)
  })

  test('[WPPOPENDS-T350] Check that the component passes the visual check - Left placement', async () => {
    await wppTooltipsPage.checkTooltip(wppTooltipsPage.leftTooltipButton)
  })

  test('[WPPOPENDS-T351] Check that the component passes the visual check - Top placement', async () => {
    await wppTooltipsPage.checkTooltip(wppTooltipsPage.topTooltipButton.first())
  })

  test('[WPPOPENDS-T721] Check that the component passes the visual check - Tippy click', async () => {
    await wppTooltipsPage.tippyButton.first().click()

    await expect(wppTooltipsPage.tooltips).toHaveScreenshot()
  })

  test('[WPPOPENDS-T755] Check that the component passes the visual check - Allow HTML tooltip with light theme', async () => {
    await wppTooltipsPage.changeThemeBtn.click()
    await wppTooltipsPage.allowHTMLButton.hover()
    await expect(wppTooltipsPage.customContentTooltip).toHaveScreenshot()
  })

  test('[WPPOPENDS-T487] Check that the component passes the visual check - Allow HTML tooltip with dark theme', async ({ page }) => {
    await page.locator('[data-testid="allow-html-tooltip-button"]').hover()

    await expect(wppTooltipsPage.customContentTooltip).toHaveScreenshot()
  })

  test('[WPPOPENDS-T349] Check that the component passes the visual check - Warning tooltip', async () => {
    await wppTooltipsPage.warningTooltipBtn.first().hover()
    await expect(wppTooltipsPage.errorWarningTooltip).toHaveScreenshot()
  })

  test('[WPPOPENDS-T1286] Check that the component passes the visual check - Error tooltip', async () => {
    await wppTooltipsPage.errorTooltipBtn.first().hover()
    await expect(wppTooltipsPage.errorWarningTooltip).toHaveScreenshot()
  })

  test('[WPPOPENDS-T1287] Check that the component passes the visual check - Error tooltip with title', async () => {
    await wppTooltipsPage.errorTooltipBtn.nth(1).hover()
    await expect(wppTooltipsPage.errorWarningTooltipWithTitle).toHaveScreenshot()
  })

  test('[WPPOPENDS-T1288] Check that the component passes the visual check - Warning tooltip with title', async () => {
    await wppTooltipsPage.warningTooltipBtn.nth(1).hover()
    await expect(wppTooltipsPage.errorWarningTooltipWithTitle).toHaveScreenshot()
  })
})
