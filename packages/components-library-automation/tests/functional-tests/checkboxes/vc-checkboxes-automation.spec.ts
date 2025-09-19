import { test, expect } from '@playwright/test'
import { WppCheckboxesPage } from '../../../pages/checkboxes.page'

const wppCheckboxesPage = new WppCheckboxesPage()
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppCheckboxesPage.setPage(page)
  await wppCheckboxesPage.init()
  await wppCheckboxesPage.openPage('vc/checkboxes')
  consoleErrors = await wppCheckboxesPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Checkboxes', () => {
  //WPPLONOP-8972
  test('[WPPOPENDS-T594] Check that disabled checkbox text has correct color', async () => {
  const color = await wppCheckboxesPage.disabledCheckbox.locator('[part="typography"]').evaluate(el =>
    window.getComputedStyle(el).getPropertyValue('color')
  );
  
  await expect(color.trim()).toBe('rgb(162, 169, 176)');
  })
})
