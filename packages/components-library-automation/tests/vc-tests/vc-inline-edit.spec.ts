import { expect } from '@playwright/test'
import { WppInlineEditPage } from '../../pages/inline-edit.page'
import test from './../../utils'

const wppInlineEditPage = new WppInlineEditPage()

test.beforeEach(async ({ page }) => {
  await wppInlineEditPage.setPage(page)
  await wppInlineEditPage.init()
  await wppInlineEditPage.openPage('vc/inline-edit')
  await wppInlineEditPage.setViewportSize(1280, 720)
})

test.describe('WPP Inline Edit', () => {
  test('[WPPOPENDS-T420] Check that the component passes the visual check - Input', async ({ page }) => {
    await wppInlineEditPage.defaultInputInlineEdit.click()
    await page.waitForTimeout(1000)

    await expect(wppInlineEditPage.inputInlineEditContainer).toHaveScreenshot()
  })

  test('[WPPOPENDS-T421] Check that the component passes the visual check - Textarea', async ({ page }) => {
    await wppInlineEditPage.defaultTextareaInlineEdit.click()
    await page.waitForTimeout(1000)

    await expect(wppInlineEditPage.textareaInlineEditContainer).toHaveScreenshot()
  })
})
