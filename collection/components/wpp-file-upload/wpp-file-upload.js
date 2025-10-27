import { h, Host } from '@stencil/core';
import { FOCUS_TYPE } from '../../types/common';
import { convertMBToBytes, getExtension, getExtensionsList, getBaseName, renameFile, modifyPropertiesOnFile, } from './utils';
import { ScrollState, } from './types';
import { EXTENSION_TO_TYPE, LOCALES_DEFAULTS } from './const';
const getInitFocusInfo = () => ({
  wrapper: FOCUS_TYPE.NONE,
  item: FOCUS_TYPE.NONE,
});
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
export class WppFileUpload {
  constructor() {
    this._locales = LOCALES_DEFAULTS;
    this.inputId = this.name || `wpp-file-upload-${Math.random().toString(36).substr(2, 9)}`;
    this.labelId = `${this.inputId}-label`;
    this.reInitValue = (list) => {
      this.successList = list.filter(file => !this.isFileWithError(file));
      this.errorList = list.filter(this.isFileWithError);
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
      if (this.inputRef?.value) {
        this.inputRef.value = '';
      }
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
      if (!this.accept?.length) {
        if (!file.type) {
          const extension = file.name?.split('.').pop() || '';
          const typeFromExtension = EXTENSION_TO_TYPE[extension] || '';
          const modifiedFile = modifyPropertiesOnFile(file, { type: typeFromExtension });
          return modifiedFile;
        }
        return file;
      }
      const isPassValidation = this.accept.some((format) => {
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
      if (this.inputRef?.value) {
        this.inputRef.value = '';
      }
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
      if (this.accept?.length) {
        return this.accept;
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
      'tab-focus': !this.disabled && this.focusType.wrapper === FOCUS_TYPE.TAB && this.focusType.item !== FOCUS_TYPE.TAB,
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
    this.accept = ['.jpg', '.jpeg', '.png'];
    this.acceptConfig = undefined;
    this.messageType = undefined;
    this.message = undefined;
    this.maxMessageLength = undefined;
    this.tooltipConfig = {};
    this.size = 50;
    this.maxLabelLength = undefined;
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
   * Method to reset FileUpload
   */
  async reset() {
    this.successList = [];
    this.errorList = [];
  }
  onValueChange(newValue) {
    if (this.controlled) {
      this.reInitValue(newValue);
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
    const list = [...this.value, ...(this.successList || []), ...(this.errorList || [])];
    this.reInitValue(list);
  }
  render() {
    const allFiles = [...(this.successList || []), ...(this.errorList || [])];
    return (h(Host, { class: this.hostCssClasses(), exportparts: "file-item, wrapper, content, file-name, tooltip, loading, percentage, cross-icon", onFocus: this.onFocus, onBlur: this.onBlur, onMouseDown: this.onMouseDown, onKeyUp: (event) => this.onKeyUp(event, 'wrapper'), "aria-disabled": this.disabled ? 'true' : undefined }, h("slot", { name: "label", part: "slot-label" }), this.labelConfig?.text && (h("wpp-label-v3-3-0", { class: "file-upload-label", id: this.labelId, htmlFor: this.inputId, optional: !this.required, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label" })), h("slot", { name: "description", part: "slot-description" }), h("div", { class: this.uploadWrapperCssClasses(), onDrop: this.handleDrop, onDragEnter: this.handleDragEnter, onDragLeave: this.handleDragLeave, onDragOver: this.handleDragOver, part: "file-upload-container" }, h("wpp-avatar-v3-3-0", { class: "icon-file", icon: "wpp-icon-file", size: "l", role: "presentation", tabindex: "-1", "aria-hidden": "true" }), h("div", { class: "content", part: "content" }, h("p", null, h("span", { class: "label", part: "label" }, this._locales.label), h("span", { class: "text", part: "text" }, this._locales.text))), h("p", { class: "text-info", part: "text-info" }, this._locales.info(this.getAcceptExtensions().join(', '), this.size)), h("input", { class: "file-loader", type: "file", name: this.name, onChange: this.handleChange, ref: inputRef => (this.inputRef = inputRef), multiple: this.multiple, accept: this.getAcceptExtensions().join(), part: "input", title: "", "aria-label": this.locales.label || 'Upload file', disabled: this.disabled })), (this.message || this.isLimitReached) && (h("wpp-inline-message-v3-3-0", { message: this.getMessageText(), type: this.isLimitReached ? 'error' : this.messageType, showTooltipFrom: this.maxMessageLength, tooltipConfig: this.tooltipConfig, part: "message" })), allFiles?.length ? (h("div", { class: this.listWrapperCssClasses(), part: "list-wrapper" }, h("ul", { role: "list", class: "file-list", part: "file-list", onScroll: this.handleListScroll }, allFiles.map((file, index) => (h("wpp-file-upload-item-v3-3-0", { key: file.lastModified, format: this.format, parentDisabled: this.disabled, maxLabelLength: this.maxLabelLength, currentIndex: index, onWppDelete: this.handleDeleteItem, onWppClick: this.handleClickItem, file: file, locales: {
        sizeError: this._locales.sizeError,
        formatError: this._locales.formatError,
      }, part: "file-item", onBlur: this.onBlur, onKeyUp: (event) => this.onKeyUp(event, 'item') })))))) : null));
  }
  static get is() { return "wpp-file-upload"; }
  static get registryIs() { return "wpp-file-upload-v3-3-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-file-upload.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-file-upload.css"]
    };
  }
  static get properties() {
    return {
      "name": {
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
          "tags": [],
          "text": "Defines the input name."
        },
        "attribute": "name",
        "reflect": false
      },
      "value": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "FileItemType[]",
          "resolved": "FileItemType[]",
          "references": {
            "FileItemType": {
              "location": "import",
              "path": "./types",
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
          "text": "If `true`, the component is disabled"
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
      },
      "multiple": {
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
          "text": "If `true`, the component can take multiple files"
        },
        "attribute": "multiple",
        "reflect": false,
        "defaultValue": "true"
      },
      "format": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "FileUploadResultFormaType",
          "resolved": "\"arrayBuffer\" | \"base64\" | \"binaryString\"",
          "references": {
            "FileUploadResultFormaType": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-file-upload/types.ts::FileUploadResultFormaType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Represent what result format datepicker return, it can be base64, arrayBuffer, binaryString, by default it returns base64"
        },
        "attribute": "format",
        "reflect": false,
        "defaultValue": "'base64'"
      },
      "accept": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "deprecated",
              "text": "- this prop will be deleted in 4.0.0 version as it is not flexible enough to handle different\ncases with files validations, for example based on mimetype and extension at the same time.\nThis property handle only a few extensions: ['.jpg', '.jpeg', '.png', '.txt', '.text', '.doc', '.docx', '.mov'],\nand list will NOT be extended.\n\nIf you want to use this prop, use \"acceptConfig\" property instead.\nNote: \"acceptConfig\" property will have a higher priority in case if both \"acceptConfig\" and \"accept\" props will be provided"
            }],
          "text": "Accept file format, you can pass any format you want download, by default is `.jpg, .jpeg, .png`"
        },
        "defaultValue": "['.jpg', '.jpeg', '.png']"
      },
      "acceptConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "AcceptConfig",
          "resolved": "{ [x: string]: string[]; }",
          "references": {
            "AcceptConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-file-upload/types.ts::AcceptConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Configuration for accepted file formats. This property allows you to specify supported file types\nusing an object where the key is the MIME type and the value is an array of file extensions.\n\nExample:\n{\n  'image/png': ['.png'],\n  'text/html': ['.htm', '.html']\n}\n\nTo allow all file types, pass an empty object (`{}`) or leave the property undefined.\n\nNote: This property offers greater flexibility compared to the deprecated `accept` property,\nallowing validation based on MIME types and extensions simultaneously."
        }
      },
      "messageType": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "FileUploadMessageType",
          "resolved": "\"error\" | undefined",
          "references": {
            "FileUploadMessageType": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-file-upload/types.ts::FileUploadMessageType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates file upload message type"
        },
        "attribute": "message-type",
        "reflect": false
      },
      "message": {
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
          "tags": [],
          "text": "Indicates file upload message"
        },
        "attribute": "message",
        "reflect": false
      },
      "maxMessageLength": {
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
          "text": "Indicates file upload message maximum length"
        },
        "attribute": "max-message-length",
        "reflect": false
      },
      "tooltipConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "DropdownConfig",
          "resolved": "DropdownConfig",
          "references": {
            "DropdownConfig": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the dropdown configuration. Under the hood dropdown using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{}"
      },
      "size": {
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
          "text": "The max size of file that user can download, by default it`s 50 MB"
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "50"
      },
      "maxLabelLength": {
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
              "text": "- this prop will be removed in 4.0.0 version. Truncation will be calculated based on available space."
            }],
          "text": "Maximum label length (in characters) of single item"
        },
        "attribute": "max-label-length",
        "reflect": false
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<FileUploadLocales>",
          "resolved": "{ label?: string | undefined; text?: string | undefined; info?: ((accept: string, size: number) => string) | undefined; sizeError?: string | undefined; formatError?: string | undefined; singleFileLimitError?: string | undefined; multipleFileLimitError?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "FileUploadLocales": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-file-upload/types.ts::FileUploadLocales"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates locales for file upload component"
        },
        "defaultValue": "{}"
      },
      "validator": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "FileValidatorHandler",
          "resolved": "(file: FileItemType) => string | null",
          "references": {
            "FileValidatorHandler": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-file-upload/types.ts::FileValidatorHandler"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines custom validation function. It must return null if there's no errors, and string in case of any error"
        },
        "defaultValue": "() => null"
      },
      "controlled": {
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
          "text": "If `true`, the file upload works as controlled component."
        },
        "attribute": "controlled",
        "reflect": false,
        "defaultValue": "false"
      },
      "maxFiles": {
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
          "text": "Maximum accepted number of files The default value is 0 which means there is no limitation to how many files are accepted."
        },
        "attribute": "max-files",
        "reflect": false,
        "defaultValue": "0"
      },
      "required": {
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
          "text": "If the input is required."
        },
        "attribute": "required",
        "reflect": true,
        "defaultValue": "false"
      },
      "labelConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "LabelConfig",
          "resolved": "LabelConfig | undefined",
          "references": {
            "LabelConfig": {
              "location": "import",
              "path": "../wpp-label/types",
              "id": "src/components/wpp-label/types.ts::LabelConfig"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates label config"
        }
      },
      "labelTooltipConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "DropdownConfig",
          "resolved": "DropdownConfig",
          "references": {
            "DropdownConfig": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the dropdown configuration. Under the hood dropdown using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{\n    popperOptions: { strategy: 'absolute' },\n  }"
      },
      "showOnlyNewErrors": {
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
          "text": "If `true`, the new errors (from a new unsuccessful upload) will replace the already existing ones in the list\nBy default, the new errors will be added to the error list"
        },
        "attribute": "show-only-new-errors",
        "reflect": false,
        "defaultValue": "false"
      }
    };
  }
  static get states() {
    return {
      "scrollState": {},
      "focusType": {},
      "isFileDrag": {},
      "errorList": {},
      "successList": {},
      "isLimitReached": {}
    };
  }
  static get events() {
    return [{
        "method": "wppChange",
        "name": "wppChange",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when file downloads, returns only those files, that not have any error"
        },
        "complexType": {
          "original": "FileUploadEventDetail",
          "resolved": "FileUploadEventDetail",
          "references": {
            "FileUploadEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-file-upload/types.ts::FileUploadEventDetail"
            }
          }
        }
      }, {
        "method": "wppFocus",
        "name": "wppFocus",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the input is in focus."
        },
        "complexType": {
          "original": "FocusEvent",
          "resolved": "FocusEvent",
          "references": {
            "FocusEvent": {
              "location": "global",
              "id": "global::FocusEvent"
            }
          }
        }
      }, {
        "method": "wppBlur",
        "name": "wppBlur",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the input loses focus."
        },
        "complexType": {
          "original": "FocusEvent",
          "resolved": "FocusEvent",
          "references": {
            "FocusEvent": {
              "location": "global",
              "id": "global::FocusEvent"
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
          "tags": [],
          "text": "Emitted when the file-upload item was deleted."
        },
        "complexType": {
          "original": "FileUploadItemEventDetail",
          "resolved": "FileUploadItemEventDetail",
          "references": {
            "FileUploadItemEventDetail": {
              "location": "import",
              "path": "./types",
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
          "tags": [],
          "text": "Emitted when the file-upload item was clicked."
        },
        "complexType": {
          "original": "FileUploadItemEventDetail",
          "resolved": "FileUploadItemEventDetail",
          "references": {
            "FileUploadItemEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-file-upload/types.ts::FileUploadItemEventDetail"
            }
          }
        }
      }, {
        "method": "wppError",
        "name": "wppError",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the file upload enters an error state. Triggered when the maximum number of files is exceeded."
        },
        "complexType": {
          "original": "FileUploadErrorEventDetails",
          "resolved": "FileUploadErrorEventDetails",
          "references": {
            "FileUploadErrorEventDetails": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-file-upload/types.ts::FileUploadErrorEventDetails"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "reset": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Method to reset FileUpload",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "value",
        "methodName": "onValueChange"
      }, {
        "propName": "locales",
        "methodName": "onUpdateLocales"
      }];
  }
}
