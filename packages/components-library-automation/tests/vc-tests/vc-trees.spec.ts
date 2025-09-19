import { expect } from '@playwright/test'
import { WppTreesPage } from '../../pages/trees.page'
import test from './../../utils'

const wppTreesPage = new WppTreesPage()

test.beforeEach(async ({ page }) => {
  await wppTreesPage.setPage(page)
  await wppTreesPage.init()
  await wppTreesPage.openPage('vc/tree')
  await wppTreesPage.setViewportSize(1280, 720)
})

test.describe('WPP Tree', () => {
  test('[WPPOPENDS-T314] Check that the component passes the visual check', async () => {
    await expect(wppTreesPage.trees).toHaveScreenshot()
  })

  test('[WPPOPENDS-T607] Check that the valid item can be searched', async ({ page }) => {
    await wppTreesPage.searchInput.fill('adul')
    await page.waitForTimeout(500)

    await expect(wppTreesPage.trees).toHaveScreenshot()
  })

  test('[WPPOPENDS-T608] Check that the Nothing Found label is displayed when searching for a non-existent item', async ({
    page,
  }) => {
    await wppTreesPage.searchInput.fill('asd')
    await page.waitForTimeout(500)

    await expect(wppTreesPage.trees).toHaveScreenshot()
  })

  test('[WPPOPENDS-T609] Check that the valid item can be searched with spaces before and after the search query', async ({
    page,
  }) => {
    await wppTreesPage.searchInput.fill(' clot ')
    await page.waitForTimeout(500)

    await expect(wppTreesPage.trees).toHaveScreenshot()
  })

  test('[WPPOPENDS-T352] Check that the component passes the visual check - Single select', async ({ page }) => {
    await page.locator('[data-testid="single-tree"] .wpp-icon-triangle-fill').first().click()
    await page.waitForTimeout(1000)
    await page.locator('[data-testid="single-tree"] .wpp-icon-triangle-fill').nth(1).click()
    await page.waitForTimeout(1000)
    await page.locator('[data-testid="single-tree"] .wpp-icon-triangle-fill').nth(3).click()
    await page.waitForTimeout(1000)

    //Sometimes the cursor hovers different elements, so added this step to omit random hovers
    await page.locator('text=Car').first().hover()

    await expect(wppTreesPage.singleTreeContainer).toHaveScreenshot()
  })

  test('[WPPOPENDS-T619] Check that the search with quotation marks searches for an exact result', async ({
    page,
  }) => {
    await wppTreesPage.quotationMarksInput.locator('input').type('"Camry"', { delay: 400 })
    await page.waitForTimeout(1000)

    await expect(wppTreesPage.quotationMarksTreeArea).toHaveScreenshot()
  })
})
