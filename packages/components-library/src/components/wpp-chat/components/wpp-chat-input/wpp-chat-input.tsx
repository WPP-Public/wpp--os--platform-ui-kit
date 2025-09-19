import { Component, h, Prop, State, Host, Event, Element, EventEmitter, Fragment, Watch } from '@stencil/core'
import { FileItemType, FileUploadEventDetail, FileUploadItemEventDetail } from '../../../wpp-file-upload/types'
import { ChatInputSize, FileUploadConfig, MessageChangeEventDetail, SendEventDetail } from './types'
import {
  convertMBToBytes,
  getBaseName,
  getExtension,
  getExtensionsList,
  modifyPropertiesOnFile,
  renameFile,
} from '../../../wpp-file-upload/utils'
import { EXTENSION_TO_TYPE } from '../../../wpp-file-upload/constants'
import { WrappedSlot } from '../../../common/WrappedSlot/WrappedSlot'
import { MessageTypes } from '../../../../types/common'
import { debounce, getSlotEmptyStates, hasParentWithId } from '../../../../utils/utils'
import { TOAST_DURATION } from './utils'
import { DEFAULT_FILE_UPLOAD_CONFIG, MAX_INPUT_AREA_HEIGHT, MIN_TEXTAREA_HEIGHT } from './consts'

@Component({
  tag: 'wpp-chat-input',
  styleUrl: 'wpp-chat-input.scss',
  shadow: true,
})
export class WppChatInput {
  @Element() host: HTMLWppChatInputElement

  private resizeObserver: ResizeObserver
  private inputRef?: HTMLInputElement
  private textareaRef?: HTMLTextAreaElement
  private inputAreaRef?: HTMLDivElement
  private scrollTimeout: NodeJS.Timeout | null = null
  private debouncedHandleInput: (value: string) => void

  /**
   * Size of the component.
   */
  @Prop() readonly size: ChatInputSize = 'm'

  /**
   * Placeholder text for the input field.
   */
  @Prop() readonly placeholder: string = 'Type your message...'

  /**
   * Whether the attach button is enabled.
   */
  @Prop() readonly enableAttach: boolean = false

  /**
   * Whether the mic button is enabled.
   * @internal - This prop will be of use in the future, but for now, it's not used.
   */
  @Prop() readonly enableMic: boolean = false

  /**
   * If `true`, the chat input is disabled.
   */
  @Prop() readonly disabled: boolean = false

  /**
   * Configuration object for file upload functionality.
   */
  @Prop() readonly fileUploadConfig?: Partial<FileUploadConfig> = {
    /**
     * Format of the file upload result.
     */
    format: 'base64',

    /**
     * Maximum label length (in characters) of single item
     */
    maxLabelLength: 30,

    /**
     * If `true`, allows multiple files to be uploaded at once.
     */
    multiple: true,

    /**
     * Maximum number of files allowed for upload.
     * Set to `0` for no restriction.
     */
    maxFiles: 0,

    /**
     * Maximum allowed size of each file in MB.
     */
    size: 150,

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
    accept: ['.jpg', '.jpeg', '.png'],

    /**
     * Object defining accepted MIME types and their corresponding extensions.
     * Example: `{ 'image/png': ['.png'], 'application/pdf': ['.pdf'] }`.
     * Overrides `accept` if both are provided.
     */
    acceptConfig: {},

    /**
     * Defines custom validation function for uploaded files.
     * Should return `null` if the file is valid, or a string error message otherwise.
     */
    validator: () => null,

    /**
     * If `true`, replaces existing error messages with new ones for failed uploads.
     * If `false`, retains existing errors and appends new ones.
     */
    showOnlyNewErrors: false,

    /**
     * If `true`, the file upload works as controlled component.
     */
    controlled: false,

    /**
     * Indicates locales for file upload component
     */
    locales: {
      sizeError: 'File exceeds size limit',
      formatError: 'Wrong format',
    },
  }

