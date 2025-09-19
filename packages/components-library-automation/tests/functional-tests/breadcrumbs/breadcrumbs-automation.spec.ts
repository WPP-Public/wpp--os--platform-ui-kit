import { test, expect } from '@playwright/test'
import { WppBreadcrumbsPage } from '../../../pages/breadcrumbs.page'

const wppBreadcrumbsPage = new WppBreadcrumbsPage()
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppBreadcrumbsPage.setPage(page)
  await wppBreadcrumbsPage.init()
  await wppBreadcrumbsPage.openPage('vc/breadcrumbs')
  consoleErrors = await wppBreadcrumbsPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Breadcrumbs', () => {
  test('[WPPOPENDS-T112] Check that component has nativeLink properties when nativeLink=true', async () => {
    await expect(wppBreadcrumbsPage.nativeLinkItem).toHaveAttribute('href', '/breadcrumb')
  })

  test('[WPPOPENDS-T807] Check that component has no nativeLink properties when nativeLink=false', async () => {
    await expect(wppBreadcrumbsPage.noNativeLinkItem).not.toHaveAttribute('href', '/breadcrumb')
  })
})
