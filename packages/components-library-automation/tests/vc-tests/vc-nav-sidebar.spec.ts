import { expect } from '@playwright/test'
import { WppNavSidebarPage } from '../../pages/nav-sidebar.page'
import test from './../../utils'

const wppNavigationSidebarPage = new WppNavSidebarPage()

test.beforeEach(async ({ page }) => {
  await wppNavigationSidebarPage.setPage(page)
  await wppNavigationSidebarPage.init()
  await wppNavigationSidebarPage.openPage('vc/nav-sidebar')
  await wppNavigationSidebarPage.setViewportSize(1280, 720)
})

test.describe('WPP Navigation Sidebar', () => {
  test('[WPPOPENDS-T324] Check that the component passes the visual check', async ({ page }) => {
    await wppNavigationSidebarPage.itemWithTooltip.hover()
    await page.waitForTimeout(2000)

    await expect(page).toHaveScreenshot()
  })

  test('[WPPOPENDS-T604] Check that the original menu is closed when another one is clicked', async ({ page }) => {
    await wppNavigationSidebarPage.extendedItem.nth(1).click()
    await wppNavigationSidebarPage.itemWithTooltip.click()
    await page.waitForTimeout(2000)

    await expect(page).toHaveScreenshot()
  })
})
