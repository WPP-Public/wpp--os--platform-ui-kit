import { test, expect } from '@playwright/test'
import { WppExpandableCardsPage } from '../../../pages/expandable-cards.page'

const wppExpandableCardsPage = new WppExpandableCardsPage()

test.beforeEach(async ({ page }) => {
  await wppExpandableCardsPage.setPage(page)
  await wppExpandableCardsPage.init()
  await wppExpandableCardsPage.openPage('vc/expandable-card')
})

test.describe('WPP Expandable Cards', () => {
  test('[WPPOPENDS-T789] Check padding between chevron and title for expendable cards', async () => {
    await expect(wppExpandableCardsPage.expendableCard).toHaveCSS('--accordion-icon-margin', '0 8px 0 0')
  })

  test('[WPPOPENDS-T759] Check secondary expendable cards background and no shadow', async () => {
    await wppExpandableCardsPage.secondaryExpendableCard.hover()
    await expect(wppExpandableCardsPage.secondaryExpendableCard).toHaveCSS('box-shadow', 'none')
    await expect(wppExpandableCardsPage.secondaryExpendableCard).toHaveCSS('background', /^rgb\(248, 249, 251\)/)
    await expect(wppExpandableCardsPage.secondaryExpendableCard).toHaveCSS('--expandable-card-secondary-bg-color', '#F8F9FB')
  })
})