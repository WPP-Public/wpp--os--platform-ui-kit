import { test, expect } from '@playwright/test'
import { WppInlineMessagesPage } from '../../../pages/inline-messages.page'

const wppInlineMessagesPage = new WppInlineMessagesPage()
let consoleErrors

test.beforeEach(async ({ page }) => {
  await wppInlineMessagesPage.setPage(page)
  await wppInlineMessagesPage.init()
  await wppInlineMessagesPage.openPage('vc/inline-messages')
  consoleErrors = await wppInlineMessagesPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  //if the value of the multiple select is a string then the console error is displayed
  await expect(consoleErrors.length <= 2).toBeTruthy()
})

test.describe('Inline messages', () => {
  //WPPLONOP-24371
  test('[WPPOPENDS-T937] Check inline messages s-size typography', async ({ page }) => {
    const helperMessage = page.locator('[class*="inline-message-wrapper"][class*="size-s"]').nth(2)

    const fontSize = await helperMessage.evaluate(el => {
      const style = window.getComputedStyle(el)
      return style.getPropertyValue('font-size')
    })

    const fontWeight = await helperMessage.evaluate(el => {
      const style = window.getComputedStyle(el)
      return style.getPropertyValue('font-weight')
    })

    const color = await helperMessage.evaluate(el => {
      const style = window.getComputedStyle(el)
      return style.getPropertyValue('color')
    })

    await expect(fontSize).toBe('12px')
    await expect(fontWeight).toBe('500')
    await expect(color).toBe('rgb(77, 83, 88)')
  })

  //WPPLONOP-25757
  test('[WPPOPENDS-T816] Check that close button is optional and can be hidden', async ({ page }) => {
    const warningMessage = page.locator('[action-btn-text="Action"][message="Warning message"]')
    const closeBtn = warningMessage.locator('.close-btn.wpp-action-button')
    await closeBtn.hover()
    await expect(closeBtn).toBeVisible()
    await expect(warningMessage).toHaveAttribute('hide-close-btn', 'false')
    await wppInlineMessagesPage.hideCloseBtn.click()
    await closeBtn.waitFor({ state: 'detached' })
    
    const hiddenCloseBtn = await closeBtn.isVisible()

    await expect(hiddenCloseBtn).toEqual(false)
    await expect(warningMessage).toHaveAttribute('hide-close-btn', 'true')
    await wppInlineMessagesPage.showCloseBtn.click()
    await expect(closeBtn).toBeVisible()
    await expect(warningMessage).toHaveAttribute('hide-close-btn', 'false')
  })

  test('[WPPOPENDS-T1319] Check that the title can be hidden', async ({ page }) => {
    const warningMessage = page.locator('[action-btn-text="Action"][message="Warning message"]')
    const title = warningMessage.locator('.title')

    await title.hover()
    await expect(title).toBeVisible()
    await expect(warningMessage).toHaveAttribute('title-text', 'Title')
    await wppInlineMessagesPage.removeTitleBtn.click()

    await expect(warningMessage).toHaveAttribute('title-text', '')
    await expect(title).not.toBeVisible()

    await wppInlineMessagesPage.addTitleBtn.click()
    await expect(title).toBeVisible()
    await expect(warningMessage).toHaveAttribute('title-text', 'Title')
  })

  //WPPLONOP-23334
  test('[WPPOPENDS-T817] Check that component has L size', async ({ page }) => {
    const warningMessage = await page.locator('.inline-message-wrapper.size-l.warning-message')
    const warningMessageText = await warningMessage.locator('.message')
    await expect(warningMessageText).toHaveText('Warning message')

    const errorMessage = await page.locator('.inline-message-wrapper.size-l.error-message')
    const errorMessageText = await errorMessage.locator('.message')
    await expect(errorMessageText).toHaveText('Error message')

    const informationMessage = await page.locator('[message="Information message"] >> .inline-message-wrapper.size-l.information-message')
    const informationMessageText = await informationMessage.locator('.message')
    await expect(informationMessageText).toHaveText('Information message')

    const successMessage = await page.locator('.inline-message-wrapper.size-l.success-message')
    const successMessageText = await successMessage.locator('.message')
    await expect(successMessageText).toHaveText('Success message')
  })
})
