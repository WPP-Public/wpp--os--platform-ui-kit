import { test, expect } from '@playwright/test'
import { WppCardsGroupPage } from '../../../pages/cards-group.page'

const wppCardsGroupPage = new WppCardsGroupPage()

test.beforeEach(async ({ page }) => {
  await wppCardsGroupPage.setPage(page)
  await wppCardsGroupPage.init()
  await wppCardsGroupPage.openPage('vc/card-group')
})

test.describe('WPP Cards Group', () => {
  test('[WPPOPENDS-T271] Check that multiple card can be selected by clicking on card', async () => {
    await wppCardsGroupPage.multipleCardItemB.first().click()

    await expect(wppCardsGroupPage.multipleCardItemB.first()).toHaveJSProperty('checked', true)
  })

  test('[WPPOPENDS-T271] Check that multiple card can be unselected by clicking on card', async () => {
    await wppCardsGroupPage.multipleCardItemA.first().click()

    await expect(wppCardsGroupPage.multipleCardItemA.first()).toHaveJSProperty('checked', false)
  })

  test('[WPPOPENDS-T270] Check that single card can be selected by clicking on card', async () => {
    await wppCardsGroupPage.singleCardItemB.first().click()

    await expect(wppCardsGroupPage.singleCardItemB.first()).toHaveJSProperty('checked', true)
    await expect(wppCardsGroupPage.singleCardItemA.first()).toHaveJSProperty('checked', false)
  })

  test('[WPPOPENDS-T662] Check that card group can have no selected values by default', async ({ page }) => {
    await wppCardsGroupPage.openPage('bugfixes/29773')

    const multipleGroupA = page.locator('[data-testid="multiple-card-item-a"]')
    await multipleGroupA.scrollIntoViewIfNeeded()
    await expect(multipleGroupA).toHaveJSProperty('checked', false)
    const multipleGroupB = page.locator('[data-testid="multiple-card-item-b"]')
    await expect(multipleGroupB).toHaveJSProperty('checked', false)
    const multipleGroupC = page.locator('[value="item-c"]').first()
    await expect(multipleGroupC).toHaveJSProperty('checked', false)

    const singleGroupA = page.locator('[data-testid="single-card-item-a"]')
    await expect(singleGroupA).toHaveJSProperty('checked', false)
    const singleGroupB = page.locator('[data-testid="single-card-item-b"]')
    await expect(singleGroupB).toHaveJSProperty('checked', false)
    const singleGroupC = page.locator('[value="item-c"]').nth(1)
    await expect(singleGroupC).toHaveJSProperty('checked', false)

    const noRadioGroupA = page.locator('[ value="item-a"]').nth(2)
    await expect(noRadioGroupA).toHaveJSProperty('checked', false)
    const noRadioGroupB = page.locator('[ value="item-b"]').nth(2)
    await expect(noRadioGroupB).toHaveJSProperty('checked', false)
    const noRadioGroupC = page.locator('[value="item-c"]').nth(2)
    await expect(noRadioGroupC).toHaveJSProperty('checked', false)
  })
})
