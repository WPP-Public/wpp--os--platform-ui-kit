import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppSearchPage extends BasePage {
  private _searchContainer!: Locator
  private _regularSearch!: Locator
  private _regularSearchContainer!: Locator
  private _dropdownOpenOnClickSearch!: Locator
  private _simpleSearchOffSearch!: Locator
  private _showOptionsOffSearch!: Locator

  get searchContainer(): Locator {
    return this._searchContainer
  }

  get regularSearch(): Locator {
    return this._regularSearch
  }

  get regularSearchContainer(): Locator {
    return this._regularSearchContainer
  }

  get dropdownOpenOnClickSearch(): Locator {
    return this._dropdownOpenOnClickSearch
  }

  get simpleSearchOffSearch(): Locator {
    return this._simpleSearchOffSearch
  }

  get showOptionsOffSearch(): Locator {
    return this._showOptionsOffSearch
  }

  async init() {
    this._searchContainer = this.page.locator('[data-testid="search-container"]')
    this._regularSearch = this.page.locator('[data-testid="regular-search"]')
    this._regularSearchContainer = this.page.locator('[data-testid="regular-search-container"]')
    this._dropdownOpenOnClickSearch = this.page.locator('[data-testid="dropdown-open-on-click-search"]')
    this._simpleSearchOffSearch = this.page.locator('[data-testid="simple-search-off-search"]')
    this._showOptionsOffSearch = this.page.locator('[data-testid="show-options-off-search"]')
  }
}
