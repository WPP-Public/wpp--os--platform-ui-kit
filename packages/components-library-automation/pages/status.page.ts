import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppStatusPage extends BasePage {
  private _statuses!: Locator

  get statuses(): Locator {
    return this._statuses
  }

  async init() {
    this._statuses = this.page.locator('[data-testid="statuses"]')
  }
}
