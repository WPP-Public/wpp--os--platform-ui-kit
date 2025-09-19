import { expect } from '@playwright/test'
import { WppBannersPage } from '../../pages/banners.page'
import test from './../../utils'

const wppBannersPage = new WppBannersPage()

test.beforeEach(async ({ page }) => {
  await wppBannersPage.setPage(page)
  await wppBannersPage.init()
  await wppBannersPage.openPage('banners')
  await wppBannersPage.setViewportSize(1920, 1080)
})

test.describe('WPP Banners', () => {
  test('[WPPOPENDS-T315] Check that the component passes the visual check - Topbar tab', async ({ page }) => {
    await wppBannersPage.bannerNavBarTab.click()
    await wppBannersPage.bannerNavTopbarTab.click()
    await page.waitForTimeout(2000)
    await expect(wppBannersPage.banner).toHaveScreenshot()
  })

  test('[WPPOPENDS-T340] Check that the component passes the visual check - Navbar tab', async ({ page }) => {
    await wppBannersPage.bannerStatesTab.click()
    await wppBannersPage.bannerNavBarTab.click()
    await wppBannersPage.showBannerButton.click()
    await page.waitForTimeout(2000)

    await expect(wppBannersPage.banner).toHaveScreenshot()
  })

  test('[WPPOPENDS-T341] Check that the component passes the visual check - States tab', async ({ page }) => {
    await wppBannersPage.bannerNavBarTab.click()
    await wppBannersPage.bannerStatesTab.click()
    await page.waitForTimeout(2000)
    
    await page.evaluate(() => {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    });
    await page.waitForTimeout(2000)
    
    await expect(wppBannersPage.banner).toHaveScreenshot()
  })
})
