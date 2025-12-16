import { h, Host, Fragment } from '@stencil/core';
import { convertMBToBytes, getBaseName, getExtension, getExtensionsList, modifyPropertiesOnFile, renameFile, } from '../../../wpp-file-upload/utils';
import { EXTENSION_TO_TYPE } from '../../../wpp-file-upload/const';
import { WrappedSlot } from '../../../common/WrappedSlot/WrappedSlot';
import { debounce, getSlotEmptyStates, hasParentWithId } from '../../../../utils/utils';
import { TOAST_DURATION } from './utils';
import { DEFAULT_FILE_UPLOAD_CONFIG, MAX_INPUT_AREA_HEIGHT, MIN_TEXTAREA_HEIGHT, LOCALES_DEFAULTS } from './consts';
import { Z_INDEX } from '../../../../common/consts';
export class WppChatInput {
  constructor() {
    this.scrollTimeout = null;
    this.inputAreaId = `wpp-ci-area`;
    this.charCounterId = `wpp-ci-cc`;
    this.textareaAutoId = `wpp-ci-ta`;
    this.minimizedDescId = `wpp-ci-min-desc`;
    this._locales = LOCALES_DEFAULTS; // Locales state holder (merged default + user overrides)
    this.reInitValue = (list) => {
      this.successAttachmentsList = list.filter(file => !this.isFileWithError(file));
      this.errorAttachmentsList = list.filter(this.isFileWithError);
    };
    // Handler to block click during dialog
    this.onAttachClick = (e) => {
      // Space/Enter on buttons can still synthesize click; block if dialog is open
      if (this.isFileDialogOpen) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      this.handleFileSelection();
    };
    this.handleDocumentFocusIn = (event) => {
      const target = event.target;
      if (this.size === 's' && this.isChatInputExpanded && this.host && !this.host.contains(target)) {
        if (!hasParentWithId(target, 'tippy-')) {
          this.handleSimpleBlur();
        }
      }
    };
    this.handleDocumentClick = (event) => {
      if (this.size === 's' && this.isChatInputExpanded && this.host && !this.host.contains(event.target)) {
        // For cases when the user click item from select.
        // The dropdown of the select is rendered outside of the component.
        if (!hasParentWithId(event.target, 'tippy-')) {
          this.handleSimpleBlur();
        }
      }
    };
    this.onExpandedKeyDown = (e) => {
      if (e.key === 'Escape' && this.size === 's' && this.isChatInputExpanded) {
        e.preventDefault();
        e.stopPropagation();
        this.handleSimpleBlur();
      }
    };
    this.handleFileLoaded = (event) => {
      const { name, size } = event.detail;
      // Find the file in your state and set uploaded = true
      const updateUploadedFlag = (file) => {
        if (file.name === name && file.size === size) {
          const fileCopy = file;
          fileCopy.uploaded = true;
        }
        return file;
      };
      this.successAttachmentsList = this.successAttachmentsList.map(updateUploadedFlag);
      this.errorAttachmentsList = this.errorAttachmentsList.map(updateUploadedFlag);
      this.attachments = [...this.successAttachmentsList, ...this.errorAttachmentsList];
    };
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        select: '[slot="select"]',
      });
      this.hasSelectSlot = !emptyStates.select;
    };
    this.handleScroll = () => {
      if (this.scrollTimeout)
        clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => {
        this.checkAttachmentsVisibility();
      }, 100);
    };
    this.handlePaste = async (event) => {
      if (this.disabled)
        return;
      this.textareaRef?.focus();
      const items = event.clipboardData?.items;
      if (!items) {
        await this.adjustTextareaHeight(false);
        return;
      }
      const handled = await this.handleFilePaste(event, items);
      if (handled)
        return;
      // Adjust textarea height after paste for non-image content
      await this.adjustTextareaHeight(false);
    };
    /**
     * Handles image file pasting from clipboard items.
     * Returns true if files were handled, false otherwise.
     */
    this.handleFilePaste = async (event, items) => {
      const files = Array.from(items)
        .filter(item => item.kind === 'file' && item.type.startsWith('image/'))
        .map(item => item.getAsFile())
        .filter((file) => !!file);
      if (files.length > 0) {
        event.preventDefault();
        await this.handleFileLoad(files);
        await this.adjustTextareaHeight();
        return true;
      }
      return false;
    };
    this.handleInput = (event) => {
      if (this.disabled)
        return;
      const target = event.target;
      const inputValue = target.value;
      if (this.debounceEnabled && this.debouncedHandleInput) {
        this.debouncedHandleInput(inputValue);
      }
      else {
        this.internalValue = inputValue;
        this.wppMessageChanged.emit({ value: inputValue });
      }
      if (!inputValue.trim() && this.textareaRef) {
        this.textareaRef.style.minHeight = `${MIN_TEXTAREA_HEIGHT}px`;
      }
      this.adjustTextareaHeight(false, inputValue);
    };
    this.debouncedAdjustTextareaHeight = debounce(() => this.adjustTextareaHeight(), 50);
    this.adjustTextareaHeight = (reset = false, value, waitForInputArea = false) => new Promise(resolve => {
      if (!this.textareaRef || !this.inputAreaRef) {
        resolve();
        return;
      }
      if (reset) {
        this.textareaRef.style.minHeight = `${MIN_TEXTAREA_HEIGHT}px`;
        resolve();
        return;
      }
      const attachmentsElement = this.inputAreaRef.querySelector('.attachments');
      const attachmentsHeight = attachmentsElement?.scrollHeight || 0;
      const gap = attachmentsElement ? parseFloat(getComputedStyle(attachmentsElement).gap) || 0 : 0;
      const messageText = value !== undefined ? value : this.textareaRef.value;
      const textAreaContentHeight = Math.max(this.calculateTextHeight(messageText), MIN_TEXTAREA_HEIGHT);
      const totalHeight = attachmentsHeight + textAreaContentHeight + gap;
      const reachMaxHeight = totalHeight > MAX_INPUT_AREA_HEIGHT;
      this.inputAreaRef.style.overflowY = reachMaxHeight ? 'auto' : 'hidden';
      this.textareaRef.style.minHeight = `${textAreaContentHeight}px`;
      // --- Wait for the correct transition ---
      if (waitForInputArea) {
        // Used for expand/collapse: listen for height transition on input-area
        const computedStyle = window.getComputedStyle(this.inputAreaRef);
        const transitionDuration = parseFloat(computedStyle.transitionDuration) || 0;
        if (transitionDuration > 0) {
          const handler = (e) => {
            if (e.propertyName === 'height') {
              this.inputAreaRef?.removeEventListener('transitionend', handler);
              resolve();
            }
          };
          this.inputAreaRef.addEventListener('transitionend', handler);
        }
        else {
          resolve();
        }
      }
      else {
        // Used for textarea min-height (typing/paste)
        const computedStyle = window.getComputedStyle(this.textareaRef);
        const transitionDuration = parseFloat(computedStyle.transitionDuration) || 0;
        if (transitionDuration > 0) {
          const handler = (e) => {
            if (e.propertyName === 'min-height') {
              this.textareaRef?.removeEventListener('transitionend', handler);
              resolve();
            }
          };
          this.textareaRef.addEventListener('transitionend', handler);
        }
        else {
          resolve();
        }
      }
    });
    this.isFileWithError = (file) => !!(file.formatError || file.sizeError || file.validatorError);
    this.handleDeleteItem = (event) => {
      const { name, size } = event.detail;
      const updatedFilesList = this.attachments.filter(file => file.name + file.size !== name + size);
      this.successAttachmentsList = updatedFilesList.filter(file => !this.isFileWithError(file));
      this.errorAttachmentsList = updatedFilesList.filter(this.isFileWithError);
      if (this.inputRef)
        this.inputRef.value = '';
      this.wppChange.emit({
        value: this.successAttachmentsList,
        hasError: this.errorAttachmentsList.length > 0,
        errorFiles: this.errorAttachmentsList,
      });
      this.wppFileUploadItemDelete.emit(event.detail);
      this.attachments = updatedFilesList;
    };
    this.handleClickItem = (event) => this.wppFileUploadItemClick.emit(event.detail);
    this.handleChange = async () => {
      this.clearDialogState();
      const files = this.inputRef?.files;
      if (!files?.length)
        return;
      if (this.isMaximumFilesSet() && this.successAttachmentsList.length === this.mergedFileUploadConfig.maxFiles) {
        this.displayToast(this.mergedFileUploadConfig.locales.limitError, 'error');
        return;
      }
      const filesToLoad = this.mergedFileUploadConfig.multiple ? Array.from(files) : [files[0]];
      await this.handleFileLoad(filesToLoad);
      if (this.debouncedAdjustTextareaHeight) {
        requestAnimationFrame(() => this.debouncedAdjustTextareaHeight());
      }
      if (this.inputRef)
        this.inputRef.value = '';
    };
    this.isMaximumFilesSet = () => this.mergedFileUploadConfig.maxFiles > 0;
    this.validateFileSize = (file) => {
      if (file.size > convertMBToBytes(this.mergedFileUploadConfig.size ?? 0)) {
        file.sizeError = true;
      }
      else {
        file.sizeError = false;
      }
      return file;
    };
    this.isAcceptConfigFilled = () => !!this.mergedFileUploadConfig.acceptConfig && Object.keys(this.mergedFileUploadConfig.acceptConfig).length > 0;
    this.getAcceptExtensions = () => {
      if (this.isAcceptConfigFilled()) {
        return getExtensionsList(this.mergedFileUploadConfig.acceptConfig || {});
      }
      return this.mergedFileUploadConfig.accept || [];
    };
    this.validateFileType = (file) => {
      if (this.isAcceptConfigFilled()) {
        const allowedExtensions = file.type
          ? this.mergedFileUploadConfig.acceptConfig?.[file.type] || []
          : this.getAcceptExtensions();
        file.formatError = allowedExtensions.length > 0 ? !allowedExtensions.includes(getExtension(file.name)) : true;
        return file;
      }
      if (!this.mergedFileUploadConfig.accept?.length) {
        if (!file.type) {
          const typeFromExtension = EXTENSION_TO_TYPE[getExtension(file.name)];
          return modifyPropertiesOnFile(file, { type: typeFromExtension });
        }
        return file;
      }
      file.formatError = !this.mergedFileUploadConfig.accept.some(format => {
        const normalizedFormat = format.replace(/[,.*]/g, '');
        return normalizedFormat === 'mov'
          ? file.type?.includes('quicktime')
          : /txt|text|msword|document|doc?x/.test(normalizedFormat)
            ? /text|application/.test(file.type)
            : file.type.includes(normalizedFormat);
      });
      return file;
    };
    this.customValidation = (file) => {
      file.validatorError = this.mergedFileUploadConfig.validator?.(file) || undefined;
      return file;
    };
    this.displayErrorListByShowingOption = (newFilesWithErrors) => this.mergedFileUploadConfig.showOnlyNewErrors
      ? newFilesWithErrors
      : [...this.errorAttachmentsList, ...newFilesWithErrors];
    this.generateUniqueName = (fileName, fileList) => {
      const baseName = getBaseName(fileName);
      const extension = getExtension(fileName);
      let counter = 1;
      const isNameTaken = (file) => {
        const currentCounter = counter;
        return file.name === `${baseName}-${currentCounter}${extension}`;
      };
      while (fileList.some(file => isNameTaken(file))) {
        counter++;
      }
      return `${baseName}-${counter}${extension}`;
    };
    this.handleClick = () => {
      if (!this.disabled) {
        this.textareaRef?.focus();
      }
    };
    this.onKeyDown = (event) => {
      if (event.key === 'Enter') {
        // When "Shift" + "Enter" are pressed, keep default behaviour (new line)
        if (event.shiftKey)
          return;
        // Pressing "Enter" is equivalent to pressing "Send" icon
        event.preventDefault();
        this.handleSend();
      }
    };
    this.onMinimizedKeyDown = (e) => {
      if (this.disabled)
        return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.minimizedPressed = true;
        this.handleSizeToggle();
      }
    };
    this.onMinimizedKeyUp = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.minimizedPressed = false;
      }
    };
    this.onAttachKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.attachPressed = true;
        this.handleFileSelection();
        // Clear immediately to avoid sticky state when dialog steals focus
        this.attachPressed = false;
      }
    };
    this.onWindowFocus = () => {
      if (this.isFileDialogOpen) {
        this.clearDialogState();
      }
    };
    this.clearDialogState = () => {
      this.isFileDialogOpen = false;
      this.attachPressed = false;
    };
    this.hostCssClasses = () => ({
      'wpp-chat-input': true,
    });
    this.chatToastClasses = () => ({
      'chat-file-upload-toast': true,
    });
    this.chatInputContainerClasses = () => ({
      'chat-input-container': true,
      disabled: this.disabled,
    });
    this.inputAreaClasses = () => ({
      ...(this.size === 's' && { [this.isChatInputExpanded ? 'expanded' : 'minimized']: true }),
      'input-area': true,
    });
    this.attachmentsWrapperClasses = () => ({
      attachments: true,
    });
    this.textInputClasses = () => ({
      'text-input': true,
    });
    this.inputAreaWrapperClasses = () => ({
      'input-area-wrapper': true,
    });
    this.minimizedInput = () => ({
      'minimized-input': true,
    });
    this.inputValue = () => ({
      'input-value': true,
      disabled: this.disabled,
      'input-value-placeholder': !this.internalValue,
    });
    this.actionsBarClasses = () => ({
      'actions-bar': true,
    });
    this.leftActionsClasses = () => ({
      'left-actions': true,
      disabled: this.disabled,
    });
    this.selectClasses = () => ({
      select: true,
      'slot-hidden': !this.hasSelectSlot,
      disabled: this.disabled,
    });
    this.rightActionsClasses = () => ({
      'right-actions': true,
      disabled: this.disabled,
    });
    this.size = 'm';
    this.placeholder = 'Type your message...';
    this.enableAttach = false;
    this.enableMic = false;
    this.disabled = false;
    this.fileUploadConfig = {
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
        limitError: 'Files limit reached',
      },
    };
    this.charactersLimit = undefined;
    this.attachments = [];
    this.withSelect = false;
    this.textValue = '';
    this.debounceEnabled = true;
    this.debounceDelay = 300;
    this.zIndex = Z_INDEX.CHAT;
    this.textareaAriaLabel = undefined;
    this.textareaId = undefined;
    this.textareaName = undefined;
    this.htmlAttributes = undefined;
    this.ariaProps = undefined;
    this.locales = {};
    this.successAttachmentsList = [];
    this.errorAttachmentsList = [];
    this.toastMessage = '';
    this.toastType = 'information';
    this.showToast = false;
    this.areAttachmentsVisible = true;
    this.hasSelectSlot = false;
    this.isChatInputExpanded = false;
    this.attachPressed = false;
    this.minimizedPressed = false;
    this.isFileDialogOpen = false;
    this.internalValue = '';
  }
  onAttachmentsChange(newValue) {
    if (this.mergedFileUploadConfig.controlled) {
      this.reInitValue(newValue);
    }
    if (this.debouncedAdjustTextareaHeight) {
      requestAnimationFrame(() => this.debouncedAdjustTextareaHeight());
    }
  }
  onTextValueChange(value) {
    if (value !== this.internalValue) {
      this.internalValue = value;
      this.adjustTextareaHeight(false, value);
    }
  }
  onUpdateLocales(newLocales) {
    // Merge into private _locales, not the readonly @Prop
    this._locales = { ...this._locales, ...newLocales };
  }
  componentWillLoad() {
    if (!this.textValue?.trim() && this.textValue !== this.internalValue) {
      this.internalValue = this.textValue;
    }
    this.debouncedHandleInput = debounce((value) => {
      this.internalValue = value;
      this.wppMessageChanged.emit({ value });
    }, this.debounceDelay);
    const list = [...this.attachments, ...(this.successAttachmentsList || []), ...(this.errorAttachmentsList || [])];
    this.reInitValue(list);
    // Merge initial locales once at load
    this._locales = { ...this._locales, ...this.locales };
  }
  componentDidLoad() {
    requestAnimationFrame(() => {
      this.initializeObserver();
    });
    const debouncedResizeHandler = debounce(() => {
      if (this.textareaRef) {
        this.textareaRef.style.height = 'auto';
        this.forceRecalculateHeight();
        if (this.debouncedAdjustTextareaHeight) {
          this.debouncedAdjustTextareaHeight();
        }
      }
    }, 150);
    const resizeObserver = new ResizeObserver(() => {
      debouncedResizeHandler();
    });
    if (this.inputAreaRef) {
      resizeObserver.observe(this.inputAreaRef);
    }
    this.resizeObserver = resizeObserver;
    window.addEventListener('focus', this.onWindowFocus, true);
  }
  addExpandedListeners() {
    this.expandedListenersAbort?.abort();
    this.expandedListenersAbort = new AbortController();
    const signal = this.expandedListenersAbort.signal;
    document.addEventListener('mousedown', this.handleDocumentClick, { capture: true, signal });
    document.addEventListener('focusin', this.handleDocumentFocusIn, { capture: true, signal });
  }
  removeExpandedListeners() {
    this.expandedListenersAbort?.abort();
    this.expandedListenersAbort = undefined;
  }
  disconnectedCallback() {
    this.disconnectObserver();
    if (this.resizeObserver && this.inputAreaRef) {
      this.resizeObserver.unobserve(this.inputAreaRef);
    }
    this.removeExpandedListeners();
    window.removeEventListener('focus', this.onWindowFocus, true);
  }
  onSizeChange(newValue, oldValue) {
    if (newValue !== oldValue && this.size === 's') {
      this.handleSizeToggle();
    }
  }
  /**
   * Maximize the input area when the user clicks on it.
   */
  handleSizeToggle() {
    if (this.size === 's' && !this.disabled) {
      this.isChatInputExpanded = true;
      this.addExpandedListeners();
      requestAnimationFrame(() => {
        if (this.debouncedAdjustTextareaHeight) {
          this.debouncedAdjustTextareaHeight();
        }
        this.handleClick();
      });
    }
  }
  /**
   * Minimize the input area when it loses focus.
   */
  handleSimpleBlur() {
    if (this.size === 's' && this.isChatInputExpanded) {
      this.isChatInputExpanded = false;
      this.removeExpandedListeners();
      requestAnimationFrame(() => this.minimizedTriggerRef?.focus());
    }
  }
  forceRecalculateHeight() {
    if (this.textareaRef) {
      const currentValue = this.textareaRef.value;
      this.textareaRef.value = '';
      void this.textareaRef.offsetHeight;
      this.textareaRef.value = currentValue;
    }
  }
  calculateTextHeight(text) {
    if (!this.textareaRef || !text)
      return MIN_TEXTAREA_HEIGHT;
    const mirrorDiv = document.createElement('div');
    const computedStyle = window.getComputedStyle(this.textareaRef);
    mirrorDiv.style.position = 'absolute';
    mirrorDiv.style.visibility = 'hidden';
    mirrorDiv.style.whiteSpace = 'pre-wrap';
    mirrorDiv.style.wordWrap = 'break-word';
    mirrorDiv.style.padding = computedStyle.padding;
    mirrorDiv.style.width = this.textareaRef.offsetWidth + 'px';
    mirrorDiv.style.fontFamily = computedStyle.fontFamily;
    mirrorDiv.style.fontSize = computedStyle.fontSize;
    mirrorDiv.style.lineHeight = computedStyle.lineHeight;
    mirrorDiv.style.boxSizing = computedStyle.boxSizing;
    mirrorDiv.style.letterSpacing = computedStyle.letterSpacing;
    mirrorDiv.textContent = (text || ' ') + '\u200b';
    document.body.appendChild(mirrorDiv);
    const height = mirrorDiv.offsetHeight;
    document.body.removeChild(mirrorDiv);
    return height;
  }
  // Getter to merge defaults with provided config
  get mergedFileUploadConfig() {
    return {
      ...DEFAULT_FILE_UPLOAD_CONFIG,
      ...this.fileUploadConfig,
    };
  }
  // Precedence helpers: ariaProps > locales > internal defaults
  getPlaceholderText() {
    return this._locales.placeholder ?? this.placeholder;
  }
  getMinimizedAriaLabel() {
    return this.ariaProps?.minimizedTrigger?.label ?? (this.internalValue || this.getPlaceholderText());
  }
  getMinimizedDescriptionText() {
    return this._locales.minimizedDescription;
  }
  getTextareaLabel() {
    return (this.ariaProps?.textarea?.label ?? this.textareaAriaLabel ?? this._locales.messageInputLabel ?? 'Message input');
  }
  getActionsToolbarLabel() {
    return this.ariaProps?.actionsToolbar?.label ?? this._locales.actionsToolbarLabel;
  }
  getLeftActionsLabel() {
    return this.ariaProps?.leftActionsGroup?.label ?? this._locales.leftActionsGroupLabel;
  }
  getRightActionsLabel() {
    return this.ariaProps?.rightActionsGroup?.label ?? this._locales.rightActionsGroupLabel;
  }
  getSendButtonLabel() {
    return this.ariaProps?.sendButton?.label ?? this._locales.sendLabel;
  }
  getAttachButtonLabel() {
    return this.ariaProps?.attachButton?.label ?? this._locales.attachLabel;
  }
  checkAttachmentsVisibility() {
    const attachmentsElement = this.inputAreaRef?.querySelector('.attachments');
    if (!attachmentsElement || !this.inputAreaRef) {
      this.areAttachmentsVisible = false;
      return;
    }
    const { top: inputTop, bottom: inputBottom } = this.inputAreaRef.getBoundingClientRect();
    const { top: attachTop, bottom: attachBottom } = attachmentsElement.getBoundingClientRect();
    this.areAttachmentsVisible = attachTop >= inputTop && attachBottom <= inputBottom;
  }
  disconnectObserver() {
    if (this.inputAreaRef) {
      this.inputAreaRef.removeEventListener('scroll', this.handleScroll);
    }
  }
  initializeObserver() {
    if (!this.inputAreaRef)
      return;
    this.inputAreaRef.addEventListener('scroll', this.handleScroll);
    this.checkAttachmentsVisibility();
  }
  /**
   * Scrolls the attachments list to the specified file type.
   * @param fileType 'error' for error files, 'success' for success files (or '' for any file)
   */
  scrollToAttachment(type = '') {
    const attachmentsElement = this.inputAreaRef?.querySelector('.attachments');
    if (!attachmentsElement)
      return;
    let selector = '.wpp-file-upload-item';
    if (type === 'error')
      selector += '.error';
    if (type === 'success')
      selector += ':not(.error)';
    const attachment = attachmentsElement.querySelector(selector);
    if (attachment) {
      // Use block: 'nearest' to minimize page scroll issues
      attachment.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return;
    }
    // Fallback: scroll to top (visual top in column-reverse is scrollTop = 0)
    attachmentsElement.scrollTo({ top: 0, behavior: 'smooth' });
  }
  displayToast(message, type) {
    this.checkAttachmentsVisibility();
    if (this.areAttachmentsVisible || !this.attachments?.length) {
      return;
    }
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), TOAST_DURATION);
  }
  handleSend() {
    if (this.disabled ||
      this.isSendDisabled ||
      (!this.internalValue.trim() && !this.successAttachmentsList.length) ||
      this.errorAttachmentsList.length)
      return;
    this.wppSend.emit({
      message: this.internalValue.trim(),
      attachments: this.successAttachmentsList,
    });
    Object.assign(this, {
      internalValue: '',
      successAttachmentsList: [],
      errorAttachmentsList: [],
    });
    this.wppChange.emit({ value: [], hasError: false, errorFiles: [] });
    this.adjustTextareaHeight(true);
    if (this.size === 's') {
      this.isChatInputExpanded = false;
    }
  }
  handleFileSelection() {
    if (!this.inputRef || this.isFileDialogOpen)
      return;
    this.isFileDialogOpen = true;
    this.inputRef.click();
  }
  async handleFileLoad(filesList) {
    if (!filesList.length)
      return;
    const existingAttachments = [...this.successAttachmentsList, ...this.errorAttachmentsList];
    const filteredFiles = filesList
      .filter(Boolean)
      .map(file => existingAttachments.some(item => item.name === file.name)
      ? renameFile(file, this.generateUniqueName(file.name, existingAttachments))
      : file);
    const filteredFilesInitLength = filteredFiles.length;
    if (this.isMaximumFilesSet()) {
      const maxFiles = this.mergedFileUploadConfig.maxFiles;
      const remainingSlots = Math.max(0, maxFiles - existingAttachments.length);
      filteredFiles.length = Math.min(filteredFiles.length, remainingSlots);
      if (remainingSlots === 0)
        return;
      this.displayToast('Uploading...', 'information');
    }
    const validatedFiles = filteredFiles.map(file => {
      if ('url' in file)
        return file;
      this.validateFileSize(file);
      this.validateFileType(file);
      this.customValidation(file);
      return file;
    });
    const [batchSuccessFiles, batchErrorFiles] = [
      validatedFiles.filter(file => !this.isFileWithError(file)),
      validatedFiles.filter(this.isFileWithError),
    ];
    this.successAttachmentsList = [...this.successAttachmentsList, ...batchSuccessFiles];
    this.errorAttachmentsList = this.displayErrorListByShowingOption(batchErrorFiles);
    this.attachments = [...this.successAttachmentsList, ...this.errorAttachmentsList];
    this.wppChange.emit({
      value: this.successAttachmentsList,
      hasError: !!this.errorAttachmentsList.length,
      errorFiles: this.errorAttachmentsList,
    });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.checkAttachmentsVisibility();
        const label = batchErrorFiles.length > 0 ? 'Upload FAILED' : 'Uploaded Successfully';
        const fileCount = batchErrorFiles.length || batchSuccessFiles.length;
        const fileLabel = fileCount === 1 ? 'File' : 'Files';
        if (batchErrorFiles.length === 0 &&
          this.isMaximumFilesSet() &&
          this.mergedFileUploadConfig.maxFiles < filteredFilesInitLength) {
          this.displayToast(this.mergedFileUploadConfig.locales.limitError, 'error');
        }
        else if (fileCount > 0) {
          this.displayToast(`${fileCount} ${fileLabel} ${label}`, batchErrorFiles.length > 0 ? 'error' : 'success');
        }
        if (this.debouncedAdjustTextareaHeight) {
          this.debouncedAdjustTextareaHeight();
        }
      });
    });
  }
  handleToastClick(event) {
    event.stopPropagation();
    this.scrollToAttachment(this.toastType === 'error' ? 'error' : 'success');
  }
  get isSendDisabled() {
    const charExceeded = this.charactersLimit !== undefined && this.internalValue.length > this.charactersLimit;
    return (this.disabled ||
      (!this.internalValue.trim() && this.successAttachmentsList.length === 0) ||
      this.errorAttachmentsList.length > 0 ||
      charExceeded);
  }
  render() {
    const allFiles = [...this.successAttachmentsList, ...this.errorAttachmentsList];
    const charExceeded = this.charactersLimit && this.internalValue.length > this.charactersLimit;
    const isMaximizedS = this.isChatInputExpanded && this.size === 's';
    const maximizedSorSizeM = isMaximizedS || this.size === 'm';
    const isMinimizedS = this.size === 's' && !this.isChatInputExpanded;
    const placeholderText = this.getPlaceholderText();
    const ariaInvalid = this.ariaProps?.textarea?.invalid !== undefined
      ? this.ariaProps.textarea.invalid
      : charExceeded
        ? 'true'
        : undefined;
    return (h(Host, { class: this.hostCssClasses(), size: this.size, style: { zIndex: this.zIndex.toString() }, exportparts: "chat-input-container, toast, input-area, attachments, text-input, actions-bar, left-actions, right-actions, file-item", onClick: isMinimizedS ? this.handleSizeToggle : this.handleClick }, h("div", { class: this.chatInputContainerClasses(), onKeyDown: this.onExpandedKeyDown, part: "chat-input-container" }, this.showToast && (h("wpp-toast-v3-4-0", { message: this.toastMessage, type: this.toastType, duration: TOAST_DURATION, variant: "chat", part: "toast", class: this.chatToastClasses(), onClick: event => this.handleToastClick(event) })), h("div", { id: this.inputAreaId, class: this.inputAreaClasses(), ref: el => (this.inputAreaRef = el), part: "input-area" }, maximizedSorSizeM ? (h(Fragment, null, allFiles?.length > 0 && (h("div", { class: this.attachmentsWrapperClasses(), part: "attachments", role: "list", "aria-label": this._locales.attachmentsLabel }, allFiles.map((file, index) => (h("wpp-file-upload-item-v3-4-0", { key: index, file: file, format: this.mergedFileUploadConfig.format, maxLabelLength: this.mergedFileUploadConfig.maxLabelLength, currentIndex: index, onWppDelete: this.handleDeleteItem, onWppClick: this.handleClickItem, locales: {
        sizeError: this.mergedFileUploadConfig.locales.sizeError,
        formatError: this.mergedFileUploadConfig.locales.formatError,
      }, part: "file-item", class: this.isFileWithError(file) ? 'error' : '', onFileLoaded: this.handleFileLoaded, uploaded: !!file.uploaded, "aria-posinset": (index + 1).toString(), "aria-setsize": allFiles.length.toString() }))))), h("textarea", { id: (this.htmlAttributes?.textarea?.id ?? this.textareaId) || this.textareaAutoId, name: this.htmlAttributes?.textarea?.name ?? this.textareaName ?? 'message', class: this.textInputClasses(), placeholder: placeholderText, value: this.internalValue, ref: el => (this.textareaRef = el), onInput: this.handleInput, onPaste: this.handlePaste, disabled: this.disabled, onKeyDown: this.onKeyDown, part: "text-input", "aria-label": this.getTextareaLabel(), "aria-invalid": ariaInvalid, "aria-describedby": charExceeded ? this.charCounterId : undefined, autocomplete: this.htmlAttributes?.textarea?.autocomplete, maxLength: this.htmlAttributes?.textarea?.maxLength, "data-gramm": "false", "data-gramm_editor": "false" }))) : (h("div", { class: this.inputAreaWrapperClasses() }, h("div", { class: this.minimizedInput(), part: "minimized-input", ref: el => (this.minimizedTriggerRef = el), "data-pressed": this.minimizedPressed ? 'true' : null, role: "button", tabindex: this.disabled ? -1 : 0, "aria-expanded": this.isChatInputExpanded ? 'true' : 'false', "aria-controls": this.inputAreaId, "aria-label": this.getMinimizedAriaLabel(), "aria-describedby": this.minimizedDescId, onKeyDown: this.onMinimizedKeyDown, onKeyUp: this.onMinimizedKeyUp }, h("wpp-typography-v3-4-0", { class: this.inputValue(), type: "s-body" }, this.internalValue || placeholderText)), h("span", { id: this.minimizedDescId, class: "sr-only" }, this.getMinimizedDescriptionText()), h("wpp-action-button-v3-4-0", { "data-testid": "send-icon-only-button", variant: "secondary", onClick: e => {
        e.stopPropagation();
        this.handleSend();
      }, disabled: this.isSendDisabled, ariaProps: { label: this.getSendButtonLabel() } }, h("wpp-icon-send-v3-4-0", { slot: "icon-start" }))))), maximizedSorSizeM && (h("div", { class: this.actionsBarClasses(), part: "actions-bar", role: "toolbar", "aria-label": this.getActionsToolbarLabel() }, h("div", { class: this.leftActionsClasses(), part: "left-actions", role: "group", "aria-label": this.getLeftActionsLabel() }, this.enableAttach && (h(Fragment, null, h("wpp-action-button-v3-4-0", { "data-testid": "attach-icon-only-button", disabled: this.disabled || this.isFileDialogOpen, variant: "secondary", onClick: this.onAttachClick, onKeyDown: this.onAttachKeyDown, "data-pressed": this.attachPressed ? 'true' : null, ariaProps: { label: this.getAttachButtonLabel() } }, h("wpp-icon-attach-v3-4-0", { slot: "icon-start" })), h("input", { class: "file-loader", type: "file", ref: inputRef => (this.inputRef = inputRef), style: { display: 'none' }, multiple: this.htmlAttributes?.attachmentsInput?.multiple ?? this.mergedFileUploadConfig.multiple, onChange: this.handleChange, accept: this.htmlAttributes?.attachmentsInput?.accept ?? this.getAcceptExtensions().join(), title: "", id: this.htmlAttributes?.attachmentsInput?.id ?? 'wpp-ci-file', name: this.htmlAttributes?.attachmentsInput?.name ?? 'attachments', "aria-hidden": "true" }))), this.withSelect && (h(WrappedSlot, { wrapperClass: this.selectClasses(), name: "select", onSlotchange: this.updateSlotData })), this.enableMic && (h("wpp-action-button-v3-4-0", { "data-testid": "mic-icon-only-button", variant: "secondary", disabled: this.disabled, ariaProps: { label: this._locales.voiceLabel } }, h("wpp-icon-mic-on-v3-4-0", { slot: "icon-start" })))), h("div", { class: this.rightActionsClasses(), part: "right-actions", role: "group", "aria-label": this.getRightActionsLabel() }, charExceeded && (h("wpp-typography-v3-4-0", { class: "char-counter", type: "xs-midi", id: this.charCounterId, "aria-live": "polite" }, this.internalValue.length, "/", this.charactersLimit)), h("wpp-action-button-v3-4-0", { "data-testid": "send-icon-only-button", variant: "secondary", onClick: () => this.handleSend(), disabled: this.isSendDisabled, ariaProps: { label: this.getSendButtonLabel() } }, h("wpp-icon-send-v3-4-0", { slot: "icon-start" }))))))));
  }
  static get is() { return "wpp-chat-input"; }
  static get registryIs() { return "wpp-chat-input-v3-4-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-chat-input.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-chat-input.css"]
    };
  }
  static get properties() {
    return {
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "ChatInputSize",
          "resolved": "\"m\" | \"s\"",
          "references": {
            "ChatInputSize": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat/components/wpp-chat-input/types.ts::ChatInputSize"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Size of the component."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
      },
      "placeholder": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "deprecated",
              "text": ": Prefer locales.placeholder."
            }],
          "text": "Placeholder text for the input field."
        },
        "attribute": "placeholder",
        "reflect": false,
        "defaultValue": "'Type your message...'"
      },
      "enableAttach": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Whether the attach button is enabled."
        },
        "attribute": "enable-attach",
        "reflect": false,
        "defaultValue": "false"
      },
      "enableMic": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "internal",
              "text": "- This prop will be of use in the future, but for now, it's not used."
            }],
          "text": "Whether the mic button is enabled."
        },
        "attribute": "enable-mic",
        "reflect": false,
        "defaultValue": "false"
      },
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, the chat input is disabled."
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "fileUploadConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<FileUploadConfig>",
          "resolved": "undefined | ({ format?: FileUploadResultFormaType | undefined; maxLabelLength?: number | undefined; multiple?: boolean | undefined; maxFiles?: number | undefined; size?: number | undefined; accept?: string[] | undefined; acceptConfig?: AcceptConfig | undefined; validator?: ((file: FileItemType) => string | null) | undefined; showOnlyNewErrors?: boolean | undefined; controlled?: boolean | undefined; locales?: ChatInputFileUploadLocales | undefined; })",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "FileUploadConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat/components/wpp-chat-input/types.ts::FileUploadConfig"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Configuration object for file upload functionality."
        },
        "defaultValue": "{\n    /**\n     * Format of the file upload result.\n     */\n    format: 'base64',\n\n    /**\n     * Maximum label length (in characters) of single item\n     */\n    maxLabelLength: 30,\n\n    /**\n     * If `true`, allows multiple files to be uploaded at once.\n     */\n    multiple: true,\n\n    /**\n     * Maximum number of files allowed for upload.\n     * Set to `0` for no restriction.\n     */\n    maxFiles: 0,\n\n    /**\n     * Maximum allowed size of each file in MB.\n     */\n    size: 150,\n\n    /**\n     * Accept file format, you can pass any format you want download, by default is `.jpg, .jpeg, .png`\n     *\n     * @deprecated - this prop will be deleted in 4.0.0 version as it is not flexible enough to handle different\n     * cases with files validations, for example based on mimetype and extension at the same time.\n     * This property handle only a few extensions: ['.jpg', '.jpeg', '.png', '.txt', '.text', '.doc', '.docx', '.mov'],\n     * and list will NOT be extended.\n     *\n     * If you want to use this prop, use \"acceptConfig\" property instead.\n     * Note: \"acceptConfig\" property will have a higher priority in case if both \"acceptConfig\" and \"accept\" props will be provided\n     */\n    accept: ['.jpg', '.jpeg', '.png'],\n\n    /**\n     * Object defining accepted MIME types and their corresponding extensions.\n     * Example: `{ 'image/png': ['.png'], 'application/pdf': ['.pdf'] }`.\n     * Overrides `accept` if both are provided.\n     */\n    acceptConfig: {},\n\n    /**\n     * Defines custom validation function for uploaded files.\n     * Should return `null` if the file is valid, or a string error message otherwise.\n     */\n    validator: () => null,\n\n    /**\n     * If `true`, replaces existing error messages with new ones for failed uploads.\n     * If `false`, retains existing errors and appends new ones.\n     */\n    showOnlyNewErrors: false,\n\n    /**\n     * If `true`, the file upload works as controlled component.\n     */\n    controlled: false,\n\n    /**\n     * Indicates locales for file upload component\n     */\n    locales: {\n      sizeError: 'File exceeds size limit',\n      formatError: 'Wrong format',\n      limitError: 'Files limit reached',\n    },\n  }"
      },
      "charactersLimit": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Maximum number of allowed characters."
        },
        "attribute": "characters-limit",
        "reflect": false
      },
      "attachments": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "FileItemType[]",
          "resolved": "FileItemType[]",
          "references": {
            "FileItemType": {
              "location": "import",
              "path": "../../../wpp-file-upload/types",
              "id": "src/components/wpp-file-upload/types.ts::FileItemType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the files list"
        },
        "defaultValue": "[]"
      },
      "withSelect": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If set to true, displays `Select` in left actions. The Select must placed in the `.select` slot."
        },
        "attribute": "with-select",
        "reflect": true,
        "defaultValue": "false"
      },
      "textValue": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Text value used to set the input message content.\nWhen user input occurs, a `wppMessageChanged` event is emitted. The new value should be assigned to this property\nto maintain synchronization with the input field."
        },
        "attribute": "text-value",
        "reflect": false,
        "defaultValue": "''"
      },
      "debounceEnabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If set to `true`, enable debounce for onInput event."
        },
        "attribute": "debounce-enabled",
        "reflect": false,
        "defaultValue": "true"
      },
      "debounceDelay": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Debounce delay in milliseconds."
        },
        "attribute": "debounce-delay",
        "reflect": false,
        "defaultValue": "300"
      },
      "zIndex": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the z-index of the WppChatInput."
        },
        "attribute": "z-index",
        "reflect": false,
        "defaultValue": "Z_INDEX.CHAT"
      },
      "textareaAriaLabel": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [{
              "name": "deprecated",
              "text": ": Prefer ariaProps.textarea.label"
            }],
          "text": "Defines the aria-label of the text area."
        },
        "attribute": "textarea-aria-label",
        "reflect": false
      },
      "textareaId": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [{
              "name": "deprecated",
              "text": ": Prefer htmlAttributes.textarea.id"
            }],
          "text": "Defines the Id of the text area."
        },
        "attribute": "textarea-id",
        "reflect": false
      },
      "textareaName": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [{
              "name": "deprecated",
              "text": ": Prefer htmlAttributes.textarea.name"
            }],
          "text": "Defines the name of the text area."
        },
        "attribute": "textarea-name",
        "reflect": false
      },
      "htmlAttributes": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ChatInputAttributes",
          "resolved": "ChatInputAttributes | undefined",
          "references": {
            "ChatInputAttributes": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat/components/wpp-chat-input/types.ts::ChatInputAttributes"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Grouped element htmlAttributes (textarea + file input).\nNew API \u2014 replaces textareaId/textareaName."
        }
      },
      "ariaProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ChatInputAriaProps",
          "resolved": "undefined | { minimizedTrigger?: Pick<AriaProps, \"label\" | \"describedby\" | \"controls\" | \"expanded\"> | undefined; textarea?: (Pick<AriaProps, \"label\" | \"describedby\"> & { invalid?: \"true\" | \"false\" | undefined; }) | undefined; sendButton?: Pick<AriaProps, \"label\"> | undefined; attachButton?: Pick<AriaProps, \"label\" | \"pressed\"> | undefined; actionsToolbar?: { label?: string | undefined; } | undefined; leftActionsGroup?: { label?: string | undefined; } | undefined; rightActionsGroup?: { label?: string | undefined; } | undefined; }",
          "references": {
            "ChatInputAriaProps": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat/components/wpp-chat-input/types.ts::ChatInputAriaProps"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Typed ARIA overrides. Only supported htmlAttributes exposed."
        }
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<ChatInputLocaleInterface>",
          "resolved": "{ placeholder?: string | undefined; minimizedDescription?: string | undefined; actionsToolbarLabel?: string | undefined; leftActionsGroupLabel?: string | undefined; rightActionsGroupLabel?: string | undefined; sendLabel?: string | undefined; attachLabel?: string | undefined; voiceLabel?: string | undefined; attachmentsLabel?: string | undefined; messageInputLabel?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "ChatInputLocaleInterface": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat/components/wpp-chat-input/types.ts::ChatInputLocaleInterface"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Locales (visual strings). Will be merged into _locales."
        },
        "defaultValue": "{}"
      }
    };
  }
  static get states() {
    return {
      "successAttachmentsList": {},
      "errorAttachmentsList": {},
      "toastMessage": {},
      "toastType": {},
      "showToast": {},
      "areAttachmentsVisible": {},
      "hasSelectSlot": {},
      "isChatInputExpanded": {},
      "attachPressed": {},
      "minimizedPressed": {},
      "isFileDialogOpen": {},
      "internalValue": {}
    };
  }
  static get events() {
    return [{
        "method": "wppSend",
        "name": "wppSend",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the user clicks the \"Send\" button."
        },
        "complexType": {
          "original": "SendEventDetail",
          "resolved": "SendEventDetail",
          "references": {
            "SendEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat/components/wpp-chat-input/types.ts::SendEventDetail"
            }
          }
        }
      }, {
        "method": "wppMic",
        "name": "wppMic",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [{
              "name": "internal",
              "text": "- This prop will be of use in the future, but for now, it's not used."
            }],
          "text": "Emitted when the user clicks the \"Mic\" button."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "wppChange",
        "name": "wppChange",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the value of the input changes."
        },
        "complexType": {
          "original": "FileUploadEventDetail",
          "resolved": "FileUploadEventDetail",
          "references": {
            "FileUploadEventDetail": {
              "location": "import",
              "path": "../../../wpp-file-upload/types",
              "id": "src/components/wpp-file-upload/types.ts::FileUploadEventDetail"
            }
          }
        }
      }, {
        "method": "wppFileUploadItemDelete",
        "name": "wppFileUploadItemDelete",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [{
              "name": "internal",
              "text": undefined
            }],
          "text": "Emitted when the file-upload item was deleted."
        },
        "complexType": {
          "original": "FileUploadItemEventDetail",
          "resolved": "FileUploadItemEventDetail",
          "references": {
            "FileUploadItemEventDetail": {
              "location": "import",
              "path": "../../../wpp-file-upload/types",
              "id": "src/components/wpp-file-upload/types.ts::FileUploadItemEventDetail"
            }
          }
        }
      }, {
        "method": "wppFileUploadItemClick",
        "name": "wppFileUploadItemClick",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [{
              "name": "internal",
              "text": undefined
            }],
          "text": "Emitted when the file-upload item was clicked."
        },
        "complexType": {
          "original": "FileUploadItemEventDetail",
          "resolved": "FileUploadItemEventDetail",
          "references": {
            "FileUploadItemEventDetail": {
              "location": "import",
              "path": "../../../wpp-file-upload/types",
              "id": "src/components/wpp-file-upload/types.ts::FileUploadItemEventDetail"
            }
          }
        }
      }, {
        "method": "wppMessageChanged",
        "name": "wppMessageChanged",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the message in the input message changes."
        },
        "complexType": {
          "original": "MessageChangeEventDetail",
          "resolved": "{ value: string; }",
          "references": {
            "MessageChangeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat/components/wpp-chat-input/types.ts::MessageChangeEventDetail"
            }
          }
        }
      }];
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "attachments",
        "methodName": "onAttachmentsChange"
      }, {
        "propName": "textValue",
        "methodName": "onTextValueChange"
      }, {
        "propName": "locales",
        "methodName": "onUpdateLocales"
      }, {
        "propName": "size",
        "methodName": "onSizeChange"
      }];
  }
}
