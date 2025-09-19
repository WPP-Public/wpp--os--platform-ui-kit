import { expect } from '@playwright/test'
import { WppToastsPage } from '../../pages/toasts.page'
import test from './../../utils'

const wppToastsPage = new WppToastsPage()

test.beforeEach(async ({ page }) => {
  await wppToastsPage.setPage(page)
  await wppToastsPage.init()
  await wppToastsPage.openPage('vc/toasts')
})

test.describe('WPP Toasts', () => {
  test('[WPPOPENDS-T320] Check that the component passes the visual check', async ({ page }) => {
    await page.waitForTimeout(2000)
    expect(await wppToastsPage.toasts.screenshot({ animations: 'allow' })).toMatchSnapshot()
  })

  test('[WPPOPENDS-T620] Check that the toast appears on the top-right corner of the window', async ({ page }) => {
    await wppToastsPage.addToastButton.click()
    await page.waitForTimeout(2500)

    await expect(wppToastsPage.toastContainer).toHaveScreenshot()
  })

  test('[WPPOPENDS-T359] Check that the custom toast passes visual check', async ({ page }) => {
    await wppToastsPage.addCustomToastButton.click()
    await page.waitForTimeout(2000)

    await expect(wppToastsPage.toastContainer).toHaveScreenshot()
  })

  test('[WPPOPENDS-T360] Check that the custom toast with long text passes visual check', async ({ page }) => {
    await wppToastsPage.addCustomToastWithLongTextButton.click()
    await page.waitForTimeout(1000)

    await expect(wppToastsPage.toastContainer).toHaveScreenshot()
  })
})
