import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppFileUploadsPage extends BasePage {
  private _fileUploads!: Locator
  private _uploader!: string
  private _uploaderWithErrors!: string
  private _fileUploadWithDefaultValue!: Locator
  private _fileUploadItem!: Locator
  private _singleUploader!: string
  private _multipleUploader!: string
  private _multipleFileUploadContainer!: Locator
  private _limitedFileUpload!: string

  get fileUploads(): Locator {
    return this._fileUploads
  }

  get uploader(): string {
    return this._uploader
  }

  get uploaderWithErrors(): string {
    return this._uploaderWithErrors
  }

  get fileUploadWithDefaultValue(): Locator {
    return this._fileUploadWithDefaultValue
  }

  get fileUploadItem(): Locator {
    return this._fileUploadItem
  }

  get singleUploader(): string {
    return this._singleUploader
  }

  get multipleUploader(): string {
    return this._multipleUploader
  }

  get multipleFileUploadContainer(): Locator {
    return this._multipleFileUploadContainer
  }

  get limitedFileUpload(): string {
    return this._limitedFileUpload
  }

  async init() {
    this._fileUploads = this.page.locator('[data-testid="file-uploads"]')
    this._uploader = '[data-testid="uploader"] .file-loader'
    this._uploaderWithErrors = '[data-testid="uploader-with-error"] .file-loader'

    this._fileUploadWithDefaultValue = this.page.locator('[data-testid="file-upload-with-default-value"]')
    this._fileUploadItem = this.page.locator('[data-testid="file-upload-multiple"] .block')
    this._singleUploader = '[data-testid="file-upload-single"] .file-loader'
    this._multipleUploader = '[data-testid="file-upload-multiple"] .file-loader'
    this._multipleFileUploadContainer = this.page.locator('[data-testid="multiple-file-upload-container"]')
    this._limitedFileUpload = '[data-testid="limited-file-upload"] .file-loader'
  }

  async uploadFiles(files: string[]) {
    let changeDetail

    this.page.on('console', msg => {
      if (msg.type() === 'log') {
        changeDetail = msg.text()
      }
    })
    await this.page.setInputFiles(this.multipleUploader, files)
    await this.page.waitForTimeout(2000)

    return changeDetail
  }
}
