import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppCountersPage extends BasePage {
  private _hoverCounter!: Locator
  private _counterTooltip!: Locator
  private _counterInput!: Locator
  private _plusButton!: Locator
  private _focusCounter!: Locator
  private _counterWithoutButtons!: Locator
  private _countersContainer!: Locator

  get hoverCounter(): Locator {
    return this._hoverCounter
  }

  get counterTooltip(): Locator {
    return this._counterTooltip
  }

  get counterInput(): Locator {
    return this._counterInput
  }

  get plusButton(): Locator {
    return this._plusButton
  }

  get focusCounter(): Locator {
    return this._focusCounter
  }

  get counterWithoutButtons(): Locator {
    return this._counterWithoutButtons
  }

  get countersContainer(): Locator {
    return this._countersContainer
  }

  async init() {
    this._hoverCounter = this.page.locator('[data-testid="hover-counter"]')
    this._counterInput = this.page.locator('[data-testid="hover-counter"] input')
    this._plusButton = this.page.locator('[data-testid="hover-counter"] .increase-wrapper')
    this._counterTooltip = this.page.locator('[data-testid="counter-with-tooltip"] .wpp-inline-message')
    this._focusCounter = this.page.locator('[data-testid="focus-counter"]')
    this._counterWithoutButtons = this.page.locator('[data-testid="counter-without-buttons"]')
    this._countersContainer = this.page.locator('.CountersVC_container__BK3UF')
  }
}
