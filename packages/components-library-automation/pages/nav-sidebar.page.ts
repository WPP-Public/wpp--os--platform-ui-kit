import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppNavSidebarPage extends BasePage {
  private _itemWithTooltip!: Locator
  private _extendedItem!: Locator

  get itemWithTooltip(): Locator {
    return this._itemWithTooltip
  }

  set itemWithTooltip(value: Locator) {
    this._itemWithTooltip = value
  }

  get extendedItem(): Locator {
    return this._extendedItem
  }

  async init() {
    this._itemWithTooltip = this.page.locator('[data-testid="tooltip-item"]').locator('.wpp-tooltip')
    this._extendedItem = this.page.locator('.wpp-nav-sidebar-item')
  }
}
