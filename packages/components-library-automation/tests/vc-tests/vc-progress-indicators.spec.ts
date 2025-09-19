import { expect } from '@playwright/test'
import { WppProgressIndicatorsPage } from '../../pages/progress-indicators.page'
import test from './../../utils'

const wppProgressIndicatorsPage = new WppProgressIndicatorsPage()

test.beforeEach(async ({ page }) => {
  await wppProgressIndicatorsPage.setPage(page)
  await wppProgressIndicatorsPage.init()
  await wppProgressIndicatorsPage.openPage('vc/progress-indicators')
  await wppProgressIndicatorsPage.setViewportSize(1280, 720)
})

test.describe('WPP Progress Indicators', () => {
  test('[WPPOPENDS-T317] Check that the component passes the visual check', async () => {
    await expect(wppProgressIndicatorsPage.progressIndicators).toHaveScreenshot()
  })
})
