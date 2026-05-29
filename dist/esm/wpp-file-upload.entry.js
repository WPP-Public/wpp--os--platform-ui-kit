import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { F as FOCUS_TYPE } from './common-69c8ea89.js';
import { L as LOCALES_DEFAULTS, c as convertMBToBytes, g as getExtension, m as modifyPropertiesOnFile, a as getBaseName, r as renameFile, b as getExtensionsList, E as EXTENSION_TO_TYPE } from './const-04a4839f.js';
import { S as ScrollState } from './types-6eb465ab.js';
import { t as themeSubscriptionController } from './subscribe-to-theme-2f801cf6.js';

const wppFileUploadCss = ":host{--fu-width:var(--wpp-file-upload-width, 100%);--fu-bg-color:var(--wpp-file-upload-bg-color, var(--wpp-grey-color-000));--fu-bg-color-hover:var(--wpp-file-upload-bg-color-hover, var(--wpp-grey-color-200));--fu-bg-color-disabled:var(--wpp-file-upload-bg-color-disabled, var(--wpp-grey-color-200));--fu-border-color:var(--wpp-file-upload-border-color, var(--wpp-grey-color-500));--fu-border-color-hover:var(--wpp-file-upload-border-color-hover, var(--wpp-grey-color-600));--fu-border-style:var(--wpp-file-upload-border-style, dashed);--fu-border-error-style:var(--wpp-file-upload-border-error-style, solid);--fu-border-error-color:var(--wpp-file-upload-border-error-color, var(--wpp-danger-color-500));--fu-border-width:var(--wpp-file-upload-border-width, 1px);--fu-border-radius:var(--wpp-file-upload-border-radius, var(--wpp-border-radius-m));--fu-first-border-color-focus:var(--wpp-file-upload-first-border-color-focus, var(--wpp-grey-color-000));--fu-second-border-color-focus:var(--wpp-file-upload-second-border-color-focus, var(--wpp-brand-color));--fu-text-info-color:var(--wpp-file-upload-text-info-color, var(--wpp-text-color-info));--fu-text-info-margin:var(--wpp-file-upload-text-info-margin, 4px 20px 0 20px);--fu-text-color:var(--wpp-file-upload-text-color, var(--wpp-grey-color-900));--fu-text-color-disabled:var(--wpp-file-upload-text-color-disabled, var(--wpp-text-color-disabled));--fu-label-color-hover:var(--wpp-file-upload-label-color-hover, var(--wpp-primary-color-400));--fu-label-color-active:var(--wpp-file-upload-label-color-active, var(--wpp-primary-color-600));--fu-icon-margin:var(--wpp-file-upload-icon-margin, 0 0 12px 0);--fu-icon-color-disabled:var(--wpp-file-upload-icon-color-disabled, var(--wpp-grey-color-400));--fu-icon-bg-color-disabled:var(--wpp-file-upload-icon-bg-color-disabled, var(--wpp-grey-color-300));--fu-icon-bg-color-hover:var(--wpp-file-upload-icon-bg-color-hover, var(--wpp-grey-color-300));--fu-item-max-width:var(--wpp-file-upload-item-max-width, 100%);--fu-item-gradient:var(\n    --wpp-file-upload-item-gradient,\n    linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.75) 100%)\n  );--fu-item-gradient-height:var(--wpp-file-upload-item-gradient-height, 32px);--fu-content-margin:var(--wpp-file-upload-content-margin, 0px 20px 0 20px);--fu-upload-wrapper-padding:var(--wpp-file-upload-wrapper-padding, 28px 0 28px 0);outline:none}:host([disabled]:not([disabled=false])){cursor:not-allowed}:host .file-upload-label{margin-bottom:8px}.upload-wrapper{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;width:var(--fu-width);border:var(--fu-border-width) var(--fu-border-style) var(--fu-border-color);border-radius:var(--fu-border-radius);background-color:var(--fu-bg-color);-webkit-transition:0.2s ease-in-out;transition:0.2s ease-in-out;padding:var(--fu-upload-wrapper-padding)}.upload-wrapper.tab-focus.tab-focus{border-radius:var(--fu-border-radius);outline:none;-webkit-box-shadow:0 0 0 1px var(--fu-first-border-color-focus), 0 0 0 3px var(--fu-second-border-color-focus);box-shadow:0 0 0 1px var(--fu-first-border-color-focus), 0 0 0 3px var(--fu-second-border-color-focus)}.upload-wrapper .icon-file{margin:var(--fu-icon-margin)}.upload-wrapper .icon-file::part(content){-webkit-transition:0.2s ease-in-out;transition:0.2s ease-in-out}.upload-wrapper:hover,.upload-wrapper.tab-focus{background-color:var(--fu-bg-color-hover);border-color:var(--fu-border-color-hover)}.upload-wrapper:hover .icon-file::part(content),.upload-wrapper.tab-focus .icon-file::part(content){background-color:var(--fu-icon-bg-color-hover)}.upload-wrapper.message{margin-bottom:8px}.upload-wrapper.error{border:var(--fu-border-width) var(--fu-border-error-style) var(--fu-border-error-color)}.upload-wrapper.error.tab-focus.tab-focus{border-radius:var(--fu-border-radius);outline:none;-webkit-box-shadow:0 0 0 1px var(--fu-first-border-color-focus), 0 0 0 3px var(--fu-second-border-color-focus);box-shadow:0 0 0 1px var(--fu-first-border-color-focus), 0 0 0 3px var(--fu-second-border-color-focus)}.upload-wrapper.disabled{pointer-events:none;background-color:var(--fu-bg-color-disabled);border:none}.upload-wrapper.disabled .icon-file{color:var(--fu-icon-color-disabled)}.upload-wrapper.disabled .icon-file::part(content){background-color:var(--fu-icon-bg-color-disabled)}.upload-wrapper.disabled .label{color:var(--fu-text-color-disabled);text-decoration:none}.upload-wrapper.disabled .text{color:var(--fu-text-color-disabled)}.upload-wrapper.disabled .text-info{color:var(--fu-text-color-disabled)}.upload-wrapper.file-drag{background-color:var(--fu-bg-color-hover)}.upload-wrapper.file-drag:not(.error){border-color:var(--fu-border-color-hover)}.wpp-inline-message{margin-top:8px;display:block}.label{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);color:var(--wpp-brand-color);text-decoration:underline;margin-right:4px}.label:hover{color:var(--fu-label-color-hover)}.label:active{color:var(--fu-label-color-active)}.text{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);color:var(--fu-text-color);white-space:normal}.content{display:-ms-flexbox;display:flex}.content>p{margin:var(--fu-content-margin);white-space:normal;text-align:center}.file-loader{width:100%;height:100%;position:absolute;cursor:pointer;opacity:0}.file-list{scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent;width:var(--fu-item-max-width);max-height:400px;overflow-x:hidden;overflow-y:auto;margin:8px 0 0 0;padding:0;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;gap:8px}.file-list::-webkit-scrollbar{width:4px;height:4px}.file-list::-webkit-scrollbar-thumb{border:2px solid transparent;border-radius:4px;-webkit-box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400);box-shadow:inset 0 0 0 2px var(--wpp-grey-color-400)}.file-list-wrapper{position:relative}.file-list-wrapper::before{content:\"\";position:absolute;left:0;right:0;height:var(--fu-item-gradient-height);top:0;z-index:1;pointer-events:none;-webkit-transition:0.3s ease-in-out;transition:0.3s ease-in-out;background:var(--fu-item-gradient);opacity:0;-webkit-transform:rotate(-180deg);transform:rotate(-180deg)}.file-list-wrapper::after{content:\"\";position:absolute;left:0;right:0;height:var(--fu-item-gradient-height);bottom:0;z-index:1;pointer-events:none;-webkit-transition:0.3s ease-in-out;transition:0.3s ease-in-out;background:var(--fu-item-gradient);opacity:0}.file-list-wrapper.scroll::before{opacity:1}.file-list-wrapper.scroll::after{opacity:1}.text-info{font-size:var(--wpp-typography-xs-body-font-size, 12px);line-height:var(--wpp-typography-xs-body-line-height, 20px);font-weight:var(--wpp-typography-xs-body-font-weight, 400);color:var(--wpp-typography-xs-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-xs-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-xs-body-letter-spacing, 0);text-align:center;color:var(--fu-text-info-color);margin:var(--fu-text-info-margin)}::slotted([slot=label]){font-size:var(--wpp-typography-m-strong-font-size, 16px);line-height:var(--wpp-typography-m-strong-line-height, 24px);font-weight:var(--wpp-typography-m-strong-font-weight, 700);color:var(--wpp-typography-m-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-m-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-m-strong-letter-spacing, 0)}::slotted([slot=description]){font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0)}@-moz-document url-prefix(){.file-list{padding-right:10px}}:host([data-wpp-theme=dark]) .upload-wrapper{background-color:var(--wpp-grey-color-100)}";

