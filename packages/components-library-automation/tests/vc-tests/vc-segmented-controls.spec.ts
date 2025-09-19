import { expect } from '@playwright/test'
import { WppSegmentedControlsPage } from '../../pages/segmented-controls.page'
import test from './../../utils'

const wppSegmentedControlsPage = new WppSegmentedControlsPage()

test.beforeEach(async ({ page }) => {
  await wppSegmentedControlsPage.setPage(page)
  await wppSegmentedControlsPage.init()
  await wppSegmentedControlsPage.openPage('vc/segmented-controls')
  await wppSegmentedControlsPage.setViewportSize(1280, 720)
})

test.describe('WPP Segmented Controls', () => {
  test('[WPPOPENDS-T403] Check that the component passes the visual check', async ({ page }) => {
    await page.waitForTimeout(1000)
    await expect(wppSegmentedControlsPage.controlBars).toHaveScreenshot()
  })
})
