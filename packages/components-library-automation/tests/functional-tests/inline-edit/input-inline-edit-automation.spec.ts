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
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Inline Edit - Input', () => {
  test('[WPPOPENDS-T223] Check that the component can be edited', async ({ page }) => {
    await wppInlineEditPage.defaultInputInlineEditDefaultWidth.click()
    await wppInlineEditPage.defaultInputInlineEditDefaultWidth.locator('input').clear()
    await wppInlineEditPage.defaultInputInlineEditDefaultWidth.locator('[part=input]').type('test for automation')
    await page.locator('.inline-edit-popover .wpp-icon-done').click()

    await wppInlineEditPage.checkInlineEditTextAndState(page, 'input', 'test for automation')
  })

  test('[WPPOPENDS-T226] Check that the component can be edited to have an empty value', async ({ page }) => {
    await wppInlineEditPage.defaultInputInlineEditDefaultWidth.click()
    await wppInlineEditPage.defaultInputInlineEditDefaultWidth.locator('[part=input]').clear()
    await page.locator('.inline-edit-popover .wpp-icon-done').click()

    await wppInlineEditPage.checkInlineEditTextAndState(page, 'input', 'placeholder')
  })

  test('[WPPOPENDS-T222] Check that the component can have a default value', async ({ page }) => {
    await wppInlineEditPage.checkInlineEditTextAndState(page, 'input', 'placeholder')
  })

  test('[WPPOPENDS-T225] Check that the previous value remains when clicked outside the component', async ({
    page,
  }) => {
    await wppInlineEditPage.defaultInputInlineEditDefaultWidth.click()
    await page.locator('text=Inline Edit Input (Default Width)').click()

    await wppInlineEditPage.checkInlineEditTextAndState(page, 'input', 'placeholder')
  })

  test('[WPPOPENDS-T224] Check that the previous value remains when the cross icon is clicked in edit mode', async ({
    page,
  }) => {
    await wppInlineEditPage.defaultInputInlineEditDefaultWidth.click()
    await page.locator('.inline-edit-popover .wpp-icon-cross').click()

    await wppInlineEditPage.checkInlineEditTextAndState(page, 'input', 'placeholder')
  })

  test('[WPPOPENDS-T227] Check that the edit icons are displayed on the top of the input when there is not enough space below', async ({
    page,
  }) => {
    await wppInlineEditPage.bottomInputInlineEdit.click()

    await expect(page.locator('.tippy-box')).toHaveAttribute('data-placement', 'top')
  })

  test('[WPPOPENDS-T397] Check that the accept events are differentiated', async () => {
    const eventDetail = await wppInlineEditPage.clickApplyOrCancelComponent(
      wppInlineEditPage.defaultInputInlineEditDefaultWidth,
      false,
    )

    await expect(eventDetail).toMatchSnapshot()
  })

  test('[WPPOPENDS-T398] Check that the cancel events are differentiated', async () => {
    const eventDetail = await wppInlineEditPage.clickApplyOrCancelComponent(
      wppInlineEditPage.defaultInputInlineEditDefaultWidth,
      true,
    )

    await expect(eventDetail).toMatchSnapshot()
  })

  //WPPLONOP-25262
  test('[WPPOPENDS-T936] Check that the component has placeholder value when emptry and empty when edited', async ({}) => {
    await expect(wppInlineEditPage.defaultInputInlineEditDefaultWidth).toHaveAttribute('mode', 'read')
    await expect(wppInlineEditPage.defaultInputInlineEditDefaultWidth.locator('.placeholder')).toHaveText('placeholder')
    await wppInlineEditPage.defaultInputInlineEditDefaultWidth.click()
    await expect(wppInlineEditPage.defaultInputInlineEditDefaultWidth).toHaveAttribute('mode', 'edit')
    await expect(wppInlineEditPage.defaultInputInlineEditDefaultWidth).toHaveText('')
  })
})