  /**
   * Maximum number of allowed characters.
   */
  @Prop() readonly charactersLimit?: number

  /**
   * Defines the files list
   */
  @Prop({ mutable: true }) attachments: FileItemType[] = []

  /**
   * If set to true, displays `Select` in left actions. The Select must placed in the `.select` slot.
   */
  @Prop({ reflect: true }) readonly withSelect: boolean = false

  /**
   * Text value used to set the input message content.
   * When user input occurs, a `wppMessageChanged` event is emitted. The new value should be assigned to this property
   * to maintain synchronization with the input field.
   */
  @Prop() readonly textValue: string = ''

  /**
   * If set to `true`, enable debounce for onInput event.
   */
  @Prop() readonly debounceEnabled: boolean = true

  /**
   * Debounce delay in milliseconds.
   */
  @Prop() readonly debounceDelay: number = 300

  @State() successAttachmentsList: FileItemType[] = []
  @State() errorAttachmentsList: FileItemType[] = []
  @State() toastMessage: string = ''
  @State() toastType: MessageTypes = 'information'
  @State() showToast: boolean = false
  @State() areAttachmentsVisible: boolean = true
  @State() hasSelectSlot: boolean = false
  @State() isChatInputExpanded: boolean = false

  /**
   * Emitted when the user clicks the "Send" button.
   */
  @Event({ bubbles: false, composed: false }) readonly wppSend: EventEmitter<SendEventDetail>

  /**
   * Emitted when the user clicks the "Mic" button.
   * @internal - This prop will be of use in the future, but for now, it's not used.
   */
  @Event({ bubbles: false, composed: false }) readonly wppMic: EventEmitter<void>

  /**
   * Emitted when the value of the input changes.
   */
  @Event({ bubbles: false, composed: false }) readonly wppChange: EventEmitter<FileUploadEventDetail>

  /**
   * Emitted when the file-upload item was deleted.
   * @internal
   */
  @Event({ bubbles: false, composed: false }) readonly wppFileUploadItemDelete: EventEmitter<FileUploadItemEventDetail>

  /**
   * Emitted when the file-upload item was clicked.
   * @internal
   */
  @Event({ bubbles: false, composed: false }) readonly wppFileUploadItemClick: EventEmitter<FileUploadItemEventDetail>

  /**
   * Emitted when the message in the input message changes.
   */
  @Event({ bubbles: false, composed: false }) readonly wppMessageChanged: EventEmitter<MessageChangeEventDetail>

  @State() internalValue: string = ''

  private reInitValue = (list: FileItemType[]) => {
    this.successAttachmentsList = list.filter(file => !this.isFileWithError(file))
    this.errorAttachmentsList = list.filter(this.isFileWithError)
  }

  @Watch('attachments')
  onAttachmentsChange(newValue: FileItemType[]) {
    if (this.mergedFileUploadConfig.controlled) {
      this.reInitValue(newValue)
    }

    if (this.debouncedAdjustTextareaHeight) {
      requestAnimationFrame(() => this.debouncedAdjustTextareaHeight())
    }
  }

  @Watch('textValue')
  onTextValueChange(value: string) {
    if (value !== this.internalValue) {
      this.internalValue = value
      this.adjustTextareaHeight(false, value)
    }
  }

  componentWillLoad() {
    if (!this.textValue?.trim() && this.textValue !== this.internalValue) {
      this.internalValue = this.textValue
    }

    this.debouncedHandleInput = debounce((value: string) => {
      this.internalValue = value
      this.wppMessageChanged.emit({ value })
    }, this.debounceDelay)

    const list = [...this.attachments, ...(this.successAttachmentsList || []), ...(this.errorAttachmentsList || [])]

    this.reInitValue(list)
  }

