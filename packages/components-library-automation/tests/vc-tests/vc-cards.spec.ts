import { expect } from '@playwright/test'
import { WppCardsPage } from '../../pages/cards.page'
import test from './../../utils'

const wppCardsPage = new WppCardsPage()

test.beforeEach(async ({ page }) => {
  await wppCardsPage.setPage(page)
  await wppCardsPage.init()
  await wppCardsPage.openPage('vc/cards')
  await wppCardsPage.setViewportSize(1920, 1080)
})

test.describe('WPP Cards', () => {
  test('[WPPOPENDS-T408] Check that the component passes the visual check', async () => {
    await expect(wppCardsPage.cards).toHaveScreenshot()
  })
})
