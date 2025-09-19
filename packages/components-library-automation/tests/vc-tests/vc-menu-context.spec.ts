import { expect } from '@playwright/test'
import { WppMenuContextPage } from '../../pages/menu-context.page'
import test from './../../utils'

const wppMenuContextPage = new WppMenuContextPage()

test.beforeEach(async ({ page }) => {
  await wppMenuContextPage.setPage(page)
  await wppMenuContextPage.init()
  await wppMenuContextPage.openPage('vc/menu-context')
  await wppMenuContextPage.setViewportSize(1280, 920)
  await page.waitForTimeout(800)
})

test.describe('WPP Menu Context', () => {
  test('[WPPOPENDS-T312] Check that the component passes the visual check - Same width as the parent component', async ({
    page,
  }) => {
    await wppMenuContextPage.sameWidthButton.click()
    await page.waitForTimeout(500)

    await expect(wppMenuContextPage.menuContainer).toHaveScreenshot()
  })

  test('[WPPOPENDS-T344] Check that the component passes the visual check - Fixed width', async ({ page }) => {
    await wppMenuContextPage.fixedWidthButton.click()
    await page.waitForTimeout(800)
    await page.locator('text=Extendable Item').hover()
    await page.locator('text=Extendable Item').first().click()
    await wppMenuContextPage.innerExtendedItem.first().hover()
    await wppMenuContextPage.innerExtendedItem.first().click()
    await page.locator('text=SubItem 4').hover()

    await expect(wppMenuContextPage.menuContainer).toHaveScreenshot()
  })

  test('[WPPOPENDS-T345] Check that the component passes the visual check - Group Menus', async ({ page }) => {
    await wppMenuContextPage.groupMenuButton.click()
    await page.waitForTimeout(800)
    await page.locator('text=Apps & Roles').hover()
    await page.waitForTimeout(500)
    await page.locator('text=App 1').hover()
    await page.waitForTimeout(800)

    await expect(wppMenuContextPage.menuContainer).toHaveScreenshot()
  })
})
