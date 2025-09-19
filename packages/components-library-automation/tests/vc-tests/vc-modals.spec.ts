import { expect } from '@playwright/test'
import { WppModalsPage } from '../../pages/modals.page'
import test from './../../utils'

const wppModalsPage = new WppModalsPage()

test.beforeEach(async ({ page }) => {
  await wppModalsPage.setPage(page)
  await wppModalsPage.init()
  await wppModalsPage.openPage('vc/modals')
})

test.describe('WPP Modals', () => {
  test('[WPPOPENDS-T411] Check that the component passes the visual check - Regular', async ({ page }) => {
    await wppModalsPage.regularModalButton.click()
    await page.waitForTimeout(500)

    await expect(wppModalsPage.modalSizeM).toHaveScreenshot()
  })

  test('[WPPOPENDS-T417] Check that the component passes the visual check - Error', async ({ page }) => {
    await wppModalsPage.errorModalButton.click()
    await page.waitForTimeout(500)

    await expect(wppModalsPage.modalSizeS).toHaveScreenshot()
  })
})
