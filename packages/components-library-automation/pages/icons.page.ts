import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppIconsPage extends BasePage {
  private _icons!: Locator

  get icons(): Locator {
    return this._icons
  }

  async init() {
    this._icons = this.page.locator('[data-testid="icons-container"]')
  }
}
