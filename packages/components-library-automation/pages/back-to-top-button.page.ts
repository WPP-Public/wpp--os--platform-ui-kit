import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppBackToTopButtonPage extends BasePage {
  private _backToTopButton!: Locator

  get backToTopButton(): Locator {
    return this._backToTopButton
  }

  async init() {
    this._backToTopButton = this.page.locator('[data-testid="backToTopButton"]')
  }
}
