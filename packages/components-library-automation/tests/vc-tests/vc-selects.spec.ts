import { expect } from '@playwright/test'
import { WppSelectsPage } from '../../pages/selects.page'
import test from './../../utils'

const wppSelectsPage = new WppSelectsPage()

test.beforeEach(async ({ page }) => {
  await wppSelectsPage.setPage(page)
  await wppSelectsPage.init()
  await wppSelectsPage.openPage('vc/selects')
})

test.describe('WPP Single Selects', () => {
  test('[WPPOPENDS-T404] Check that the component passes the visual check', async ({ page }) => {
    await wppSelectsPage.openPage('vc/selects-single')
    await page.waitForTimeout(2000)
    await page.evaluate(() => window.scrollTo(0, 500))
    await wppSelectsPage.selectWithItems.locator('.overflow-container').click()
    await page.waitForTimeout(1000)

    await expect(wppSelectsPage.singleSelects).toHaveScreenshot()
  })

  test('[WPPOPENDS-T338] Check that the item with long label is truncated', async ({ page }) => {
    //There is an issue with the direct navigation with webkit browser. Had to change it to clicking menu items

    await page.locator('text=Selects').first().click()
    await wppSelectsPage.openPage('single-select')
    await wppSelectsPage.truncSingleSelectM.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1000)

    await expect(page.locator('[data-testid="trunc-single-select-m"]')).toHaveScreenshot()
  })
})

test.describe('WPP Multiple Selects', () => {
  test('[WPPOPENDS-T405] Check that the component passes the visual check', async ({ page }) => {
    await wppSelectsPage.setViewportSize(1920, 1080)
    await page.waitForTimeout(1000)
    await wppSelectsPage.openPage('vc/selects-multiple')

    await wppSelectsPage.searchAndFolderMultipleSelect.click()
    await page.waitForTimeout(500)

    await expect(wppSelectsPage.multipleSelects).toHaveScreenshot()
  })

  test('[WPPOPENDS-T337] Check that the item with long label is truncated', async ({ page }) => {
    await wppSelectsPage.openPage('multiple-select')
    await wppSelectsPage.truncMultipleSelectM.first().scrollIntoViewIfNeeded()
    await wppSelectsPage.truncMultipleSelectM.first().click()
    await page.locator('body').hover();
    await page.waitForTimeout(1000)

    await expect(page.locator('.wpp-select-portal')).toHaveScreenshot()
  })

  test('[WPPOPENDS-T1272] Check that the component with limit passes the visual check', async ({ page }) => {
    await wppSelectsPage.openPage('multiple-select');
    await wppSelectsPage.multipleSelectWithLimitM.nth(1).scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await wppSelectsPage.changeLimitBtn.click();
    await wppSelectsPage.multipleSelectWithLimitM.nth(1).click();
    await page.locator('body').hover();

    await expect(page.locator('.wpp-select-portal')).toHaveScreenshot()
  })
})

test.describe('WPP Text Selects', () => {
  test('[WPPOPENDS-T606] Check that the component passes the visual check', async ({ page }) => {
    await wppSelectsPage.openPage('vc/selects-text')

    await page.waitForTimeout(2000)
    await wppSelectsPage.textSelectWithItems.click()

    //After click on the select the cursor sometimes remained on the select that caused unstable test execution,
    // so this step was added to control the hover behaviour
    await wppSelectsPage.textSelects.hover()
    await page.waitForTimeout(500)

    await expect(wppSelectsPage.textSelects).toHaveScreenshot()
  })
})
