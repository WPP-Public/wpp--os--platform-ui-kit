import { expect } from '@playwright/test'
import { WppGridsPage } from '../../pages/grids.page'
import test from './../../utils'

const wppGridsPage = new WppGridsPage()

test.beforeEach(async ({ page }) => {
  await wppGridsPage.setPage(page)
  await wppGridsPage.init()
  await wppGridsPage.openPage('vc/grid-css')
  await wppGridsPage.setViewportSize(1280, 720)
})

test.describe('WPP Grids', () => {
  test('[WPPOPENDS-T103] Check that the component passes the visual check', async ({ page }) => {
    await page.waitForTimeout(500)
    await expect(wppGridsPage.grids).toHaveScreenshot()
  })
})
