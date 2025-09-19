import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppInlineMessagesPage extends BasePage {
  private _inlineMessages!: Locator
  private _hoverMessage!: Locator
  private _hideCloseBtn!: Locator
  private _showCloseBtn!: Locator
  private _removeTitleBtn!: Locator
  private _addTitleBtn!: Locator

  get inlineMessages(): Locator {
    return this._inlineMessages
  }

  get hoverMessage(): Locator {
    return this._hoverMessage
  }

  get hideCloseBtn(): Locator {
    return this._hideCloseBtn
  }

  get showCloseBtn(): Locator {
    return this._showCloseBtn
  }

  get removeTitleBtn(): Locator {
    return this._removeTitleBtn
  }

  get addTitleBtn(): Locator {
    return this._addTitleBtn
  }

  async init() {
    this._inlineMessages = this.page.locator('[data-testid="inline-messages-container"]')
    this._hoverMessage = this.page.locator('[data-testid="hover-message"]')
    this._hideCloseBtn = this.page.getByRole('button', { name: 'Hide close button' })
    this._showCloseBtn = this.page.getByRole('button', { name: 'Show close button' })
    this._removeTitleBtn = this.page.getByRole('button', { name: 'Remove title' })
    this._addTitleBtn = this.page.getByRole('button', { name: 'Add title' })
  }
}
