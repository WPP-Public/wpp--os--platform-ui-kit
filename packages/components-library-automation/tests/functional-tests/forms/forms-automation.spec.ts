import { test, expect } from '@playwright/test'
import { WppFormsPage } from '../../../pages/forms.page'

const wppFormsPage = new WppFormsPage()

test.beforeEach(async ({ page }) => {
  await wppFormsPage.setPage(page)
  await wppFormsPage.init()
  await wppFormsPage.openPage('form-controls')
})

test.describe('WPP Forms', () => {
  test('[WPPOPENDS-T291] Check that the tooltip is missing for a required field', async ({ page }) => {
    await wppFormsPage.submitButton.click()
    await wppFormsPage.nameInput.hover()
    await page.waitForTimeout(2000)

    await expect(page.locator('text=Please fill out this field.')).not.toBeVisible()
  })
})
