import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppLoadMorePage extends BasePage {
  private _loadMoreWithProgressBar!: Locator
  private _loadMoreWithoutProgressBar!: Locator
  private _loadMoreDisabled!: Locator

  get loadMoreWithProgressBar(): Locator {
    return this._loadMoreWithProgressBar
  }

  get loadMoreWithoutProgressBar(): Locator {
    return this._loadMoreWithoutProgressBar
  }

  get loadMoreDisabled(): Locator {
    return this._loadMoreDisabled
  }

  async init() {
    this._loadMoreWithProgressBar = this.page.locator('.wpp-load-more').first()
    this._loadMoreWithoutProgressBar = this.page.locator('.wpp-load-more').nth(1)
    this._loadMoreDisabled = this.page.locator('.wpp-load-more').nth(2)
  }
}
