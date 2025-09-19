import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppToastsPage extends BasePage {
  private _toasts!: Locator
  private _addToastButton!: Locator
  private _addCustomToastButton!: Locator
  private _addCustomToastWithLongTextButton!: Locator
  private _toastContainer!: Locator

  get toasts(): Locator {
    return this._toasts
  }

  get addToastButton(): Locator {
    return this._addToastButton
  }

  get addCustomToastButton(): Locator {
    return this._addCustomToastButton
  }

  get addCustomToastWithLongTextButton(): Locator {
    return this._addCustomToastWithLongTextButton
  }

  get toastContainer(): Locator {
    return this._toastContainer
  }

  async init() {
    this._toasts = this.page.locator('.toasts-container')
    this._addToastButton = this.page.locator('[data-testid="add-toast-button"]')
    this._addCustomToastButton = this.page.locator('[data-testid="add-toast-with-custom-icon-button"]')
    this._addCustomToastWithLongTextButton = this.page.locator('[data-testid="add-toast-with-long-text-button"]')
    this._toastContainer = this.page.locator('.wpp-toast-container [part="item"]')
  }
}
