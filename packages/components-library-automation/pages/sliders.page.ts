import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppSlidersPage extends BasePage {
  private _sliders!: Locator
  private _rangeSliderMinimum!: Locator
  private _rangeSliderMaximum!: Locator
  private _singleSliderValue!: Locator
  private _sliderOutsideArea!: Locator

  get sliders(): Locator {
    return this._sliders
  }
  get rangeSliderMinimum(): Locator {
    return this._rangeSliderMinimum
  }

  get rangeSliderMaximum(): Locator {
    return this._rangeSliderMaximum
  }

  get singleSliderValue(): Locator {
    return this._singleSliderValue
  }

  get sliderOutsideArea(): Locator {
    return this._sliderOutsideArea
  }

  async init() {
    this._sliders = this.page.locator('[data-testid="sliders"]').first()
    this._rangeSliderMinimum = this.page.locator('.input-element.size-m').first()
    this._rangeSliderMaximum = this.page.locator('.input-element.size-m').nth(1)
    this._singleSliderValue = this.page.locator('.input-element.size-m').nth(2)
    this._sliderOutsideArea = this.page.locator('.internal-label-wrapper.sc-wpp-label').first()
  }
}
