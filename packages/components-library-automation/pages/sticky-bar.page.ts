import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppStickyBarPage extends BasePage {
  private _oneLineBtn!: Locator
  private _twoLineBtn!: Locator
  private _twoLineWithTabsBtn!: Locator
  private _blankBtn!: Locator
  private _scrollTreshold500!: Locator
  private _scrollTreshold200!: Locator

  get oneLineBtn(): Locator {
    return this._oneLineBtn
  }
  get twoLineBtn(): Locator {
    return this._twoLineBtn
  }
  get twoLineWithTabsBtn(): Locator {
    return this._twoLineWithTabsBtn
  }
  get blankBtn(): Locator {
    return this._blankBtn
  }
  get scrollTreshold500(): Locator {
    return this._scrollTreshold500
  }
  get scrollTreshold200(): Locator {
    return this._scrollTreshold200
  }

  async init() {
    this._oneLineBtn = this.page.locator('//*[normalize-space() = "One line Bar"]')
    this._twoLineBtn = this.page.locator('//*[normalize-space() = "Two line Bar"]')
    this._twoLineWithTabsBtn = this.page.locator('//*[normalize-space() = "Two line Bar with tabs"]')
    this._blankBtn = this.page.locator('//*[normalize-space() = "Blank"]')
    this._scrollTreshold500 = this.page.locator('//*[normalize-space() = "Change scroll treshold to 500"]')
    this._scrollTreshold200 = this.page.locator('//*[normalize-space() = "Change scroll treshold to 200"]')
  }
}
