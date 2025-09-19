import { expect, Locator, Page, test } from '@playwright/test'
import pwConfig from '../playwright.config'
import { Color, colorPalette } from '../color-palette'

export class BasePage {
  protected page!: Page

  async setPage(page: Page) {
    this.page = page
  }

  async openPage(pageName: string) {
    await this.page.goto(pwConfig.use?.baseURL + pageName)
  }

  async checkElementColors(selector: Locator, bgColor: Color, color: Color) {
    await expect(selector).toHaveCSS('background-color', colorPalette[bgColor])
    await expect(selector).toHaveCSS('color', colorPalette[color])
  }

  async checkHoverElementColors(selector: Locator, bgColor: Color, color: Color) {
    await selector.hover()
    await expect(selector).toHaveCSS('background-color', colorPalette[bgColor])
    await expect(selector).toHaveCSS('color', colorPalette[color])
  }

  async checkElementStatus(selector: Locator, status = 'disabled' || 'visible') {
    if (status === 'disabled') {
      await expect(selector).toBeDisabled()
    }
    if (status === 'visible') {
      await expect(selector).toBeVisible()
    }
  }

  async setViewportSize(width: number, height: number) {
    await this.page.setViewportSize({
      width,
      height,
    })
  }

  async listenConsoleErrors(page: Page): Promise<string[]> {
  const consoleErrors: string[] = [];
  const isFirefox = test.info().project.name === 'firefox';

  page.on('console', (msg) => {
    const text = msg.text();
    if (
      isFirefox &&
      (
        text.includes('fonts.gstatic.com') ||
        text.includes('downloadable font') ||
        text.includes('.woff') ||
        text.includes('.woff2')
      )
    ) {
      return;
    }

    if (msg.type() === 'error') {
      console.log('Console error:', text);
      consoleErrors.push(text);
    }
  });
    return consoleErrors;
  }
}
