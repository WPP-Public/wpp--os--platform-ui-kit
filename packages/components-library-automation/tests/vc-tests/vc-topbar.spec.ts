import { expect } from '@playwright/test'
import { WppTopbarPage } from '../../pages/topbar.page'
import test from './../../utils'

const wppTopbarPage = new WppTopbarPage()

test.beforeEach(async ({ page }) => {
  await wppTopbarPage.setPage(page)
  await wppTopbarPage.init()
  await wppTopbarPage.openPage('vc/topbar')
  await wppTopbarPage.setViewportSize(1280, 720)
  await page.waitForTimeout(4000)
})

test.describe('WPP Topbar', () => {
  test('[WPPOPENDS-T704] Check that the component passes the visual check', async () => {
    await expect(wppTopbarPage.topbars).toHaveScreenshot()
  })

  test('[WPPOPENDS-T722] Check that the component passes the visual check - More icon', async ({ page }) => {
    for (let i = 0; i < 10; i++) {
      await page.waitForTimeout(200)
      await wppTopbarPage.addButton.click()
    }
    await page.waitForTimeout(200)
    await page.locator('text=Learning').nth(1).click()
    await page.getByRole('link', { name: 'Community' }).hover()
    await page.waitForTimeout(1000)

    await expect(wppTopbarPage.topbars).toHaveScreenshot()
  })

  test('[WPPOPENDS-T723] Check that the component passes the visual check - Menu selected', async ({ page }) => {
    await page.locator('text=Learning').nth(2).click()
    await page.waitForTimeout(200)

    await expect(wppTopbarPage.topbars).toHaveScreenshot()
  })

  test('[WPPOPENDS-T724] Check that the component passes the visual check - Menu selected in More Menu', async ({
    page,
  }) => {
    for (let i = 0; i < 14; i++) {
      await page.waitForTimeout(200)
      await wppTopbarPage.addButton.click()
    }
    await page.waitForTimeout(200)
    await page.locator("[slot='trigger-element']").nth(2).click()
    await page.locator('[value="learning"]').first().hover()
    await page.getByRole('link', { name: 'Guided tour' }).hover()
    await page.waitForTimeout(600)

    await expect(wppTopbarPage.topbars).toHaveScreenshot()
  })

  //Bug WPPLONOP-10402
  test('[WPPOPENDS-T733] Check that the icon doesnt change when opening the nested dropdown list', async ({ page }) => {
    await wppTopbarPage.openPage('topbar')
    await page.locator('text=Learning').first().click()
    await page.locator('text=Community').first().hover()
    await page.locator('.wpp-navigation-item').nth(1).hover()
    await page.waitForTimeout(1000)

    await expect(wppTopbarPage.topbars).toHaveScreenshot()
  })
})
