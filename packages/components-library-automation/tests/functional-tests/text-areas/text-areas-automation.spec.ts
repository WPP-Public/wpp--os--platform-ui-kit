import { test, expect } from '@playwright/test'
import { WppTextAreasPage } from '../../../pages/text-areas.page'

const wppTextAreasPage = new WppTextAreasPage()
const validationMessage =
  'Probably, one of the longest and detailed warning messages ever met in the User Interface. Probably, one of the longest ...'
const validationMessageTooltip =
  'Probably, one of the longest and detailed warning messages ever met in the User Interface. Probably, one of the longest and detailed warning messages ever met in the User Interface. Probably, one of the long'
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppTextAreasPage.setPage(page)
  await wppTextAreasPage.init()
  await wppTextAreasPage.openPage('vc/text-areas')
  consoleErrors = await wppTextAreasPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Text Area', () => {
  test('[WPPOPENDS-T910] Check that the Char Limit label changes color according to the limitations', async () => {
    const charRemainsLabel = wppTextAreasPage.regularLimitedTextArea.locator(wppTextAreasPage.charRemainsLabel).first()

    await wppTextAreasPage.checkCharLimit(charRemainsLabel, 'wpp-black-color', '0/10', true)

    await wppTextAreasPage.regularLimitedTextArea.locator('textarea').type('Limit')
    await wppTextAreasPage.checkCharLimit(charRemainsLabel, 'wpp-warning-color', '5/10')

    await wppTextAreasPage.regularLimitedTextArea.locator('textarea').type('Limit')
    await wppTextAreasPage.checkCharLimit(charRemainsLabel, 'wpp-warning-color', '10/10')

    await wppTextAreasPage.regularLimitedTextArea.locator('textarea').type('Limit')
    await wppTextAreasPage.checkCharLimit(charRemainsLabel, 'wpp-danger-color-500', '15/10')
  })

  test('[WPPOPENDS-T911] Check that component has appropriate properties on hover', async () => {
    await wppTextAreasPage.performHoverColorCheck(wppTextAreasPage.regularLimitlessTextArea, true)
  })

  test('[WPPOPENDS-T912] Check that component has appropriate properties for disabled state', async () => {
    await wppTextAreasPage.performHoverColorCheck(wppTextAreasPage.disabledLimitlessTextArea, false)
    await expect(wppTextAreasPage.disabledLimitlessTextArea.locator('textarea')).not.toBeEditable()
  })

  test('[WPPOPENDS-T913] Check that the component has appropriate properties for error state', async () => {
    await wppTextAreasPage.performHoverColorCheck(wppTextAreasPage.limitedErrorTextArea, true)

    await wppTextAreasPage.checkValidationProps(
      wppTextAreasPage.limitedErrorTextArea,
      'error',
      validationMessage,
      validationMessageTooltip,
    )
  })

  test('[WPPOPENDS-T914] Check that the component has appropriate properties for warning state', async () => {
    await wppTextAreasPage.performHoverColorCheck(wppTextAreasPage.limitlessWarningTextArea, true)

    await wppTextAreasPage.checkValidationProps(
      wppTextAreasPage.limitlessWarningTextArea,
      'textarea-warning',
      validationMessage,
      validationMessageTooltip,
    )
  })

  test('[WPPOPENDS-T915] Check that the component has appropriate properties all the states are set', async () => {
    await wppTextAreasPage.performHoverColorCheck(wppTextAreasPage.allInTextArea, false)

    await wppTextAreasPage.checkValidationProps(
      wppTextAreasPage.allInTextArea,
      'error',
      validationMessage,
      validationMessageTooltip,
    )

    await expect(wppTextAreasPage.allInTextArea.locator('textarea')).toHaveAttribute('name', 'all-in-text-area')
    await expect(wppTextAreasPage.allInTextArea.locator('textarea')).toHaveValue('Test text')
    await expect(wppTextAreasPage.allInTextArea.locator('textarea')).not.toBeEditable()
    await wppTextAreasPage.checkCharLimit(
      wppTextAreasPage.allInTextArea.locator(wppTextAreasPage.charRemainsLabel).first(),
      'wpp-warning-color',
      '9/10',
    )
  })

  //BUG-WPPLONOP-4897
  test('[WPPOPENDS-T916] Check that component is focused when the page is opened', async () => {
    await expect(wppTextAreasPage.regularLimitedTextArea).toBeFocused()
  })

  test('[WPPOPENDS-T910] Check that the Char Limit has correct text weight [@bug-WPPLONOP-29438 ]', async () => {
    const charRemainsLabel = wppTextAreasPage.enteredCharacters
    const fontWeight = await charRemainsLabel.evaluate((element) => {
      const computedStyle = window.getComputedStyle(element)
      return computedStyle.fontWeight
    })
    expect(fontWeight).toBe("600")
  })
})
