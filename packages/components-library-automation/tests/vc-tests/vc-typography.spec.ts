import { WppTypographyPage } from '../../pages/typography.page'
import { expect } from '@playwright/test'
import test from './../../utils'

const wppTypographyPage = new WppTypographyPage()

test.beforeEach(async ({ page }) => {
  await wppTypographyPage.setPage(page)
  await wppTypographyPage.init()
  await wppTypographyPage.openPage('vc/typography')
  await wppTypographyPage.setViewportSize(1280, 720)
})

test.describe('WPP Typography', () => {
  test('[WPPOPENDS-T703] Check that the component passes the visual check', async () => {
    await expect(wppTypographyPage.typography).toHaveScreenshot()
  })
})