  componentDidLoad() {
    requestAnimationFrame(() => {
      this.initializeObserver()
    })

    const debouncedResizeHandler = debounce(() => {
      if (this.textareaRef) {
        this.textareaRef.style.height = 'auto'
        this.forceRecalculateHeight()

        if (this.debouncedAdjustTextareaHeight) {
          this.debouncedAdjustTextareaHeight()
        }
      }
    }, 150)

    const resizeObserver = new ResizeObserver(() => {
      debouncedResizeHandler()
    })

    if (this.inputAreaRef) {
      resizeObserver.observe(this.inputAreaRef)
    }
    this.resizeObserver = resizeObserver
    document.addEventListener('mousedown', this.handleDocumentClick, true)
  }

  disconnectedCallback() {
    this.disconnectObserver()

    if (this.resizeObserver && this.inputAreaRef) {
      this.resizeObserver.unobserve(this.inputAreaRef)
    }

    document.removeEventListener('mousedown', this.handleDocumentClick, true)
  }

  private handleDocumentClick = (event: MouseEvent) => {
    if (this.size === 's' && this.isChatInputExpanded && this.host && !this.host.contains(event.target as Node)) {
      // For cases when the user click item from select.
      // The dropdown of the select is rendered outside of the component.
      if (!hasParentWithId(event.target as HTMLElement, 'tippy-')) {
        this.handleSimpleBlur()
      }
    }
  }

  @Watch('size')
  onSizeChange(newValue: ChatInputSize, oldValue: ChatInputSize) {
    if (newValue !== oldValue && this.size === 's') {
      this.handleSizeToggle()
    }
  }

  private handleFileLoaded = (event: CustomEvent<{ name: string; size: number }>) => {
    const { name, size } = event.detail

    // Find the file in your state and set uploaded = true
    const updateUploadedFlag = (file: FileItemType) => {
      if (file.name === name && file.size === size) {
        const fileCopy = file as any

        fileCopy.uploaded = true
      }

      return file
    }

    this.successAttachmentsList = this.successAttachmentsList.map(updateUploadedFlag)
    this.errorAttachmentsList = this.errorAttachmentsList.map(updateUploadedFlag)
    this.attachments = [...this.successAttachmentsList, ...this.errorAttachmentsList]
  }

  /**
   * Maximize the input area when the user clicks on it.
   */
  private handleSizeToggle(): void {
    if (this.size === 's' && !this.disabled) {
      this.isChatInputExpanded = true

      requestAnimationFrame(() => {
        if (this.debouncedAdjustTextareaHeight) {
          this.debouncedAdjustTextareaHeight()
        }

        this.handleClick()
      })
    }
  }

  /**
   * Minimize the input area when it loses focus.
   */
  private handleSimpleBlur(): void {
    if (this.size === 's' && this.isChatInputExpanded) {
      this.isChatInputExpanded = false
    }
  }

  private forceRecalculateHeight() {
    if (this.textareaRef) {
      const currentValue = this.textareaRef.value

      this.textareaRef.value = ''
      void this.textareaRef.offsetHeight
      this.textareaRef.value = currentValue
    }
  }

  private calculateTextHeight(text: string): number {
    if (!this.textareaRef || !text) return MIN_TEXTAREA_HEIGHT

    const mirrorDiv = document.createElement('div')
    const computedStyle = window.getComputedStyle(this.textareaRef)

    mirrorDiv.style.position = 'absolute'
    mirrorDiv.style.visibility = 'hidden'
    mirrorDiv.style.whiteSpace = 'pre-wrap'
    mirrorDiv.style.wordWrap = 'break-word'
    mirrorDiv.style.padding = computedStyle.padding
    mirrorDiv.style.width = this.textareaRef.offsetWidth + 'px'
    mirrorDiv.style.fontFamily = computedStyle.fontFamily
    mirrorDiv.style.fontSize = computedStyle.fontSize
    mirrorDiv.style.lineHeight = computedStyle.lineHeight
    mirrorDiv.style.boxSizing = computedStyle.boxSizing
    mirrorDiv.style.letterSpacing = computedStyle.letterSpacing
    mirrorDiv.textContent = (text || ' ') + '\u200b'

    document.body.appendChild(mirrorDiv)
    const height = mirrorDiv.offsetHeight

    document.body.removeChild(mirrorDiv)

    return height
  }

