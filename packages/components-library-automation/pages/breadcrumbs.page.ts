import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppBreadcrumbsPage extends BasePage {
  private _breadcrumbs!: Locator
  private _moreMenu!: Locator
  private _nativeLinkItem!: Locator
  private _noNativeLinkItem!: Locator

  get moreMenu(): Locator {
    return this._moreMenu
  }

  get breadcrumbs(): Locator {
    return this._breadcrumbs
  }

  get nativeLinkItem(): Locator {
    return this._nativeLinkItem
  }

  get noNativeLinkItem(): Locator {
    return this._noNativeLinkItem
  }

  async init() {
    this._breadcrumbs = this.page.locator('[data-testid="breadcrumbs"]')
    this._moreMenu = this.page.locator('[data-testid="breadcrumb-truncation"] .wpp-icon-more')
    this._nativeLinkItem = this.page.locator('[data-testid="with-native-link"] a').first()
    this._noNativeLinkItem = this.page.locator('[data-testid="without-native-link"] span').first()
  }
}
