import { expect } from '@playwright/test'
import { WppSearchPage } from '../../pages/search.page'
import test from './../../utils'

const wppSearchPage = new WppSearchPage()

test.beforeEach(async ({ page }) => {
  await wppSearchPage.setPage(page)
  await wppSearchPage.init()
  await wppSearchPage.openPage('vc/search')
  await wppSearchPage.setViewportSize(1280, 720)
  await page.waitForTimeout(1000)
})

test.describe('WPP Search', () => {
  test('[WPPOPENDS-T453] Check that the component passes the visual check', async () => {
    await expect(wppSearchPage.searchContainer).toHaveScreenshot()
  })

  test('[WPPOPENDS-T623] Check that item with long text is truncated in input', async ({ page }) => {
    await wppSearchPage.regularSearch.locator('input').type('universe')
    await wppSearchPage.regularSearch.locator('.wpp-list-item:visible').click()
    await page.getByRole('heading', { name: 'Size M' }).hover()

    await expect(wppSearchPage.regularSearchContainer).toHaveScreenshot()
  })

  test('[WPPOPENDS-T624] Check that item with long text is truncated in dropdown', async () => {
    await wppSearchPage.regularSearch.locator('input').type('universe')

    await expect(wppSearchPage.regularSearchContainer).toHaveScreenshot()
  })
})