const getInitFocusInfo = () => ({
  wrapper: FOCUS_TYPE.NONE,
  item: FOCUS_TYPE.NONE,
});
const WppFileUpload = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppChange = createEvent(this, "wppChange", 1);
    this.wppFocus = createEvent(this, "wppFocus", 1);
    this.wppBlur = createEvent(this, "wppBlur", 1);
    this.wppFileUploadItemDelete = createEvent(this, "wppFileUploadItemDelete", 1);
    this.wppFileUploadItemClick = createEvent(this, "wppFileUploadItemClick", 1);
    this.wppError = createEvent(this, "wppError", 1);
    this._locales = LOCALES_DEFAULTS;
    this.inputId = this.name || `wpp-file-upload-${Math.random().toString(36).substr(2, 9)}`;
    this.labelId = `${this.inputId}-label`;
    this.lastKeyWasTab = false; // Track keyboard modality and wrapper focus state
    this.themeSubscription = themeSubscriptionController(() => this.host);
    this.clearInputValue = () => {
      if (this.inputRef?.value) {
        this.inputRef.value = '';
      }
    };
    this.reInitValue = (list) => {
      this.successList = list.filter(file => !this.isFileWithError(file));
      this.errorList = list.filter(this.isFileWithError);
      this.isMaximumFilesReached();
    };
    this.onGlobalKeyDown = (e) => {
      this.lastKeyWasTab = e.key === 'Tab';
    };
    this.onPointerDown = () => {
      // Any pointer interaction cancels keyboard modality
      this.lastKeyWasTab = false;
    };
    this.onInputFocus = () => {
      if (this.disabled)
        return;
      // Prefer :focus-visible if available; fall back to lastKeyWasTab
      const focusVisible = typeof this.inputRef?.matches === 'function' && this.inputRef.matches(':focus-visible');
      this.hasTabFocus = !!focusVisible || this.lastKeyWasTab;
    };
    this.onInputBlur = () => {
      this.hasTabFocus = false;
    };
    this.onFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.onBlur = (event) => {
      this.focusType = this.getUpdatedFocusInfo('wrapper', FOCUS_TYPE.NONE);
      this.focusType = this.getUpdatedFocusInfo('item', FOCUS_TYPE.NONE);
      this.wppBlur.emit(event);
    };
    this.onMouseDown = () => {
      this.focusType = this.getUpdatedFocusInfo('wrapper', FOCUS_TYPE.MOUSE);
      this.focusType = this.getUpdatedFocusInfo('item', FOCUS_TYPE.MOUSE);
    };
    this.onKeyUp = (event, type) => {
      if (this.disabled)
        return;
      if (event.key === 'Tab') {
        this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.TAB);
      }
    };
    this.getUpdatedFocusInfo = (type, updateValue) => ({
      ...this.focusType,
      [type]: updateValue,
    });
    this.handleDeleteItem = (event) => {
      const updatedFilesList = [...this.successList, ...this.errorList].filter(({ name, size }) => name + size !== event.detail.name + event.detail.size);
      const successList = updatedFilesList.filter(file => !this.isFileWithError(file));
      const errorFileList = updatedFilesList.filter(this.isFileWithError);
      this.clearInputValue();
      this.value = updatedFilesList;
      this.errorList = errorFileList;
      this.successList = successList;
      this.wppChange.emit({
        value: successList,
        hasError: !!errorFileList?.length || this.isLimitReached,
        errorFiles: errorFileList,
        name: this.name,
      });
      this.wppFileUploadItemDelete.emit(event.detail);
    };
    this.handleClickItem = (event) => this.wppFileUploadItemClick.emit(event.detail);
    this.validateFileSize = (file) => {
      if (file.size > convertMBToBytes(this.size)) {
        file.sizeError = true;
      }
      return file;
    };
    this.customValidation = (file) => {
      const validationResult = this.validator(file);
      if (validationResult) {
        file.validatorError = validationResult;
      }
      return file;
    };
    this.isAcceptConfigFilled = () => !this.acceptConfig ? false : Object.keys(this.acceptConfig)?.length > 0;
    this.validateFileType = (file) => {
      if (this.isAcceptConfigFilled()) {
        let allowedExtensions = [];
        if (file.type) {
          allowedExtensions = this.acceptConfig[file.type] || [];
        }
        else {
          allowedExtensions = this.getAcceptExtensions();
        }
        if (allowedExtensions?.length) {
          const fileExtension = getExtension(file.name);
          file.formatError = !allowedExtensions.includes(fileExtension);
        }
        else {
          file.formatError = true;
        }
        return file;
      }
      if (this.acceptConfig !== undefined && Object.keys(this.acceptConfig).length === 0) {
        return file;
      }
      // If no acceptConfig specified with valid types, return the file as-is
      if (!this.acceptConfig || Object.keys(this.acceptConfig).length === 0) {
        if (!file.type) {
          const extension = file.name?.split('.').pop() || '';
          const typeFromExtension = EXTENSION_TO_TYPE[extension] || '';
          const modifiedFile = modifyPropertiesOnFile(file, { type: typeFromExtension });
          return modifiedFile;
        }
        return file;
      }
      // Get accepted formats from acceptConfig
      const acceptedFormats = Object.keys(this.acceptConfig).flatMap(mimeType => {
        const extensions = this.acceptConfig[mimeType] || [];
        return [mimeType, ...extensions];
      });
      const isPassValidation = acceptedFormats.some((format) => {
        const currentFormat = format.replace(/[,.*]/g, '');
        // .mov format return quicktime type, that's why using this contraction for this particular case
        if (currentFormat === 'mov') {
          return file.type.includes('quicktime');
        }
        if (/txt|text|msword|document|doc?x/.test(currentFormat)) {
          return /text|application/.test(file.type);
        }
        return file.type.includes(currentFormat);
      });
      if (!isPassValidation) {
        file.formatError = true;
      }
      return file;
    };
    this.isFileWithError = (file) => !!(file.formatError || file.sizeError || file.validatorError);
    this.generateUniqueName = (fileName, fileList) => {
      const baseName = getBaseName(fileName);
      const extension = getExtension(fileName);
      let counter = 1;
      const generateNewName = () => `${baseName}-${counter}${extension}`;
      const isNameTaken = (name) => fileList.some(item => item.name === name);
      let uniqueName = generateNewName();
      while (isNameTaken(uniqueName)) {
        counter++;
        uniqueName = generateNewName();
      }
      return uniqueName;
    };
    this.displayErrorListByShowingOption = (newFilesWithErrors) => this.showOnlyNewErrors ? newFilesWithErrors : [...new Set([...this.errorList, ...newFilesWithErrors])];
    this.handleFileLoad = async (filesList) => {
      const list = [...(this.successList || []), ...(this.errorList || [])];
      const filteredFileList = filesList.filter(Boolean).map(newFile => {
        const isFileWithSameNameExists = !!list.find(item => item.name === newFile.name);
        if (!isFileWithSameNameExists)
          return newFile;
        const uniqueName = this.generateUniqueName(newFile.name, list);
        return renameFile(newFile, uniqueName);
      });
      if (!filteredFileList?.length)
        return;
      const validatedFileList = filteredFileList.map((file) => {
        if ('url' in file) {
          return file;
        }
        this.validateFileSize(file);
        file = this.validateFileType(file);
        this.customValidation(file);
        return file;
      });
      if (!this.multiple && this.value?.length) {
        this.value = validatedFileList.some(this.isFileWithError) ? this.value : [...this.value, ...filteredFileList];
      }
      else {
        this.value = [...(this.successList || []), ...(this.errorList || []), ...validatedFileList];
      }
      const successFileList = this.value.filter(file => !this.isFileWithError(file));
      const newFilesWithErrors = validatedFileList.filter((fileItem) => this.isFileWithError(fileItem));
      const errorFileList = this.displayErrorListByShowingOption(newFilesWithErrors);
      this.errorList = errorFileList;
      this.successList = successFileList;
      this.wppChange.emit({
        value: successFileList,
        hasError: !!errorFileList?.length || this.isLimitReached,
        errorFiles: errorFileList,
        name: this.name,
      });
    };
    this.handleDrop = (event) => {
      event.preventDefault();
      const currentFiles = event?.dataTransfer?.files || [];
      this.isFileDrag = false;
      if (!this.multiple && this.value?.length) {
        return this.handleFileLoad([currentFiles[0]]);
      }
      if (!this.multiple && currentFiles?.length > 1) {
        return this.handleFileLoad([currentFiles[0]]);
      }
      this.handleFileLoad(Array.from(currentFiles));
    };
    this.handleDragOver = (event) => {
      event.preventDefault();
    };
    this.handleDragEnter = () => {
      this.isFileDrag = true;
    };
    this.handleDragLeave = () => {
      this.isFileDrag = false;
    };
    this.handleChange = async () => {
      const currentFiles = this.inputRef?.files || [];
      if (!this.multiple && this.value?.length) {
        return this.handleFileLoad([currentFiles[0]]);
      }
      await this.handleFileLoad(Array.from(currentFiles));
      this.clearInputValue();
    };
    this.handleListScroll = (event) => {
      const target = event.target;
      if (target.scrollTop && target.scrollHeight - target.scrollTop !== target.clientHeight) {
        this.scrollState = ScrollState.scroll;
        return;
      }
      this.scrollState = false;
    };
    this.getAcceptExtensions = () => {
      if (this.acceptConfig !== undefined) {
        if (Object.keys(this.acceptConfig).length === 0) {
          return [];
        }
        return getExtensionsList(this.acceptConfig);
      }
      return [];
    };
    this.isMaximumFilesSet = () => this.maxFiles > 0;
    this.isMaximumFilesReached = () => {
      if (!this.multiple) {
        this.isLimitReached = this.value?.length > 1;
        return this.isLimitReached;
      }
      if (this.isMaximumFilesSet()) {
        this.isLimitReached = this.value?.length > this.maxFiles;
        return this.isLimitReached;
      }
      this.isLimitReached = false;
      return false;
    };
    this.getMessageText = () => {
      if (this.isLimitReached) {
        return this.multiple ? this._locales.multipleFileLimitError : this._locales.singleFileLimitError;
      }
      return this.message;
    };
    this.uploadWrapperCssClasses = () => ({
      'upload-wrapper': true,
      message: !!this.message,
      [`${this.messageType}`]: !!this.messageType,
      'tab-focus': !this.disabled && this.hasTabFocus,
      disabled: this.disabled,
      'file-drag': this.isFileDrag,
      ...(!this.messageType && this.isLimitReached ? { error: true } : {}),
    });
    this.listWrapperCssClasses = () => ({
      'file-list-wrapper': true,
      [`${this.scrollState}`]: !!this.scrollState,
    });
    this.hostCssClasses = () => ({
      'wpp-file-upload': true,
    });
    this.hasTabFocus = false;
    this.scrollState = false;
    this.focusType = getInitFocusInfo();
    this.isFileDrag = false;
    this.errorList = undefined;
    this.successList = undefined;
    this.isLimitReached = false;
    this.name = undefined;
    this.value = [];
    this.disabled = false;
    this.multiple = true;
    this.format = 'base64';
    this.acceptConfig = undefined;
    this.messageType = undefined;
    this.message = undefined;
    this.maxMessageLength = undefined;
    this.tooltipConfig = {};
    this.size = 50;
    this.locales = {};
    this.validator = () => null;
    this.controlled = false;
    this.maxFiles = 0;
    this.required = false;
    this.labelConfig = undefined;
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'absolute' },
    };
    this.showOnlyNewErrors = false;
  }
  /**
   * Method to reset FileUpload. Should be called only when the component is uncontrolled.
   */
  async reset() {
    this.reInitValue([]);
    this.value = [];
    this.scrollState = false;
    this.clearInputValue();
  }
  onDisabledChange(disabled) {
    if (disabled)
      this.hasTabFocus = false;
  }
  onValueChange(newValue) {
    const updatedValue = newValue || [];
    if (this.controlled) {
      this.reInitValue(updatedValue);
      if (!updatedValue.length) {
        this.scrollState = false;
        this.clearInputValue();
      }
    }
    if (this.isMaximumFilesReached()) {
      this.wppError.emit({
        errorFiles: this.value.slice(this.maxFiles),
        errorMessage: this.multiple ? this._locales.multipleFileLimitError : this._locales.singleFileLimitError,
        name: this.name,
      });
    }
  }
  onUpdateLocales(newLocales) {
    this._locales = { ...this._locales, ...newLocales };
  }
  componentWillLoad() {
    this._locales = { ...this._locales, ...this.locales };
  }
  componentDidLoad() {
    const list = [...(this.value || []), ...(this.successList || []), ...(this.errorList || [])];
    this.reInitValue(list);
  }
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
  }
  render() {
    const allFiles = [...(this.successList || []), ...(this.errorList || [])];
    return (h(Host, { class: this.hostCssClasses(), exportparts: "file-item, wrapper, content, file-name, tooltip, loading, percentage, cross-icon", onFocus: this.onFocus, onBlur: this.onBlur, onKeyDown: this.onGlobalKeyDown, onPointerDown: this.onPointerDown, onMouseDown: this.onMouseDown, "aria-disabled": this.disabled ? 'true' : undefined }, h("slot", { name: "label", part: "slot-label" }), this.labelConfig?.text && (h("wpp-label-v4-1-0", { class: "file-upload-label", id: this.labelId, htmlFor: this.inputId, optional: !this.required, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label" })), h("slot", { name: "description", part: "slot-description" }), h("div", { class: this.uploadWrapperCssClasses(), onDrop: this.handleDrop, onDragEnter: this.handleDragEnter, onDragLeave: this.handleDragLeave, onDragOver: this.handleDragOver, part: "file-upload-container" }, h("wpp-avatar-v4-1-0", { class: "icon-file", icon: "wpp-icon-file", size: "l", role: "presentation", tabindex: "-1", "aria-hidden": "true" }), h("div", { class: "content", part: "content" }, h("p", null, h("span", { class: "label", part: "label" }, this._locales.label), h("span", { class: "text", part: "text" }, this._locales.text))), h("p", { class: "text-info", part: "text-info" }, this._locales.info(this.getAcceptExtensions().join(', '), this.size)), h("input", { class: "file-loader", type: "file", name: this.name, onChange: this.handleChange, onFocus: this.onInputFocus, onBlur: this.onInputBlur, ref: inputRef => (this.inputRef = inputRef), multiple: this.multiple, accept: this.getAcceptExtensions().join(), part: "input", title: "", "aria-label": this.locales.label || 'Upload file', disabled: this.disabled })), (this.message || this.isLimitReached) && (h("wpp-inline-message-v4-1-0", { message: this.getMessageText(), type: this.isLimitReached ? 'error' : this.messageType, showTooltipFrom: this.maxMessageLength, tooltipConfig: this.tooltipConfig, part: "message" })), allFiles?.length ? (h("div", { class: this.listWrapperCssClasses(), part: "list-wrapper" }, h("ul", { role: "list", class: "file-list", part: "file-list", onScroll: this.handleListScroll }, allFiles.map((file, index) => (h("wpp-file-upload-item-v4-1-0", { key: `${file.name}-${file.size}-${file.lastModified ?? index}`, format: this.format, parentDisabled: this.disabled, currentIndex: index, onWppDelete: this.handleDeleteItem, onWppClick: this.handleClickItem, file: file, locales: {
        sizeError: this._locales.sizeError,
        formatError: this._locales.formatError,
      }, part: "file-item", onBlur: this.onBlur, onKeyUp: (event) => this.onKeyUp(event, 'item') })))))) : null));
  }
  static get registryIs() { return "wpp-file-upload-v4-1-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "disabled": ["onDisabledChange"],
    "value": ["onValueChange"],
    "locales": ["onUpdateLocales"]
  }; }
};
WppFileUpload.style = wppFileUploadCss;

export { WppFileUpload as wpp_file_upload };
