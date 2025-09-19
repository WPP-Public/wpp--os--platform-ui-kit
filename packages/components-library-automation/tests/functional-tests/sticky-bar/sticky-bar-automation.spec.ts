import { test, expect } from '@playwright/test'
import { WppStickyBarPage } from '../../../pages/sticky-bar.page'

const wppStickyBarPage = new WppStickyBarPage()
let consoleErrors

test.beforeEach(async ({ page }) => {
  await wppStickyBarPage.setPage(page)
  await wppStickyBarPage.init()
  await wppStickyBarPage.openPage('sticky-bar')
  consoleErrors = await wppStickyBarPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Sticky bar', () => {
  //WPPLONOP-24210
  test('[WPPOPENDS-T835] Check the sticky bar with one line bar and scroll 300', async ({ page }) => {
    const oneLineBtn = await wppStickyBarPage.oneLineBtn
    await oneLineBtn.click()
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(5000)
    await page.evaluate(() => window.scrollBy(0, 210))
    await expect(page.locator('.wpp-sticky-bar')).toHaveClass(/one-line wpp-invisible/)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(5000)
    await page.evaluate(() => window.scrollBy(0, 110))
    await expect(page.locator('.wpp-sticky-bar')).toHaveClass(/one-line wpp-invisible/)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(5000)
    await page.evaluate(() => window.scrollBy(0, 310))
    await expect(page.locator('.wpp-sticky-bar')).toHaveClass(/one-line wpp-visible/)
  })

  //WPPLONOP-24210
  test('[WPPOPENDS-T836] Check the sticky bar with one line bar and scroll 500', async ({ page }) => {
    const oneLineBtn = await wppStickyBarPage.oneLineBtn
    await oneLineBtn.click()
    const scroll = await wppStickyBarPage.scrollTreshold500
    await scroll.click()
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(5000)
    await page.evaluate(() => window.scrollBy(0, 310))
    await expect(page.locator('.wpp-sticky-bar')).toHaveClass(/one-line wpp-invisible/)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(5000)
    await page.evaluate(() => window.scrollBy(0, 510))
    await expect(page.locator('.wpp-sticky-bar')).toHaveClass(/one-line wpp-visible/)
  })

  //WPPLONOP-24210
  test('[WPPOPENDS-T837] Check the sticky bar with two lines bar and scroll 300', async ({ page }) => {
    const twoLineBtn = await wppStickyBarPage.twoLineBtn
    await twoLineBtn.click()
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(5000)
    await page.evaluate(() => window.scrollBy(0, 210))
    await expect(page.locator('.wpp-sticky-bar')).toHaveClass(/two-lines wpp-invisible/)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(5000)
    await page.evaluate(() => window.scrollBy(0, 310))
    await expect(page.locator('.wpp-sticky-bar')).toHaveClass(/two-lines wpp-visible/)
  })

  //WPPLONOP-24210
  test('[WPPOPENDS-T838] Check the sticky bar with two lines with tabs and scroll 300', async ({ page }) => {
    const twoLineBtn = await wppStickyBarPage.twoLineWithTabsBtn
    await twoLineBtn.click()
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(5000)
    await page.evaluate(() => window.scrollBy(0, 210))
    await expect(page.locator('.wpp-sticky-bar')).toHaveClass(/two-lines-with-tabs wpp-invisible/)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(5000)
    await page.evaluate(() => window.scrollBy(0, 310))
    await expect(page.locator('.wpp-sticky-bar')).toHaveClass(/two-lines-with-tabs wpp-visible/)
  })

  //WPPLONOP-24210
  test('[WPPOPENDS-T839] Check the sticky bar with blank and scroll 300', async ({ page }) => {
    const oneLineBtn = await wppStickyBarPage.blankBtn
    await oneLineBtn.click()
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(5000)
    await page.evaluate(() => window.scrollBy(0, 210))
    await expect(page.locator('.wpp-sticky-bar')).toHaveClass(/blank wpp-invisible/)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(5000)
    await page.evaluate(() => window.scrollBy(0, 310))
    await expect(page.locator('.wpp-sticky-bar')).toHaveClass(/blank wpp-visible/)
  })
})
