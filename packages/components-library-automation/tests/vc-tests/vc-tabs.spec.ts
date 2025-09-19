import { expect } from '@playwright/test'
import { WppTabsPage } from '../../pages/tabs.page'
import test from './../../utils'

const wppTabsPage = new WppTabsPage()

test.beforeEach(async ({ page }) => {
  await wppTabsPage.setPage(page)
  await wppTabsPage.init()
  await wppTabsPage.openPage('vc/tabs')
  await wppTabsPage.setViewportSize(1920, 1080)

})

test.describe('WPP Tabs', () => {
  test('[WPPOPENDS-T326] Check that the component passes the visual check', async ({ page }) => {
    await page.waitForTimeout(1000)
    expect(await wppTabsPage.tabs.screenshot()).toMatchSnapshot()
  })
})
