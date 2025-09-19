import { test, expect } from '@playwright/test'
import { WppSelectsPage } from '../../../pages/selects.page'

const wppSelectsPage = new WppSelectsPage()
let consoleErrors

test.beforeEach(async ({ page }) => {
  await wppSelectsPage.setPage(page)
  await wppSelectsPage.init()
  await wppSelectsPage.openPage('selects')
  consoleErrors = await wppSelectsPage.listenConsoleErrors(page)
  await wppSelectsPage.textSelect.locator('.wpp-icon-chevron').click()
})

test.afterEach(async () => {
  //if the value of the multiple select is a string then the console error is displayed
  await expect(consoleErrors.length <= 2).toBeTruthy()
})

test.describe('Text Select', () => {
  //bug WPPLONOP-8649 fixed
  test('[WPPOPENDS-T192] Check that the component can have default value', async ({ page }) => {
    await expect(wppSelectsPage.listItems.filter({ hasText: 'House'})).toHaveJSProperty('checked', true)
  })

  //bug WPPLONOP-3765 fixed
  test('[WPPOPENDS-T193] Check that component is fully visible when placed inside the accordion', async ({ page }) => {
    await page.waitForTimeout(1000)
    await wppSelectsPage.textSelect.locator('.wpp-icon-chevron').click()
    await wppSelectsPage.textSelectInAccordion.click()
    await page.waitForTimeout(1000)
    await expect(wppSelectsPage.listItems.filter({ hasText: 'House'})).toBeVisible()
  })

  test('[WPPOPENDS-T194] Check that component is closed when clicked outside the component', async ({ page }) => {
    await page.locator('body').click()

    await expect(wppSelectsPage.listItems.first()).not.toBeVisible()
  })

    // bug WPPLONOP-8735 fixed
  test.skip('[WPPOPENDS-T195] Check that array as item value can be accepted', async ({ page }) => {
    await expect(page.locator('[data-testid="text-select"] .wpp-list-item').nth(4)).toHaveJSProperty(
      'value',
      [5, 55],
    )
    await page.locator('[data-testid="text-select"] .wpp-list-item').nth(4).click()

    await expect(wppSelectsPage.textSelect.locator('[part="text"]')).toHaveText('Array Value Item')
  })

  test('[WPPOPENDS-T196] Check that dropdown list is displayed to the top when there is not enough space below', async ({
    page,
  }) => {
    await wppSelectsPage.textTopDropdownSelect.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1000)
    await wppSelectsPage.textTopDropdownSelect.locator('[data-testid="wpp-icon-chevron"]').click()
    await expect(page.locator('.tippy-box').nth(1)).toHaveAttribute(
              'data-placement',
              'top-start',
            )
  })
})
