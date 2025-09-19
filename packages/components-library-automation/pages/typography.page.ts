import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppTypographyPage extends BasePage {
  private _typography!: Locator
  private _display5xl!: Locator
  private _display2xsStrong!: Locator

  get typography(): Locator {
    return this._typography
  }

  get display5xl(): Locator {
    return this._display5xl
  }

  get display2xsStrong(): Locator {
    return this._display2xsStrong
  }

  async init() {
    this._typography = this.page.locator('[data-testid="typography-div"]')
    this._display5xl = this.page.locator('[type="5xl-display"]')
    this._display2xsStrong = this.page.locator('[type="2xs-strong"]')
  }
}