  // Getter to merge defaults with provided config
  private get mergedFileUploadConfig(): FileUploadConfig {
    return {
      ...DEFAULT_FILE_UPLOAD_CONFIG,
      ...this.fileUploadConfig, // Merge with any provided config
    }
  }

  private checkAttachmentsVisibility() {
    const attachmentsElement = this.inputAreaRef?.querySelector('.attachments')

    if (!attachmentsElement || !this.inputAreaRef) {
      this.areAttachmentsVisible = false

      return
    }

    const { top: inputTop, bottom: inputBottom } = this.inputAreaRef.getBoundingClientRect()
    const { top: attachTop, bottom: attachBottom } = attachmentsElement.getBoundingClientRect()

    this.areAttachmentsVisible = attachTop >= inputTop && attachBottom <= inputBottom
  }

  private updateSlotData = () => {
    const emptyStates = getSlotEmptyStates(this.host.childNodes, {
      select: '[slot="select"]',
    })

    this.hasSelectSlot = !emptyStates.select
  }

  private handleScroll = () => {
    if (this.scrollTimeout) clearTimeout(this.scrollTimeout)

    this.scrollTimeout = setTimeout(() => {
      this.checkAttachmentsVisibility()
    }, 100)
  }

  private disconnectObserver() {
    if (this.inputAreaRef) {
      this.inputAreaRef.removeEventListener('scroll', this.handleScroll)
    }
  }

  private initializeObserver() {
    if (!this.inputAreaRef) return

    this.inputAreaRef.addEventListener('scroll', this.handleScroll)
    this.checkAttachmentsVisibility()
  }

  /**
   * Scrolls the attachments list to the specified file type.
   * @param fileType 'error' for error files, 'success' for success files (or '' for any file)
   */
  private scrollToAttachment(type: 'error' | 'success' | '' = '') {
    const attachmentsElement = this.inputAreaRef?.querySelector('.attachments')

    if (!attachmentsElement) return

    let selector = '.wpp-file-upload-item'

    if (type === 'error') selector += '.error'
    if (type === 'success') selector += ':not(.error)'

    const attachment = attachmentsElement.querySelector(selector)

    if (attachment) {
      // Use block: 'nearest' to minimize page scroll issues
      attachment.scrollIntoView({ behavior: 'smooth', block: 'nearest' })

      return
    }

    // Fallback: scroll to top (visual top in column-reverse is scrollTop = 0)
    attachmentsElement.scrollTo({ top: 0, behavior: 'smooth' })
  }

  private displayToast(message: string, type: MessageTypes) {
    this.checkAttachmentsVisibility()

    if (this.areAttachmentsVisible || !this.attachments?.length) {
      return
    }

    this.toastMessage = message
    this.toastType = type
    this.showToast = true

    setTimeout(() => (this.showToast = false), TOAST_DURATION)
  }

  private handleSend() {
    if (
      this.disabled ||
      this.isSendDisabled ||
      (!this.internalValue.trim() && !this.successAttachmentsList.length) ||
      this.errorAttachmentsList.length
    )
      return

    this.wppSend.emit({
      message: this.internalValue.trim(),
      attachments: this.successAttachmentsList,
    })

    Object.assign(this, {
      internalValue: '',
      successAttachmentsList: [],
      errorAttachmentsList: [],
    })

    this.wppChange.emit({ value: [], hasError: false, errorFiles: [] })

    this.adjustTextareaHeight(true)

    if (this.size === 's') {
      this.isChatInputExpanded = false
    }
  }

  private handlePaste = () => {
    this.textareaRef?.focus()

    requestAnimationFrame(() => {
      this.adjustTextareaHeight(false)
    })
  }

