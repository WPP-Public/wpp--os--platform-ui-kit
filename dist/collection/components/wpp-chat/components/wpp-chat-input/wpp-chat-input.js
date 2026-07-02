import { h, Host, Fragment } from '@stencil/core';
import { convertMBToBytes, getBaseName, getExtension, getExtensionsList, modifyPropertiesOnFile, renameFile, } from '../../../wpp-file-upload/utils';
import { EXTENSION_TO_TYPE } from '../../../wpp-file-upload/const';
import { WrappedSlot } from '../../../common/WrappedSlot/WrappedSlot';
import { debounce, getSlotEmptyStates, hasParentWithId, mergeLocales, transformToVersionedTag, } from '../../../../utils/utils';
import { debounceWithControl, TOAST_DURATION } from './utils';
import { DEFAULT_FILE_UPLOAD_CONFIG, MAX_INPUT_AREA_HEIGHT, MIN_TEXTAREA_HEIGHT, LOCALES_DEFAULTS, UPLOAD_ACTION_ID, UPLOAD_ICON, } from './consts';
import { Z_INDEX } from '../../../../common/consts';
import { themeSubscriptionController } from '../../../../utils/subscribe-to-theme';
// Model-selector dropdown defaults applied centrally to the slotted menu-context
// (Figma spec) so consuming apps don't repeat them. SELECT_DROPDOWN_CLASS is also
// targeted by a global rule that spaces the dropdown list items 4px apart.
const SELECT_DROPDOWN_WIDTH = '200px';
const SELECT_DROPDOWN_CLASS = 'wpp-chat-input-model-options';
/**
 * @slot alert - Optional alert (for example wpp-chat-alert) rendered at the top of the chat input frame. Dismissing it hides the alert without affecting the rest of the input.
 * @part alert - Wrapper around the alert slot.
 * @slot references - Optional references (for example wpp-chat-reference) stacked above the textarea inside the input area.
 * @part references - Wrapper around the references slot.
 */
