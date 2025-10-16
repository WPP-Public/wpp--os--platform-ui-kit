import { Component, Prop, h, Host, Element, State, Event, EventEmitter, Method, Watch } from '@stencil/core'

import { BaseFormControl } from '../../interfaces/base-form-control'
import { FOCUS_TYPE, DropdownConfig } from '../../types/common'

import {
  convertMBToBytes,
  getExtension,
  getExtensionsList,
  getBaseName,
  renameFile,
  modifyPropertiesOnFile,
} from './utils'
import {
  FileItemType,
  FileUploadEventDetail,
  FileUploadResultFormaType,
  FileUploadLocales,
  ScrollState,
  FileUploadMessageType,
  FileUploadItemEventDetail,
  FileUploadTabElements,
  AcceptConfig,
  FileValidatorHandler,
  FileUploadErrorEventDetails,
} from './types'
import { EXTENSION_TO_TYPE, LOCALES_DEFAULTS } from './const'
import { LabelConfig } from '../wpp-label/types'

interface FocusType {
  wrapper: FOCUS_TYPE
  item: FOCUS_TYPE
}

const getInitFocusInfo = (): FocusType => ({
  wrapper: FOCUS_TYPE.NONE,
  item: FOCUS_TYPE.NONE,
})

/**
 * @slot - Should contain label and description of file upload.
 *
 * @part list-wrapper - file list wrapper
 * @part file-list - file list element.
 * @part file-upload-container - file upload wrapper.
 * @part file-item - file item element
 * @part slot-label - slot label element
 * @part slot-description - slot label element
 * @part icon-file - icon file element
 * @part content - main content wrapper
 * @part label - label text element
 * @part text - main text element
 * @part text-info - text info wrapper element
 * @part input - input element
 * @part message - message element
 */
@Component({
  tag: 'wpp-file-upload',
  styleUrl: 'wpp-file-upload.scss',
  shadow: true,
})
export class WppFileUpload implements BaseFormControl<FileItemType[], FileUploadEventDetail> {
  private inputRef?: HTMLInputElement
  private _locales: FileUploadLocales = LOCALES_DEFAULTS
  private inputId = this.name || `wpp-file-upload-${Math.random().toString(36).substr(2, 9)}`
  private labelId = `${this.inputId}-label`

  @Element() host: HTMLWppFileUploadElement

  @State() scrollState: ScrollState | false = false

  @State() focusType: FocusType = getInitFocusInfo()

  @State() isFileDrag: boolean = false

  @State() errorList: FileItemType[]

  @State() successList: FileItemType[]

  @State() isLimitReached: boolean = false

  /**
   * Defines the input name.
   */
  @Prop() readonly name?: string

  /**
   * Defines the files list
   */
  @Prop({ mutable: true }) value: FileItemType[] = []

  /**
   * If `true`, the component is disabled
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * If `true`, the component can take multiple files
   */
  @Prop() readonly multiple: boolean = true

  /**
   * Represent what result format datepicker return, it can be base64, arrayBuffer, binaryString, by default it returns base64
   */
  @Prop() readonly format: FileUploadResultFormaType = 'base64'

  /**
   * Accept file format, you can pass any format you want download, by default is `.jpg, .jpeg, .png`
   *
   * @deprecated - this prop will be deleted in 4.0.0 version as it is not flexible enough to handle different
   * cases with files validations, for example based on mimetype and extension at the same time.
   * This property handle only a few extensions: ['.jpg', '.jpeg', '.png', '.txt', '.text', '.doc', '.docx', '.mov'],
   * and list will NOT be extended.
   *
   * If you want to use this prop, use "acceptConfig" property instead.
   * Note: "acceptConfig" property will have a higher priority in case if both "acceptConfig" and "accept" props will be provided
   */
  @Prop() readonly accept: string[] = ['.jpg', '.jpeg', '.png']

  /**
   * Configuration for accepted file formats. This property allows you to specify supported file types
   * using an object where the key is the MIME type and the value is an array of file extensions.
   *
   * Example:
   * {
   *   'image/png': ['.png'],
   *   'text/html': ['.htm', '.html']
   * }
   *
   * To allow all file types, pass an empty object (`{}`) or leave the property undefined.
   *
   * Note: This property offers greater flexibility compared to the deprecated `accept` property,
   * allowing validation based on MIME types and extensions simultaneously.
   */
  @Prop() readonly acceptConfig: AcceptConfig

