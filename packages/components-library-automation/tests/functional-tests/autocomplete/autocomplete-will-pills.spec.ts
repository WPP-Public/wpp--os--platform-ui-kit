import { test, expect } from '@playwright/test'
import { WppAutocompletePage } from '../../../pages/autocomplete.page'

const wppAutocompletePage = new WppAutocompletePage()
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppAutocompletePage.setPage(page)
  await wppAutocompletePage.init()
  await wppAutocompletePage.openPage('autocomplete')
  consoleErrors = await wppAutocompletePage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Autocomplete', () => {
  //WPPLONOP-17577
  test('[WPPOPENDS-T590] Check autocomplete with pills dropdown margins', async ({ }) => {
    await wppAutocompletePage.basicWithInitialValuesAutocompleteInput.click()
    const paddingValue = await wppAutocompletePage.basicAutocompleteValues.first().evaluate((el) => {
      const style = window.getComputedStyle(el)
      return style.getPropertyValue('--autocomplete-regular-selected-values-wrapper-padding').trim()
    });
    await expect(paddingValue).toBe('0 8px 8px 8px')
  })
})
