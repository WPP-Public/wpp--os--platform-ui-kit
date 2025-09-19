import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppSpinnerPage extends BasePage {
  private _spinner!: Locator

  get spinner(): Locator {
    return this._spinner
  }

  async init() {
    this._spinner = this.page.locator('[data-testid="spinners-container"]')
  }
}
