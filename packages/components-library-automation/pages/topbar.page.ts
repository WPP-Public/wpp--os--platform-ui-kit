import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppTopbarPage extends BasePage {
  private _topbars!: Locator
  private _addButton!: Locator
  private _topBarWrapperElement!: Locator

  get topbars(): Locator {
    return this._topbars
  }

  get addButton(): Locator {
    return this._addButton
  }

  get topBarWrapperElement(): Locator {
    return this._topBarWrapperElement
  }

  async init() {
    this._topbars = this.page.locator('[data-testid="topbar-page"]')
    this._addButton = this.page.locator('[data-testid="add-nav-button"]')
    this._topBarWrapperElement = this.page.locator('.wrapper').first()
  }
}
