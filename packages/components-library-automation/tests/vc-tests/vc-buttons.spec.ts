import { expect } from '@playwright/test'
import { WppButtonsPage } from '../../pages/buttons.page'
import test from './../../utils'

const wppButtonsPage = new WppButtonsPage()

test.beforeEach(async ({ page }) => {
  await wppButtonsPage.setPage(page)
  await wppButtonsPage.init()
  await wppButtonsPage.openPage('vc/buttons')
  await wppButtonsPage.setViewportSize(1280, 720)
})

test.describe('WPP Regular Buttons', () => {
  test('[WPPOPENDS-T308] Check that the component passes the visual check', async () => {
    await expect(wppButtonsPage.regularButtons).toHaveScreenshot()
  })
  
  test('[WPPOPENDS-T1281] Check if it is possible to set focus on the first button', async () => {
      await wppButtonsPage.setFocusBtn.first().click()
      await expect(wppButtonsPage.regularButton.locator('button').first()).toHaveCSS('background-color', 'rgb(10, 47, 255)')
      await expect(wppButtonsPage.regularButton.locator('button').first()).toHaveCSS('box-shadow', 'rgb(255, 255, 255) 0px 0px 0px 1px, rgb(0, 20, 204) 0px 0px 0px 2px')
      //action buttons
      await wppButtonsPage.setFocusBtn.nth(1).click()
      await expect(wppButtonsPage.actionPrimaryButton.locator('button').first()).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
      await expect(wppButtonsPage.actionPrimaryButton.locator('button').first()).toHaveCSS('box-shadow', 'rgb(255, 255, 255) 0px 0px 0px 1px, rgb(0, 20, 204) 0px 0px 0px 2px')
      //filter buttons
      await wppButtonsPage.setFocusBtn.nth(2).click()
      await expect(wppButtonsPage.filterBtn.first()).toHaveCSS('background-color', 'rgb(244, 245, 247)')
      await expect(wppButtonsPage.filterBtn.first()).toHaveCSS('box-shadow', 'rgb(255, 255, 255) 0px 0px 0px 1px, rgb(0, 20, 204) 0px 0px 0px 2px')
      //sort buttons
      await wppButtonsPage.setFocusBtn.nth(3).click()
      await expect(wppButtonsPage.sortBtn.first()).toHaveCSS('background-color', 'rgb(244, 245, 247)')
      await expect(wppButtonsPage.sortBtn.first()).toHaveCSS('box-shadow', 'rgb(255, 255, 255) 0px 0px 0px 1px, rgb(0, 20, 204) 0px 0px 0px 2px')
      //float buttons
      await wppButtonsPage.setFocusBtn.nth(4).click()
      await expect(wppButtonsPage.floatBtn.first()).toHaveCSS('background-color', 'rgb(10, 47, 255)')
      await expect(wppButtonsPage.floatBtn.first()).toHaveCSS('box-shadow', 'rgb(255, 255, 255) 0px 0px 0px 1px, rgb(0, 20, 204) 0px 0px 0px 2px')
      //back to top buttons
      await wppButtonsPage.setFocusBtn.nth(5).click()
      await expect(wppButtonsPage.backToTopBtn.first()).toHaveCSS('background-color', 'rgb(224, 235, 255)')
      await expect(wppButtonsPage.backToTopBtn.first()).toHaveCSS('box-shadow', 'rgb(255, 255, 255) 0px 0px 0px 1px, rgb(0, 20, 204) 0px 0px 0px 2px')
    })

    test('[WPPOPENDS-T1282] Check that it is possible to interact with the buttons using the keyboard', async ({ page }) => {
      //action buttons
      await wppButtonsPage.setFocusBtn.nth(1).click()
      await page.keyboard.press('Tab')
      await expect(wppButtonsPage.plusIconActionPrimaryButton).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
      await expect(wppButtonsPage.plusIconActionPrimaryButton.locator('button')).toHaveCSS('box-shadow', 'rgb(255, 255, 255) 0px 0px 0px 1px, rgb(0, 20, 204) 0px 0px 0px 2px')
      await page.keyboard.down('Enter')
      await page.waitForTimeout(300);
      await expect(wppButtonsPage.plusIconActionPrimaryButton).toHaveCSS('--ab-bg-color-active', '#4D5358')
      //filter buttons
      await wppButtonsPage.setFocusBtn.nth(2).click()
      await page.keyboard.press('Tab')
      await expect(wppButtonsPage.filterBtn.nth(2)).toHaveCSS('background-color', 'rgb(244, 245, 247)')
      await expect(wppButtonsPage.filterBtn.nth(2)).toHaveCSS('box-shadow', 'rgb(255, 255, 255) 0px 0px 0px 1px, rgb(0, 20, 204) 0px 0px 0px 2px')
      await page.keyboard.down('Enter')
      await page.waitForTimeout(300);
      await expect(wppButtonsPage.filterBtn.nth(2)).toHaveCSS('background-color', 'rgb(231, 234, 238)')
      //float buttons
      await wppButtonsPage.setFocusBtn.nth(4).click()
      await page.keyboard.press('Tab')
      await expect(wppButtonsPage.floatBtn.nth(3)).toHaveCSS('background-color', 'rgb(10, 47, 255)')
      await expect(wppButtonsPage.floatBtn.nth(3)).toHaveCSS('box-shadow', 'rgb(255, 255, 255) 0px 0px 0px 1px, rgb(0, 20, 204) 0px 0px 0px 2px')
      await page.keyboard.down('Enter')
      await page.waitForTimeout(300);
      await expect(wppButtonsPage.floatBtn.nth(3)).toHaveCSS('background-color', 'rgb(0, 7, 143)')
      //more buttons
      await wppButtonsPage.setFocusBtn.nth(5).click()
      await page.keyboard.press('Tab')
      await expect(wppButtonsPage.moreButtons.locator('button').first()).toHaveCSS('background-color', 'rgb(224, 235, 255)')
      await expect(wppButtonsPage.moreButtons.locator('button').first()).toHaveCSS('box-shadow', 'rgb(255, 255, 255) 0px 0px 0px 1px, rgb(0, 20, 204) 0px 0px 0px 2px')
      await page.keyboard.down('Enter')
      await page.waitForTimeout(300);
      await expect(wppButtonsPage.moreButtons.locator('button').first()).toHaveCSS('background-color', 'rgb(194, 212, 255)')
    })
})

test.describe('WPP Action Buttons', () => {
  test('[WPPOPENDS-T306] Check that the component passes the visual check', async () => {
    await expect(wppButtonsPage.actionButtons).toHaveScreenshot()
  })
})

test.describe('WPP Icon Buttons', () => {
  test('[WPPOPENDS-T309] Check that the component passes the visual check', async () => {
    await expect(wppButtonsPage.iconButtons).toHaveScreenshot()
  })
})

test.describe('WPP More Buttons', () => {
  test('[WPPOPENDS-T1280] Check that the component passes the visual check', async () => {
    await expect(wppButtonsPage.moreButtons).toHaveScreenshot()
  })
})