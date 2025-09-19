import { expect } from '@playwright/test'
import { WppInlineMessagesPage } from '../../pages/inline-messages.page'
import test from './../../utils'

const wppInlineMessagesPage = new WppInlineMessagesPage()

test.beforeEach(async ({ page }) => {
  await wppInlineMessagesPage.setPage(page)
  await wppInlineMessagesPage.init()
  await wppInlineMessagesPage.openPage('vc/inline-messages')
  await wppInlineMessagesPage.setViewportSize(1280, 720)
})

test.describe('WPP Inline Messages', () => {
  test('[WPPOPENDS-T316] Check that the component passes the visual check', async ({ page }) => {
    await page.waitForTimeout(500)
    await wppInlineMessagesPage.hoverMessage.locator('.tooltip.wpp-tooltip').first().hover()
    await page.getByRole('tooltip', { name: 'Lorem ipsum dolor sit amet,' }).locator('span').hover()
    await page.waitForTimeout(500)

    await expect(wppInlineMessagesPage.inlineMessages).toHaveScreenshot()
  })

  test('[WPPOPENDS-T1320] Check that the component passes the visual check - Without title', async ({ page }) => {
    const warningMessage = page.locator('[action-btn-text="Action"][message="Warning message"]')
    const title = warningMessage.locator('.title')

    await title.hover()
    await expect(title).toBeVisible()
    await expect(warningMessage).toHaveAttribute('title-text', 'Title')
    await wppInlineMessagesPage.removeTitleBtn.click()

    await expect(warningMessage).toHaveAttribute('title-text', '')
    await expect(title).not.toBeVisible()
    await page.waitForTimeout(500)

    await expect(wppInlineMessagesPage.inlineMessages).toHaveScreenshot()
  })

  test('[WPPOPENDS-T1324] Check that the component passes the visual check - Without close button', async ({ page }) => {
    const warningMessage = page.locator('[action-btn-text="Action"][message="Warning message"]')
    const closeBtn = warningMessage.locator('.close-btn.wpp-action-button')

    await wppInlineMessagesPage.hideCloseBtn.click()
    await closeBtn.waitFor({ state: 'detached' })
    await expect(closeBtn).not.toBeVisible()
    await page.getByRole('heading', { name: 'L Size Messages' }).hover()
    await page.waitForTimeout(500)

    await expect(wppInlineMessagesPage.inlineMessages).toHaveScreenshot()
  })

  test('[WPPOPENDS-T1325] Check that the component passes the visual check - Without close button and title', async ({ page }) => {
    const warningMessage = page.locator('[action-btn-text="Action"][message="Warning message"]')
    const closeBtn = warningMessage.locator('.close-btn.wpp-action-button')

    await wppInlineMessagesPage.hideCloseBtn.click()
    await closeBtn.waitFor({ state: 'detached' })
    await expect(closeBtn).not.toBeVisible()
    await wppInlineMessagesPage.removeTitleBtn.click()
    await expect(warningMessage).toHaveAttribute('title-text', '')
    await expect(warningMessage.locator('.title')).not.toBeVisible()
    await page.waitForTimeout(500)

    await expect(wppInlineMessagesPage.inlineMessages).toHaveScreenshot()
  })
})