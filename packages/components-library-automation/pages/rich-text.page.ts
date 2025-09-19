import { Locator } from '@playwright/test'
import { BasePage } from './base.page'


export class WppRichTextPage extends BasePage {
  private _richTextForm!: Locator
  private _richTextInput!: Locator
  private _richTextField!: Locator
  private _enteredCharacters!: Locator
  private _boldBtn!: Locator
  private _italicBtn!: Locator
  private _underlineBtn!: Locator
  private _strikeBtn!: Locator
  private _codeBlockBtn!: Locator
  private _orderedListBtn!: Locator
  private _unorderedListBtn!: Locator
  private _blockQuoteBtn!: Locator
  private _placeholderMarkdownEditor!: Locator
  private _undoBtn!: Locator
  private _redoBtn!: Locator
  private _linkBtn!: Locator
  private _linkInput!: Locator
  private _saveLinkBtn!: Locator
  private _addImageBtn!: Locator
  private _addVideoBtn!: Locator
  private _centerAlignBtn!: Locator
  private _rightAlignBtn!: Locator

  get richTextForm(): Locator {
    return this._richTextForm
  }

  get richTextInput(): Locator {
    return this._richTextInput
  }

  get richTextField(): Locator {
    return this._richTextField
  }

  get enteredCharacters(): Locator {
    return this._enteredCharacters
  }

  get boldBtn(): Locator {
    return this._boldBtn
  }

  get italicBtn(): Locator {
    return this._italicBtn
  }

  get underlineBtn(): Locator {
    return this._underlineBtn
  }

  get strikeBtn(): Locator {
    return this._strikeBtn
  }

  get codeBlockBtn(): Locator {
    return this._codeBlockBtn
  }

  get blockQuoteBtn(): Locator {
    return this._blockQuoteBtn
  }

  get orderedListBtn(): Locator {
    return this._orderedListBtn
  }

  get unorderedListBtn(): Locator {
    return this._unorderedListBtn
  }

  get placeholderMarkdownEditor(): Locator {
    return this._placeholderMarkdownEditor
  }

  get undoBtn(): Locator {
    return this._undoBtn
  }

  get redoBtn(): Locator {
    return this._redoBtn
  }

  get linkBtn(): Locator {
    return this._linkBtn
  }

  get linkInput(): Locator {
    return this._linkInput
  }

  get saveLinkBtn(): Locator {
    return this._saveLinkBtn
  }

  get addImageBtn(): Locator {
    return this._addImageBtn
  }

  get addVideoBtn(): Locator {
    return this._addVideoBtn
  }

  get centerAlignBtn(): Locator {
    return this._centerAlignBtn
  }

  get rightAlignBtn(): Locator {
    return this._rightAlignBtn
  }

  async init() {
    this._richTextForm = this.page.locator('[data-testid="rich-text-form"]')
    this._richTextInput = this.page.locator('[data-testid="rich-text-input"]')
    this._richTextField = this.page.locator('[data-testid="wpp-rich-text"]')
    this._enteredCharacters = this.page.locator('[data-testid="char-entered-label"]')
    this._boldBtn = this.page.locator('[data-testid="wpp-icon-bold"]')
    this._italicBtn = this.page.locator('[data-testid="wpp-icon-italic"]')
    this._underlineBtn = this.page.locator('[data-testid="wpp-icon-underline"]')
    this._strikeBtn = this.page.locator('[data-testid="wpp-icon-strike-through"]')
    this._codeBlockBtn = this.page.locator('[data-testid="wpp-icon-code-view"]')
    this._blockQuoteBtn = this.page.locator('[data-testid="wpp-icon-blockquote"]')
    this._orderedListBtn = this.page.locator('[data-testid="wpp-icon-ordered-list"]')
    this._unorderedListBtn = this.page.locator('[data-testid="wpp-icon-unordered-list"]')
    this._placeholderMarkdownEditor = this.page.locator('[data-placeholder="Type your Markdown here..."]')
    this._undoBtn = this.page.locator('[data-testid="wpp-icon-undo"]')
    this._redoBtn = this.page.locator('[data-testid="wpp-icon-redo"]')
    this._linkBtn = this.page.locator('[data-testid="wpp-icon-link"]')
    this._linkInput = this.page.locator('[data-testid="input"]')
    this._saveLinkBtn = this.page.getByRole('button', { name: 'Save' })
    this._addImageBtn = this.page.locator('[data-testid="wpp-icon-image"]')
    this._addVideoBtn = this.page.locator('[data-testid="wpp-icon-video-clip"]')
    this._centerAlignBtn = this.page.locator('[data-testid="wpp-icon-text-alignment-center"]')
    this._rightAlignBtn = this.page.locator('[data-testid="wpp-icon-text-alignment-right"]')
  }
}
