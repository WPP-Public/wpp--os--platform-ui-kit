import { expect } from '@playwright/test'
import { WppSlidersPage } from '../../pages/sliders.page'
import test from './../../utils'

const wppSlidersPage = new WppSlidersPage()

test.beforeEach(async ({ page }) => {
  await wppSlidersPage.setPage(page)
  await wppSlidersPage.init()
  await wppSlidersPage.openPage('vc/sliders')
  await wppSlidersPage.setViewportSize(1280, 720)
})

test.describe('WPP Sliders', () => {
  test('[WPPOPENDS-T406] Check that the component passes the visual check', async () => {
    await expect(wppSlidersPage.sliders).toHaveScreenshot()
  })
})
