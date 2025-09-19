import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppGridsCSSPage extends BasePage {
  private _grids!: Locator

  get grids(): Locator {
    return this._grids
  }

  async init() {
    this._grids = this.page.locator('.grids')
  }
}