  /**
   * Indicates file upload message type
   */
  @Prop() readonly messageType?: FileUploadMessageType

  /**
   * Indicates file upload message
   */
  @Prop() readonly message?: string

  /**
   * Indicates file upload message maximum length
   */
  @Prop() readonly maxMessageLength?: number

  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop({ mutable: true }) tooltipConfig: DropdownConfig = {}

  /**
   * The max size of file that user can download, by default it`s 50 MB
   */
  @Prop() readonly size: number = 50

  /**
   * Maximum label length (in characters) of single item
   */
  @Prop() readonly maxLabelLength: number = 30

  /**
   * Indicates locales for file upload component
   */
  @Prop() readonly locales: Partial<FileUploadLocales> = {}

  /**
   * Defines custom validation function. It must return null if there's no errors, and string in case of any error
   */
  @Prop() readonly validator: FileValidatorHandler = () => null

  /**
   * If `true`, the file upload works as controlled component.
   */
  @Prop() readonly controlled: boolean = false

  /**
   * Maximum accepted number of files The default value is 0 which means there is no limitation to how many files are accepted.
   */
  @Prop() readonly maxFiles: number = 0

  /**
   * If the input is required.
   */
  @Prop({ reflect: true }) readonly required: boolean = false

  /**
   * Indicates label config
   */
  @Prop({ mutable: true }) labelConfig?: LabelConfig

  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop() readonly labelTooltipConfig: DropdownConfig = {
    popperOptions: { strategy: 'absolute' },
  }

  /**
   * If `true`, the new errors (from a new unsuccessful upload) will replace the already existing ones in the list
   * By default, the new errors will be added to the error list
   */
  @Prop() readonly showOnlyNewErrors: boolean = false

  /**
   * Emitted when file downloads, returns only those files, that not have any error
   */
  @Event({ bubbles: false, composed: false }) readonly wppChange: EventEmitter<FileUploadEventDetail>

  /**
   * Emitted when the input is in focus.
   */
  @Event({ bubbles: false, composed: false }) readonly wppFocus: EventEmitter<FocusEvent>

  /**
   * Emitted when the input loses focus.
   */
  @Event({ bubbles: false, composed: false }) readonly wppBlur: EventEmitter<FocusEvent>

  /**
   * Emitted when the file-upload item was deleted.
   */
  @Event({ bubbles: false, composed: false }) readonly wppFileUploadItemDelete: EventEmitter<FileUploadItemEventDetail>

  /**
   * Emitted when the file-upload item was clicked.
   */
  @Event({ bubbles: false, composed: false }) readonly wppFileUploadItemClick: EventEmitter<FileUploadItemEventDetail>

  /**
   * Emitted when the file upload enters an error state. Triggered when the maximum number of files is exceeded.
   */
  @Event({ bubbles: false, composed: false }) readonly wppError: EventEmitter<FileUploadErrorEventDetails>

  /**
   * Method to reset FileUpload
   */
  @Method()
  async reset(): Promise<void> {
    this.successList = []
    this.errorList = []
  }

  private reInitValue = (list: FileItemType[]) => {
    this.successList = list.filter(file => !this.isFileWithError(file))
    this.errorList = list.filter(this.isFileWithError)
  }

  @Watch('value')
  onValueChange(newValue: FileItemType[]) {
    if (this.controlled) {
      this.reInitValue(newValue)
    }

    if (this.isMaximumFilesReached()) {
      this.wppError.emit({
        errorFiles: this.value.slice(this.maxFiles),
        errorMessage: this.multiple ? this._locales.multipleFileLimitError : this._locales.singleFileLimitError,
        name: this.name,
      })
    }
  }

  @Watch('locales')
  onUpdateLocales(newLocales: Partial<FileUploadLocales>) {
    this._locales = { ...this._locales, ...newLocales }
  }

  componentWillLoad() {
    this._locales = { ...this._locales, ...this.locales }
  }

  componentDidLoad() {
    const list = [...this.value, ...(this.successList || []), ...(this.errorList || [])]

    this.reInitValue(list)
  }

