import { expect, test } from '@playwright/test'
import { WppButtonsPage } from '../../../pages/buttons.page'

const wppButtonsPage = new WppButtonsPage()
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppButtonsPage.setPage(page)
  await wppButtonsPage.init()
  await wppButtonsPage.openPage('vc/buttons')
  consoleErrors = await wppButtonsPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Icon Button', () => {
  test('[WPPOPENDS-T808] Check that component has appropriate properties for disabled state', async () => {
    await wppButtonsPage.checkElementStatus(wppButtonsPage.regularLoadingButton.locator('button'), 'disabled')
  })
})
