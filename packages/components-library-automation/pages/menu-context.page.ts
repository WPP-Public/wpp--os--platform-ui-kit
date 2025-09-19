import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppMenuContextPage extends BasePage {
  private _sameWidthButton!: Locator
  private _fixedWidthButton!: Locator
  private _extendedItem!: Locator
  private _groupMenuButton!: Locator
  private _innerExtendedItem!: Locator
  private _menuContainer!: Locator

  private _functionalMenuContext!: Locator
  private _regularItem!: Locator
  private _itemWithLeftIcon!: Locator
  private _itemWithRightIcon!: Locator
  private _extendableItem!: Locator
  private _disabledItem!: Locator
  private _contextList!: Locator
  private _contextTriggerButton!: Locator
  private _nestedItemLeftIcon!: Locator
  private _nestedItemRightIcon!: Locator
  private _regularNestedItem!: Locator
  private _testLabel!: Locator

  get sameWidthButton(): Locator {
    return this._sameWidthButton
  }

  get fixedWidthButton(): Locator {
    return this._fixedWidthButton
  }

  get extendedItem(): Locator {
    return this._extendedItem
  }

  get groupMenuButton(): Locator {
    return this._groupMenuButton
  }

  get innerExtendedItem(): Locator {
    return this._innerExtendedItem
  }

  get menuContainer(): Locator {
    return this._menuContainer
  }

  get functionalMenuContext(): Locator {
    return this._functionalMenuContext
  }

  get regularItem(): Locator {
    return this._regularItem
  }

  get itemWithLeftIcon(): Locator {
    return this._itemWithLeftIcon
  }

  get itemWithRightIcon(): Locator {
    return this._itemWithRightIcon
  }

  get extendableItem(): Locator {
    return this._extendableItem
  }

  get disabledItem(): Locator {
    return this._disabledItem
  }

  get contextList(): Locator {
    return this._contextList
  }

  get contextTriggerButton(): Locator {
    return this._contextTriggerButton
  }

  get nestedItemLeftIcon(): Locator {
    return this._nestedItemLeftIcon
  }

  get nestedItemRightIcon(): Locator {
    return this._nestedItemRightIcon
  }

  get regularNestedItem(): Locator {
    return this._regularNestedItem
  }

  get testLabel(): Locator {
    return this._testLabel
  }

  async init() {
    this._sameWidthButton = this.page.locator('[data-testid="same-width-button"]')
    this._fixedWidthButton = this.page.locator('[data-testid="fixed-width-button"]')
    this._extendedItem = this.page.locator('[data-testid="extendable-item"]')
    this._innerExtendedItem = this.page.locator('text=SubItem 1')
    this._groupMenuButton = this.page.locator('[data-testid="group-menu-button"]')
    this._menuContainer = this.page.locator('[data-testid="menu-context-container"]')

    this._functionalMenuContext = this.page.locator('[data-testid="functional-menu-context"]')
    this._regularItem = this.page.locator('[data-testid="regular-item"]')
    this._itemWithLeftIcon = this.page.locator('[data-testid="item-with-left-icon"]')
    this._itemWithRightIcon = this.page.locator('[data-testid="item-with-right-icon"]')
    this._extendableItem = this.page.locator('[data-testid="extendable-item"]')
    this._disabledItem = this.page.locator('[data-testid="disabled-item"]')
    this._contextList = this.page.locator('[role="menu"]')
    this._contextTriggerButton = this.page.locator('[data-testid="context-trigger-button"]')
    this._nestedItemLeftIcon = this.page.locator('[data-testid="nested-item-left-icon"]')
    this._nestedItemRightIcon = this.page.locator('[data-testid="nested-item-right-icon"]')
    this._regularNestedItem = this.page.locator('[data-testid="regular-nested-item"]')
    this._testLabel = this.page.locator('[data-testid="test-label"]')
  }
}
