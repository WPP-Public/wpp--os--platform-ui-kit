import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppDividerPage extends BasePage {
  private _divider!: Locator
  private _verticalDivider!: Locator

  get divider(): Locator {
    return this._divider
  }

  get verticalDivider(): Locator {
    return this._verticalDivider
  }

  async init() {
    this._divider = this.page.locator('[data-testid="divider-form"]')
    this._verticalDivider = this.page.locator('.wpp-divider').nth(1)
  }
}
