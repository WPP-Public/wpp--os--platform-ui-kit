import { expect } from '@playwright/test'
import { WppDividerPage } from '../../pages/divider.page'
import test from './../../utils'

const wppDividerPage = new WppDividerPage()

test.beforeEach(async ({ page }) => {
  await wppDividerPage.setPage(page)
  await wppDividerPage.init()
  await wppDividerPage.openPage('vc/divider')
  await wppDividerPage.setViewportSize(1280, 720)
})

test.describe('WPP Divider', () => {
  test('[WPPOPENDS-T104] Check that the component passes the visual check', async () => {
    await expect(wppDividerPage.divider).toHaveScreenshot()
  })
})
