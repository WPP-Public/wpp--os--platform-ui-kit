import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppEChartsPage extends BasePage {
  private _echarts!: Locator

  get echarts(): Locator {
    return this._echarts
  }

  async init() {
    this._echarts = this.page.locator('[data-testid="echarts"]')
  }
}
