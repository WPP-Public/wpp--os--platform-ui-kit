import { expect } from '@playwright/test'
import { WppBreadcrumbsPage } from '../../pages/breadcrumbs.page'
import test from './../../utils'

const wppBreadcrumbsPage = new WppBreadcrumbsPage()

test.beforeEach(async ({ page }) => {
  await wppBreadcrumbsPage.setPage(page)
  await wppBreadcrumbsPage.init()
  await wppBreadcrumbsPage.openPage('vc/breadcrumbs')
  await wppBreadcrumbsPage.setViewportSize(1280, 920)
})

test.describe('WPP Breadcrumbs', () => {
  test('[WPPOPENDS-T322] Check that the component passes the visual check', async ({ page }) => {
    await page.waitForTimeout(500)
    await wppBreadcrumbsPage.moreMenu.click()
    await page.waitForTimeout(2000)

    await expect(wppBreadcrumbsPage.breadcrumbs).toHaveScreenshot({ threshold: 0 })
  })
})
