import { expect } from '@playwright/test'
import { WppCardsGroupPage } from '../../pages/cards-group.page'
import test from './../../utils'

const wppCardsGroupPage = new WppCardsGroupPage()

test.beforeEach(async ({ page }) => {
  await wppCardsGroupPage.setPage(page)
  await wppCardsGroupPage.init()
  await wppCardsGroupPage.openPage('vc/card-group')
  await wppCardsGroupPage.setViewportSize(1280, 720)
})

test.describe('WPP Cards Group', () => {
  test('[WPPOPENDS-T409] Check that the component passes the visual check', async () => {
    await expect(wppCardsGroupPage.cardsGroups).toHaveScreenshot()
  })
})
