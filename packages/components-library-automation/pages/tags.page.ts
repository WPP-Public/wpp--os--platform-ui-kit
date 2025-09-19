import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppTagsPage extends BasePage {
  private _tags!: Locator
  private _colorIndex9!: Locator

  get tags(): Locator {
    return this._tags
  }

  get colorIndex9(): Locator {
    return this._colorIndex9
  }

  async init() {
    this._tags = this.page.locator('.tags')
    this._colorIndex9 = this.page.locator('[variant="Cat-9"]').first()
  }
}
