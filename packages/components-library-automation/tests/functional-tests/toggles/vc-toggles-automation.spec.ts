import { test, expect } from '@playwright/test'
import { WppTogglesPage } from '../../../pages/toggles.page'
import * as colorTable from '../../../../components-library/src/themes/wpp.json'

const wppTogglesPage = new WppTogglesPage()
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppTogglesPage.setPage(page)
  await wppTogglesPage.init()
  await wppTogglesPage.openPage('vc/toggles')
  consoleErrors = await wppTogglesPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Toggle', () => {
  //WPPLONOP-8972
  test("[WPPOPENDS-T834] Check that disabled toggle has correct text color", async ({page}) => {
    const disabledToggle = await page.locator('.wpp-toggle.wpp-toggle-wrapper.wpp-disabled.wpp-checked >> .wpp-internal-label.s-body.disabled').nth(1)
    const colorValue = colorTable.content.light.color.grey[500]
    await expect(disabledToggle).toHaveCSS(
      '--toggle-label-color-checked-disabled', colorValue)
  })
})