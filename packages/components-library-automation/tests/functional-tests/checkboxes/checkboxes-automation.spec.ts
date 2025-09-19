import { test, expect } from '@playwright/test'
import { WppCheckboxesPage } from '../../../pages/checkboxes.page'

const wppCheckboxesPage = new WppCheckboxesPage()
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppCheckboxesPage.setPage(page)
  await wppCheckboxesPage.init()
  await wppCheckboxesPage.openPage('checkboxes')
  consoleErrors = await wppCheckboxesPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Checkbox', () => {
  // bug WPPLONOP-4897
  test('[WPPOPENDS-T526] Check that component is focused when the page is opened [@bug-WPPLONOP-28014 ]', async ({}, testInfo) => {
    const isFirefoxOrWebKit = ['firefox', 'webkit'].includes(testInfo.project.name);

    if (isFirefoxOrWebKit) {
      await expect(wppCheckboxesPage.focusCheckbox).toHaveAttribute('auto-focus', 'true');
    } else {
      await expect(wppCheckboxesPage.focusCheckbox).toBeFocused();
    }
  })

  test('[WPPOPENDS-T144] Check that the component changes its state when clicked', async () => {
    // Click on unselected Checkbox, checkbox should be checked
    await wppCheckboxesPage.checkboxWithoutLabel.click()
    await expect(wppCheckboxesPage.checkboxWithoutLabel).toHaveJSProperty('checked', true)

    // Click on selected Checkbox, checkbox should be unchecked
    await wppCheckboxesPage.checkboxWithoutLabel.click()
    await expect(wppCheckboxesPage.checkboxWithoutLabel).not.toHaveJSProperty('checked', true)
  })

  test('[WPPOPENDS-T145] Check that component is checked when clicked on Optional label', async () => {
    await wppCheckboxesPage.optionalLabel.click()
    await expect(wppCheckboxesPage.checkboxWithOptionalLabel).toHaveJSProperty('checked', true)
  })

  test("[WPPOPENDS-T198] Check that component is checked when clicked on component's label", async () => {
    await wppCheckboxesPage.checkboxLabel.click()
    await expect(wppCheckboxesPage.checkboxWithLabel).toHaveJSProperty('checked', true)
  })

  test("[WPPOPENDS-T146] Checked that component is checked when clicked on component's icon", async () => {
    await wppCheckboxesPage.checkboxIcon.click()
    await expect(wppCheckboxesPage.checkboxWithIcon).toHaveJSProperty('checked', true)
  })

  test("[WPPOPENDS-T147] Check that tooltip is displayed when hovered on component's icon", async () => {
    await wppCheckboxesPage.checkboxIcon.hover()
    await expect(wppCheckboxesPage.checkboxTooltip).toBeVisible()
  })

  test('[WPPOPENDS-T148] Check that component is checked when clicked on indeterminate checkbox', async () => {
    await wppCheckboxesPage.indeterminateCheckbox.click()
    await expect(wppCheckboxesPage.indeterminateCheckbox).toHaveJSProperty('checked', true)
  })

  test("[WPPOPENDS-T149] Check that tooltip is displayed when hovered on component's inline message", async () => {
    await wppCheckboxesPage.checkboxInlineMessage.hover()
    await expect(wppCheckboxesPage.checkboxTooltipError).toBeVisible()
  })
})
