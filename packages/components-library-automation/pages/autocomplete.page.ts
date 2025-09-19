import { expect, Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppAutocompletePage extends BasePage {
  private _basicAutocomplete!: Locator
  private _autocompletes!: Locator
  private _basicClearAllButton!: Locator
  private _singleAutocompleteWithoutSuggestions!: Locator
  private _singleAutocompleteWithoutSearchNoSuggest!: Locator
  private _extendedAutocomplete!: Locator
  private _extendedSSizeAutocomplete!: Locator
  private _extendedAutocompleteArea!: Locator
  private _regularAutocompleteWithoutSuggestions!: Locator
  private _regularAutocompleteArea!: Locator
  private _inlineMessagesAutocompletes!: Locator
  private _errorAutocomplete!: Locator
  private _sSizeAutocompletes!: Locator
  private _singleAutocompleteInputWithoutSuggestions!: Locator
  private _basicWithInitialValuesAutocompleteInput!: Locator
  private _basicAutocompleteValues!: Locator
  private _nothingFoundLabel!: Locator
  private _missClick!: Locator
  private _showMoreActionBtn!: Locator
  private _selectedPillsList!: Locator
  private _showLessActionBtn!: Locator
  private _autocompleteWithPersistentSearch!: Locator
  private _autocompleteWithPersistentSearchInput!: Locator
  private _singleAutocompleteWithDynamicSuggestions!: Locator
  private _multipleAutocompleteWithDynamicSuggestions!: Locator
  private _autocompleteWithDynamicSuggestionsPersistantSearch!: Locator
  private _updateSuggestionsBtn!: Locator
  private _dynamicSuggestionsListFirst!: Locator
  private _dynamicSuggestionsListSecond!: Locator
  private _clearAllCrossBtn!: Locator


  get basicAutocomplete(): Locator {
    return this._basicAutocomplete
  }

  get autocompletes(): Locator {
    return this._autocompletes
  }

  get basicClearAllButton(): Locator {
    return this._basicClearAllButton
  }

  get singleAutocompleteWithoutSuggestions(): Locator {
    return this._singleAutocompleteWithoutSuggestions
  }

  get singleAutocompleteWithoutSearchNoSuggest(): Locator {
    return this._singleAutocompleteWithoutSearchNoSuggest
  }

  get extendedAutocomplete(): Locator {
    return this._extendedAutocomplete
  }

  get regularAutocompleteWithoutSuggestions(): Locator {
    return this._regularAutocompleteWithoutSuggestions
  }

  get extendedAutocompleteArea(): Locator {
    return this._extendedAutocompleteArea
  }

  get regularAutocompleteArea(): Locator {
    return this._regularAutocompleteArea
  }

  get inlineMessagesAutocompletes(): Locator {
    return this._inlineMessagesAutocompletes
  }

  get errorAutocomplete(): Locator {
    return this._errorAutocomplete
  }

  get sSizeAutocompletes(): Locator {
    return this._sSizeAutocompletes
  }

  get extendedSSizeAutocomplete(): Locator {
    return this._extendedSSizeAutocomplete
  }

  get singleAutocompleteInputWithoutSuggestions(): Locator {
    return this._singleAutocompleteInputWithoutSuggestions
  }

  get basicWithInitialValuesAutocompleteInput(): Locator {
    return this._basicWithInitialValuesAutocompleteInput
  }

  get basicAutocompleteValues(): Locator {
    return this._basicAutocompleteValues
  }

  get nothingFoundLabel(): Locator {
    return this._nothingFoundLabel
  }

  get missClick(): Locator {
    return this._missClick
  }

  get showMoreActionBtn(): Locator {
    return this._showMoreActionBtn
  }

  get selectedPillsList(): Locator {
    return this._selectedPillsList
  }

  get showLessActionBtn(): Locator {
    return this._showLessActionBtn
  }

  get autocompleteWithPersistentSearch(): Locator {
    return this._autocompleteWithPersistentSearch
  }

  get autocompleteWithPersistentSearchInput(): Locator {
    return this._autocompleteWithPersistentSearchInput
  }

  get singleAutocompleteWithDynamicSuggestions(): Locator {
    return this._singleAutocompleteWithDynamicSuggestions
  }

  get multipleAutocompleteWithDynamicSuggestions(): Locator {
    return this._multipleAutocompleteWithDynamicSuggestions
  }

  get autocompleteWithDynamicSuggestionsPersistantSearch(): Locator {
    return this._autocompleteWithDynamicSuggestionsPersistantSearch
  }

  get updateSuggestionsBtn(): Locator {
    return this._updateSuggestionsBtn
  }

  get dynamicSuggestionsListFirst(): Locator {
    return this._dynamicSuggestionsListFirst
  }

  get dynamicSuggestionsListSecond(): Locator {
    return this._dynamicSuggestionsListSecond
  }

  get clearAllCrossBtn(): Locator {
    return this._clearAllCrossBtn
  }

  async init() {
    this._basicAutocomplete = this.page.locator('[data-testid="basic-autocomplete"]').first()
    this._autocompletes = this.page.locator('[data-testid="autocompletes"]')
    this._basicClearAllButton = this.page.locator('[data-testid="basic-autocomplete"] .wpp-icon-cross').first()
    this._singleAutocompleteWithoutSuggestions = this.page.locator('[data-testid="single-autocomplete"]').first()
    this._singleAutocompleteWithoutSearchNoSuggest = this.page.locator('[data-testid="single-autocomplete-without-search"]').first()
    this._extendedAutocomplete = this.page.locator('[data-testid="extended-autocomplete"]')
    this._regularAutocompleteWithoutSuggestions = this.page.locator('[data-testid="regular-autocomplete"]').first()
    this._regularAutocompleteArea = this.page.locator('[data-testid="regular-autocomplete-area"]')
    this._extendedAutocompleteArea = this.page.locator('[data-testid="extended-autocomplete-area"]')
    this._inlineMessagesAutocompletes = this.page.locator('[data-testid="inline-messages-autocompletes"]')
    this._errorAutocomplete = this.page.locator('[data-testid="error-autocomplete"]')
    this._sSizeAutocompletes = this.page.locator('[data-testid="s-size-autocompletes"]')
    this._extendedSSizeAutocomplete = this.page.locator('[data-testid="extended-s-size-autocomplete"]')
    this._singleAutocompleteInputWithoutSuggestions = this.page.locator('[data-testid="single-autocomplete"] .autocomplete-input').first()
    this._basicWithInitialValuesAutocompleteInput = this.page.getByTestId('wpp-autocomplete-input-placeholder').first()
    this._basicAutocompleteValues = this.page.locator('.item.checked.selectable')
    this._nothingFoundLabel = this.page.getByText('Nothing found')
    this._missClick = this.page.locator('text=Components Library Examples')
    this._showMoreActionBtn = this.page.getByTestId('wpp-autocomplete-show-btn')
    this._selectedPillsList = this.page.getByTestId('wpp-autocomplete-selected-pills-wrapper')
    this._showLessActionBtn = this.page.getByTestId('wpp-autocomplete-show-btn').nth(1)
    this._autocompleteWithPersistentSearch = this.page.getByTestId('wpp-autocomplete-persistent-search')
    this._autocompleteWithPersistentSearchInput = this.page.getByTestId('wpp-autocomplete-input-placeholder').nth(13)
    this._singleAutocompleteWithDynamicSuggestions = this.page.getByTestId('single-autocomplete-dynamic-suggestions').getByTestId('wpp-autocomplete-input-placeholder')
    this._multipleAutocompleteWithDynamicSuggestions = this.page.getByTestId('multiple-autocomplete-dynamic-suggestions').getByPlaceholder('Select fruits')
    this._autocompleteWithDynamicSuggestionsPersistantSearch = this.page.getByTestId('multiple-autocomplete-dynamic-suggestions-search').getByPlaceholder('Select fruits')
    this._updateSuggestionsBtn = this.page.getByText('Update suggestions');
    this._dynamicSuggestionsListFirst = this.page.getByText('SuggestionsAvacadoBlueberryCherryDurianElderberry', { exact: true })
    this._dynamicSuggestionsListSecond = this.page.getByText('SuggestionsGrapefruitWatermelonAll the fruits in the world mixed into a SUPER', { exact: false })
    this._clearAllCrossBtn = this.page.getByTestId('wpp-icon-cross')
  }

  async searchResultShouldHaveText(text: string, highlightedText: string) {
    await expect(this.singleAutocompleteWithoutSuggestions.locator('.wpp-list-item:visible')).toHaveCount(1)
    await expect(this.singleAutocompleteWithoutSuggestions.locator('.wpp-list-item:visible .highlight-text').first()).toHaveText(text)
    await expect(this.singleAutocompleteWithoutSuggestions.locator('.highlight')).toHaveText(highlightedText)
  }

  async checkAutocompletePillAndInputValues() {
    //Check pill
    await expect(this.regularAutocompleteWithoutSuggestions.locator('[slot="selected-values"] .wpp-pill')).toHaveCount(1)
    await expect(this.page.getByRole('checkbox', { name: /Apple/ })).toBeVisible()

    //Click out the component
    await this.missClick.click()

    //Check the component's input
    await expect(this.regularAutocompleteWithoutSuggestions.locator('.input-placeholder')).toHaveText('Apple')
    await expect(this.regularAutocompleteWithoutSuggestions.locator('.wpp-icon-cross')).toBeVisible
    await expect(this.regularAutocompleteWithoutSuggestions).not.toBeFocused()
  }

  async navigateToVCAutocompletes() {
    //There is an issue with the direct navigation with webkit browser. Had to change it to clicking menu items

    await this.page.locator('text=Visual Comparison').click()
    await this.page.locator('text=Autocomplete').nth(1).click()
  }

  async navigateToExampleAndSearchLongLabelItem() {
    await this.navigateToVCAutocompletes()

    await this.page.waitForTimeout(500)
    await this.regularAutocompleteWithoutSuggestions.click()
    await this.regularAutocompleteWithoutSuggestions.type('universe')
  }
}