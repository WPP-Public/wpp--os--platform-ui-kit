import { expect } from '@playwright/test'
import { WppInlineEditPage } from '../../../pages/inline-edit.page'
import test from './../../../utils'

const wppInlineEditPage = new WppInlineEditPage()
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppInlineEditPage.setPage(page)
  await wppInlineEditPage.init()
  await wppInlineEditPage.openPage('vc/inline-edit')
  consoleErrors = await wppInlineEditPage.listenConsoleErrors(page)
  await page.waitForTimeout(1500)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Inline Edit - Textarea', () => {
  test('[WPPOPENDS-T229] Check that the component can be edited', async ({ page }) => {
    await wppInlineEditPage.defaultTextareaInlineEdit.click()
    await wppInlineEditPage.defaultTextareaInlineEdit.scrollIntoViewIfNeeded()
    await wppInlineEditPage.defaultTextareaInlineEdit.locator('[part=textarea]').type(' test for automation')
    await page.locator('.inline-edit-popover .wpp-icon-done').click()

    await wppInlineEditPage.checkInlineEditTextAndState(page, 'textarea', 'text area value test for automation')
  })

  test('[WPPOPENDS-T232] Check that the component can be edited to have an empty value', async ({ page }) => {
    await wppInlineEditPage.defaultTextareaInlineEdit.click()
    await wppInlineEditPage.defaultTextareaInlineEdit.locator('[part=textarea]').click()
    await wppInlineEditPage.defaultTextareaInlineEdit.locator('[part=textarea]').clear()
    await page.locator('.inline-edit-popover .wpp-icon-done').click()

    await wppInlineEditPage.checkInlineEditTextAndState(page, 'textarea', 'placeholder')
  })

  test('[WPPOPENDS-T228] Check that the component can have a default value', async ({ page }) => {
    await wppInlineEditPage.checkInlineEditTextAndState(page, 'textarea', 'text area value')
  })

  test('[WPPOPENDS-T231] Check that the previous value remains when clicked outside the component', async ({
    page,
  }) => {
    await wppInlineEditPage.defaultTextareaInlineEdit.click()
    await wppInlineEditPage.defaultTextareaInlineEdit.locator('[part=textarea]').click()
    await page.locator('text=Inline Edit Textarea').click()

    await wppInlineEditPage.checkInlineEditTextAndState(page, 'textarea', 'text area value')
  })

  test('[WPPOPENDS-T230] Check that the previous value remains when the cross icon is clicked in edit mode', async ({
    page,
  }) => {
    await wppInlineEditPage.defaultTextareaInlineEdit.first().click()
    await wppInlineEditPage.defaultTextareaInlineEdit.locator('[part=textarea]').click()
    await page.locator('.inline-edit-popover .wpp-icon-cross').click()

    await wppInlineEditPage.checkInlineEditTextAndState(page, 'textarea', 'text area value')
  })

  test('[WPPOPENDS-T233] Check that the edit icons are displayed on the top of the input when there is not enough space below', async ({
    page,
  }) => {
    await wppInlineEditPage.bottomTextareaInlineEdit.click()

    await expect(page.locator('.tippy-box')).toHaveAttribute('data-placement', 'top')
  })

  test('[WPPOPENDS-T399] Check that the accept events are differentiated', async () => {
    const eventDetail = await wppInlineEditPage.clickApplyOrCancelComponent(
      wppInlineEditPage.defaultTextareaInlineEdit,
      false,
    )

    await expect(eventDetail).toMatchSnapshot()
  })

  test('[WPPOPENDS-T400] Check that the cancel events are differentiated', async () => {
    const eventDetail = await wppInlineEditPage.clickApplyOrCancelComponent(
      wppInlineEditPage.defaultTextareaInlineEdit,
      true,
    )

    await expect(eventDetail).toMatchSnapshot()
  })
})
