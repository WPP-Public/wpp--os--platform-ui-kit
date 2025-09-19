import { expect } from '@playwright/test'
import { WppTextAreasPage } from '../../pages/text-areas.page'
import test from './../../utils'

const wppTextAreasPage = new WppTextAreasPage()

test.beforeEach(async ({ page }) => {
  await wppTextAreasPage.setPage(page)
  await wppTextAreasPage.init()
  await wppTextAreasPage.openPage('vc/text-areas')
  await wppTextAreasPage.setViewportSize(1280, 720)
})

test.describe('WPP Text Areas', () => {
  test('[WPPOPENDS-T407] Check that the component passes the visual check', async () => {
    await expect(wppTextAreasPage.textAreaInputsDiv).toHaveScreenshot()
  })
})