  private handleInput = (event: Event) => {
    if (this.disabled) return

    const target = event.target as HTMLTextAreaElement
    const inputValue = target.value

    if (this.debounceEnabled && this.debouncedHandleInput) {
      this.debouncedHandleInput(inputValue)
    } else {
      this.internalValue = inputValue
      this.wppMessageChanged.emit({ value: inputValue })
    }

    if (!inputValue.trim() && this.textareaRef) {
      this.textareaRef.style.minHeight = `${MIN_TEXTAREA_HEIGHT}px`
    }

    this.adjustTextareaHeight(false, inputValue)
  }

  private debouncedAdjustTextareaHeight = debounce(() => this.adjustTextareaHeight(), 50)

  private adjustTextareaHeight = (reset: boolean = false, value?: string) => {
    if (!this.textareaRef || !this.inputAreaRef) return

    if (reset) {
      this.textareaRef.style.minHeight = `${MIN_TEXTAREA_HEIGHT}px`

      return
    }

    const attachmentsElement = this.inputAreaRef.querySelector('.attachments') as HTMLElement | null
    const attachmentsHeight = attachmentsElement?.scrollHeight || 0
    const gap = attachmentsElement ? parseFloat(getComputedStyle(attachmentsElement).gap) || 0 : 0
    const messageText = value !== undefined ? value : this.textareaRef.value
    const textAreaContentHeight = Math.max(this.calculateTextHeight(messageText), MIN_TEXTAREA_HEIGHT)
    const totalHeight = attachmentsHeight + textAreaContentHeight + gap
    const reachMaxHeight = totalHeight > MAX_INPUT_AREA_HEIGHT

    this.inputAreaRef.style.overflowY = reachMaxHeight ? 'auto' : 'hidden'
    this.textareaRef.style.minHeight = `${textAreaContentHeight}px`
  }

  private isFileWithError = (file: FileItemType): boolean =>
    !!(file.formatError || file.sizeError || file.validatorError)

  private handleDeleteItem = (event: CustomEvent<FileUploadItemEventDetail>) => {
    const { name, size } = event.detail

    const updatedFilesList = this.attachments.filter(file => file.name + file.size !== name + size)

    this.successAttachmentsList = updatedFilesList.filter(file => !this.isFileWithError(file))
    this.errorAttachmentsList = updatedFilesList.filter(this.isFileWithError)

    if (this.inputRef) this.inputRef.value = ''

    this.wppChange.emit({
      value: this.successAttachmentsList,
      hasError: this.errorAttachmentsList.length > 0,
      errorFiles: this.errorAttachmentsList,
    })

    this.wppFileUploadItemDelete.emit(event.detail)

    this.attachments = updatedFilesList
  }

  private handleClickItem = (event: CustomEvent) => this.wppFileUploadItemClick.emit(event.detail)

  private handleFileSelection() {
    if (this.inputRef) {
      this.inputRef.click()
    }
  }

  private handleChange = async () => {
    const files = this.inputRef?.files

    if (!files?.length) return

    const filesToLoad = this.mergedFileUploadConfig.multiple ? Array.from(files) : [files[0]]

    await this.handleFileLoad(filesToLoad)

    if (this.debouncedAdjustTextareaHeight) {
      requestAnimationFrame(() => this.debouncedAdjustTextareaHeight())
    }

    if (this.inputRef) this.inputRef.value = ''
  }

  private isMaximumFilesSet = (): boolean => (this.mergedFileUploadConfig.maxFiles ?? 0) > 0

  private validateFileSize = (file: FileItemType): FileItemType => {
    if (file.size > convertMBToBytes(this.mergedFileUploadConfig.size ?? 0)) {
      file.sizeError = true
    } else {
      file.sizeError = false
    }

    return file
  }

  private isAcceptConfigFilled = (): boolean =>
    !!this.mergedFileUploadConfig.acceptConfig && Object.keys(this.mergedFileUploadConfig.acceptConfig).length > 0

  private getAcceptExtensions = (): string[] => {
    if (this.isAcceptConfigFilled()) {
      return getExtensionsList(this.mergedFileUploadConfig.acceptConfig || {})
    }

    return this.mergedFileUploadConfig.accept || []
  }

