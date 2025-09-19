import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppAccordionsPage extends BasePage {
  private _accordions!: Locator
  private _usersList!: Locator
  private _truncatedAccordion!: Locator
  private _enableAccordionBtn!: Locator
  private _disableAccordionBtn!: Locator
  private _enabledArea!: Locator
  private _disabledArea!: Locator
  private _accordionExample!: Locator

  get accordions(): Locator {
    return this._accordions
  }

  get usersList(): Locator {
    return this._usersList
  }

  get truncatedAccordion(): Locator {
    return this._truncatedAccordion
  }

  get enableAccordion(): Locator {
    return this._enableAccordionBtn
  }

  get disableAccordionBtn(): Locator {
    return this._disableAccordionBtn
  }

  get enabledArea(): Locator {
    return this._enabledArea
  }

  get disabledArea(): Locator {
    return this._disabledArea
  }

  get accordionExample(): Locator {
    return this._accordionExample
  }

  async init() {
    this._accordions = this.page.locator('[data-testid="accordions-container"]')
    this._usersList = this.page.locator('[data-testid="users"]')
    this._truncatedAccordion = this.page.locator('[data-testid="truncated-accordion"]')
    this._enableAccordionBtn = this.page.locator(':text("Enable Accordion")')
    this._disableAccordionBtn = this.page.locator(':text("Disable Accordion")')
    this._enabledArea = this.page.locator('.wpp-accordion.wpp-section-wrapper').nth(3)
    this._disabledArea = this.page.locator('.wpp-accordion.wpp-section-wrapper.wpp-disabled')
    this._accordionExample = this.page.locator('.title-text.wpp-typography').first()
  }
}