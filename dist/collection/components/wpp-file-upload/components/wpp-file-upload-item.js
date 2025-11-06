import { h, Host } from '@stencil/core';
import { truncate } from '../../../utils/utils';
import { sizeFormat, maxSize } from './types';
import { getExtension } from '../utils';
import { returnIconFromExtension } from '../constants';
/**
 * @part file-item - file item wrapper.
 * @part wrapper - component wrapper element
 * @part content - content wrapper element
 * @part file-name - file name text element
 * @part tooltip - tooltip wrapper content
 * @part loading - loading text element
 * @part percentage - percentage text element
 * @part cross-icon - cross icon element
 */
export class WppFileUploadItem {
  constructor() {
    this.convertToAppropriateFormat = (size) => {
      if (size < maxSize.Bytes) {
        this.measurementUnit = sizeFormat.Bytes;
        return size.toFixed(1);
      }
      if (size < maxSize.KB) {
        this.measurementUnit = sizeFormat.KB;
        return Math.floor(size / 1000).toFixed(1);
      }
      if (size < maxSize.MB) {
        this.measurementUnit = sizeFormat.MB;
        return (size / 1000000).toFixed(1);
      }
      this.measurementUnit = sizeFormat.GB;
      return (size / 1000000000).toFixed(1);
    };
    this.setReaderFormat = (reader) => {
      switch (this.format) {
        case 'arrayBuffer': {
          return reader.readAsArrayBuffer(this.file);
        }
        case 'binaryString': {
          return reader.readAsBinaryString(this.file);
        }
        default: {
          return reader.readAsDataURL(this.file);
        }
      }
    };
    this.isFileLoading = () => this.file.isLoading || !this.isLoadingFinished;
    this.setCurrentIcon = () => {
      if (this.isFileLoading())
        return h("wpp-spinner-v2-22-0", null);
      const { name } = this.file;
      if (this.isFileWithError())
        return null;
      const fileExtension = getExtension(name);
      return returnIconFromExtension(fileExtension, this.thumbnailUrl);
    };
    this.getErrorMessage = () => {
      if (this.file.sizeError)
        return this.locales.sizeError;
      if (this.file.formatError)
        return this.locales.formatError;
      return this.file.validatorError || '';
    };
    this.isFileWithError = () => !!(this.file.sizeError || this.file.formatError || this.file.validatorError);
    this.setCurrentError = () => {
      if (this.isFileWithError()) {
        const currentError = this.getErrorMessage();
        return (h("div", { class: "error-wrapper" }, h("wpp-inline-message-v2-22-0", { class: "inline-message-error", message: currentError, type: "error", showTooltipFrom: 140, tooltipConfig: { popperOptions: { strategy: 'fixed' } } }), this.file.deletable !== false && (h("wpp-icon-cross-v2-22-0", { class: "cross-icon", part: "cross-icon", onClick: this.handleCloseClick }))));
      }
      return null;
    };
    this.getEventData = () => ({
      index: this.currentIndex,
      name: this.file.name,
      size: this.file.size,
    });
    this.handleCloseClick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (this.file.disabled)
        return;
      this.wppDelete.emit(this.getEventData());
    };
    this.handleClick = () => {
      if (this.file.disabled)
        return;
      this.wppClick.emit(this.getEventData());
    };
    this.blockCssClasses = () => ({
      block: true,
    });
    this.fileNameCssClasses = () => ({
      name: true,
      'name-error': this.isFileWithError(),
    });
    this.hostCssClasses = () => ({
      'wpp-file-upload-item': true,
      'file-upload-item': true,
    });
    this.itemCssClasses = () => ({
      'item-wrapper': true,
      disabled: !!this.file.disabled,
    });
    this.thumbnailUrl = null;
    this.percentage = 0;
    this.total = 0;
    this.loaded = 0;
    this.isLoadingFinished = false;
    this.measurementUnit = sizeFormat.MB;
    this.file = undefined;
    this.format = 'base64';
    this.maxLabelLength = 30;
    this.currentIndex = undefined;
    this.locales = undefined;
  }
  componentWillLoad() {
    const { size, name } = this.file;
    if (this.isFileWithError()) {
      this.isLoadingFinished = true;
      this.total = +this.convertToAppropriateFormat(size);
      return;
    }
    if ('url' in this.file) {
      this.isLoadingFinished = true;
      this.total = +this.convertToAppropriateFormat(size);
      return;
    }
    const fileExtension = getExtension(name).toLowerCase();
    if (['.jpg', '.png', '.jpeg', '.gif', '.svg'].includes(fileExtension)) {
      this.generateThumbnail();
    }
    else {
      this.handleFileReading();
    }
  }
  handleFileReading() {
    const reader = new FileReader();
    reader.onload = (event) => {
      const currentTarget = event.currentTarget;
      this.file.result = currentTarget.result;
    };
    reader.onprogress = (event) => {
      this.loaded = +this.convertToAppropriateFormat(event.loaded);
      this.total = +this.convertToAppropriateFormat(event.total);
      const currentPercent = (event.loaded / event.total) * 100;
      this.percentage = +currentPercent.toFixed(1);
    };
    reader.onloadend = () => {
      this.isLoadingFinished = true;
    };
    this.setReaderFormat(reader);
  }
  generateThumbnail() {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      // Check if the file is a GIF and create a static thumbnail using a canvas
      if (this.file.name.toLowerCase().endsWith('.gif')) {
        const img = new Image();
        img.src = result;
        img.onload = () => {
          // Create a canvas element to capture the first frame
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          // Draw the first frame of the GIF onto the canvas
          context?.drawImage(img, 0, 0, img.width, img.height);
          // Use the canvas content as the static thumbnail
          this.thumbnailUrl = canvas.toDataURL('image/png'); // Convert to PNG for a static thumbnail
          this.isLoadingFinished = true;
        };
      }
      else {
        this.thumbnailUrl = result;
        this.isLoadingFinished = true;
      }
    };
    reader.onprogress = (event) => {
      this.loaded = +this.convertToAppropriateFormat(event.loaded);
      this.total = +this.convertToAppropriateFormat(event.total);
      const currentPercent = (event.loaded / event.total) * 100;
      this.percentage = +currentPercent.toFixed(1);
    };
    reader.readAsDataURL(this.file);
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "file-item, wrapper, content, file-name, tooltip, loading, percentage, cross-icon", onClick: this.handleClick }, h("li", { class: this.itemCssClasses(), part: "file-item" }, this.setCurrentError(), h("div", { class: "content-wrapper", part: "wrapper" }, h("div", { class: this.blockCssClasses(), part: "content" }, this.setCurrentIcon(), h("p", { class: this.fileNameCssClasses(), part: "file-name" }, this.file.name.length > this.maxLabelLength ? (h("wpp-tooltip-v2-22-0", { text: this.file.name, config: { popperOptions: { strategy: 'fixed' } }, part: "tooltip" }, truncate(this.file.name, this.maxLabelLength, true))) : (this.file.name)), this.isFileWithError() ? null : (h("p", { class: "loading", part: "loading" }, this.isFileLoading()
      ? `${this.loaded}/${this.total} ${this.measurementUnit}`
      : `${this.total} ${this.measurementUnit}`))), h("div", { class: "controls-wrapper", part: "controls" }, this.isFileLoading() && (h("p", { class: "percentage", part: "percentage" }, this.percentage, "%")), this.file.deletable !== false && !this.isFileWithError() && (h("wpp-icon-cross-v2-22-0", { class: "cross-icon", part: "cross-icon", onClick: this.handleCloseClick })))))));
  }
  static get is() { return "wpp-file-upload-item"; }
  static get registryIs() { return "wpp-file-upload-item-v2-22-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-file-upload-item.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-file-upload-item.css"]
    };
  }
  static get properties() {
    return {
      "file": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "FileItemType",
          "resolved": "FileBasedItemType | FileMetaData & { name: string; url: string; size: number; type: string; lastModified?: number | undefined; result?: string | ArrayBuffer | null | undefined; }",
          "references": {
            "FileItemType": {
              "location": "import",
              "path": "../types",
              "id": "src/components/wpp-file-upload/types.ts::FileItemType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Current file"
        }
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
              "path": "../types",
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
      "maxLabelLength": {
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
          "text": "Maximum label length (in characters) of single loading item"
        },
        "attribute": "max-label-length",
        "reflect": false,
        "defaultValue": "30"
      },
      "currentIndex": {
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
          "text": "Represent current index in files list"
        },
        "attribute": "current-index",
        "reflect": false
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "FileUploadItemLocales",
          "resolved": "{ sizeError: string; formatError: string; }",
          "references": {
            "FileUploadItemLocales": {
              "location": "import",
              "path": "../types",
              "id": "src/components/wpp-file-upload/types.ts::FileUploadItemLocales"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates locales for file upload component"
        }
      }
    };
  }
  static get states() {
    return {
      "thumbnailUrl": {},
      "percentage": {},
      "total": {},
      "loaded": {},
      "isLoadingFinished": {},
      "measurementUnit": {}
    };
  }
  static get events() {
    return [{
        "method": "wppDelete",
        "name": "wppDelete",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [{
              "name": "internal",
              "text": undefined
            }],
          "text": ""
        },
        "complexType": {
          "original": "FileUploadItemEventDetail",
          "resolved": "FileUploadItemEventDetail",
          "references": {
            "FileUploadItemEventDetail": {
              "location": "import",
              "path": "../types",
              "id": "src/components/wpp-file-upload/types.ts::FileUploadItemEventDetail"
            }
          }
        }
      }, {
        "method": "wppClick",
        "name": "wppClick",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [{
              "name": "internal",
              "text": undefined
            }],
          "text": ""
        },
        "complexType": {
          "original": "FileUploadItemEventDetail",
          "resolved": "FileUploadItemEventDetail",
          "references": {
            "FileUploadItemEventDetail": {
              "location": "import",
              "path": "../types",
              "id": "src/components/wpp-file-upload/types.ts::FileUploadItemEventDetail"
            }
          }
        }
      }];
  }
}
