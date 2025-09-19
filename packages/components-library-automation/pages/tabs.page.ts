import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppTabsPage extends BasePage {
  private _tabs!: Locator

  get tabs(): Locator {
    return this._tabs
  }

  async init() {
    this._tabs = this.page.locator('[data-testid="tab-control"]')
  }
}
