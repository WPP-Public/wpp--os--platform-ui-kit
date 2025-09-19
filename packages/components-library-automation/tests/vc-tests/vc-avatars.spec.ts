import { expect } from '@playwright/test'
import { WppAvatarsPage } from '../../pages/avatars.page'

const wppAvatarsPage = new WppAvatarsPage()
import test from './../../utils'

test.beforeEach(async ({ page }) => {
  await wppAvatarsPage.setPage(page)
  await wppAvatarsPage.init()
  await wppAvatarsPage.openPage('vc/avatars')
  await wppAvatarsPage.setViewportSize(1280, 720)
})

test.describe('WPP Avatars', () => {
  test('[WPPOPENDS-T310] Check that the component passes the visual check', async ({ page }) => {
    await wppAvatarsPage.moreButton.click()
    await page.waitForTimeout(500)

    await expect(wppAvatarsPage.avatars).toHaveScreenshot()
  })
})
