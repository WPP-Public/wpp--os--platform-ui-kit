declare global {
  interface Window {
    __clickCount?: number;
  }
}

import { test, expect } from '@playwright/test'
import { WppButtonsPage } from '../../../pages/buttons.page'

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

test.describe('Regular Primary Button', () => {
  test('[WPPOPENDS-T901] Check that component has appropriate properties on hover', async () => {
    await wppButtonsPage.performHoverButtonColorsCheck(wppButtonsPage.regularButton, 'regular_primary_enabled')
  })

  test('[WPPOPENDS-T902] Check that component has appropriate properties for disabled state', async () => {
    await wppButtonsPage.performHoverButtonColorsCheck(wppButtonsPage.regularDisabledButton, 'regular_primary_disabled', true)
    await wppButtonsPage.checkElementStatus(wppButtonsPage.regularDisabledButton.locator('button').nth(1), 'disabled')
  })

  test('[WPPOPENDS-T903] Check that component has appropriate properties for loading state', async () => {
    await expect(wppButtonsPage.regularLoadingButton.locator('button .wpp-spinner')).toBeVisible()

    await wppButtonsPage.checkHoverElementColors(
      wppButtonsPage.regularLoadingButton.locator('button'),
      'wpp-primary-color-500',
      'wpp-grey-color-000',
    )
  })
})

test.describe('Regular Secondary Button', () => {
  test('[WPPOPENDS-T904] Check that component has appropriate properties on hover', async () => {
    await wppButtonsPage.performHoverButtonColorsCheck(
      wppButtonsPage.regularSecondaryButton,
      'regular_secondary_enabled',
    )
  })

  test('[WPPOPENDS-T905] Check that component has appropriate properties for disabled state', async () => {
    await wppButtonsPage.performHoverButtonColorsCheck(
      wppButtonsPage.disabledSecondaryButton,
      'regular_secondary_disabled', true
    )
    await wppButtonsPage.checkElementStatus(wppButtonsPage.disabledSecondaryButton.locator('button').nth(1), 'disabled')
  })

  test('[WPPOPENDS-T906] Check that component has appropriate properties for loading state [@BUG-WPPONEDS-338 ]', async () => {
    await expect(wppButtonsPage.loadingSecondaryButton.locator('button .wpp-spinner').first()).toBeVisible()

    await expect(wppButtonsPage.loadingSecondaryButton.locator('button').first()).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect(wppButtonsPage.loadingSecondaryButton.locator('button').first()).toHaveCSS('border', '1px solid rgb(0, 20, 204)');
  })
})

test.describe('Regular Destructive Button', () => {
  test('[WPPOPENDS-T907] Check that component has appropriate properties on hover', async () => {
    await wppButtonsPage.performHoverButtonColorsCheck(
      wppButtonsPage.regularDestructiveButton,
      'regular_destructive_enabled',
    )
  })

  test('[WPPOPENDS-T908] Check that component has appropriate properties for disabled state', async () => {
    await wppButtonsPage.performHoverButtonColorsCheck(
      wppButtonsPage.disabledDestructiveButton,
      'regular_destructive_disabled',
    )
    await wppButtonsPage.checkElementStatus(wppButtonsPage.disabledDestructiveButton.locator('button'), 'disabled')
  })

  test('[WPPOPENDS-T909] Check that component has appropriate properties for loading state', async () => {
    await expect(wppButtonsPage.loadingDestructiveButton.locator('button .wpp-spinner')).toBeVisible()

    await wppButtonsPage.checkHoverElementColors(
      wppButtonsPage.loadingDestructiveButton.locator('button'),
      'wpp-danger-color-500',
      'wpp-grey-color-000',
    )
  })
  //WPPLONOP-15788
  test('[WPPOPENDS-T567] Check that disabled state saved after clicking quickly many times', async ({page}) => {
    await wppButtonsPage.openPage('bugfixes/15788')
    await expect (page.locator('.wpp-button.wpp-disabled')).toHaveAttribute('disabled')
    await page.evaluate(() => {
      const disabledBtn = document.querySelector('.wpp-button.wpp-disabled') as HTMLButtonElement  
      if (disabledBtn) {
        window.__clickCount = 0
        disabledBtn.addEventListener('click', () => {
          window.__clickCount = (window.__clickCount || 0) + 1
        })
      }
    })
  
    await page.evaluate(() => {
      const disabledBtn = document.querySelector('.wpp-button.wpp-disabled') as HTMLButtonElement
      if (disabledBtn) {
        for (let i = 0; i < 6; i++) {
          disabledBtn.click()
        }
      }
    })

    const clickCount = await page.evaluate(() => window.__clickCount || 0)
    expect(clickCount).toBe(6)
    await expect (page.locator('.wpp-button.wpp-disabled')).toHaveAttribute('disabled')
  })
})
