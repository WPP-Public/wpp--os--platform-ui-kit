import { expect } from '@playwright/test'
import { WppSpinnerPage } from '../../pages/spinner.page'
import test from './../../utils'

const wppSpinnerPage = new WppSpinnerPage()

test.beforeEach(async ({ page }) => {
  await wppSpinnerPage.setPage(page)
  await wppSpinnerPage.init()
  await wppSpinnerPage.openPage('vc/spinner')
  await wppSpinnerPage.setViewportSize(1280, 720)
})

test.describe('WPP Spinners', () => {
  test('[WPPOPENDS-T319] Check that the component passes the visual check', async () => {
    await expect(wppSpinnerPage.spinner).toHaveScreenshot()
  })
})
