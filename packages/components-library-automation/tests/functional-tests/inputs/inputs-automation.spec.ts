import { test, expect } from '@playwright/test'
import { WppInputsPage } from '../../../pages/inputs.page'

const wppInputsPage = new WppInputsPage()
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppInputsPage.setPage(page)
  await wppInputsPage.init()
  await wppInputsPage.openPage('vc/inputs')
  consoleErrors = await wppInputsPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Input', () => {
  test('[WPPOPENDS-T809] Check that text can be entered into the component', async () => {
    await wppInputsPage.enterAndCheckText(wppInputsPage.regularMInput, 'Test Text')
  })

  test('[WPPOPENDS-T1323] Check that the component has default value', async () => {
    await expect(wppInputsPage.regularMInput.locator('input')).toHaveJSProperty('value', 'Default Value')
    await expect(wppInputsPage.regularMInput.locator('input')).toHaveValue('Default Value')
  })

  test('[WPPOPENDS-T1322] Check that the default value can be edited', async ({ page }) => {
    await wppInputsPage.regularMInput.locator('input').click()
    await page.keyboard.press('Backspace')
    await page.keyboard.press('Backspace')
    await page.waitForTimeout(2000)
    await expect(wppInputsPage.regularMInput.locator('input')).toHaveValue('Default Val')

    await wppInputsPage.regularMInput.locator('input').type('ue', { delay: 100 })
    await expect(wppInputsPage.regularMInput.locator('input')).toHaveValue('Default Value')
  })

  //BUG-WPPLONOP-4897
  test('[WPPOPENDS-T810] Check that component is focused when the page is opened', async () => {
    await expect(wppInputsPage.regularMInput).toBeFocused()
  })
  test('[WPPOPENDS-T422] Check that input is empty after clicking x icon', async () => {
    await wppInputsPage.searchInput.first().click()
    await wppInputsPage.searchInput.first().type('Text')
    await wppInputsPage.searchInput.locator('.wpp-icon-cross').click()

    await expect(wppInputsPage.searchInput.locator('.wpp-icon-cross')).not.toBeVisible
    await expect(wppInputsPage.searchInput.first()).toBeFocused()
    await expect(wppInputsPage.searchInput.locator('input').first()).toHaveValue('')
  })

  test('[WPPOPENDS-T423] Check that only numbers can be entered', async () => {
    await wppInputsPage.numberInput.first().click()
    await wppInputsPage.numberInput.first().type('Text 123')

    await expect(wppInputsPage.numberInput.first().locator('input')).toHaveValue('123')
  })

  test('[WPPOPENDS-T490] Check that comma can be used as a separator', async ({page}) => {
    await wppInputsPage.diffSeparatorInput.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1000)
    await wppInputsPage.diffSeparatorInput.locator('input').type('123,33', { delay: 300 })

    await expect(wppInputsPage.diffSeparatorInput.locator('input')).toHaveValue('123,33')
  })

  test('[WPPOPENDS-T491] Check that dot can be used as a separator', async ({page}) => {
    await wppInputsPage.diffSeparatorInput.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1000)
    await wppInputsPage.diffSeparatorInput.locator('input').type('987.55', { delay: 300 })

    await expect(wppInputsPage.diffSeparatorInput.locator('input')).toHaveValue('987.55')
  })

  test('[WPPOPENDS-T492] Check that component can be limited with min-max values with the appropriate error messages', async ({
    page,
  }) => {
    await wppInputsPage.boundariesValuesInput.click()
    await wppInputsPage.boundariesValuesInput.type('1')

    await expect(page.locator('[data-testid="boundaries-values-input"] [part="message"] span')).toHaveText(
      'The input must have at least 3 characters',
    )

    await wppInputsPage.boundariesValuesInput.type('234567890')
    await expect(page.locator('[data-testid="boundaries-values-input"] [part="message"] span')).toHaveText(
      'The input can have a maximum of 8 characters',
    )
  })

  test('[WPPOPENDS-T493] Check that component can display data with a mask - Custom decimal', async () => {
    await wppInputsPage.customDecimalMaskInput.click()
    await wppInputsPage.customDecimalMaskInput.type('123456789,87', { delay: 50 })

    await expect(wppInputsPage.customDecimalMaskInput.locator('[part="input"]')).toHaveJSProperty(
      'value',
      '123.456.789,87',
    )
  })

  test('[WPPOPENDS-T494] Check that component can display data with a mask - Currency', async () => {
    await wppInputsPage.currencyMaskInput.click()
    await wppInputsPage.currencyMaskInput.type('1234567890', { delay: 50 })

    await expect(wppInputsPage.currencyMaskInput.locator('[part="input"]')).toHaveJSProperty('value', '$1 234 567 890')
  })

  test('[WPPOPENDS-T495] Check that component can display data with a mask - Percentage', async () => {
    await wppInputsPage.percentageMaskInput.click()
    await wppInputsPage.percentageMaskInput.type('120', { delay: 50 })

    await expect(wppInputsPage.percentageMaskInput.locator('[part="input"]')).toHaveJSProperty('value', '100%')
  })

  test('[WPPOPENDS-T496] Check that component can display data with a mask - Credit Card', async () => {
    await wppInputsPage.creditCardMaskInput.click()
    await wppInputsPage.creditCardMaskInput.type('1231231231231231', { delay: 50 })

    await expect(wppInputsPage.creditCardMaskInput.locator('[part="input"]')).toHaveJSProperty(
      'value',
      '1231 2312 3123 1231',
    )
  })

  test('[WPPOPENDS-T497] Check that component can display data with a mask - Time', async () => {
    await wppInputsPage.timeMaskInput.click()
    await wppInputsPage.timeMaskInput.type('123546', { delay: 50 })

    await expect(wppInputsPage.timeMaskInput.locator('[part="input"]')).toHaveJSProperty('value', '12:35:46')
  })

  test('[WPPOPENDS-T498] Check that component can display data with a mask - Fixed Length Currency', async () => {
    await wppInputsPage.fixedLengthCurrencyMaskInput.locator('input').click()
    await wppInputsPage.fixedLengthCurrencyMaskInput.type('567890', { delay: 50 })

    await expect(wppInputsPage.fixedLengthCurrencyMaskInput.locator('[part="input"]')).toHaveJSProperty(
      'value',
      '$567.89',
    )
  })

  test('[WPPOPENDS-T499] Check that component can display data with a mask - Phone', async () => {
    await wppInputsPage.phoneMaskInput.click()
    await wppInputsPage.phoneMaskInput.type('123345346', { delay: 50 })

    await expect(wppInputsPage.phoneMaskInput.locator('[part="input"]')).toHaveJSProperty('value', '+40 (123) 345-346')
  })

  //WPPLONOP-24371
  test('[WPPOPENDS-T818] Check the helper text typography', async ({ page }) => {
    const helperMessage = page.locator('[class*="inline-message-wrapper"]').first()

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

  test('[WPPOPENDS-T1321] Check that the component interacts with the keyboard', async ({ page }) => {
    await page.waitForTimeout(2000)
    await page.keyboard.press('Tab')
    await page.waitForTimeout(1000)
    await expect(wppInputsPage.regularMInputWithMessage).toHaveCSS('box-shadow', 'rgb(255, 255, 255) 0px 0px 0px 1px, rgb(0, 20, 204) 0px 0px 0px 2px')
    //warning
    await page.keyboard.press('Tab')
    await page.waitForTimeout(2000)
    const shadowWarning = await wppInputsPage.warningMInput.locator('input').getAttribute('box-shadow')
    await expect(wppInputsPage.warningMInput.locator('input')).toHaveCSS('box-shadow', 'rgb(255, 255, 255) 0px 0px 0px 1px, rgb(0, 20, 204) 0px 0px 0px 2px')
    //error
    await page.keyboard.press('Tab')
    await page.waitForTimeout(2000)
    await expect(wppInputsPage.errorMInput.locator('input')).toHaveCSS('box-shadow', 'rgb(255, 255, 255) 0px 0px 0px 1px, rgb(0, 20, 204) 0px 0px 0px 2px')
  })
})