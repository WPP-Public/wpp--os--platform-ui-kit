import { test, expect } from '@playwright/test'
import { WppTogglesPage } from '../../../pages/toggles.page'

const wppTogglesPage = new WppTogglesPage()
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppTogglesPage.setPage(page)
  await wppTogglesPage.init()
  await wppTogglesPage.openPage('toggles')
  consoleErrors = await wppTogglesPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Toggle', () => {
  //BUG-WPPLONOP-4897
  test('[WPPOPENDS-T172] Check that component is focused when the page is opened', async () => {
    const isFirefoxOrWebKit = ['firefox', 'webkit'].includes(test.info().project.name);
    if (isFirefoxOrWebKit) {
      await expect(wppTogglesPage.focusToggle).toHaveAttribute('auto-focus', 'true')
    } else {
      await expect(wppTogglesPage.focusToggle).toBeFocused()
    }
  })

  test('[WPPOPENDS-T176] Check that the component changes its state when clicked', async () => {
    // Click on unselected Toggle, toggle should be checked
    await wppTogglesPage.toggleWithoutLabel.click()
    await expect(wppTogglesPage.toggleWithoutLabel).toHaveJSProperty('checked', true)

    // Click on selected Toggle, toggle should be unchecked
    await wppTogglesPage.toggleWithoutLabel.click()
    await expect(wppTogglesPage.toggleWithoutLabel).not.toHaveJSProperty('checked', true)
  })

  test('[WPPOPENDS-T175] Check that component is checked when clicked on Optional label', async () => {
    await wppTogglesPage.optionalLabel.click()
    await expect(wppTogglesPage.toggleWithOptionalLabel).toHaveJSProperty('checked', true)
  })

  test("[WPPOPENDS-T177] Check that component is checked when clicked on component's label", async () => {
    await wppTogglesPage.toggleLabel.click()
    await expect(wppTogglesPage.toggleWithLabel).toHaveJSProperty('checked', true)
  })

  test("[WPPOPENDS-T174] Check that component is checked when clicked on component's icon", async () => {
    await wppTogglesPage.toggleIcon.click()
    await expect(wppTogglesPage.toggleWithIcon).toHaveJSProperty('checked', true)
  })

  test("[WPPOPENDS-T173] Check that tooltip is displayed when hovered on component's icon", async () => {
    await wppTogglesPage.toggleIcon.hover()
    await expect(wppTogglesPage.toggleTooltip).toBeVisible()
  })

  test("[WPPOPENDS-T287] Check that controlled toggle's state is not changed on click", async () => {
    await wppTogglesPage.controlledToggle.click()
    await expect(wppTogglesPage.controlledToggle).toHaveJSProperty('checked', false)
  })
})
