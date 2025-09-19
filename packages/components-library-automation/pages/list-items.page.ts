import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppListItemsPage extends BasePage {
  private _listItems!: Locator

  get listItems(): Locator {
    return this._listItems
  }

  async init() {
    this._listItems = this.page.locator('[data-testid="list-items-container"]')
  }
}
