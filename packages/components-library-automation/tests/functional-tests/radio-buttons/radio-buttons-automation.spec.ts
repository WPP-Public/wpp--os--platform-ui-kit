import { test, expect } from '@playwright/test'
import { WppRadioPage } from '../../../pages/radio.page'

const wppRadioPage = new WppRadioPage()
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppRadioPage.setPage(page)
  await wppRadioPage.init()
  await wppRadioPage.openPage('radio-buttons')
  consoleErrors = await wppRadioPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Radio Button', () => {
  //BUG-WPPLONOP-4897
  test('[WPPOPENDS-T166] Check that component is focused when the page is opened', async ({}, testInfo) => {
    const isFirefoxOrWebKit = ['firefox', 'webkit'].includes(testInfo.project.name);
    
    if (isFirefoxOrWebKit) {
      await expect(wppRadioPage.focusRadioButton).toHaveAttribute('auto-focus', 'true')
    } else {
      await expect(wppRadioPage.focusRadioButton).toBeFocused()
    }
  })

  test('[WPPOPENDS-T170] Check that the component is checked when clicked on radio button', async () => {
    await wppRadioPage.radioButtonWithoutLabel.click()
    await expect(wppRadioPage.radioButtonWithoutLabel).toHaveJSProperty('checked', true)
  })

  test('[WPPOPENDS-T169] Check that the component is checked when clicked on the Optional label', async () => {
    await wppRadioPage.optionalLabel.click()
    await expect(wppRadioPage.radioButtonWithOptionalLabel).toHaveJSProperty('checked', true)
  })

  test("[WPPOPENDS-T171] Check that the component is checked when clicked on the component's label", async () => {
    await wppRadioPage.radioButtonLabel.click()
    await expect(wppRadioPage.radioButtonWithLabel).toHaveJSProperty('checked', true)
  })

  test("[WPPOPENDS-T168] Check that the component is checked when clicked on the component's icon", async () => {
    await wppRadioPage.radioButtonIcon.click()
    await expect(wppRadioPage.radioButtonWithIcon).toHaveJSProperty('checked', true)
  })

  test("[WPPOPENDS-T167] Check that the tooltip is displayed when hovered on the component's icon", async () => {
    await wppRadioPage.radioButtonIcon.hover()
    await expect(wppRadioPage.radioButtonTooltip).toBeVisible()
  })
})
