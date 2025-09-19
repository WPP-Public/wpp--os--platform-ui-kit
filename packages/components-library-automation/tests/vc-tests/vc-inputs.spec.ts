import { expect } from '@playwright/test'
import { WppInputsPage } from '../../pages/inputs.page'
import test from './../../utils'

const wppInputsPage = new WppInputsPage()

test.beforeEach(async ({ page }) => {
  await wppInputsPage.setPage(page)
  await wppInputsPage.init()
  await wppInputsPage.openPage('vc/inputs')
  await page.waitForTimeout(1000)
})

test.describe('WPP Input', () => {
  test('[WPPOPENDS-T331] Check that the component passes the visual check - M size', async () => {
    await expect(wppInputsPage.mSizeInputsDiv).toHaveScreenshot()
  })

  test('[WPPOPENDS-T353] Check that the component passes the visual check - S size', async () => {
    await expect(wppInputsPage.sSizeInputsDiv).toHaveScreenshot()
  })
})

test.describe('WPP Search Inputs', () => {
  test('[WPPOPENDS-T332] Check that the component passes the visual check', async ({ page }) => {
    await wppInputsPage.inputWithText.fill('Search query')
    await page.getByRole('heading', { name: 'Search Inputs', exact: true }).hover()

    expect(await wppInputsPage.searchInputsContainer.first().screenshot()).toMatchSnapshot()
  })
})
