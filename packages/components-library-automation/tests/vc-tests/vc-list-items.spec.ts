import { expect } from '@playwright/test'
import { WppListItemsPage } from '../../pages/list-items.page'
import test from './../../utils'

const wppListItemsPage = new WppListItemsPage()

test.beforeEach(async ({ page }) => {
  await wppListItemsPage.setPage(page)
  await wppListItemsPage.init()
  await wppListItemsPage.openPage('vc/list-items')
  await wppListItemsPage.setViewportSize(1680, 720)
})

test.describe('WPP List Items', () => {
  test('[WPPOPENDS-T311] Check that the component passes the visual check', async ({ page }) => {
    await page.waitForTimeout(2000)
    await expect(wppListItemsPage.listItems).toHaveScreenshot()
  })
})