export class WppChatInput {
  constructor() {
    this.scrollTimeout = null;
    this.inputAreaId = `wpp-ci-area`;
    this.textareaAutoId = `wpp-ci-ta`;
    this.minimizedDescId = `wpp-ci-min-desc`;
    this.recognition = null;
    this.themeSubscription = themeSubscriptionController(() => this.host);
    this.aiModelBtn = null;
    this.reInitValue = (list) => {
      this.successAttachmentsList = list.filter(file => !this.isFileWithError(file));
      this.errorAttachmentsList = list.filter(this.isFileWithError);
    };
    this.setupSpeechRecognition = () => {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognitionAPI)
        return;
      this.recognition = new SpeechRecognitionAPI();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = this._locales.audioLanguage;
    };
    this.startSpeechRecognition = () => {
      if (!this.recognition)
        return;
      const previousText = this.internalValue.trim();
      this.recognition.onresult = (event) => {
        let text = '';
        for (let i = 0; i < event.results.length; i++) {
          text += event.results[i][0].transcript;
        }
        const newOutput = previousText ? `${previousText} ${text}` : text;
        if (this.internalValue === newOutput)
          return;
        this.internalValue = newOutput;
        this.emitMessageChangedEvent(this.internalValue);
      };
      this.recognition.onerror = () => {
        this.isAudioRecording = false;
      };
      this.recognition.onend = () => {
        this.isAudioRecording = false;
      };
      this.recognition?.start();
    };
    this.stopSpeechRecognition = () => {
      if (!this.recognition)
        return;
      this.recognition.onresult = null;
      this.recognition.onend = null;
      this.recognition.onerror = null;
      this.recognition.stop();
    };
    this.checkInteractedItem = (event) => {
      const path = event.composedPath();
      if (this.isFocused && this.host && !path.includes(this.host)) {
        // For cases when the user click item from select.
        // The dropdown of the select is rendered outside of the component.
        if (!hasParentWithId(path[0], 'tippy-')) {
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
    this.actionsMenuDropdownConfig = {
      onShow: () => {
        this.actionsMenuOpen = true;
        this.wppActionsMenuToggle.emit({ open: true });
      },
      onHide: () => {
        this.actionsMenuOpen = false;
        this.wppActionsMenuToggle.emit({ open: false });
      },
    };
    this.handleActionsMenuItemClick = (action) => {
      if (action.disabled)
        return;
      if (action.id === UPLOAD_ACTION_ID && !this.disabled) {
        this.handleFileSelection();
      }
      this.wppActionsMenuItemClick.emit(action);
    };
    // Centralizes the chat-input model-selector wiring so consuming apps don't have
    // to repeat these overrides per example/framework:
    //  - SC 4.1.2 (nested-interactive): the decorative brand logo (wpp-avatar) sitting
    //    inside the interactive trigger button must not be a focusable widget, so it is
    //    demoted to role="presentation" (which also drops its tabindex).
    //  - The dropdown width is pinned to the Figma spec (200px) on the slotted
    //    menu-context, and tagged with a class. That class lets menu-context apply the
    //    dropdown's own a11y wiring (menuitem roles, non-interactive option avatars) and
    //    the global rule space the option rows 4px apart. The dropdown content is moved
    //    to document.body by tippy, so it cannot be reached from here — only the trigger
    //    (which stays in place) is configured in this method.
    this.configureSelectSlot = () => {
      const selectEl = this.host.querySelector('[slot="select"]');
      if (!selectEl)
        return;
      const triggerAvatars = selectEl.querySelectorAll('[slot="icon-start"], [slot="icon-end"]');
      triggerAvatars.forEach(el => {
        el.setAttribute('role', 'presentation');
        if (el.tabIndex >= 0)
          el.tabIndex = -1;
      });
      const menuContext = (selectEl.matches(transformToVersionedTag('wpp-menu-context'))
        ? selectEl
        : selectEl.querySelector(transformToVersionedTag('wpp-menu-context')));
      if (menuContext) {
        if (menuContext.listWidth === 'auto')
          menuContext.listWidth = SELECT_DROPDOWN_WIDTH;
        const externalClasses = (menuContext.externalClass ?? '').split(' ').filter(Boolean);
        if (!externalClasses.includes(SELECT_DROPDOWN_CLASS)) {
          menuContext.externalClass = [...externalClasses, SELECT_DROPDOWN_CLASS].join(' ');
        }
      }
    };
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        select: '[slot="select"]',
        alert: '[slot="alert"]',
        references: '[slot="references"]',
      });
      this.hasSelectSlot = !emptyStates.select;
      this.hasAlertSlot = !emptyStates.alert;
      this.hasReferencesSlot = !emptyStates.references;
      this.configureSelectSlot();
    };
    // A fresh alert appearing in the slot should always be shown, even if a
    // previous one was dismissed.
    this.handleAlertSlotChange = () => {
      this.updateSlotData();
      this.isAlertDismissed = false;
    };
    this.handleReferencesSlotChange = () => {
      this.updateSlotData();
      // References add height to the input area, so recompute whether it needs to
      // scroll once the slotted content has been laid out.
      requestAnimationFrame(() => this.adjustTextareaHeight(false));
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
      this.internalValue = inputValue;
      this.emitMessageChangedEvent(inputValue);
    };
    this.emitMessageChangedEvent = (inputValue) => {
      if (this.debounceEnabled && this.debouncedHandleInput) {
        this.debouncedHandleInput.call(inputValue);
      }
      else {
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
      const referencesElement = this.inputAreaRef.querySelector('.references');
      const referencesHeight = referencesElement && !referencesElement.hasAttribute('hidden') ? referencesElement.scrollHeight : 0;
      const referencesGap = referencesHeight ? parseFloat(getComputedStyle(this.inputAreaRef).rowGap) || 0 : 0;
      const messageText = value !== undefined ? value : this.textareaRef.value;
      const textAreaContentHeight = Math.max(this.calculateTextHeight(messageText), MIN_TEXTAREA_HEIGHT);
      const totalHeight = attachmentsHeight + referencesHeight + textAreaContentHeight + gap + referencesGap;
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
    this.getAcceptExtensions = () => getExtensionsList(this.mergedFileUploadConfig.acceptConfig || {});
    this.validateFileType = (file) => {
      if (!this.isAcceptConfigFilled()) {
        if (!file.type) {
          const typeFromExtension = EXTENSION_TO_TYPE[getExtension(file.name)];
          return modifyPropertiesOnFile(file, { type: typeFromExtension });
        }
        return file;
      }
      const allowedExtensions = file.type
        ? this.mergedFileUploadConfig.acceptConfig?.[file.type] || []
        : this.getAcceptExtensions();
      file.formatError = allowedExtensions.length > 0 ? !allowedExtensions.includes(getExtension(file.name)) : true;
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
    this.onWindowFocus = () => {
      if (this.isFileDialogOpen) {
        this.clearDialogState();
      }
    };
    this.clearDialogState = () => {
      this.isFileDialogOpen = false;
    };
    this.handleOnFocus = () => {
      if (!this.isFocused) {
        this.addExpandedListeners();
      }
      this.isFocused = true;
    };
    this.handleClickAudioRecording = (event) => {
      event.stopPropagation();
      event.preventDefault();
      if (!this.recognition)
        return;
      this.isAudioRecording = !this.isAudioRecording;
      if (this.isAudioRecording) {
        this.startSpeechRecognition();
      }
      else {
        this.stopSpeechRecognition();
      }
    };
    this.shouldDisplaySend = () => this.disabled
      ? false
      : !!this.internalValue.trim() ||
        this.isGenerating ||
        [...this.successAttachmentsList, ...this.errorAttachmentsList].length > 0;
    this.renderMicrophoneBtn = (recordButtonLabel) => (h("wpp-action-button-v4-2-0", { "data-testid": "wpp-micophone-btn", onClick: this.handleClickAudioRecording, variant: "secondary", ariaProps: { label: recordButtonLabel }, disabled: this.disabled }, this.isAudioRecording ? h("wpp-icon-stop-v4-2-0", { slot: "icon-start" }) : h("wpp-icon-mic-on-v4-2-0", { slot: "icon-start" })));
    this.renderActionsMenu = () => (h("wpp-menu-context-v4-2-0", { class: "actions-menu", part: "actions-menu", dropdownConfig: this.actionsMenuDropdownConfig }, h("wpp-action-button-v4-2-0", { slot: "trigger-element", class: "actions-menu-trigger", "data-testid": "actions-menu-trigger-button", variant: "secondary", disabled: this.disabled, ariaProps: {
        label: this.getActionsMenuButtonLabel(),
        expanded: this.ariaProps?.actionsMenuButton?.expanded ?? this.actionsMenuOpen,
        haspopup: 'menu',
      } }, h("wpp-icon-plus-v4-2-0", { slot: "icon-start" })), h("div", null, h("wpp-list-item-v4-2-0", { "data-testid": `actions-menu-item-${UPLOAD_ACTION_ID}`, disabled: this.disabled, onWppChangeListItem: () => this.handleActionsMenuItemClick({
        id: UPLOAD_ACTION_ID,
        icon: UPLOAD_ICON,
        label: this.getAttachButtonLabel(),
        disabled: this.disabled || this.isFileDialogOpen,
      }) }, h(transformToVersionedTag(UPLOAD_ICON), { slot: 'left' }), h("span", { slot: "label" }, this.getAttachButtonLabel())), this.actions.map(action => (h("wpp-list-item-v4-2-0", { key: action.id, "data-testid": `actions-menu-item-${action.id}`, disabled: action.disabled || this.disabled, onWppChangeListItem: () => this.handleActionsMenuItemClick(action) }, h(transformToVersionedTag(action.icon), { slot: 'left' }), h("span", { slot: "label" }, action.label)))))));
    this.hostCssClasses = () => ({
      'wpp-chat-input': true,
    });
    this.chatToastClasses = () => ({
      'chat-file-upload-toast': true,
    });
    this.chatInputContainerClasses = () => ({
      'chat-input-container': true,
      'is-focused': this.isFocused,
      'has-alert': this.hasAlertSlot && !this.isAlertDismissed,
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
      [`size-${this.size}`]: true,
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
    this.isGenerating = false;
    this.fileUploadConfig = {
      /**
       * Format of the file upload result.
       */
      format: 'base64',
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
       * Object defining accepted MIME types and their corresponding extensions.
       * Example: `{ 'image/png': ['.png'], 'application/pdf': ['.pdf'] }`.
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
    this.actions = [];
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
    this.hasAlertSlot = false;
    this.isAlertDismissed = false;
    this.hasReferencesSlot = false;
    this.isChatInputExpanded = false;
    this.minimizedPressed = false;
    this.isFileDialogOpen = false;
    this.internalValue = '';
    this.actionsMenuOpen = false;
    this.isFocused = false;
    this.isAudioRecording = false;
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
  componentWillLoad() {
    if (!this.textValue?.trim() && this.textValue !== this.internalValue) {
      this.internalValue = this.textValue;
    }
    this.aiModelBtn = this.host.querySelector('[slot="select"] > [slot="trigger-element"]');
    this.aiModelBtn?.addEventListener('focus', this.handleOnFocus);
    this.debouncedHandleInput = debounceWithControl((value) => {
      this.wppMessageChanged.emit({ value });
    }, this.debounceDelay);
    const list = [...this.attachments, ...(this.successAttachmentsList || []), ...(this.errorAttachmentsList || [])];
    this.reInitValue(list);
  }
  componentDidLoad() {
    this.setupSpeechRecognition();
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
    // Run once after first render so select-slot elements are already in the DOM
    requestAnimationFrame(() => this.configureSelectSlot());
  }
  addExpandedListeners() {
    this.expandedListenersAbort?.abort();
    this.expandedListenersAbort = new AbortController();
    const signal = this.expandedListenersAbort.signal;
    document.addEventListener('mousedown', this.checkInteractedItem, { capture: true, signal });
    document.addEventListener('focusin', this.checkInteractedItem, { capture: true, signal });
  }
  removeExpandedListeners() {
    this.expandedListenersAbort?.abort();
    this.expandedListenersAbort = undefined;
  }
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.disconnectObserver();
    this.themeSubscription.stop();
    this.stopSpeechRecognition();
    if (this.resizeObserver && this.inputAreaRef) {
      this.resizeObserver.unobserve(this.inputAreaRef);
    }
    this.removeExpandedListeners();
    window.removeEventListener('focus', this.onWindowFocus, true);
    this.aiModelBtn?.removeEventListener('focus', this.handleOnFocus);
  }
  get _locales() {
    return mergeLocales(LOCALES_DEFAULTS, this.locales);
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
    }
    this.removeExpandedListeners();
    this.isFocused = false;
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
  getStopButtonLabel() {
    return this.ariaProps?.stopButton?.label ?? this._locales.stopLabel;
  }
  getAttachButtonLabel() {
    return this.ariaProps?.attachButton?.label ?? this._locales.attachLabel;
  }
  getActionsMenuButtonLabel() {
    return this.ariaProps?.actionsMenuButton?.label ?? this._locales.actionsMenuLabel;
  }
  getAudioRecordButtonLabel() {
    return this.ariaProps?.audioRecordButton?.label ?? this._locales.audioRecordButtonLabel;
  }
  getAudioStopRecordButtonLabel() {
    return this.ariaProps?.audioStopRecordButton?.label ?? this._locales.audioStopRecordButtonLabel;
  }
  checkAttachmentsVisibility() {
    const attachmentsElement = this.inputAreaRef?.querySelector('.attachments');
    if (!attachmentsElement || !this.inputAreaRef) {
      this.areAttachmentsVisible = false;
      return;
    }
    // Attachments lay out horizontally, so they are fully visible only when the
    // row is not overflowing its horizontal scroll container.
    const { scrollWidth, clientWidth } = attachmentsElement;
    const horizontallyVisible = scrollWidth <= clientWidth + 1;
    // The input area is `column-reverse` with `overflow-y: hidden` and a fixed
    // max-height, so a tall textarea pushes the attachments row off the top
    // where it gets clipped out of view. Compare the row's box against the input
    // area's box to detect that vertical clipping, which a horizontal-only check
    // misses (e.g. long text + a single file that fits the row).
    const areaRect = this.inputAreaRef.getBoundingClientRect();
    const rowRect = attachmentsElement.getBoundingClientRect();
    const verticallyVisible = rowRect.top >= areaRect.top - 1 && rowRect.bottom <= areaRect.bottom + 1;
    this.areAttachmentsVisible = horizontallyVisible && verticallyVisible;
  }
  // The slotted alert lives in the light DOM, so its close event bubbles up to
  // the chat input. Hiding it here keeps the alert dismissal contained to the
  // alert area without disturbing the rest of the chat input. References share
  // the same close event, so we only react when the alert itself was dismissed.
  handleAlertClose(event) {
    const target = event.target;
    if (target?.getAttribute('slot') === 'alert') {
      this.isAlertDismissed = true;
    }
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
    // New files are appended to the end of each list, so the most recently added
    // file is the LAST element matching the selector. Target it so clicking the
    // toast reveals the file the user just added, not the oldest matching one.
    const matches = attachmentsElement.querySelectorAll(selector);
    const attachment = matches[matches.length - 1];
    if (attachment) {
      // Attachments scroll horizontally, so align along the inline axis while
      // using block: 'nearest' to avoid nudging the surrounding page vertically.
      attachment.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      return;
    }
    // Fallback: scroll back to the first attachment (start of the horizontal row).
    attachmentsElement.scrollTo({ left: 0, behavior: 'smooth' });
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
    if (this.debounceEnabled && this.textareaRef) {
      this.debouncedHandleInput.flush(this.textareaRef.value);
    }
    if (this.disabled ||
      this.isGenerating ||
      this.isSendDisabled ||
      (!this.internalValue.trim() && !this.successAttachmentsList.length) ||
      this.errorAttachmentsList.length)
      return;
    this.isAudioRecording = false;
    this.stopSpeechRecognition();
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
      // Collapse back to the minimized resting state. Use the blur routine so it
      // also clears `isFocused` (and tears down the expanded listeners); just
      // setting `isChatInputExpanded = false` would leave the active focus border
      // painted on the minimized input after sending.
      this.handleSimpleBlur();
    }
  }
  handleStop() {
    if (this.disabled)
      return;
    this.wppStop.emit();
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
    return (this.disabled ||
      (!this.internalValue.trim() && this.successAttachmentsList.length === 0) ||
      this.errorAttachmentsList.length > 0);
  }
  render() {
    const allFiles = [...this.successAttachmentsList, ...this.errorAttachmentsList];
    const isMaximizedS = this.isChatInputExpanded && this.size === 's';
    const maximizedSorSizeM = isMaximizedS || this.size === 'm';
    const isMinimizedS = this.size === 's' && !this.isChatInputExpanded;
    const placeholderText = this.getPlaceholderText();
    const actionButtonLabel = this.isGenerating ? this.getStopButtonLabel() : this.getSendButtonLabel();
    const recordButtonLabel = this.isAudioRecording
      ? this.getAudioStopRecordButtonLabel()
      : this.getAudioRecordButtonLabel();
    const actionButtonDisabled = this.isGenerating ? this.disabled : this.isSendDisabled;
    const ariaInvalid = this.ariaProps?.textarea?.invalid !== undefined ? this.ariaProps.textarea.invalid : undefined;
    return (h(Host, { class: this.hostCssClasses(), size: this.size, style: { zIndex: this.zIndex.toString() }, exportparts: "chat-input-container, alert, toast, input-area, attachments, references, text-input, actions-bar, left-actions, right-actions, file-item, actions-menu", onClick: isMinimizedS ? this.handleSizeToggle : this.handleClick, onFocus: this.handleOnFocus }, h("div", { class: this.chatInputContainerClasses(), onKeyDown: this.onExpandedKeyDown, part: "chat-input-container" }, h("div", { class: "alert", part: "alert", hidden: !this.hasAlertSlot || this.isAlertDismissed }, h("slot", { name: "alert", onSlotchange: this.handleAlertSlotChange })), this.showToast && (h("wpp-toast-v4-2-0", { message: this.toastMessage, type: this.toastType, duration: TOAST_DURATION, variant: "chat", part: "toast", class: this.chatToastClasses(), onClick: event => this.handleToastClick(event) })), h("div", { id: this.inputAreaId, class: this.inputAreaClasses(), ref: el => (this.inputAreaRef = el), part: "input-area" }, maximizedSorSizeM ? (h(Fragment, null, allFiles?.length > 0 && (h("div", { class: this.attachmentsWrapperClasses(), part: "attachments", role: "list", "aria-label": this._locales.attachmentsLabel }, allFiles.map((file, index) => (h("wpp-file-upload-item-v4-2-0", { key: index, file: file, variant: "chat", format: this.mergedFileUploadConfig.format, currentIndex: index, onWppDelete: this.handleDeleteItem, onWppClick: this.handleClickItem, locales: {
        sizeError: this.mergedFileUploadConfig.locales.sizeError,
        formatError: this.mergedFileUploadConfig.locales.formatError,
      }, part: "file-item", class: this.isFileWithError(file) ? 'error' : '', onFileLoaded: this.handleFileLoaded, uploaded: !!file.uploaded, role: "listitem", "aria-posinset": (index + 1).toString(), "aria-setsize": allFiles.length.toString() }))))), h("div", { class: "references", part: "references", hidden: !this.hasReferencesSlot }, h("slot", { name: "references", onSlotchange: this.handleReferencesSlotChange })), h("textarea", { id: (this.htmlAttributes?.textarea?.id ?? this.textareaId) || this.textareaAutoId, name: this.htmlAttributes?.textarea?.name ?? this.textareaName ?? 'message', class: this.textInputClasses(), placeholder: placeholderText, value: this.internalValue, ref: el => (this.textareaRef = el), onInput: this.handleInput, onPaste: this.handlePaste, disabled: this.disabled, onKeyDown: this.onKeyDown, part: "text-input", "aria-label": this.getTextareaLabel(), "aria-invalid": ariaInvalid, autocomplete: this.htmlAttributes?.textarea?.autocomplete, maxLength: this.htmlAttributes?.textarea?.maxLength, "data-gramm": "false", "data-gramm_editor": "false" }))) : (h("div", { class: this.inputAreaWrapperClasses() }, this.renderActionsMenu(), h("div", { class: this.minimizedInput(), part: "minimized-input", "data-pressed": this.minimizedPressed ? 'true' : null, role: "button", tabindex: this.disabled ? -1 : 0, "aria-expanded": this.isChatInputExpanded ? 'true' : 'false', "aria-controls": this.inputAreaId, "aria-label": this.getMinimizedAriaLabel(), "aria-describedby": this.minimizedDescId, onKeyDown: this.onMinimizedKeyDown, onKeyUp: this.onMinimizedKeyUp }, h("wpp-typography-v4-2-0", { class: this.inputValue(), type: "s-body" }, this.internalValue || placeholderText)), h("span", { id: this.minimizedDescId, class: "sr-only" }, this.getMinimizedDescriptionText()), h("div", { class: this.rightActionsClasses() }, this.renderMicrophoneBtn(recordButtonLabel), this.shouldDisplaySend() && (h("wpp-button-v4-2-0", { class: "play-btn", "data-testid": "send-icon-only-button", size: "s", variant: this.isGenerating ? 'secondary' : 'primary', onClick: e => {
        e.stopPropagation();
        this.isGenerating ? this.handleStop() : this.handleSend();
      }, disabled: actionButtonDisabled, ariaProps: { label: actionButtonLabel } }, this.isGenerating ? (h("wpp-icon-stop-v4-2-0", { slot: "icon-start" })) : (h("wpp-icon-arrow-v4-2-0", { direction: "up", slot: "icon-start" })))))))), maximizedSorSizeM && (h("div", { class: this.actionsBarClasses(), part: "actions-bar", role: "toolbar", "aria-label": this.getActionsToolbarLabel() }, h("div", { class: this.leftActionsClasses(), part: "left-actions", role: "group", "aria-label": this.getLeftActionsLabel() }, this.renderActionsMenu(), this.enableMic && (h("wpp-action-button-v4-2-0", { "data-testid": "mic-icon-only-button", variant: "secondary", disabled: this.disabled, ariaProps: { label: this._locales.voiceLabel } }, h("wpp-icon-mic-on-v4-2-0", { slot: "icon-start" })))), h("div", { class: this.rightActionsClasses(), part: "right-actions", role: "group", "aria-label": this.getRightActionsLabel() }, this.withSelect && (h(WrappedSlot, { wrapperClass: this.selectClasses(), name: "select", onSlotchange: this.updateSlotData })), this.renderMicrophoneBtn(recordButtonLabel), this.shouldDisplaySend() && (h("wpp-button-v4-2-0", { class: "play-btn", "data-testid": "send-icon-only-button", size: "s", disabled: actionButtonDisabled, variant: this.isGenerating ? 'secondary' : 'primary', onClick: () => (this.isGenerating ? this.handleStop() : this.handleSend()), ariaProps: { label: actionButtonLabel } }, this.isGenerating ? (h("wpp-icon-stop-v4-2-0", { slot: "icon-start" })) : (h("wpp-icon-arrow-v4-2-0", { direction: "up", slot: "icon-start" }))))))), h("input", { class: "file-loader", type: "file", ref: inputRef => (this.inputRef = inputRef), style: { display: 'none' }, multiple: this.htmlAttributes?.attachmentsInput?.multiple ?? this.mergedFileUploadConfig.multiple, onChange: this.handleChange, accept: this.htmlAttributes?.attachmentsInput?.accept ?? this.getAcceptExtensions().join(), title: "", id: this.htmlAttributes?.attachmentsInput?.id ?? 'wpp-ci-file', name: this.htmlAttributes?.attachmentsInput?.name ?? 'attachments', "aria-hidden": "true" }))));
  }
  static get is() { return "wpp-chat-input"; }
  static get registryIs() { return "wpp-chat-input-v4-2-0"; }
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
              "text": ": Prefer locales.placeholder. This property will be removed in version 5.0.0."
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
          "tags": [{
              "name": "deprecated",
              "text": "- the `upload` action will always be available in the actions menu. This property will be removed in version 5.0.0."
            }],
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
      "isGenerating": {
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
          "text": "If `true`, displays a stop action for an in-progress AI response."
        },
        "attribute": "is-generating",
        "reflect": false,
        "defaultValue": "false"
      },
      "fileUploadConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<FileUploadConfig>",
          "resolved": "undefined | ({ format?: FileUploadResultFormaType | undefined; multiple?: boolean | undefined; maxFiles?: number | undefined; size?: number | undefined; acceptConfig?: AcceptConfig | undefined; validator?: ((file: FileItemType) => string | null) | undefined; showOnlyNewErrors?: boolean | undefined; controlled?: boolean | undefined; locales?: ChatInputFileUploadLocales | undefined; })",
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
          "tags": [{
              "name": "deprecated",
              "text": "This top-level prop will be removed in components-library v5.0.0.\nThe same options will be moved into a richer attachments configuration owned\nby the upload action entry (so consumers can scope `accept`, `size`,\n`maxFiles`, `validator`, etc. per-action rather than globally on the\nchat-input). For now keep using this prop; a migration codemod will be\nprovided alongside the v5.0.0 release."
            }],
          "text": "Configuration object for file upload functionality."
        },
        "defaultValue": "{\n    /**\n     * Format of the file upload result.\n     */\n    format: 'base64',\n\n    /**\n     * If `true`, allows multiple files to be uploaded at once.\n     */\n    multiple: true,\n\n    /**\n     * Maximum number of files allowed for upload.\n     * Set to `0` for no restriction.\n     */\n    maxFiles: 0,\n\n    /**\n     * Maximum allowed size of each file in MB.\n     */\n    size: 150,\n\n    /**\n     * Object defining accepted MIME types and their corresponding extensions.\n     * Example: `{ 'image/png': ['.png'], 'application/pdf': ['.pdf'] }`.\n     */\n    acceptConfig: {},\n\n    /**\n     * Defines custom validation function for uploaded files.\n     * Should return `null` if the file is valid, or a string error message otherwise.\n     */\n    validator: () => null,\n\n    /**\n     * If `true`, replaces existing error messages with new ones for failed uploads.\n     * If `false`, retains existing errors and appends new ones.\n     */\n    showOnlyNewErrors: false,\n\n    /**\n     * If `true`, the file upload works as controlled component.\n     */\n    controlled: false,\n\n    /**\n     * Indicates locales for file upload component\n     */\n    locales: {\n      sizeError: 'File exceeds size limit',\n      formatError: 'Wrong format',\n      limitError: 'Files limit reached',\n    },\n  }"
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
          "tags": [{
              "name": "deprecated",
              "text": "- This property is no longer valid. This property will be removed in version 5.0.0."
            }],
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
      "actions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ChatInputAction[]",
          "resolved": "ChatInputAction[]",
          "references": {
            "ChatInputAction": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat/components/wpp-chat-input/types.ts::ChatInputAction"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the entries shown in the consolidated actions menu (the\n`wpp-icon-plus` dropdown rendered at the start of the left toolbar).\nBy default, the menu always renders the `upload` action.\nUse this to consolidate auxiliary actions (translate,\npinboard, upload, etc.) behind a single \"plus\" affordance."
        },
        "defaultValue": "[]"
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
              "text": ": Prefer ariaProps.textarea.label\nThis property will be removed in version 5.0.0."
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
              "text": ": Prefer htmlAttributes.textarea.id\nThis property will be removed in version 5.0.0."
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
              "text": ": Prefer htmlAttributes.textarea.name\nThis property will be removed in version 5.0.0."
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
          "resolved": "undefined | { minimizedTrigger?: Pick<AriaProps, \"label\" | \"describedby\" | \"controls\" | \"expanded\"> | undefined; textarea?: (Pick<AriaProps, \"label\" | \"describedby\"> & { invalid?: \"true\" | \"false\" | undefined; }) | undefined; sendButton?: Pick<AriaProps, \"label\"> | undefined; stopButton?: Pick<AriaProps, \"label\"> | undefined; attachButton?: Pick<AriaProps, \"label\" | \"pressed\"> | undefined; actionsMenuButton?: Pick<AriaProps, \"label\" | \"expanded\" | \"haspopup\"> | undefined; audioRecordButton?: Pick<AriaProps, \"label\"> | undefined; audioStopRecordButton?: Pick<AriaProps, \"label\"> | undefined; actionsToolbar?: { label?: string | undefined; } | undefined; leftActionsGroup?: { label?: string | undefined; } | undefined; rightActionsGroup?: { label?: string | undefined; } | undefined; }",
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
          "resolved": "{ placeholder?: string | undefined; minimizedDescription?: string | undefined; actionsToolbarLabel?: string | undefined; leftActionsGroupLabel?: string | undefined; rightActionsGroupLabel?: string | undefined; sendLabel?: string | undefined; stopLabel?: string | undefined; attachLabel?: string | undefined; voiceLabel?: string | undefined; attachmentsLabel?: string | undefined; messageInputLabel?: string | undefined; actionsMenuLabel?: string | undefined; audioRecordButtonLabel?: string | undefined; audioStopRecordButtonLabel?: string | undefined; audioLanguage?: string | undefined; }",
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
      "hasAlertSlot": {},
      "isAlertDismissed": {},
      "hasReferencesSlot": {},
      "isChatInputExpanded": {},
      "minimizedPressed": {},
      "isFileDialogOpen": {},
      "internalValue": {},
      "actionsMenuOpen": {},
      "isFocused": {},
      "isAudioRecording": {}
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
        "method": "wppStop",
        "name": "wppStop",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the user clicks the \"Stop\" button while an AI response is generating."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
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
      }, {
        "method": "wppActionsMenuToggle",
        "name": "wppActionsMenuToggle",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the internal actions menu (triggered by the `wpp-icon-plus`\nbutton) opens or closes. Only fires when `actions` is non-empty."
        },
        "complexType": {
          "original": "ActionsMenuToggleEventDetail",
          "resolved": "{ open: boolean; }",
          "references": {
            "ActionsMenuToggleEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat/components/wpp-chat-input/types.ts::ActionsMenuToggleEventDetail"
            }
          }
        }
      }, {
        "method": "wppActionsMenuItemClick",
        "name": "wppActionsMenuItemClick",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the user clicks an entry in the consolidated actions menu.\nThe detail payload is the `ChatInputAction` object that was clicked.\nFires for every entry, including the reserved `'upload'` entry (which is\nadditionally wired to open the file picker automatically)."
        },
        "complexType": {
          "original": "ChatInputActionItemClickEventDetail",
          "resolved": "ChatInputAction",
          "references": {
            "ChatInputActionItemClickEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat/components/wpp-chat-input/types.ts::ChatInputActionItemClickEventDetail"
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
        "propName": "size",
        "methodName": "onSizeChange"
      }];
  }
  static get listeners() {
    return [{
        "name": "wppClose",
        "method": "handleAlertClose",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
