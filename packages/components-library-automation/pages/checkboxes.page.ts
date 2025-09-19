import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppCheckboxesPage extends BasePage {
  private _checkboxesDiv!: Locator
  private _focusCheckbox!: Locator
  private _checkboxWithoutLabel!: Locator
  private _checkboxWithLabel!: Locator
  private _checkboxWithOptionalLabel!: Locator
  private _checkboxWithIcon!: Locator
  private _optionalLabel!: Locator
  private _checkboxIcon!: Locator
  private _checkboxTooltip!: Locator
  private _indeterminateCheckbox!: Locator
  private _checkboxInlineMessage!: Locator
  private _checkboxLabel!: Locator
  private _checkboxTooltipError!: Locator
  private _disabledCheckbox!: Locator

  get checkboxesDiv(): Locator {
    return this._checkboxesDiv
  }

  get focusCheckbox(): Locator {
    return this._focusCheckbox
  }

  get checkboxWithoutLabel(): Locator {
    return this._checkboxWithoutLabel
  }

  get checkboxWithLabel(): Locator {
    return this._checkboxWithLabel
  }

  get checkboxWithOptionalLabel(): Locator {
    return this._checkboxWithOptionalLabel
  }

  get checkboxWithIcon(): Locator {
    return this._checkboxWithIcon
  }

  get optionalLabel(): Locator {
    return this._optionalLabel
  }

  get checkboxIcon(): Locator {
    return this._checkboxIcon
  }

  get checkboxTooltip(): Locator {
    return this._checkboxTooltip
  }

  get indeterminateCheckbox(): Locator {
    return this._indeterminateCheckbox
  }

  get checkboxInlineMessage(): Locator {
    return this._checkboxInlineMessage
  }

  get checkboxLabel(): Locator {
    return this._checkboxLabel
  }

  get checkboxTooltipError(): Locator {
    return this._checkboxTooltipError
  }

  get disabledCheckbox(): Locator {
    return this._disabledCheckbox
  }

  async init() {
    this._checkboxesDiv = this.page.locator('.checkboxes')
    this._focusCheckbox = this.page.locator('[data-testid="focus-checkbox"]')
    this._checkboxWithoutLabel = this.page.locator('[data-testid="checkbox-without-label"]')
    this._checkboxWithLabel = this.page.locator('[data-testid="сheckbox-with-label"]')
    this._checkboxWithOptionalLabel = this.page.locator('[data-testid="checkbox-with-optional-label"]')
    this._checkboxWithIcon = this.page.locator('[data-testid="checkbox-with-icon"]')
    this._optionalLabel = this.page.locator('[part="optional-text"]').first()
    this._checkboxIcon = this.page.locator('.wpp-icon-info').first()
    this._checkboxTooltip = this.page.locator('text=Description')
    this._checkboxTooltipError = this.page.locator('span.text[part="text"]:has-text("Error message")')
    this._indeterminateCheckbox = this.page.locator('[data-testid="indeterminate-checkbox"]')
    this._checkboxInlineMessage = this.page.locator('.wpp-inline-message').first()
    this._checkboxLabel = this.page.locator('text=Option 2').first()
    this._disabledCheckbox = this.page.locator('.wpp-checkbox.wpp-checkbox-wrapper.wpp-indeterminate.wpp-disabled>> .wpp-internal-label.s-body.disabled').first()
  }
}
