import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppLabelsPage extends BasePage {
  private _labels!: Locator
  private _labelTooltip!: Locator
  private _defaultLabel!: Locator
  

  get labels(): Locator {
    return this._labels
  }

  get labelTooltip(): Locator {
    return this._labelTooltip
  }

  get defaultLabel(): Locator {
    return this._defaultLabel
  }

  async init() {
    this._labels = this.page.locator('[data-testid="labels-container"]')
    this._labelTooltip = this.page.locator('[data-testid="tooltip-label"] .wpp-icon-info')
    this._defaultLabel = this.page.locator('[data-testid="default-label"]')
  }
}
