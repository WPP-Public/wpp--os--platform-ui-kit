import { expect } from '@playwright/test'
import { WppAccordionsPage } from '../../pages/accordions.page'
import test from './../../utils'

const wppAccordionsPage = new WppAccordionsPage()

test.beforeEach(async ({ page }) => {
  await wppAccordionsPage.setPage(page)
  await wppAccordionsPage.init()
  await wppAccordionsPage.openPage('vc/accordions')
  await wppAccordionsPage.setViewportSize(1280, 800)
})

test.describe('WPP Accordions', () => {
  test('[WPPOPENDS-T702] Check that the component passes the visual check', async ({ page }) => {
    await page.waitForTimeout(500)
    await wppAccordionsPage.usersList.click()

    await expect(wppAccordionsPage.accordions).toHaveScreenshot()
  })

  test('[WPPOPENDS-T742] Check that the component is opened when clicked on the truncated header', async ({ page }) => {
    await page.waitForTimeout(500)
    await wppAccordionsPage.truncatedAccordion.click()

    await expect(wppAccordionsPage.accordions).toHaveScreenshot()
  })
})
