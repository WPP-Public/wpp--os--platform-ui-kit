import { test, expect } from '@playwright/test'
import { WppTabsPage } from '../../../pages/tabs.page'

const wppTabsPage = new WppTabsPage()
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppTabsPage.setPage(page)
  await wppTabsPage.init()
  await wppTabsPage.openPage('vc/tabs')
  consoleErrors = await wppTabsPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Tabs', () => {
  //WPPLONOP-24578
  test('[WPPOPENDS-T650] Check that value component for tabs is required', async ({ page }) => {
    const housesTab = page.locator('.wpp-tab').first()
    await expect (housesTab).toHaveAttribute('value', 'houses')
    const carsTab = page.locator('.wpp-tab').nth(1)
    await expect (carsTab).toHaveAttribute('value', 'cars')
  })
})
