import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppAgGridTablePage extends BasePage {
  private _agGridTable!: Locator
  private _firstNameColumn!: Locator
  private _searchInput!: Locator
  private _genderFilterSelect!: Locator
  private _genderItemsFromList!: Locator
  private _removeAvatarsColumnButton!: Locator
  private _pillButton!: Locator
  private _firstRow!: Locator
  private _allCheckboxes!: Locator
  private _avatarColumn!: Locator
  private _addAvatarsColumnButton!: Locator
  private _avatar!: Locator
  private _avatarGroup!: Locator
  private _removeAllSelectedCheckboxesCrossBtn!: Locator
  private _checkboxesOfItems!: Locator
  private _loadMoreButton!: Locator
  private _hideProgresLineBtn!: Locator
  private _progresContainer!: Locator
  private _setFixedHeightBtn!: Locator
  private _tableBody!: Locator

  get agGridTable(): Locator {
    return this._agGridTable
  }

  get firstNameColumn(): Locator {
    return this._firstNameColumn
  }

  get searchInput(): Locator {
    return this._searchInput
  }

  get genderFilterSelect(): Locator {
    return this._genderFilterSelect
  }

  get removeAvatarsColumnButton(): Locator {
    return this._removeAvatarsColumnButton
  }

  get pillButton(): Locator {
    return this._pillButton
  }

  get removeAllSelectedCheckboxesCrossBtn(): Locator {
    return this._removeAllSelectedCheckboxesCrossBtn
  }

  get firstRow(): Locator {
    return this._firstRow
  }

  get allCheckboxes(): Locator {
    return this._allCheckboxes
  }

  get avatarColumn(): Locator {
    return this._avatarColumn
  }

  get addAvatarsColumnButton(): Locator {
    return this._addAvatarsColumnButton
  }

  get avatar(): Locator {
    return this._avatar
  }

  get avatarGroup(): Locator {
    return this._avatarGroup
  }

  get checkboxesOfItems(): Locator {
    return this._checkboxesOfItems
  }

  get loadMoreButton(): Locator {
    return this._loadMoreButton
  }

  get progresContainer(): Locator {
    return this._progresContainer
  }

  get hideProgresLineBtn(): Locator {
    return this._hideProgresLineBtn
  }

  get setFixedHeightBtn(): Locator {
    return this._setFixedHeightBtn
  }

  get tableBody(): Locator {
    return this._tableBody
  }

  get genderItemsFromList(): Locator {
    return this._genderItemsFromList
  }

  async init() {
    this._agGridTable = this.page.getByTestId('ag-grid-table')
    this._firstNameColumn = this.page.locator('[col-id="firstName"][role="columnheader"]')
    this._searchInput = this.page.locator('[data-testid="search-input"] input')
    this._genderFilterSelect = this.page.getByTestId('gender-filter-select')
    this._removeAvatarsColumnButton = this.page.getByTestId('remove-column-button')
    this._pillButton = this.page.getByTestId('selected-count-pill')
    this._removeAllSelectedCheckboxesCrossBtn = this.page.getByTestId('selected-count-pill').locator('.wpp-icon-cross')
    this._firstRow = this.page.locator('[row-id="0"]').first()
    this._allCheckboxes = this.page.locator('#ag-3-input')
    this._avatarColumn = this.page.locator('[col-id="avatar"][role="columnheader"]')
    this._addAvatarsColumnButton = this.page.getByTestId('add-avatars-column-btn')
    this._avatar = this.page.locator('[col-id="avatar"] i').first()
    this._avatarGroup = this.page.locator('[col-id="avatar"] i').nth(1)
    this._checkboxesOfItems = this.page.locator('[type="checkbox"]')
    this._loadMoreButton = this.page.getByTestId('load-more-btn').getByTestId('wppButton')
    this._hideProgresLineBtn = this.page.getByTestId('progress-btn')
    this._setFixedHeightBtn = this.page.getByTestId('set-table-height-btn')
    this._progresContainer = this.page.getByTestId('load-more-btn').locator('.progress-container')
    this._tableBody = this.page.getByTestId('load-more-table-viewport')
    this._genderItemsFromList = this.page.locator('[role="WPP-LIST-ITEM"]')
  }
}