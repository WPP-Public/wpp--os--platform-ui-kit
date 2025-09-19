import { test, expect } from '@playwright/test'
import { WppPaginationPage } from '../../../pages/pagination.page'

const wppPaginationsPage = new WppPaginationPage()
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppPaginationsPage.setPage(page)
  await wppPaginationsPage.init()
  await wppPaginationsPage.openPage('vc/pagination')
  consoleErrors = await wppPaginationsPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Paginations', () => {
//WPPLONOP-23200
  test('[WPPOPENDS-T952] Check spacing between page select and page range', async ({ page }) => {
    const wppDivider = await page.locator('.control-pagination-wrapper >> .wpp-divider').first()
    await expect(wppDivider).toHaveCSS('margin-left', '6px')

    const pageSelectItem = await page.locator('.anchor').first()
    await expect(pageSelectItem).toHaveCSS('overflow', 'hidden')
    await expect(pageSelectItem).toHaveCSS('--wpp-input-select-min-width', '46px')
  })
})