  private onFocus = (event: FocusEvent): void => {
    this.wppFocus.emit(event)
  }

  private onBlur = (event: FocusEvent): void => {
    this.focusType = this.getUpdatedFocusInfo('wrapper', FOCUS_TYPE.NONE)
    this.focusType = this.getUpdatedFocusInfo('item', FOCUS_TYPE.NONE)

    this.wppBlur.emit(event)
  }

  private onMouseDown = () => {
    this.focusType = this.getUpdatedFocusInfo('wrapper', FOCUS_TYPE.MOUSE)
    this.focusType = this.getUpdatedFocusInfo('item', FOCUS_TYPE.MOUSE)
  }

  private onKeyUp = (event: KeyboardEvent, type: FileUploadTabElements) => {
    if (this.disabled) return
    if (event.key === 'Tab') {
      this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.TAB)
    }
  }

  private getUpdatedFocusInfo = (type: FileUploadTabElements, updateValue: FOCUS_TYPE): FocusType => ({
    ...this.focusType,
    [type]: updateValue,
  })

  private handleDeleteItem = (event: CustomEvent<FileUploadItemEventDetail>) => {
    const updatedFilesList = [...this.successList, ...this.errorList].filter(
      ({ name, size }) => name + size !== event.detail.name + event.detail.size,
    )
    const successList = updatedFilesList.filter(file => !this.isFileWithError(file))
    const errorFileList = updatedFilesList.filter(this.isFileWithError)

    if (this.inputRef?.value) {
      this.inputRef.value = ''
    }

    this.value = updatedFilesList
    this.errorList = errorFileList
    this.successList = successList

    this.wppChange.emit({
      value: successList,
      hasError: !!errorFileList?.length || this.isLimitReached,
      errorFiles: errorFileList,
      name: this.name,
    })

    this.wppFileUploadItemDelete.emit(event.detail)
  }

  private handleClickItem = (event: CustomEvent) => this.wppFileUploadItemClick.emit(event.detail)

  private validateFileSize = (file: FileItemType) => {
    if (file.size > convertMBToBytes(this.size)) {
      file.sizeError = true
    }

    return file
  }

  private customValidation = (file: FileItemType) => {
    const validationResult = this.validator(file)

    if (validationResult) {
      file.validatorError = validationResult
    }

    return file
  }

  private isAcceptConfigFilled = (): boolean =>
    !this.acceptConfig ? false : Object.keys(this.acceptConfig)?.length > 0

  private validateFileType = (file: FileItemType): FileItemType => {
    if (this.isAcceptConfigFilled()) {
      let allowedExtensions: string[] = []

      if (file.type) {
        allowedExtensions = this.acceptConfig[file.type] || []
      } else {
        allowedExtensions = this.getAcceptExtensions()
      }

      if (allowedExtensions?.length) {
        const fileExtension = getExtension(file.name)

        file.formatError = !allowedExtensions.includes(fileExtension)
      } else {
        file.formatError = true
      }

      return file
    }

    if (this.acceptConfig !== undefined && Object.keys(this.acceptConfig).length === 0) {
      return file
    }

    if (!this.accept?.length) {
      if (!file.type) {
        const extension = file.name?.split('.').pop() || ''
        const typeFromExtension: string = EXTENSION_TO_TYPE[extension] || ''
        const modifiedFile = modifyPropertiesOnFile(file as File, { type: typeFromExtension })

        return modifiedFile
      }

      return file
    }

    const isPassValidation = this.accept.some((format: string) => {
      const currentFormat = format.replace(/[,.*]/g, '')

      // .mov format return quicktime type, that's why using this contraction for this particular case
      if (currentFormat === 'mov') {
        return file.type.includes('quicktime')
      }

      if (/txt|text|msword|document|doc?x/.test(currentFormat)) {
        return /text|application/.test(file.type)
      }

      return file.type.includes(currentFormat)
    })

    if (!isPassValidation) {
      file.formatError = true
    }

    return file
  }

  private isFileWithError = (file: FileItemType): boolean =>
    !!(file.formatError || file.sizeError || file.validatorError)

  private generateUniqueName = (fileName: string, fileList: FileItemType[]): string => {
    const baseName = getBaseName(fileName)
    const extension = getExtension(fileName)
    let counter = 1

    const generateNewName = () => `${baseName}-${counter}${extension}`
    const isNameTaken = (name: string) => fileList.some(item => item.name === name)

    let uniqueName = generateNewName()

    while (isNameTaken(uniqueName)) {
      counter++
      uniqueName = generateNewName()
    }

    return uniqueName
  }

  private displayErrorListByShowingOption = (newFilesWithErrors: FileItemType[]): FileItemType[] =>
    this.showOnlyNewErrors ? newFilesWithErrors : [...new Set([...this.errorList, ...newFilesWithErrors])]

  private handleFileLoad = async (filesList: FileItemType[]) => {
    const list = [...(this.successList || []), ...(this.errorList || [])]
    const filteredFileList = filesList.filter(Boolean).map(newFile => {
      const isFileWithSameNameExists = !!list.find(item => item.name === newFile.name)

      if (!isFileWithSameNameExists) return newFile

      const uniqueName = this.generateUniqueName(newFile.name, list)

      return renameFile(newFile as File, uniqueName)
    })

    if (!filteredFileList?.length) return

    const validatedFileList: FileItemType[] = filteredFileList.map((file: FileItemType) => {
      if ('url' in file) {
        return file
      }

      this.validateFileSize(file)
      file = this.validateFileType(file)
      this.customValidation(file)

      return file
    })

    if (!this.multiple && this.value?.length) {
      this.value = validatedFileList.some(this.isFileWithError) ? this.value : [...this.value, ...filteredFileList]
    } else {
      this.value = [...(this.successList || []), ...(this.errorList || []), ...validatedFileList]
    }

    const successFileList = this.value.filter(file => !this.isFileWithError(file))
    const newFilesWithErrors: FileItemType[] = validatedFileList.filter((fileItem: FileItemType) =>
      this.isFileWithError(fileItem),
    )

    const errorFileList = this.displayErrorListByShowingOption(newFilesWithErrors)

    this.errorList = errorFileList
    this.successList = successFileList

    this.wppChange.emit({
      value: successFileList,
      hasError: !!errorFileList?.length || this.isLimitReached,
      errorFiles: errorFileList,
      name: this.name,
    })
  }

  private handleDrop = (event: DragEvent) => {
    event.preventDefault()
    const currentFiles = event?.dataTransfer?.files || []

    this.isFileDrag = false

    if (!this.multiple && this.value?.length) {
      return this.handleFileLoad([currentFiles[0]])
    }

    if (!this.multiple && currentFiles?.length > 1) {
      return this.handleFileLoad([currentFiles[0]])
    }

    this.handleFileLoad(Array.from(currentFiles))
  }

  private handleDragOver = (event: Event) => {
    event.preventDefault()
  }

  private handleDragEnter = () => {
    this.isFileDrag = true
  }

  private handleDragLeave = () => {
    this.isFileDrag = false
  }

  private handleChange = async () => {
    const currentFiles = this.inputRef?.files || []

    if (!this.multiple && this.value?.length) {
      return this.handleFileLoad([currentFiles[0]])
    }

    await this.handleFileLoad(Array.from(currentFiles))

    if (this.inputRef?.value) {
      this.inputRef.value = ''
    }
  }

  private handleListScroll = (event: Event) => {
    const target = event.target as HTMLUListElement

    if (target.scrollTop && target.scrollHeight - target.scrollTop !== target.clientHeight) {
      this.scrollState = ScrollState.scroll

      return
    }

    this.scrollState = false
  }

  private getAcceptExtensions = (): string[] => {
    if (this.acceptConfig !== undefined) {
      if (Object.keys(this.acceptConfig).length === 0) {
        return []
      }

      return getExtensionsList(this.acceptConfig)
    }

    if (this.accept?.length) {
      return this.accept
    }

    return []
  }

  private isMaximumFilesSet = (): boolean => this.maxFiles > 0

  private isMaximumFilesReached = (): boolean => {
    if (!this.multiple) {
      this.isLimitReached = this.value?.length > 1

      return this.isLimitReached
    }

    if (this.isMaximumFilesSet()) {
      this.isLimitReached = this.value?.length > this.maxFiles

      return this.isLimitReached
    }

    this.isLimitReached = false

    return false
  }

  private getMessageText = (): string | undefined => {
    if (this.isLimitReached) {
      return this.multiple ? this._locales.multipleFileLimitError : this._locales.singleFileLimitError
    }

    return this.message
  }

  private uploadWrapperCssClasses = () => ({
    'upload-wrapper': true,
    message: !!this.message,
    [`${this.messageType}`]: !!this.messageType,
    'tab-focus': !this.disabled && this.focusType.wrapper === FOCUS_TYPE.TAB && this.focusType.item !== FOCUS_TYPE.TAB,
    disabled: this.disabled,
    'file-drag': this.isFileDrag,
    ...(!this.messageType && this.isLimitReached ? { error: true } : {}),
  })

  private listWrapperCssClasses = () => ({
    'file-list-wrapper': true,
    [`${this.scrollState}`]: !!this.scrollState,
  })

  private hostCssClasses = () => ({
    'wpp-file-upload': true,
  })

  render() {
    const allFiles = [...(this.successList || []), ...(this.errorList || [])]

    return (
      <Host
        class={this.hostCssClasses()}
        exportparts="file-item, wrapper, content, file-name, tooltip, loading, percentage, cross-icon"
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onMouseDown={this.onMouseDown}
        onKeyUp={(event: KeyboardEvent) => this.onKeyUp(event, 'wrapper')}
        aria-disabled={this.disabled ? 'true' : undefined}
      >
        <slot name="label" part="slot-label" />

        {this.labelConfig?.text && (
          <wpp-label
            class="file-upload-label"
            id={this.labelId}
            htmlFor={this.inputId}
            optional={!this.required}
            disabled={this.disabled}
            config={this.labelConfig}
            tooltipConfig={this.labelTooltipConfig}
            part="label"
          />
        )}

        <slot name="description" part="slot-description" />
        <div
          class={this.uploadWrapperCssClasses()}
          onDrop={this.handleDrop}
          onDragEnter={this.handleDragEnter}
          onDragLeave={this.handleDragLeave}
          onDragOver={this.handleDragOver}
          part="file-upload-container"
        >
          <wpp-avatar
            class="icon-file"
            icon="wpp-icon-file"
            size="l"
            role="presentation"
            tabindex="-1"
            aria-hidden="true"
          />
          <div class="content" part="content">
            <p>
              <span class="label" part="label">
                {this._locales.label}
              </span>
              <span class="text" part="text">
                {this._locales.text}
              </span>
            </p>
          </div>
          <p class="text-info" part="text-info">
            {this._locales.info(this.getAcceptExtensions().join(', '), this.size)}
          </p>
          <input
            class="file-loader"
            type="file"
            name={this.name}
            onChange={this.handleChange}
            ref={inputRef => (this.inputRef = inputRef)}
            multiple={this.multiple}
            accept={this.getAcceptExtensions().join()}
            part="input"
            title=""
            aria-label={this.locales.label || 'Upload file'}
            disabled={this.disabled}
          />
        </div>
        {/* We display message when devs provide it or when internal validations fail, such as when the limit of files is reached */}
        {(this.message || this.isLimitReached) && (
          <wpp-inline-message
            message={this.getMessageText()}
            type={this.isLimitReached ? 'error' : this.messageType}
            showTooltipFrom={this.maxMessageLength}
            tooltipConfig={this.tooltipConfig}
            part="message"
          />
        )}
        {allFiles?.length ? (
          <div class={this.listWrapperCssClasses()} part="list-wrapper">
            <ul role="list" class="file-list" part="file-list" onScroll={this.handleListScroll}>
              {allFiles.map((file, index) => (
                <wpp-file-upload-item
                  key={file.lastModified}
                  format={this.format}
                  parentDisabled={this.disabled}
                  maxLabelLength={this.maxLabelLength}
                  currentIndex={index}
                  onWppDelete={this.handleDeleteItem}
                  onWppClick={this.handleClickItem}
                  file={file}
                  locales={{
                    sizeError: this._locales.sizeError,
                    formatError: this._locales.formatError,
                  }}
                  part="file-item"
                  onBlur={this.onBlur}
                  onKeyUp={(event: KeyboardEvent) => this.onKeyUp(event, 'item')}
                />
              ))}
            </ul>
          </div>
        ) : null}
      </Host>
    )
  }
}
