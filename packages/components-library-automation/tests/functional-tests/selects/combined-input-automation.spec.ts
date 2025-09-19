import { test, expect } from '@playwright/test'
import { WppSelectsPage } from '../../../pages/selects.page'

const wppSelectsPage = new WppSelectsPage()

test.beforeEach(async ({ page }) => {
  await wppSelectsPage.setPage(page)
  await wppSelectsPage.init()
  await wppSelectsPage.openPage('vc/combined-inputs')
})

test.describe('Combined Input', () => {
  test('[WPPOPENDS-T283] Check that different values are displayed in the input', async () => {
    await wppSelectsPage.combinedInput.click()
    await wppSelectsPage.combinedInput.type('.a235')

    await expect(wppSelectsPage.combinedInput.locator('input').nth(1)).toHaveValue('.a235')
  })

  test('[WPPOPENDS-T284] Check that the item is selected after clicking on it in the dropdown', async ({ page }) => {
    await wppSelectsPage.combinedMenuList.click()
    const usdItem = await page.locator('#tippy-2').getByText('USD')
    
    await usdItem.click();
    await expect(usdItem).not.toBeVisible()
    await wppSelectsPage.combinedMenuList.click()

    await expect(wppSelectsPage.combinedListItemUSD).toHaveClass('item checked')
  })
})
