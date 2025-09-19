import { WppInputsPage } from './inputs.page'
import { expect, Locator } from '@playwright/test'
import { Color, colorPalette } from '../color-palette'

export class WppTextAreasPage extends WppInputsPage {
  private _textAreaInputsDiv!: Locator
  private _regularLimitedTextArea!: Locator
  private _regularLimitlessTextArea!: Locator
  private _disabledLimitlessTextArea!: Locator
  private _limitedErrorTextArea!: Locator
  private _limitlessWarningTextArea!: Locator
  private _allInTextArea!: Locator
  private _charEnteredLabel!: string
  private _enteredCharacters!: Locator

  get textAreaInputsDiv(): Locator {
    return this._textAreaInputsDiv
  }

  get regularLimitedTextArea(): Locator {
    return this._regularLimitedTextArea
  }

  get regularLimitlessTextArea(): Locator {
    return this._regularLimitlessTextArea
  }

  get disabledLimitlessTextArea(): Locator {
    return this._disabledLimitlessTextArea
  }

  get limitedErrorTextArea(): Locator {
    return this._limitedErrorTextArea
  }

  get limitlessWarningTextArea(): Locator {
    return this._limitlessWarningTextArea
  }

  get allInTextArea(): Locator {
    return this._allInTextArea
  }

  get charRemainsLabel(): string {
    return this._charEnteredLabel
  }

  get enteredCharacters(): Locator {
    return this._enteredCharacters
  }


  public init() {
    this._textAreaInputsDiv = this.page.locator('[data-testid="text-area-inputs"]')

    this._regularLimitedTextArea = this.page.locator('[data-testid="regular-limited-text-area"]')
    this._regularLimitlessTextArea = this.page.locator('[data-testid="regular-limitless-text-area"]')
    this._disabledLimitlessTextArea = this.page.locator('[data-testid="disabled-limitless-text-area"]')
    this._limitedErrorTextArea = this.page.locator('[data-testid="limited-error-text-area"]')
    this._limitlessWarningTextArea = this.page.locator('[data-testid="limitless-warning-text-area"]')
    this._allInTextArea = this.page.locator('[data-testid="all-in-text-area"]')

    this._charEnteredLabel = '[data-testid="char-entered-label"]'
    this._enteredCharacters = this.page.locator('.entered-characters').first()
  }

  async performHoverColorCheck(selector: Locator, enabled: boolean) {
    let bgHoverColor
    let textColor
    let placeHolder

    if (enabled) {
      bgHoverColor = 'wpp-grey-color-200'
      placeHolder = 'wpp-grey-color-700'
      await selector.hover()
      await expect(selector.locator('textarea')).toHaveCSS('background-color', colorPalette[bgHoverColor])
      await expect(selector.locator('textarea')).toHaveCSS('--textarea-placeholder-color', '#697077')
    } else {
      bgHoverColor = 'wpp-disabled-color'
      textColor = 'wpp-grey-color-500'
      await this.checkHoverElementColors(selector.locator('textarea'), bgHoverColor, textColor)
    }
  }

  async checkLabelText(selector: Locator, color: Color, labelText: string) {
    await expect(selector.locator('.wpp-label')).toHaveText(labelText)
    await expect(selector.locator('.wpp-label').locator('span').first()).toHaveCSS('color', colorPalette[color])
  }

  async checkCharLimit(selector: Locator, color: Color, numOfChars: string, charOnly?: boolean) {
    await expect(selector).toHaveText('Characters:' + numOfChars)
    //if no characters yet, only number of chars text should have required color
    charOnly? await expect(selector.locator('.entered-characters')).toHaveCSS('color', colorPalette[color]) :await expect(selector.locator('.wpp-typography').first()).toHaveCSS('color', colorPalette[color])
  }

  async checkValidationProps(
    selector: Locator,
    validationType: string,
    validationMessage: string,
    validationMessageTooltip: string,
  ) {
    await expect(selector.locator('textarea')).toHaveCSS(
      'border-bottom-color',
      colorPalette[`wpp-${validationType}-color`],
    )
    await expect(selector.locator('textarea')).toHaveCSS('border-bottom-width', '1px')
    await expect(selector.locator('textarea')).toHaveCSS(
      'border-top-color',
      colorPalette[`wpp-${validationType}-color`],
    )
    await expect(selector.locator('textarea')).toHaveCSS('border-top-width', '1px')
    await expect(selector.locator('textarea')).toHaveCSS(
      'border-left-color',
      colorPalette[`wpp-${validationType}-color`],
    )
    await expect(selector.locator('textarea')).toHaveCSS('border-left-width', '1px')
    await expect(selector.locator('textarea')).toHaveCSS(
      'border-right-color',
      colorPalette[`wpp-${validationType}-color`],
    )
    await expect(selector.locator('textarea')).toHaveCSS('border-right-width', '1px')
    await expect(selector.locator('.message')).toHaveText(validationMessage)
    await selector.locator('.wpp-inline-message').hover()
    await expect(this.page.locator('.wpp-internal-tooltip span')).toHaveText(
      validationMessageTooltip,
    )
  }
}
