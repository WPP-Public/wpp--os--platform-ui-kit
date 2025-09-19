import { expect } from '@playwright/test'
import { WppIconsPage } from '../../pages/icons.page'
import test from './../../utils'

const wppIconsPage = new WppIconsPage()

test.beforeEach(async ({ page }) => {
  await wppIconsPage.setPage(page)
  await wppIconsPage.init()
  await wppIconsPage.openPage('vc/icons')
  await wppIconsPage.setViewportSize(1280, 720)
  await page.waitForTimeout(1000)
})

test.describe('WPP Icons', () => {
  test('[WPPOPENDS-T105] Check that the component passes the visual check', async () => {
    await expect(wppIconsPage.icons).toHaveScreenshot()
  })
})