  private validateFileType = (file: FileItemType): FileItemType => {
    if (this.isAcceptConfigFilled()) {
      const allowedExtensions = file.type
        ? this.mergedFileUploadConfig.acceptConfig?.[file.type] || []
        : this.getAcceptExtensions()

      file.formatError = allowedExtensions.length > 0 ? !allowedExtensions.includes(getExtension(file.name)) : true

      return file
    }

    if (!this.mergedFileUploadConfig.accept?.length) {
      if (!file.type) {
        const typeFromExtension = EXTENSION_TO_TYPE[getExtension(file.name)]

        return modifyPropertiesOnFile(file as File, { type: typeFromExtension })
      }

      return file
    }

    file.formatError = !this.mergedFileUploadConfig.accept.some(format => {
      const normalizedFormat = format.replace(/[,.*]/g, '')

      return normalizedFormat === 'mov'
        ? file.type?.includes('quicktime')
        : /txt|text|msword|document|doc?x/.test(normalizedFormat)
        ? /text|application/.test(file.type)
        : file.type.includes(normalizedFormat)
    })

    return file
  }

  private customValidation = (file: FileItemType): FileItemType => {
    file.validatorError = this.mergedFileUploadConfig.validator?.(file) || undefined

    return file
  }

  private async handleFileLoad(filesList: FileItemType[]) {
    if (!filesList.length) return

    const existingAttachments = [...this.successAttachmentsList, ...this.errorAttachmentsList]

    const filteredFiles = filesList
      .filter(Boolean)
      .map(file =>
        existingAttachments.some(item => item.name === file.name)
          ? renameFile(file as File, this.generateUniqueName(file.name, existingAttachments))
          : file,
      )

    if (this.isMaximumFilesSet()) {
      const maxFiles = this.mergedFileUploadConfig.maxFiles ?? 0
      const remainingSlots = Math.max(0, maxFiles - existingAttachments.length)

      filteredFiles.length = Math.min(filteredFiles.length, remainingSlots)
      if (remainingSlots === 0) return

      this.displayToast('Uploading...', 'information')
    }

    const validatedFiles = filteredFiles.map(file => {
      if ('url' in file) return file

      this.validateFileSize(file)
      this.validateFileType(file)
      this.customValidation(file)

      return file
    })

    const [batchSuccessFiles, batchErrorFiles] = [
      validatedFiles.filter(file => !this.isFileWithError(file)),
      validatedFiles.filter(this.isFileWithError),
    ]

    this.successAttachmentsList = [...this.successAttachmentsList, ...batchSuccessFiles]
    this.errorAttachmentsList = this.displayErrorListByShowingOption(batchErrorFiles)
    this.attachments = [...this.successAttachmentsList, ...this.errorAttachmentsList]

    this.wppChange.emit({
      value: this.successAttachmentsList,
      hasError: !!this.errorAttachmentsList.length,
      errorFiles: this.errorAttachmentsList,
    })

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.checkAttachmentsVisibility()
        const label = batchErrorFiles.length > 0 ? 'Upload FAILED' : 'Uploaded Successfully'
        const fileCount = batchErrorFiles.length || batchSuccessFiles.length
        const fileLabel = fileCount === 1 ? 'File' : 'Files'

        if (fileCount > 0) {
          this.displayToast(`${fileCount} ${fileLabel} ${label}`, batchErrorFiles.length > 0 ? 'error' : 'success')
        }

        if (this.debouncedAdjustTextareaHeight) {
          this.debouncedAdjustTextareaHeight()
        }
      })
    })
  }

  private displayErrorListByShowingOption = (newFilesWithErrors: FileItemType[]): FileItemType[] =>
    this.mergedFileUploadConfig.showOnlyNewErrors
      ? newFilesWithErrors
      : [...this.errorAttachmentsList, ...newFilesWithErrors]

  private generateUniqueName = (fileName: string, fileList: FileItemType[]): string => {
    const baseName = getBaseName(fileName)
    const extension = getExtension(fileName)
    let counter = 1

    const isNameTaken = (file: FileItemType) => {
      const currentCounter = counter

      return file.name === `${baseName}-${currentCounter}${extension}`
    }

    while (fileList.some(file => isNameTaken(file))) {
      counter++
    }

    return `${baseName}-${counter}${extension}`
  }

  private handleClick = () => {
    if (!this.disabled) {
      this.textareaRef?.focus()
    }
  }

  private handleToastClick(event: MouseEvent) {
    event.stopPropagation()

    this.scrollToAttachment(this.toastType === 'error' ? 'error' : 'success')
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      // When "Shift" + "Enter" are pressed, keep default behaviour (new line)
      if (event.shiftKey) return

      // Pressing "Enter" is equivalent to pressing "Send" icon
      event.preventDefault()
      this.handleSend()
    }
  }

  private get isSendDisabled(): boolean {
    const charExceeded = this.charactersLimit !== undefined && this.internalValue.length > this.charactersLimit

    return (
      this.disabled ||
      (!this.internalValue.trim() && this.successAttachmentsList.length === 0) ||
      this.errorAttachmentsList.length > 0 ||
      charExceeded
    )
  }

  private hostCssClasses = () => ({
    'wpp-chat-input': true,
  })

  private chatToastClasses = () => ({
    'chat-file-upload-toast': true,
  })

  private chatInputContainerClasses = () => ({
    'chat-input-container': true,
    disabled: this.disabled,
  })

  private inputAreaClasses = () => ({
    ...(this.size === 's' && { [this.isChatInputExpanded ? 'expanded' : 'minimized']: true }),
    'input-area': true,
  })

  private attachmentsWrapperClasses = () => ({
    attachments: true,
  })

  private textInputClasses = () => ({
    'text-input': true,
  })

  private inputAreaWrapperClasses = () => ({
    'input-area-wrapper': true,
  })

  private minimizedInput = () => ({
    'minimized-input': true,
  })

  private inputValue = () => ({
    'input-value': true,
    disabled: this.disabled,
    'input-value-placeholder': !this.internalValue,
  })

  private actionsBarClasses = () => ({
    'actions-bar': true,
  })

  private leftActionsClasses = () => ({
    'left-actions': true,
    disabled: this.disabled,
  })

  private selectClasses = () => ({
    select: true,
    'slot-hidden': !this.hasSelectSlot,
    disabled: this.disabled,
  })

  private rightActionsClasses = () => ({
    'right-actions': true,
    disabled: this.disabled,
  })

  render() {
    const allFiles = [...this.successAttachmentsList, ...this.errorAttachmentsList]
    const charExceeded = this.charactersLimit && this.internalValue.length > this.charactersLimit
    const isMaximizedS = this.isChatInputExpanded && this.size === 's'
    const maximizedSorSizeM = isMaximizedS || this.size === 'm'
    const isMinimizedS = this.size === 's' && !this.isChatInputExpanded

    return (
      <Host
        class={this.hostCssClasses()}
        size={this.size}
        exportparts="chat-input-container, toast, input-area, attachments, text-input, actions-bar, left-actions, right-actions, file-item"
        onClick={isMinimizedS ? this.handleSizeToggle : this.handleClick}
      >
        <div class={this.chatInputContainerClasses()} part="chat-input-container">
          {this.showToast && (
            <wpp-toast
              message={this.toastMessage}
              type={this.toastType}
              duration={TOAST_DURATION}
              variant="chat"
              part="toast"
              class={this.chatToastClasses()}
              onClick={event => this.handleToastClick(event)}
            />
          )}

          {/* Input Area */}
          <div class={this.inputAreaClasses()} ref={el => (this.inputAreaRef = el as HTMLDivElement)} part="input-area">
            {maximizedSorSizeM ? (
              <Fragment>
                {/* Attachments */}
                {allFiles?.length > 0 && (
                  <div class={this.attachmentsWrapperClasses()} part="attachments">
                    {allFiles.map((file, index) => (
                      <wpp-file-upload-item
                        key={index}
                        file={file}
                        format={this.mergedFileUploadConfig.format}
                        maxLabelLength={this.mergedFileUploadConfig.maxLabelLength}
                        currentIndex={index}
                        onWppDelete={this.handleDeleteItem}
                        onWppClick={this.handleClickItem}
                        locales={{
                          sizeError: this.mergedFileUploadConfig.locales?.sizeError ?? 'File exceeds size limit',
                          formatError: this.mergedFileUploadConfig.locales?.formatError ?? 'Wrong format',
                        }}
                        part="file-item"
                        class={this.isFileWithError(file) ? 'error' : ''}
                        onFileLoaded={this.handleFileLoaded}
                        uploaded={!!(file as any).uploaded}
                      />
                    ))}
                  </div>
                )}

                <textarea
                  class={this.textInputClasses()}
                  placeholder={this.placeholder}
                  value={this.internalValue}
                  ref={el => (this.textareaRef = el)}
                  onInput={event => this.handleInput(event)}
                  onPaste={() => this.handlePaste()}
                  disabled={this.disabled}
                  onKeyDown={this.onKeyDown}
                  part="text-input"
                />
              </Fragment>
            ) : (
              <div class={this.inputAreaWrapperClasses()}>
                {/* Minimized Input */}
                <div class={this.minimizedInput()} part="minimized-input" onClick={this.handleSizeToggle}>
                  <wpp-typography class={this.inputValue()} type="s-body">
                    {this.internalValue || this.placeholder}
                  </wpp-typography>
                </div>

                <wpp-action-button
                  data-testid="send-icon-only-button"
                  variant="secondary"
                  onClick={e => {
                    e.stopPropagation()
                    this.handleSend()
                  }}
                  disabled={this.isSendDisabled}
                >
                  <wpp-icon-send slot="icon-start" />
                </wpp-action-button>
              </div>
            )}
          </div>

          {maximizedSorSizeM && (
            <div class={this.actionsBarClasses()} part="actions-bar">
              {/* Actions Bar */}
              <div class={this.leftActionsClasses()} part="left-actions">
                {this.enableAttach && (
                  <Fragment>
                    <wpp-action-button
                      data-testid="attach-icon-only-button"
                      disabled={this.disabled}
                      variant="secondary"
                      onClick={() => this.handleFileSelection()}
                    >
                      <wpp-icon-attach slot="icon-start" />
                    </wpp-action-button>

                    <input
                      class="file-loader"
                      type="file"
                      ref={inputRef => (this.inputRef = inputRef)}
                      style={{ display: 'none' }}
                      multiple={this.mergedFileUploadConfig.multiple}
                      onChange={this.handleChange}
                      accept={this.getAcceptExtensions().join()}
                      title=""
                    />
                  </Fragment>
                )}

                {this.withSelect && (
                  <WrappedSlot wrapperClass={this.selectClasses()} name="select" onSlotchange={this.updateSlotData} />
                )}

                {this.enableMic && (
                  <wpp-action-button data-testid="mic-icon-only-button" variant="secondary" disabled={this.disabled}>
                    <wpp-icon-mic-on slot="icon-start" />
                  </wpp-action-button>
                )}
              </div>

              <div class={this.rightActionsClasses()} part="right-actions">
                {charExceeded && (
                  <wpp-typography class="char-counter" type="xs-midi">
                    {this.internalValue.length}/{this.charactersLimit}
                  </wpp-typography>
                )}

                <wpp-action-button
                  data-testid="send-icon-only-button"
                  variant="secondary"
                  onClick={() => this.handleSend()}
                  disabled={this.isSendDisabled}
                >
                  <wpp-icon-send slot="icon-start" />
                </wpp-action-button>
              </div>
            </div>
          )}
        </div>
      </Host>
    )
  }
}
