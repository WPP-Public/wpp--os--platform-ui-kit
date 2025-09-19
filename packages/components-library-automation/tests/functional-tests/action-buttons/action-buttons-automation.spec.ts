import { test, expect } from '@playwright/test'
import { WppButtonsPage } from '../../../pages/buttons.page'
import { colorPalette } from '../../../color-palette'

const wppButtonsPage = new WppButtonsPage()
let consoleErrors: string[] = []

test.beforeEach(async ({ page }) => {
  await wppButtonsPage.setPage(page)
  await wppButtonsPage.init()
  await wppButtonsPage.openPage('vc/buttons')
  consoleErrors = await wppButtonsPage.listenConsoleErrors(page)
})

test.afterEach(async () => {
  await expect(consoleErrors.length === 0).toBeTruthy()
})

test.describe('Action Primary Button', () => {
  test('[WPPOPENDS-T801] Check that component has appropriate properties on hover', async ({ page }) => {
    await wppButtonsPage.actionPrimaryButton.hover()
    await expect(page.locator('[data-testid="regular-action-primary-button"] .overlay')).toHaveCSS(
      'background-color',
      colorPalette['wpp-grey-color-700'],
    )
    await expect(page.locator('[data-testid="regular-action-primary-button"] button')).toHaveCSS(
      'color',
      colorPalette['wpp-primary-color-500'],
    )
  })

  test('[WPPOPENDS-T802] Check that component has appropriate properties for disabled state', async () => {
    await wppButtonsPage.performHoverButtonColorsCheck(
      wppButtonsPage.disabledActionPrimaryButton,
      'action_primary_disabled',
    )
    await wppButtonsPage.checkElementStatus(wppButtonsPage.disabledActionPrimaryButton.locator('button'), 'disabled')
  })

  test('[WPPOPENDS-T803] Check that component has appropriate properties for loading state', async ({ page }) => {
    await wppButtonsPage.checkElementStatus(
      wppButtonsPage.loadingActionPrimaryButton.locator('button .wpp-spinner'),
      'visible',
    )

    await wppButtonsPage.loadingActionPrimaryButton.hover()
    await expect(page.locator('[data-testid="loading-action-primary-button"] .overlay')).toHaveCSS(
      'background-color',
      colorPalette['wpp-grey-color-800'],
    )
    await expect(page.locator('[data-testid="loading-action-primary-button"] button')).toHaveCSS(
      'color',
      colorPalette['wpp-primary-color-500'],
    )
  })
})

test.describe('Action Secondary Button', () => {
  test('[WPPOPENDS-T804] Check that component has appropriate properties on hover', async ({ page }) => {
    await wppButtonsPage.actionSecondaryButton.hover()
    await expect(page.locator('[data-testid="regular-action-secondary-button"] .overlay')).toHaveCSS(
      'background-color',
      colorPalette['wpp-grey-color-700'],
    )
    await expect(page.locator('[data-testid="regular-action-secondary-button"] button')).toHaveCSS(
      'color',
      colorPalette['wpp-grey-color-900'],
    )
  })

  test('[WPPOPENDS-T805] Check that component has appropriate properties for disabled state', async () => {
    await wppButtonsPage.performHoverButtonColorsCheck(
      wppButtonsPage.disabledActionSecondaryButton,
      'action_secondary_disabled',
    )
    await wppButtonsPage.checkElementStatus(wppButtonsPage.disabledActionSecondaryButton.locator('button'), 'disabled')
  })

  test('[WPPOPENDS-T806] Check that component has appropriate properties for loading state', async ({ page }) => {
    await wppButtonsPage.checkElementStatus(
      wppButtonsPage.loadingActionSecondaryButton.locator('button .wpp-spinner'),
      'visible',
    )

    await wppButtonsPage.loadingActionSecondaryButton.hover()
    await expect(page.locator('[data-testid="loading-action-secondary-button"] .overlay')).toHaveCSS(
      'background-color',
      colorPalette['wpp-grey-color-800'],
    )
    await expect(page.locator('[data-testid="loading-action-secondary-button"] button')).toHaveCSS(
      'color',
      colorPalette['wpp-grey-color-900'],
    )
  })
})
