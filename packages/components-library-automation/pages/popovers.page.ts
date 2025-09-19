import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppPopoversPage extends BasePage {
  private _defaultPopover!: Locator
  private _defaultPopoverTrigger!: Locator
  private _customPopover!: Locator
  private _customPopoverTrigger!: Locator
  private _popoverContent!: Locator
  private _popoverDropdownCloseIcon!: Locator
  private _popoverDropdownCloseBtn!: Locator
  private _popoverDropdownSubmitBtn!: Locator
  private _popoverUsersDropdownList!: Locator
  private _popoverPage!: Locator
  private _popoverNoContent!: Locator
  private _popoverWithContent!: Locator
  private _setSearchValueBtn!: Locator
  private _persistentSearchBtn!: Locator
  private _searchInput!: Locator
  private _clearSearchInputBtn!: Locator

  get defaultPopover(): Locator {
    return this._defaultPopover
  }

  get customPopover(): Locator {
    return this._customPopover
  }

  get defaultPopoverTrigger(): Locator {
    return this._defaultPopoverTrigger
  }

  get customPopoverTrigger(): Locator {
    return this._customPopoverTrigger
  }

  get popoverContent(): Locator {
    return this._popoverContent
  }

  get popoverDropdownCloseIcon(): Locator {
    return this._popoverDropdownCloseIcon
  }

  get popoverDropdownCloseBtn(): Locator {
    return this._popoverDropdownCloseBtn
  }

  get popoverDropdownSubmitBtn(): Locator {
    return this._popoverDropdownSubmitBtn
  }

  get popoverUsersDropdownList(): Locator {
    return this._popoverUsersDropdownList
  }

  get popoverPage(): Locator {
    return this._popoverPage
  }

  get popoverNoContent(): Locator {
    return this._popoverNoContent
  }

  get popoverWithContent(): Locator {
    return this._popoverWithContent
  }

  get setSearchValueBtn(): Locator {
    return this._setSearchValueBtn
  }

  get persistentSearchBtn(): Locator {
    return this._persistentSearchBtn
  }

  get searchInput(): Locator {
    return this._searchInput
  }

  get clearSearchInputBtn(): Locator {
    return this._clearSearchInputBtn
  }

  async init() {
    this._defaultPopover = this.page.locator('[data-testid="default-popover"]')
    this._defaultPopoverTrigger = this.page.locator('[data-testid="default-popover"] .wpp-popover')
    this._customPopover = this.page.locator('[data-testid="custom-popover"]')
    this._customPopoverTrigger = this.page.locator('[data-testid="custom-popover"] .wpp-popover')
    this._popoverContent = this.page.locator('[data-testid="popover-content"]')
    this._popoverDropdownCloseIcon = this.page.locator('.cross-button.wpp-action-button')
    this._popoverDropdownCloseBtn = this.page.locator(':text("Close")')
    this._popoverDropdownSubmitBtn = this.page.locator(':text("Submit")')
    this._popoverUsersDropdownList = this.page.locator('#tippy-4')
    this._popoverPage = this.page.getByText('Trigger button to open PopoverOpen PopoverDisable triggerJohn CheserPopover', { exact: false })
    this._popoverNoContent = this.page.getByRole('button', { name: 'With no content' })
    this._popoverWithContent = this.page.getByRole('button', { name: 'With content' })
    this._setSearchValueBtn = this.page.getByRole('button', { name: 'Set search value to: \'Test\'' })
    this._persistentSearchBtn = this.page.getByRole('button', { name: 'Toggle persistantSearch:' })
    this._searchInput = this.page.getByTestId('input')
    this._clearSearchInputBtn = this.page.getByTestId('wpp-icon-cross')
  }
}