import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppRadioPage extends BasePage {
  private _radioDiv!: Locator
  private _focusRadioButton!: Locator
  private _radioButtonWithoutLabel!: Locator
  private _radioButtonWithLabel!: Locator
  private _radioButtonWithIcon!: Locator
  private _radioButtonWithOptionalLabel!: Locator
  private _radioButtonTooltip!: Locator
  private _radioButtonIcon!: Locator
  private _optionalLabel!: Locator
  private _radioButtonLabel!: Locator

  get radioDiv(): Locator {
    return this._radioDiv
  }

  get focusRadioButton(): Locator {
    return this._focusRadioButton
  }

  get radioButtonWithoutLabel(): Locator {
    return this._radioButtonWithoutLabel
  }

  get radioButtonWithLabel(): Locator {
    return this._radioButtonWithLabel
  }

  get radioButtonWithIcon(): Locator {
    return this._radioButtonWithIcon
  }

  get radioButtonWithOptionalLabel(): Locator {
    return this._radioButtonWithOptionalLabel
  }

  get radioButtonTooltip(): Locator {
    return this._radioButtonTooltip
  }

  get radioButtonIcon(): Locator {
    return this._radioButtonIcon
  }
  get optionalLabel(): Locator {
    return this._optionalLabel
  }

  get radioButtonLabel(): Locator {
    return this._radioButtonLabel
  }

  async init() {
    this._radioDiv = this.page.locator('.radioButtons')
    this._focusRadioButton = this.page.locator('[data-testid="focus-radio-button"]')
    this._radioButtonWithoutLabel = this.page.locator('[data-testid="radio-button-without-label"]')
    this._radioButtonWithLabel = this.page.locator('[data-testid="radio-button-with-label"]')
    this._radioButtonWithIcon = this.page.locator('[data-testid="radio-button-with-icon"]')
    this._radioButtonWithOptionalLabel = this.page.locator('[data-testid="radio-button-with-optional-label"]').first()
    this._radioButtonTooltip = this.page.locator('.wpp-internal-tooltip')
    this._radioButtonIcon = this.page.locator('.wpp-icon-info').first()
    this._optionalLabel = this.page.locator('[part="optional-text"]').first()
    this._radioButtonLabel = this.page.locator('text=Option 2').first()
  }
}
