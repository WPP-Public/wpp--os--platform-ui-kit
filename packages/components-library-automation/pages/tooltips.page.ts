import { expect, Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppTooltipsPage extends BasePage {
  private _rightTooltipButton!: Locator
  private _bottomTooltipButton!: Locator
  private _leftTooltipButton!: Locator
  private _topTooltipButton!: Locator
  private _tooltips!: Locator
  private _tippyButton!: Locator
  private _styledTooltipButton!: Locator
  private _allowHTMLButton!: Locator
  private _warningTooltipBtn!: Locator
  private _errorTooltipBtn!: Locator
  private _customContentTooltip!: Locator
  private _changeThemeBtn!: Locator
  private _errorWarningTooltip!: Locator
  private _errorWarningTooltipWithTitle!: Locator

  get tooltips(): Locator {
    return this._tooltips
  }

  get rightTooltipButton(): Locator {
    return this._rightTooltipButton
  }

  get bottomTooltipButton(): Locator {
    return this._bottomTooltipButton
  }

  get leftTooltipButton(): Locator {
    return this._leftTooltipButton
  }

  get topTooltipButton(): Locator {
    return this._topTooltipButton
  }

  get tippyButton(): Locator {
    return this._tippyButton
  }

  get styledTooltipButton(): Locator {
    return this._styledTooltipButton
  }

  get allowHTMLButton(): Locator {
    return this._allowHTMLButton
  }

  get warningTooltipBtn(): Locator {
    return this._warningTooltipBtn
  }

  get errorTooltipBtn(): Locator {
    return this._errorTooltipBtn
  }

  get customContentTooltip(): Locator {
    return this._customContentTooltip
  }
  
  get changeThemeBtn(): Locator {
    return this._changeThemeBtn
  }

  get errorWarningTooltip(): Locator {
    return this._errorWarningTooltip
  }

  get errorWarningTooltipWithTitle(): Locator {
    return this._errorWarningTooltipWithTitle
  }

  async init() {
    this._rightTooltipButton = this.page.locator('[data-testid="right-tooltip-button"]')
    this._bottomTooltipButton = this.page.locator('[data-testid="bottom-tooltip-button"]')
    this._leftTooltipButton = this.page.locator('[data-testid="left-tooltip-button"]')
    this._topTooltipButton = this.page.locator('[data-testid="top-tooltip-button"]')
    this._tooltips = this.page.locator('[data-testid="tooltips"]')
    this._tippyButton = this.page.locator('[data-testid="tippyButton"]')
    this._styledTooltipButton = this.page.locator('[data-testid="styled-tooltip-button"]')
    this._allowHTMLButton = this.page.getByRole('button', { name: 'Custom Content Tooltip (with WppTypography)' })
    this._warningTooltipBtn = this.page.locator('[data-testid="warning-tooltip"]')
    this._errorTooltipBtn = this.page.locator('[data-testid="error-tooltip"]')
    this._customContentTooltip = this.page.getByText('Tooltips with custom contentCustom', { exact: false })
    this._changeThemeBtn = this.page.getByTestId('change-theme-of-tooltip')
    this._errorWarningTooltip = this.page.getByText('Other types of TooltipsWarning', { exact: false })
    this._errorWarningTooltipWithTitle = this.page.getByText('Title + TextWarning')
  }

  async checkTooltip(selector: Locator) {
    await selector.hover()
    await this.page.waitForTimeout(500)
    await expect(this.tooltips).toHaveScreenshot()
  }
}
