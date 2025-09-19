import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppSegmentedControlsPage extends BasePage {
  private _controlBars!: Locator

  get controlBars(): Locator {
    return this._controlBars
  }

  async init() {
    this._controlBars = this.page.locator('.control-bars')
  }
}
