import { BasePage } from './base.page'
import { expect, Locator } from '@playwright/test'
import { Color, colorPalette } from '../color-palette'

export class WppInputsPage extends BasePage {
  private _regularMInput!: Locator
  private _warningMInput!: Locator
  private _errorMInput!: Locator
  private _disabledMInput!: Locator
  private _searchIconWithMessageMInput!: Locator
  private _allInMInput!: Locator

  private _regularSInput!: Locator
  private _warningSInput!: Locator
  private _errorSInput!: Locator
  private _disabledSInput!: Locator
  private _searchIconWithMessageSInput!: Locator
  private _allInSInput!: Locator
  private _regularMInputWithMessage!: Locator

  private _mSizeInputsDiv!: Locator
  private _sSizeInputsDiv!: Locator
  private _inputWithText!: Locator
  private _searchInputsContainer!: Locator
  private _searchInput!: Locator
  private _numberInput!: Locator
  private _diffSeparatorInput!: Locator
  private _boundariesValuesInput!: Locator

  private _customDecimalMaskInput!: Locator
  private _currencyMaskInput!: Locator
  private _percentageMaskInput!: Locator
  private _creditCardMaskInput!: Locator
  private _timeMaskInput!: Locator
  private _fixedLengthCurrencyMaskInput!: Locator
  private _phoneMaskInput!: Locator

  get regularMInput(): Locator {
    return this._regularMInput
  }

  get warningMInput(): Locator {
    return this._warningMInput
  }

  get errorMInput(): Locator {
    return this._errorMInput
  }

  get disabledMInput(): Locator {
    return this._disabledMInput
  }

  get searchIconWithMessageMInput(): Locator {
    return this._searchIconWithMessageMInput
  }

  get allInMInput(): Locator {
    return this._allInMInput
  }

  get regularSInput(): Locator {
    return this._regularSInput
  }

  get warningSInput(): Locator {
    return this._warningSInput
  }

  get errorSInput(): Locator {
    return this._errorSInput
  }

  get disabledSInput(): Locator {
    return this._disabledSInput
  }

  get searchIconWithMessageSInput(): Locator {
    return this._searchIconWithMessageSInput
  }

  get allInSInput(): Locator {
    return this._allInSInput
  }

  get mSizeInputsDiv(): Locator {
    return this._mSizeInputsDiv
  }

  get sSizeInputsDiv(): Locator {
    return this._sSizeInputsDiv
  }

  get inputWithText(): Locator {
    return this._inputWithText
  }

  get searchInputsContainer(): Locator {
    return this._searchInputsContainer
  }

  get searchInput(): Locator {
    return this._searchInput
  }

  get numberInput(): Locator {
    return this._numberInput
  }

  get diffSeparatorInput(): Locator {
    return this._diffSeparatorInput
  }

  get boundariesValuesInput(): Locator {
    return this._boundariesValuesInput
  }

  get customDecimalMaskInput(): Locator {
    return this._customDecimalMaskInput
  }

  get currencyMaskInput(): Locator {
    return this._currencyMaskInput
  }

  get percentageMaskInput(): Locator {
    return this._percentageMaskInput
  }

  get creditCardMaskInput(): Locator {
    return this._creditCardMaskInput
  }

  get timeMaskInput(): Locator {
    return this._timeMaskInput
  }

  get fixedLengthCurrencyMaskInput(): Locator {
    return this._fixedLengthCurrencyMaskInput
  }

  get phoneMaskInput(): Locator {
    return this._phoneMaskInput
  }

  get regularMInputWithMessage(): Locator {
    return this._regularMInputWithMessage
  }

  public init() {
    this._regularMInput = this.page.locator('[data-testid="regular-m-input"]')
    this._warningMInput = this.page.locator('[data-testid="warning-m-input"]')
    this._errorMInput = this.page.locator('[data-testid="error-m-input"]')
    this._disabledMInput = this.page.locator('[data-testid="disabled-m-input"]')
    this._searchIconWithMessageMInput = this.page.locator('[data-testid="search-icon-with-message-m-input"]')
    this._allInMInput = this.page.locator('[data-testid="all-in-m-input"]')
    this._regularMInputWithMessage = this.page.getByTestId('m-size-inputs').getByTestId('message-m-input').getByTestId('input')

    this._regularSInput = this.page.locator('[data-testid="regular-s-input"]')
    this._warningSInput = this.page.locator('[data-testid="warning-s-input"]')
    this._errorSInput = this.page.locator('[data-testid="error-s-input"]')
    this._disabledSInput = this.page.locator('[data-testid="disabled-s-input"]')
    this._searchIconWithMessageSInput = this.page.locator('[data-testid="search-icon-with-message-s-input"]')
    this._allInSInput = this.page.locator('[data-testid="all-in-s-input"]')

    this._mSizeInputsDiv = this.page.locator('[data-testid="m-size-inputs"]')
    this._sSizeInputsDiv = this.page.locator('[data-testid="s-size-inputs"]')
    this._inputWithText = this.page.locator('[data-testid="input-with-text"] input')
    this._searchInputsContainer = this.page.locator('[data-testid="search-inputs-container"]')
    this._searchInput = this.page.locator('[data-testid="search-input"]')
    this._numberInput = this.page.locator('[data-testid="number-input"]')
    this._diffSeparatorInput = this.page.locator('[data-testid="diff-separator-input"]')
    this._boundariesValuesInput = this.page.locator('[data-testid="boundaries-values-input"] input').first()

    this._customDecimalMaskInput = this.page.locator('[data-testid="custom-decimal-mask-input"]')
    this._currencyMaskInput = this.page.locator('[data-testid="currency-mask-input"]')
    this._percentageMaskInput = this.page.locator('[data-testid="percentage-mask-input"]')
    this._creditCardMaskInput = this.page.locator('[data-testid="credit-card-mask-input"]')
    this._timeMaskInput = this.page.locator('[data-testid="time-mask-input"]')
    this._fixedLengthCurrencyMaskInput = this.page.locator('[data-testid="fixed-length-currency-mask-input"]')
    this._phoneMaskInput = this.page.locator('[data-testid="phone-mask-input"]')
  }

  async enterAndCheckText(selector: Locator, text: string) {
    await selector.locator('input').fill(text)
    await expect(selector.locator('input')).toHaveValue(text)
  }

  async checkLabelText(selector: Locator, labelText: string, color: Color) {
    await expect(selector.locator('.wpp-label')).toHaveText(labelText)
    await expect(selector.locator('.wpp-label').locator('span').first()).toHaveCSS('color', colorPalette[color])
  }

  async performHoverColorCheck(selector: Locator, enabled: boolean) {
    let bgHoverColor
    let textColor

    if (enabled) {
      bgHoverColor = 'wpp-grey-color-200'
      textColor = 'wpp-black-color'
    } else {
      bgHoverColor = 'wpp-disabled-color'
      textColor = 'wpp-grey-color-500'
    }
    await this.checkHoverElementColors(selector.locator('input'), bgHoverColor, textColor)
  }

  async checkInputValidationProps(selector: Locator, validationType: string, validationMessage: string) {
    await expect(selector.locator('input')).toHaveCSS(
      'border',
      '1px solid ' + colorPalette[`wpp-${validationType}-color`],
    )
    await expect(selector.locator('.wpp-inline-message span')).toHaveText(validationMessage)
    await expect(selector.locator('.wpp-inline-message span')).toHaveCSS(
      'color',
      colorPalette[`wpp-${validationType}-color`],
    )
    await this.checkElementStatus(selector.locator(`.wpp-icon-${validationType}`), 'visible')
  }
}
