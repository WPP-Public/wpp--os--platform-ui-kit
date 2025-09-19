import { expect } from '@playwright/test'
import { WppCountriesPage } from '../../pages/countries.page'
import test from './../../utils'

const wppCountriesPage = new WppCountriesPage()

test.beforeEach(async ({ page }) => {
  await wppCountriesPage.setPage(page)
  await wppCountriesPage.init()
  await wppCountriesPage.openPage('vc/countries')
  await wppCountriesPage.setViewportSize(1920, 1080)
})

test.describe('WPP Countries', () => {
  test('[WPPOPENDS-T292] Check that the icons passes the visual check', async ({ page }) => {
    await page.waitForTimeout(2000)
    await expect(wppCountriesPage.countries).toHaveScreenshot()
  })
})
