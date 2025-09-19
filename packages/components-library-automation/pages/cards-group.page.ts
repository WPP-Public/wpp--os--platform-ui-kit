import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppCardsGroupPage extends BasePage {
  private _cardsGroups!: Locator
  private _multipleCardItemA!: Locator
  private _multipleCardItemB!: Locator
  private _singleCardItemA!: Locator
  private _singleCardItemB!: Locator

  get cardsGroups(): Locator {
    return this._cardsGroups
  }

  get multipleCardItemA(): Locator {
    return this._multipleCardItemA
  }

  get multipleCardItemB(): Locator {
    return this._multipleCardItemB
  }

  get singleCardItemA(): Locator {
    return this._singleCardItemA
  }

  get singleCardItemB(): Locator {
    return this._singleCardItemB
  }

  async init() {
    this._cardsGroups = this.page.locator('[data-testid="cards-group-container"]')
    this._multipleCardItemA = this.page.locator('[data-testid="multiple-card-item-a"]')
    this._multipleCardItemB = this.page.locator('[data-testid="multiple-card-item-b"]')
    this._singleCardItemA = this.page.locator('[data-testid="single-card-item-a"]')
    this._singleCardItemB = this.page.locator('[data-testid="single-card-item-b"]')
  }
}
