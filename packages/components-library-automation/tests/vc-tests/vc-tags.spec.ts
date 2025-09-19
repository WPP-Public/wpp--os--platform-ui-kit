import { expect } from '@playwright/test'
import { WppTagsPage } from '../../pages/tags.page'
import test from './../../utils'

const wppTagsPage = new WppTagsPage()

test.beforeEach(async ({ page }) => {
  await wppTagsPage.setPage(page)
  await wppTagsPage.init()
  await wppTagsPage.openPage('vc/tags')
  await wppTagsPage.setViewportSize(1280, 720)
})

test.describe('WPP Tags', () => {
  test('[WPPOPENDS-T313] Check that the component passes the visual check', async ({ page }) => {
    await page.waitForTimeout(1000)
    await expect(wppTagsPage.tags).toHaveScreenshot()
  })

  test('[WPPOPENDS-T1283] Check that the component passes the visual check on the color background', async ({ page }) => {
    await page.waitForTimeout(1000)
    await page.locator('.tags').evaluate(el => {
      el.style.backgroundColor = '#020263';
    });
    await page.waitForTimeout(1000)
    await expect(wppTagsPage.tags).toHaveScreenshot()
  })
})
