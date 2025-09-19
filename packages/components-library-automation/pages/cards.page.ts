import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppCardsPage extends BasePage {
  private _cards!: Locator
  private _primaryCard!: Locator
  private _actionBtn!: Locator

  get cards(): Locator {
    return this._cards
  }

  get primaryCard(): Locator {
    return this._primaryCard
  }

  get actionBtn(): Locator {
    return this._actionBtn
  }

  async init() {
    this._cards = this.page.locator('[data-testid="cards-container"]')
    this._primaryCard = this.page.locator('.card.primary.size-s.with-actions')
    this._actionBtn = this.page.locator('.wpp-action-button').first()
  }
}
