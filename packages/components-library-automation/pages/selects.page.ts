import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppSelectsPage extends BasePage {
  private _singleSelects!: Locator
  private _selectWithItems!: Locator
  private _textSelectWithItems!: Locator
  private _textSelects!: Locator
  private _combinedSelects!: Locator
  private _combinedSelect!: Locator
  private _combinedSelectTooltip!: Locator
  private _combinedInput!: Locator
  private _combinedMenuList!: Locator
  private _combinedListItemUSD!: Locator
  private _focusSingleSelect!: Locator
  private _focusTextSelect!: Locator
  private _focusCombinedSelect!: Locator
  private _focusMultipleSelect!: Locator
  private _selectAllButton!: Locator
  private _resetButton!: Locator
  private _selectInAccordion!: Locator
  private _multipleTopDropdownSelect!: Locator
  private _singleTopDropdownSelect!: Locator
  private _singleSelect!: Locator
  private _singleSelectInAccordion!: Locator
  private _textSelect!: Locator
  private _textSelectInAccordion!: Locator
  private _textTopDropdownSelect!: Locator
  private _searchAndFolderMultipleSelect!: Locator
  private _multipleSelectContainer!: Locator
  private _dependableRegionSelect!: Locator
  private _dependableCountrySingleSelect!: Locator
  private _dependableCountryMultipleSelect!: Locator
  private _multipleSelectWithFolder!: Locator
  private _leftColumnSelects!: Locator
  private _centralColumnSelects!: Locator
  private _truncSingleSelectM!: Locator
  private _singleSelectSearchTrue!: Locator
  private _singleSelectSearchFalse!: Locator
  private _singleSelectSearchAuto!: Locator
  private _changeCountItemsBtn!: Locator

  private _multipleSelectsWithLeftIcon!: Locator
  private _multipleSelectWithSearchClearAllBtn!: Locator
  private _multipleSelectWithSearchAllItems!: Locator
  private _multipleSelectWithSearchPlaceholderText!: Locator
  private _multipleSelectWithSearchInput!: Locator
  private _multipleSelectWithSearchIconX!: Locator
  private _multipleSelectWithLimitM!: Locator
  private _trancMultipleSelectM!: Locator
  private _multipleSelects!: Locator
  private _changeLimitBtn!: Locator
  private _resetLimitBtn!: Locator
  private _listItems!: Locator

  private _multipleDependencyParentSelectInput!: Locator
  private _multipleDependencyParentOptionA!: Locator
  private _multipleDependencyParentOptionB!: Locator
  private _multipleDependencyFirstChildInput!: Locator
  private _multipleDependencySecondChildInput!: Locator

  private _singleDependencyParentSelectInput!: Locator
  private _singleDependencyFirstChildInput!: Locator
  private _singleDependencySecondChildInput!: Locator

  private _multipleSelectWithLimitandButtons!: Locator
  private _clearAllButton!: Locator

  get textSelects(): Locator {
    return this._textSelects
  }

  get singleSelects(): Locator {
    return this._singleSelects
  }

  get selectWithItems(): Locator {
    return this._selectWithItems
  }

  get textSelectWithItems(): Locator {
    return this._textSelectWithItems
  }

  get combinedSelects(): Locator {
    return this._combinedSelects
  }

  get combinedSelect(): Locator {
    return this._combinedSelect
  }

  get combinedSelectTooltip(): Locator {
    return this._combinedSelectTooltip
  }

  get combinedInput(): Locator {
    return this._combinedInput
  }

  get combinedMenuList(): Locator {
    return this._combinedMenuList
  }

  get combinedListItemUSD(): Locator {
    return this._combinedListItemUSD
  }

  get focusSingleSelect(): Locator {
    return this._focusSingleSelect
  }

  get focusTextSelect(): Locator {
    return this._focusTextSelect
  }

  get focusCombinedSelect(): Locator {
    return this._focusCombinedSelect
  }

  get selectAllButton(): Locator {
    return this._selectAllButton
  }

  get focusMultipleSelect(): Locator {
    return this._focusMultipleSelect
  }

  get resetButton(): Locator {
    return this._resetButton
  }

  get selectInAccordion(): Locator {
    return this._selectInAccordion
  }

  get multipleTopDropdownSelect(): Locator {
    return this._multipleTopDropdownSelect
  }

  get singleSelect(): Locator {
    return this._singleSelect
  }

  get singleSelectInAccordion(): Locator {
    return this._singleSelectInAccordion
  }

  get singleTopDropdownSelect(): Locator {
    return this._singleTopDropdownSelect
  }

  get textSelect(): Locator {
    return this._textSelect
  }

  get textSelectInAccordion(): Locator {
    return this._textSelectInAccordion
  }

  get textTopDropdownSelect(): Locator {
    return this._textTopDropdownSelect
  }

  get searchAndFolderMultipleSelect(): Locator {
    return this._searchAndFolderMultipleSelect
  }

  get multipleSelectContainer(): Locator {
    return this._multipleSelectContainer
  }

  get dependableRegionSelect(): Locator {
    return this._dependableRegionSelect
  }

  get dependableCountrySingleSelect(): Locator {
    return this._dependableCountrySingleSelect
  }

  get dependableCountryMultipleSelect(): Locator {
    return this._dependableCountryMultipleSelect
  }

  get multipleSelectWithFolder(): Locator {
    return this._multipleSelectWithFolder
  }

  get leftColumnSelects(): Locator {
    return this._leftColumnSelects
  }

  get centralColumnSelects(): Locator {
    return this._centralColumnSelects
  }

  get multipleSelectWithSearchClearAllBtn(): Locator {
    return this._multipleSelectWithSearchClearAllBtn
  }

  get multipleSelectWithSearchAllItems(): Locator {
    return this._multipleSelectWithSearchAllItems
  }

  get multipleSelectWithSearchPlaceholderText(): Locator {
    return this._multipleSelectWithSearchPlaceholderText
  }

  get multipleSelectWithSearchInput(): Locator {
    return this._multipleSelectWithSearchInput
  }

  get multipleSelectWithSearchIconX(): Locator {
    return this._multipleSelectWithSearchIconX
  }

  get multipleDependencyParentSelectInput(): Locator {
    return this._multipleDependencyParentSelectInput
  }

  get multipleDependencyParentOptionA(): Locator {
    return this._multipleDependencyParentOptionA
  }

  get multipleDependencyFirstChildInput(): Locator {
    return this._multipleDependencyFirstChildInput
  }

  get multipleDependencySecondChildInput(): Locator {
    return this._multipleDependencySecondChildInput
  }

  get multipleDependencyParentOptionB(): Locator {
    return this._multipleDependencyParentOptionB
  }

  get singleDependencyParentSelectInput(): Locator {
    return this._singleDependencyParentSelectInput
  }

  get singleDependencyFirstChildInput(): Locator {
    return this._singleDependencyFirstChildInput
  }

  get singleDependencySecondChildInput(): Locator {
    return this._singleDependencySecondChildInput
  }

  get multipleSelectWithLimitandButtons(): Locator {
    return this._multipleSelectWithLimitandButtons
  }

  get clearAllButton(): Locator {
    return this._clearAllButton
  }

  get listItems(): Locator {
    return this._listItems
  }

  get truncSingleSelectM(): Locator {
    return this._truncSingleSelectM
  }

  get multipleSelectsWithLeftIcon(): Locator {
    return this._multipleSelectsWithLeftIcon
  }

  get multipleSelectWithLimitM(): Locator {
    return this._multipleSelectWithLimitM
  }

  get changeLimitBtn(): Locator {
    return this._changeLimitBtn
  }

  get resetLimitBtn(): Locator {
    return this._resetLimitBtn
  }

  get singleSelectSearchTrue(): Locator {
    return this._singleSelectSearchTrue
  }

  get singleSelectSearchFalse(): Locator {
    return this._singleSelectSearchFalse
  }

  get singleSelectSearchAuto(): Locator {
    return this._singleSelectSearchAuto
  }

  get changeCountItemsBtn(): Locator {
    return this._changeCountItemsBtn
  }

  get multipleSelects(): Locator {
    return this._multipleSelects
  }

  get truncMultipleSelectM(): Locator {
    return this._trancMultipleSelectM
  }

  async init() {
    this._singleSelects = this.page.locator('[data-testid="single-selects"]')
    this._selectWithItems = this.page.locator('[data-testid="select-with-items"]')
    this._textSelectWithItems = this.page.locator('[data-testid="text-select-with-items"] [data-testid="wpp-icon-chevron"]')
    this._textSelects = this.page.locator('[data-testid="text-selects"]')
    this._combinedSelects = this.page.locator('[data-testid="combined-selects"]')
    this._combinedSelect = this.page.locator('[data-testid="combined-select"] [part="single-select-input"]')
    this._combinedSelectTooltip = this.page.locator(
      '[data-testid="combined-select"] .wpp-inline-message .inline-message-wrapper',
    )
    this._combinedInput = this.page.locator('[data-testid="combined-input"]').locator('.inputs-container')
    this._combinedMenuList = this.page.locator('[data-testid="combined-input"]').locator('[data-testid="wpp-icon-chevron"]')
    this._combinedListItemUSD = this.page.locator('#wpp-list-item-2').getByRole('listitem')
    this._focusSingleSelect = this.page.locator('[data-testid="focus-single-select"]')
    this._focusTextSelect = this.page.locator('[data-testid="focus-text-select"]')
    this._focusCombinedSelect = this.page.locator('[data-testid="focus-combined-select"]')
    this._singleSelectSearchTrue = this.page.locator('[data-testid="search-true-single-select-m"] .overflow-container')
    this._singleSelectSearchFalse = this.page.locator('[data-testid="search-false-single-select-m"] .overflow-container')
    this._singleSelectSearchAuto = this.page.locator('[data-testid="search-auto-single-select-m"] .overflow-container')
    this._changeCountItemsBtn = this.page.getByRole('button', { name: 'Change list to: 6 items' })

    this._selectAllButton = this.page.getByRole('button', { name: 'Select all' })
    this._focusMultipleSelect = this.page.locator('[data-testid="focus-multiple-select"] .overflow-container')
    this._resetButton = this.page.locator('[data-testid="reset-button"]')
    this._selectInAccordion = this.page.locator('[data-testid="select-in-accordion"]')
    this._multipleTopDropdownSelect = this.page.locator('[data-testid="multiple-top-dropdown-select"] .overflow-container')
    this._singleTopDropdownSelect = this.page.locator('[data-testid="single-top-dropdown-select"] .overflow-container')
    this._singleSelect = this.page.locator('[data-testid="single-select"] .overflow-container')
    this._singleSelectInAccordion = this.page.locator('[data-testid="single-select-in-accordion"]')
    this._textSelect = this.page.locator('[data-testid="text-select"]')
    this._textSelectInAccordion = this.page.locator('[data-testid="text-select-in-accordion"]')
    this._textTopDropdownSelect = this.page.locator('[data-testid="text-top-dropdown-select"]')
    this._searchAndFolderMultipleSelect = this.page.locator('[data-testid="search-and-folder-multiple-select"] .overflow-container')
    this._multipleSelectContainer = this.page.locator('[data-testid="multiple-select-container"]')
    this._multipleSelectWithFolder = this.page.locator('[data-testid="multiple-select-with-folder"] .overflow-container')
    this._leftColumnSelects = this.page.locator('[data-testid="left-column-selects"]')
    this._centralColumnSelects = this.page.locator('[data-testid="central-column-selects"]')
    this._truncSingleSelectM = this.page.locator('[data-testid="trunc-single-select-m"] .overflow-container')
    this._multipleSelectsWithLeftIcon = this.page.locator('.wpp-multiple-select .overflow-container')
    this._multipleSelectWithLimitM = this.page.locator('[data-testid="trunc-multiple-select-m"] .overflow-container')
    this._changeLimitBtn = this.page.getByRole('button', { name: 'Change to: 3 items' })
    this._resetLimitBtn = this.page.getByRole('button', { name: 'Reset', exact: true })
    this._trancMultipleSelectM = this.page.locator('[data-testid="trunc-multiple-select-m"] .overflow-container')
    this._multipleSelects = this.page.locator('[data-testid="multiple-selects"]')

    this._dependableRegionSelect = this.page.locator('[data-testid="dependable-parent-multiple-select-m"] .overflow-container')
    this._dependableCountrySingleSelect = this.page.locator('[data-testid="dependable-country-single-select"]')
    this._dependableCountryMultipleSelect = this.page.locator('[data-testid="dependable-child-1-multiple-select-m"] .overflow-container')

    this._multipleSelectWithSearchClearAllBtn = this.page.locator('[data-testid="focus-multiple-select"] [part="clear-all-button"]')
    this._multipleSelectWithSearchAllItems = this.page.locator('[data-testid="focus-multiple-select"] >> [role="WPP-LIST-ITEM"]')
    this._multipleSelectWithSearchPlaceholderText = this.page.locator('[data-testid="focus-multiple-select"] >> .overflow-container')
    this._multipleSelectWithSearchInput = this.page.getByTestId('input')
    this._multipleSelectWithSearchIconX = this.page.getByTestId('wpp-icon-cross')
    this._listItems = this.page.locator('[role="WPP-LIST-ITEM"]')

    this._multipleDependencyParentSelectInput = this.page.locator('[data-testid="parent-select-multiple"] .overflow-container')
    this._multipleDependencyParentOptionA = this.page.locator('[value="optionA"]')
    this._multipleDependencyParentOptionB = this.page.locator('[value="optionB"]')
    this._multipleDependencyFirstChildInput = this.page.locator('[data-testid="first-child-select-multiple"] .overflow-container')
    this._multipleDependencySecondChildInput = this.page.locator('[data-testid="second-child-select-multiple"] .overflow-container')

    this._singleDependencyParentSelectInput = this.page.locator('[data-testid="parent-select-single"] .overflow-container')
    this._singleDependencyFirstChildInput = this.page.locator('[ data-testid="first-child-select-single"] .overflow-container')
    this._singleDependencySecondChildInput = this.page.locator('[ data-testid="second-child-select-single"] .overflow-container')
    this._multipleSelectWithLimitandButtons = this.page.locator('[name="wpp-multiple-select-with-limit-btns"]')
    this._clearAllButton = this.page.getByRole('button', { name: 'Clear All' })
  }
}
