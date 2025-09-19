import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from './base.page'

export class WppInlineEditPage extends BasePage {
  private _inputInlineEditContainer!: Locator
  private _textareaInlineEditContainer!: Locator
  private _bottomInputInlineEdit!: Locator
  private _bottomTextareaInlineEdit!: Locator
  private _defaultTextareaInlineEdit!: Locator
  private _defaultInputInlineEditDefaultWidth!: Locator
  private _defaultInputInlineEdit!: Locator

  get inputInlineEditContainer(): Locator {
    return this._inputInlineEditContainer
  }

  get textareaInlineEditContainer(): Locator {
    return this._textareaInlineEditContainer
  }

  get bottomInputInlineEdit(): Locator {
    return this._bottomInputInlineEdit
  }

  get bottomTextareaInlineEdit(): Locator {
    return this._bottomTextareaInlineEdit
  }

  get defaultTextareaInlineEdit(): Locator {
    return this._defaultTextareaInlineEdit
  }

  get defaultInputInlineEditDefaultWidth(): Locator {
    return this._defaultInputInlineEditDefaultWidth
  }

  get defaultInputInlineEdit(): Locator {
    return this._defaultInputInlineEdit
  }
  
  async init() {
    this._inputInlineEditContainer = this.page.locator('[data-testid="input-inline-edit-container"]')
    this._textareaInlineEditContainer = this.page.locator('[data-testid="textarea-inline-edit-container"]')
    this._bottomInputInlineEdit = this.page.locator('[data-testid="bottom-input-inline-edit"]')
    this._bottomTextareaInlineEdit = this.page.locator('[data-testid="bottom-textarea-inline-edit"]')
    this._defaultTextareaInlineEdit = this.page.locator('[data-testid="default-textarea-inline-edit"]')
    this._defaultInputInlineEditDefaultWidth = this.page.locator('[data-testid="default-width-input-inline-edit"]')
    this._defaultInputInlineEdit = this.page.locator('[data-testid="default-input-inline-edit"]')
  }

  async checkInlineEditTextAndState(page: Page, inlineEditType: string, text: string) {
    let _inlineEdit!: Locator

    switch (inlineEditType) {
      case 'input': {
        _inlineEdit = this.defaultInputInlineEditDefaultWidth
        break
      }
      case 'textarea': {
        _inlineEdit = this.defaultTextareaInlineEdit
        break
      }
      default: {
        _inlineEdit = this.defaultInputInlineEditDefaultWidth
        break
      }
    }
    await expect(_inlineEdit.locator('[part="inline-edit-typography"]').first()).toHaveText(text)
    await expect(page.locator('[data-dropdown-from="popover"] .wpp-icon-done')).not.toBeVisible()
    await expect(page.locator('[data-dropdown-from="popover"] .wpp-icon-cross')).not.toBeVisible()
    await expect(_inlineEdit.locator('[part=input]')).not.toBeVisible()
  }

  async clickApplyOrCancelComponent(inlineEditSelector: Locator, isCancelled: boolean) {
    let eventDetail

    await this.page.waitForTimeout(500)
    await inlineEditSelector.click()
    await this.page.waitForTimeout(500)

    this.page.on('console', msg => {
      if (msg.type() === 'log') {
        eventDetail = msg.text()
      }
    })

    if (isCancelled) await this.page.locator('.inline-edit-popover .wpp-icon-cross').click()
    else await this.page.locator('.inline-edit-popover .wpp-icon-done').click()

    return eventDetail
  }
}
