import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppPillsPage extends BasePage {
  private _pills!: Locator
  private _draggablePill!: Locator

  get pills(): Locator {
    return this._pills
  }

  get draggablePill(): Locator {
    return this._draggablePill
  }

  async init() {
    this._pills = this.page.locator('[data-testid="pills"]')
    this._draggablePill = this.page.locator('[data-testid="draggable-pill"]')
  }
}
