import { expect } from '@playwright/test'
import { WppCheckboxesPage } from '../../pages/checkboxes.page'
import test from './../../utils'

const wppCheckboxesPage = new WppCheckboxesPage()

test.beforeEach(async ({ page }) => {
  await wppCheckboxesPage.setPage(page)
  await wppCheckboxesPage.init()
  await wppCheckboxesPage.openPage('vc/checkboxes')
  await wppCheckboxesPage.setViewportSize(1280, 720)
  await page.waitForTimeout(1000)
})

test.describe('WPP Checkboxes', () => {
  test('[WPPOPENDS-T328] Check that the component passes the visual check', async () => {
    await expect(wppCheckboxesPage.checkboxesDiv).toHaveScreenshot()
  })
})
