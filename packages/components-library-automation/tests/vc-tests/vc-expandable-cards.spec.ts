import { expect } from '@playwright/test'
import { WppExpandableCardsPage } from '../../pages/expandable-cards.page'
import test from './../../utils'

const wppExpandableCardsPage = new WppExpandableCardsPage()

test.beforeEach(async ({ page }) => {
  await wppExpandableCardsPage.setPage(page)
  await wppExpandableCardsPage.init()
  await wppExpandableCardsPage.openPage('vc/expandable-card')
  await wppExpandableCardsPage.setViewportSize(1280, 720)
})

test.describe('WPP Expandable Cards', () => {
  test('[WPPOPENDS-T410] Check that the component passes the visual check', async () => {
    await expect(wppExpandableCardsPage.expandableCards).toHaveScreenshot()
  })
})
