import { expect } from '@playwright/test'
import { WppCountersPage } from '../../pages/counters.page'
import test from './../../utils'

const wppCountersPage = new WppCountersPage()

test.beforeEach(async ({ page }) => {
  await wppCountersPage.setPage(page)
  await wppCountersPage.init()
  await wppCountersPage.openPage('vc/counters')
  await wppCountersPage.setViewportSize(1280, 1020)
  await page.waitForTimeout(1000)
})

//There is an issue with borders on the screenshots, it can't be reproduced on the real browsers
test.describe('WPP Counters', () => {
  test('[WPPOPENDS-T330] Check that the component passes the visual check', async ({ page }) => {
    await expect(page.locator('main').nth(1)).toHaveScreenshot()
  })

  test('[WPPOPENDS-T529] Check that the input has a hover state', async ({ page }) => {
    await wppCountersPage.hoverCounter.hover()
    await page.waitForTimeout(500)

    await expect(wppCountersPage.hoverCounter).toHaveScreenshot()
  })

  test('[WPPOPENDS-T530] Check that the tooltip is displayed when hovered over the truncated inline message', async ({ page }) => {
    await wppCountersPage.counterTooltip.hover()
    await page.waitForTimeout(2000)
    const tooltip = await page.getByRole('tooltip', { name: 'Error message' });
    const box = await tooltip.boundingBox();

    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
    }

    await expect(page.locator('main').nth(1)).toHaveScreenshot()
  })

  test('[WPPOPENDS-T531] Check that the previously entered value is not saved when clearing the input', async ({ page }) => {
    await wppCountersPage.counterInput.fill('123')
    await wppCountersPage.hoverCounter.dblclick()
    await page.keyboard.press('Backspace')
    await wppCountersPage.plusButton.click()
    await page.getByRole('heading', { name: 'Counter', exact: true }).hover()
    await page.waitForTimeout(500)

    await expect(page.locator('main').nth(1)).toHaveScreenshot()
  })
})
