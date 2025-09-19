import { test, expect } from '@playwright/test'
import { WppBannersPage } from '../../../pages/banners.page'

const wppBannersPage = new WppBannersPage()

test.beforeEach(async ({ page }) => {
  await wppBannersPage.setPage(page)
  await wppBannersPage.init()
  await wppBannersPage.openPage('banners')
})

test.describe('Banners', () => {
  test('[WPPOPENDS-T248] Check that the component closes after pressing the Close button', async () => {
    await wppBannersPage.bannerTopbar.locator('.close-button').click()

    await expect(wppBannersPage.bannerTopbar).toHaveJSProperty('show', false)
  })
  //WPPLONOP-12091
  test('[WPPOPENDS-T928] Check banner stretching', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.waitForSelector('[data-testid="stepper"]')

    const bannerWidth = await wppBannersPage.banner.evaluate(async element => {
      const style = window.getComputedStyle(element)
      return parseFloat(style.width)
    })
    const bannerWidthWithPadding = bannerWidth + 40
    await wppBannersPage.banner.scrollIntoViewIfNeeded()
    await expect(1920 - bannerWidthWithPadding).toBeLessThan(35)
  })

  test('[WPPOPENDS-T660] Check banner is one-line', async ({ page }) => {
    const bannerStates = page.locator('#bannerStates')
    const bannerWithLongText = page.locator('.wpp-banner').nth(3).locator('.message')
    await expect(wppBannersPage.bannerTopbar).toContainText('Banners should be used thoughtfully for only the most important information and can contain maximum 1 line of text.')
    await bannerStates.click()
    await expect(bannerWithLongText).toHaveCSS('white-space', 'nowrap')
    await expect(bannerWithLongText).toHaveCSS('overflow', 'hidden')
    await expect(bannerWithLongText).toHaveCSS('text-overflow', 'ellipsis')
    await expect(bannerWithLongText).toHaveCSS('line-height', '22px')
  })
})