import { expect } from '@playwright/test'
import { WppPillsPage } from '../../pages/pills.page'
import test from './../../utils'

const wppPillsPage = new WppPillsPage()

test.beforeEach(async ({ page }) => {
  await wppPillsPage.setPage(page)
  await wppPillsPage.init()
  await wppPillsPage.openPage('vc/pills')
  await wppPillsPage.setViewportSize(1280, 720)
})

test.describe('WPP Pills', () => {
  test('[WPPOPENDS-T333] Check that the component passes the visual check', async () => {
    await expect(wppPillsPage.pills).toHaveScreenshot()
  })
})
