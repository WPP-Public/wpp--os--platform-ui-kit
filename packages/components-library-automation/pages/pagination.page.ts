import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppPaginationPage extends BasePage {
  private _paginationList!: Locator
  private _paginations!: Locator
  private _paginationInCard!: Locator

  get paginationList(): Locator {
    return this._paginationList
  }

  get paginations(): Locator {
    return this._paginations
  }

  get paginationInCard(): Locator {
    return this._paginationInCard
  }

  async init() {
    this._paginationList = this.page.locator('[data-testid="pagination-list"] [part="pre-page-select"]')
    this._paginations = this.page.locator('[data-testid="paginations"]')
    this._paginationInCard = this.page.locator('[data-testid="pagination-in-card"] [part="pre-page-select"]')
  }
}
