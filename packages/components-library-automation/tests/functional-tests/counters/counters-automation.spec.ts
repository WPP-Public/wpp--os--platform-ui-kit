import { test, expect } from '@playwright/test'
import { WppCountersPage } from '../../../pages/counters.page'

const wppCountersPage = new WppCountersPage()
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppCountersPage.setPage(page)
  await wppCountersPage.init()
  await wppCountersPage.openPage('vc/counters')
  consoleErrors = await wppCountersPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Counter', () => {
  test('[WPPOPENDS-T536] Check that component is focused when the page is opened [@WPPLONOP-4897 ]', async () => {
    await expect(wppCountersPage.focusCounter).toBeFocused()
  })

  test('[WPPOPENDS-T258] Check that the value can be changed using the arrows on the keyboard', async ({ page }) => {
    await wppCountersPage.counterWithoutButtons.click()
    await page.keyboard.press('ArrowUp')
    await page.keyboard.press('ArrowUp')
    await page.keyboard.press('ArrowDown')

    await expect(wppCountersPage.counterWithoutButtons.locator('input')).toHaveValue('6')
  })
})
