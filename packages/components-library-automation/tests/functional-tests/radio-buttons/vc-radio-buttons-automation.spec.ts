import { test, expect } from '@playwright/test'
import { WppRadioPage } from '../../../pages/radio.page'
import * as colorTable from '../../../../components-library/src/themes/wpp.json'

const wppRadioPage = new WppRadioPage()
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppRadioPage.setPage(page)
  await wppRadioPage.init()
  await wppRadioPage.openPage('vc/radio-buttons')
  consoleErrors = await wppRadioPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Radio Button', () => {
  //WPPLONOP-8972
  test("[WPPOPENDS-T951] Check that for disabled radio buttin text color is correct", async ({page}) => {
    const disabledRadioBtnLabel = await page.locator('.wpp-radio.wpp-radio-wrapper.wpp-disabled.wpp-checked >> .wpp-internal-label.s-body.disabled').first()
    const colorValue = colorTable.content.light.color.grey[500]
    await expect(disabledRadioBtnLabel).toHaveCSS('--radio-label-text-color-checked-disabled',colorValue)
  })
})
