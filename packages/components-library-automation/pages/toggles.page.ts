import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppTogglesPage extends BasePage {
  private _togglesDiv!: Locator
  private _focusToggle!: Locator
  private _toggleWithoutLabel!: Locator
  private _toggleWithLabel!: Locator
  private _toggleWithIcon!: Locator
  private _toggleWithOptionalLabel!: Locator
  private _toggleTooltip!: Locator
  private _toggleIcon!: Locator
  private _optionalLabel!: Locator
  private _toggleLabel!: Locator
  private _controlledToggle!: Locator

  get togglesDiv(): Locator {
    return this._togglesDiv
  }

  get focusToggle(): Locator {
    return this._focusToggle
  }

  get toggleWithoutLabel(): Locator {
    return this._toggleWithoutLabel
  }

  get toggleWithLabel(): Locator {
    return this._toggleWithLabel
  }

  get toggleWithIcon(): Locator {
    return this._toggleWithIcon
  }

  get toggleWithOptionalLabel(): Locator {
    return this._toggleWithOptionalLabel
  }

  get toggleTooltip(): Locator {
    return this._toggleTooltip
  }

  get toggleIcon(): Locator {
    return this._toggleIcon
  }

  get optionalLabel(): Locator {
    return this._optionalLabel
  }

  get toggleLabel(): Locator {
    return this._toggleLabel
  }

  get controlledToggle(): Locator {
    return this._controlledToggle
  }

  async init() {
    this._togglesDiv = this.page.locator('.toggles')
    this._focusToggle = this.page.locator('[data-testid="focus-toggle"]')
    this._toggleWithoutLabel = this.page.locator('[data-testid="toggle-without-label"]')
    this._toggleWithLabel = this.page.locator('[data-testid="toggle-with-label"]')
    this._toggleWithIcon = this.page.locator('[data-testid="toggle-with-icon"]')
    this._toggleWithOptionalLabel = this.page.locator('[data-testid="toggle-with-optional-label"]')
    this._toggleTooltip = this.page.locator('.wpp-internal-tooltip')
    this._toggleIcon = this.page.locator('.wpp-icon-info')
    this._optionalLabel = this.page.locator('[part="optional-text"]')
    this._toggleLabel = this.page.locator('text=Label Test')
    this._controlledToggle = this.page.locator('[data-testid="controlled-toggle"]')
  }
}
