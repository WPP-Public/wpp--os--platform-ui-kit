import { test, expect } from '@playwright/test'
import { WppTagsPage } from '../../../pages/tags.page'
import * as colorTable from '../../../../components-library/src/themes/wpp.json'

const wppTagsPage = new WppTagsPage()
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppTagsPage.setPage(page)
  await wppTagsPage.init()
  await wppTagsPage.openPage('vc/tags')
  consoleErrors = await wppTagsPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Tags', () => {
  //WPPLONOP-25139
  test('[WPPOPENDS-T649] Check that categoricalColorIndex color correspond to correct colors', async ({ page }) => {
    const colorIndex9BgColor = await wppTagsPage.colorIndex9.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      console.log(styles.backgroundColor)
      return styles.getPropertyValue('--tag-bg-color');
    })
    const catColorValue = colorTable.content.light.color.dataviz.cat.neutral[9]
    await expect(colorIndex9BgColor).toEqual(catColorValue)

    const colorIndex9TextColor = await wppTagsPage.colorIndex9.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      console.log(styles.backgroundColor)
      return styles.getPropertyValue('--tag-color');
    })
    const catTextColorValue = colorTable.content.light.color.dataviz.cat.dark[9]
    await expect(colorIndex9TextColor).toEqual(catTextColorValue)
  })

  test('[WPPOPENDS-T672] Check compact tags', async ({ page }) => {
    const overlay = page.locator('.overlay').nth(8)
    const tagElement = page.locator('.wpp-typography').nth(4)
    await expect(tagElement).toHaveCSS('--wpp-default-type-font-size', '12px')
    await expect(tagElement).toHaveCSS('--tag-with-icon-padding', '2px 8px 2px 6px')
    await expect(tagElement).toHaveCSS('--tag-padding', '2px 8px')
    await expect(tagElement).toHaveCSS('--tag-typography-color', 'rgba(18, 22, 25, 75%)')
    await expect(tagElement).toHaveCSS('--tag-icon-color', 'rgba(18, 22, 25, 65%)')
    await expect(overlay).toHaveCSS('opacity', '0.25')
  })
})
