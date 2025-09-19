import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppProgressIndicatorsPage extends BasePage {
  private _progressIndicators!: Locator

  get progressIndicators(): Locator {
    return this._progressIndicators
  }

  async init() {
    this._progressIndicators = this.page.locator('.progress-indicators-container')
  }
}
