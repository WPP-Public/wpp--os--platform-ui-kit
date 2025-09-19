import { expect } from '@playwright/test'
import { WppPopoversPage } from '../../pages/popovers.page'
import test from './../../utils'

const wppPopoversPage = new WppPopoversPage()

test.beforeEach(async ({ page }) => {
  await wppPopoversPage.setPage(page)
  await wppPopoversPage.init()
  await wppPopoversPage.openPage('vc/popovers')
  await wppPopoversPage.setViewportSize(1280, 720)
})

test.describe('WPP Popovers', () => {
  test('[WPPOPENDS-T613] Check that the default component passes the visual check', async () => {
    await wppPopoversPage.defaultPopoverTrigger.click()

    await expect(wppPopoversPage.popoverPage).toHaveScreenshot()
  })

  test('[WPPOPENDS-T732] Check that the custom component passes the visual check', async ({ page }) => {
    //Sometimes the avatars need some time to be displayed
    await page.waitForTimeout(2000)

    await wppPopoversPage.customPopoverTrigger.click()

    await expect(wppPopoversPage.popoverPage).toHaveScreenshot()
  })

  test('[WPPOPENDS-T1292] Check that the popover with search passes the visual check - With content', async ({ page }) => {
    await wppPopoversPage.popoverWithContent.first().click()

    await expect(wppPopoversPage.popoverPage).toHaveScreenshot()
  })

  test('[WPPOPENDS-T1293] Check that the popover search passes the visual check - No content', async ({ page }) => {
    await wppPopoversPage.popoverNoContent.click()

    await expect(wppPopoversPage.popoverPage).toHaveScreenshot()
  })
})
