import { expect } from '@playwright/test'
import { WppTogglesPage } from '../../pages/toggles.page'
import test from './../../utils'

const wppTogglesPage = new WppTogglesPage()

test.beforeEach(async ({ page }) => {
  await wppTogglesPage.setPage(page)
  await wppTogglesPage.init()
  await wppTogglesPage.openPage('vc/toggles')
  await wppTogglesPage.setViewportSize(1280, 720)
})

test.describe('WPP Toggles', () => {
  test('[WPPOPENDS-T705] Check that the component passes the visual check', async () => {
    await expect(wppTogglesPage.togglesDiv).toHaveScreenshot()
  })
})
