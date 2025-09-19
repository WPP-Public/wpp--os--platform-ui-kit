import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppChipsPage extends BasePage {
  private _chips!: Locator
  private _focusChip!: Locator

  get chips(): Locator {
    return this._chips
  }

  get focusChip(): Locator {
    return this._focusChip
  }

  async init() {
    this._chips = this.page.locator('[data-testid="chips-container"]')
    this._focusChip = this.page.locator('[data-testid="focus-chip"]')
  }
}
