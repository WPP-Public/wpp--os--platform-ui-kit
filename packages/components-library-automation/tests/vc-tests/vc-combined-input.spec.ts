import { expect } from '@playwright/test'
import { WppSelectsPage } from '../../pages/selects.page'
import test from './../../utils'

const wppSelectsPage = new WppSelectsPage()

test.beforeEach(async ({ page }) => {
  await wppSelectsPage.setPage(page)
  await wppSelectsPage.init()
  await page.waitForTimeout(500);
  await wppSelectsPage.openPage('vc/combined-inputs')
  await page.setViewportSize({ width: 1920, height: 1080 })
  await page.waitForTimeout(1000);
  
})

test.describe('WPP Combined Input', () => {
  test('[WPPOPENDS-T329] Check that the component passes the visual check', async ({ page }) => {
    await wppSelectsPage.combinedInput.click()
    await page.waitForTimeout(500);
    await expect(wppSelectsPage.combinedSelects.locator('.anchor.size-m').nth(1)).toHaveCSS('border', '1px solid rgb(77, 83, 88)');

    await expect(wppSelectsPage.combinedSelects).toHaveScreenshot()
  })

  test('[WPPOPENDS-T534] Check that the component has a hover state', async ({ page }) => {
    await wppSelectsPage.focusCombinedSelect.getByText('EUR').click()
    await wppSelectsPage.focusCombinedSelect.getByText('EUR').click()
    await wppSelectsPage.combinedInput.hover();
    await page.waitForTimeout(1000);
    await expect(wppSelectsPage.combinedInput).toHaveCSS('background-color', 'rgb(244, 245, 247)');
    await expect(wppSelectsPage.combinedSelects.locator('.anchor.size-m').nth(1)).toHaveCSS('border', '1px solid rgb(105, 112, 119)');

    await expect(wppSelectsPage.combinedSelects).toHaveScreenshot();
  })
})
