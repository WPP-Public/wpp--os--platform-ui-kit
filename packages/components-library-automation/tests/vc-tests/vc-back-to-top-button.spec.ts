import { expect } from '@playwright/test'
import { WppBackToTopButtonPage } from '../../pages/back-to-top-button.page'
import test from './../../utils'

const wppBackToTopButtonPage = new WppBackToTopButtonPage()

test.beforeEach(async ({ page }) => {
  await wppBackToTopButtonPage.setPage(page)
  await wppBackToTopButtonPage.init()
  await wppBackToTopButtonPage.openPage('back-to-top-button')
  await wppBackToTopButtonPage.setViewportSize(1280, 720)
})

test.describe('WPP Back To Top Button', () => {
  test('[WPPOPENDS-T307] Check that the component passes the visual check', async ({ page }) => {
    //Scroll to the bottom of the page
    await page.mouse.wheel(0, 25000)
    await page.waitForTimeout(1000)
    await wppBackToTopButtonPage.backToTopButton.click()
    await page.waitForTimeout(1500)

    await expect(page).toHaveScreenshot()
  })
})
