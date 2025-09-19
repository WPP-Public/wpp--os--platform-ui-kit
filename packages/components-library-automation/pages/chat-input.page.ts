import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppChatInputPage extends BasePage {
  private _disableChatInputBtn!: Locator
  private _disableChatInputContainer!: Locator
  private _sendMessageBtn!: Locator
  private _addAttachmentsBtn!: Locator
  private _textInput!: Locator
  private _fileInput!: Locator
  private _chatInputContainer!: Locator
  private _chatToastMessage!: Locator
  private _fileUploadItem!: Locator
  private _inputArea!: Locator
  private _charCounter!: Locator
  private _deleteAddedFileCrossBtn!: Locator
  private _changeChatInputMessageBtn!: Locator
  private _chengeDebounceTimeBtn!: Locator
  private _chatInputComponent!: Locator
  private _mininizedChatInput!: Locator

  get disableChatInputBtn(): Locator {
    return this._disableChatInputBtn
  }

  get changeChatInputMessageBtn(): Locator {
    return this._changeChatInputMessageBtn
  }

  get chengeDebounceTimeBtn(): Locator {
    return this._chengeDebounceTimeBtn
  }

  get disableChatInputContainer(): Locator {
    return this._disableChatInputContainer
  }

  get chatInputContainer(): Locator {
    return this._chatInputContainer
  }
  
  get sendMessageBtn(): Locator {
    return this._sendMessageBtn
  }

  get addAttachmentsBtn(): Locator {
    return this._addAttachmentsBtn
  }

  get textInput(): Locator {
    return this._textInput
  }

  get inputArea(): Locator {
    return this._inputArea
  }

  get fileInput(): Locator {
    return this._fileInput
  }

  get chatToastMessage(): Locator {
    return this._chatToastMessage
  }

  get fileUploadItem(): Locator {
    return this._fileUploadItem
  }

  get charCounter(): Locator {
    return this._charCounter
  }

  get deleteAddedFileCrossBtn(): Locator {
    return this._deleteAddedFileCrossBtn
  }

  get chatInputComponent(): Locator {
    return this._chatInputComponent
  }

  get mininizedChatInput(): Locator {
    return this._mininizedChatInput
  }

  async init() {
    this._disableChatInputBtn = this.page.locator('text=Disable')
    this._changeChatInputMessageBtn = this.page.getByRole('button', { name: 'Change Input Message' })
    this._chengeDebounceTimeBtn =this.page.getByRole('button', { name: 'Debounce - On' })
    this._disableChatInputContainer = this.page.locator('.chat-input-container.disabled')
    this._sendMessageBtn = this.page.getByTestId('send-icon-only-button')
    this._addAttachmentsBtn = this.page.getByTestId('attach-icon-only-button')
    this._textInput = this.page.locator('.text-input')
    this._inputArea = this.page.locator('.input-area')
    this._fileInput = this.page.locator('input[type="file"]')
    this._chatInputContainer = this.page.locator('.wpp-chat-input .chat-input-container')
    this._chatToastMessage = this.page.locator('.chat-toast-message.wpp-typography')
    this._fileUploadItem = this.page.locator('.wpp-file-upload-item.file-upload-item')
    this._charCounter = this.page.locator('.char-counter.wpp-typography')
    this._deleteAddedFileCrossBtn = this.page.locator('.cross-icon.wpp-icon.wpp-icon-cross')
    this._chatInputComponent = this.page.getByRole('main')
    this._mininizedChatInput = this.page.locator('.minimized-input')
  }

  async addAttachmentsToChat(files: string[]) {
    await this.fileInput.setInputFiles(files);
    await this.page.waitForTimeout(2000);
  }
}