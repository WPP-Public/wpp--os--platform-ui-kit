import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppExpandableCardsPage extends BasePage {
  private _expandableCards!: Locator
  private _secondaryExpendableCard!: Locator
  private _expendableCard!: Locator

  get expandableCards(): Locator {
    return this._expandableCards
  }

  get secondaryExpendableCard(): Locator {
    return this._secondaryExpendableCard
  }

  get expendableCard(): Locator {
    return this._expendableCard
  }

  async init() {
    this._expandableCards = this.page.locator('[data-testid="expandable-cards"]')
    this._secondaryExpendableCard = this.page.locator('[variant="secondary"][size="2xl"]').first()
    this._expendableCard = this.page.locator('.title-text.wpp-typography').first()
  }
}
