declare global {
  interface Window {
    keydownFired: boolean
  }
}

import { test, expect } from '@playwright/test'
import { WppSegmentedControlsPage } from '../../../pages/segmented-controls.page'

const wppSegmentedControlsPage = new WppSegmentedControlsPage()
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppSegmentedControlsPage.setPage(page)
  await wppSegmentedControlsPage.init()
  await wppSegmentedControlsPage.openPage('vc/segmented-controls')
  consoleErrors = await wppSegmentedControlsPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Segmented Controls', () => {
  //WPPLONOP-22987
  test('[WPPOPENDS-T940] Check that component has appropriate height for S and M sizes', async ({ page }) => {
    const segmentedControlItemSizeM = await page.locator('.wpp-segmented-control-item').first()
    const sizeSegmentedControlItemSizeM = await segmentedControlItemSizeM.boundingBox()
    await expect(sizeSegmentedControlItemSizeM?.height).toBe(40)

    const segmentedControlItemSizeS = await page.locator('.wpp-segmented-control-item').nth(-1)
    const sizeSegmentedControlItemSizeS = await segmentedControlItemSizeS.boundingBox()
    await expect(sizeSegmentedControlItemSizeS?.height).toBe(32)
  })

  //WPPLONOP-19227
  test('[WPPOPENDS-T652] Check that active value is changed when select another item', async ({ page }) => {
    const segmentedControlItemFirst = await page.locator('.wpp-segmented-control-item').first()
    await expect(segmentedControlItemFirst).toHaveAttribute('active')
    await expect(segmentedControlItemFirst).toHaveAttribute('value', '1')
    const segmentedControlItemSecond = await page.locator('.wpp-segmented-control-item').nth(1)
    await segmentedControlItemSecond.click()
    await expect(segmentedControlItemSecond).toHaveAttribute('active')
    await expect(segmentedControlItemSecond).toHaveAttribute('value', '2')
    await expect(segmentedControlItemFirst).toHaveAttribute('active', 'false')
  })

  //WPPLONOP-20788
  test('[WPPOPENDS-T941] Check that selected item border does not change after pressing arrows on keyboard', async ({
    page,
  }) => {
    const item = await page.locator('.wpp-segmented-control-item').nth(1)
    await item.click()
    await expect(item).toHaveAttribute('active')
    await expect(item).toHaveCSS('outline-style', 'none')

    // click keyword arrow
    await page.evaluate(() => {
      window.keydownFired = false
      document.addEventListener('keydown', event => {
        if (event.key === 'ArrowRight') {
          window.keydownFired = true
        }
      })
    })
    await page.keyboard.press('ArrowRight')
    await page.waitForTimeout(500)
    const keydownFired = await page.evaluate(() => window.keydownFired)
    expect(keydownFired).toBeTruthy()

    await expect(item).toHaveCSS('outline-style', 'none')
  })

  test('[WPPOPENDS-T668] Check that text variant can have counter and icon variant cannot have counter', async ({
    page,
  }) => {
    const parentElementWithCounter = await page.locator('.wpp-segmented-control').first()
    const parentElementWithCounterChildren = await parentElementWithCounter
      .locator('[value="4"]')
      .locator('[part="item"]')
    const counterTextPresent = await parentElementWithCounterChildren.allInnerTexts()
    await expect(counterTextPresent).toEqual(['(3)'])

    const parentElementWithoutCounter = await page.locator('.wpp-segmented-control').nth(6)
    const parentElementWithoutCounterChildren = await parentElementWithoutCounter
      .locator('[value="4"]')
      .locator('[part="item"]')
    const counterTextAbsent = await parentElementWithoutCounterChildren.allInnerTexts()
    await expect(counterTextAbsent).toEqual([''])
  })
})
