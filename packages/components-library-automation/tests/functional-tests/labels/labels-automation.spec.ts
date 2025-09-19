import { test, expect } from '@playwright/test'
import { WppLabelsPage } from '../../../pages/labels.page'

const wppLabelsPage = new WppLabelsPage()

test.beforeEach(async ({ page }) => {
  await wppLabelsPage.setPage(page)
  await wppLabelsPage.init()
  await wppLabelsPage.openPage('vc/labels')
})

test.describe('WPP Labels', () => {
  test('[WPPOPENDS-T289] Check that the default label has the default typography and color', async () => {
    await expect(wppLabelsPage.defaultLabel.locator('.text')).toHaveCSS('color', 'rgb(77, 83, 88)')
    await expect(wppLabelsPage.defaultLabel.locator('.text')).toHaveAttribute('type', 's-strong')
  })
})
