import { test, expect } from '@playwright/test'
import { WppCardsPage } from '../../../pages/cards.page'

const wppCardsPage = new WppCardsPage()

test.beforeEach(async ({ page }) => {
  await wppCardsPage.setPage(page)
  await wppCardsPage.init()
  await wppCardsPage.openPage('vc/cards')
})

test.describe('WPP Cards', () => {
  test('[WPPOPENDS-T657] wppClick event is triggered when click on "Truncation with actions" section card and should not be triggered if click on action button from the card', async ({ page }) => {
    const consoleMessages: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'log') {
        consoleMessages.push(msg.text())
      }
    })

    await wppCardsPage.primaryCard.click()
    await page.waitForTimeout(1000)
    await expect(consoleMessages).toEqual(["has Clicked Card"])

    await wppCardsPage.actionBtn.click()
    await page.waitForTimeout(1000)
    await expect(consoleMessages).toEqual(["has Clicked Card"])

    await wppCardsPage.primaryCard.click()
    await page.waitForTimeout(1000)
    await expect(consoleMessages).toEqual(["has Clicked Card", "has Clicked Card"])

    await wppCardsPage.actionBtn.click()
    await page.waitForTimeout(1000)
    await expect(consoleMessages).toEqual(["has Clicked Card", "has Clicked Card"])
  })
})