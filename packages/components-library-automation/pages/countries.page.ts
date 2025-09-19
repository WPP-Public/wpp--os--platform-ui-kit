import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppCountriesPage extends BasePage {
  private _countries!: Locator

  get countries(): Locator {
    return this._countries
  }

  async init() {
    this._countries = this.page.locator('[data-testid="countries-container"]')
  }
}
