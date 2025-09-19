import { expect } from '@playwright/test'
import { WppRadioPage } from '../../pages/radio.page'
import test from './../../utils'

const wppRadioPage = new WppRadioPage()

test.beforeEach(async ({ page }) => {
  await wppRadioPage.setPage(page)
  await wppRadioPage.init()
  await wppRadioPage.openPage('vc/radio-buttons')
  await wppRadioPage.setViewportSize(1280, 720)
})

test.describe('WPP Radio Buttons', () => {
  test('[WPPOPENDS-T402] Check that the component passes the visual check', async () => {
    await expect(wppRadioPage.radioDiv).toHaveScreenshot()
  })
})
