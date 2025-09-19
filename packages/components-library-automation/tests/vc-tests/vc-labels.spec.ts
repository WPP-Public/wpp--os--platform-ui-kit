import { expect } from '@playwright/test'
import { WppLabelsPage } from '../../pages/labels.page'
import test from './../../utils'

const wppLabelsPage = new WppLabelsPage()

test.beforeEach(async ({ page }) => {
  await wppLabelsPage.setPage(page)
  await wppLabelsPage.init()
  await wppLabelsPage.openPage('vc/labels')
  await wppLabelsPage.setViewportSize(1920, 1080)
})

test.describe('WPP Labels', () => {
  test('[WPPOPENDS-T416] Check that the component passes the visual check', async ({ page }) => {
    await page.waitForTimeout(500)
    await wppLabelsPage.labelTooltip.hover()
    await page.waitForTimeout(500)

    await expect(wppLabelsPage.labels).toHaveScreenshot()
  })
})
