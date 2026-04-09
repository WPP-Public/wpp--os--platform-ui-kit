import { h, Host } from '@stencil/core';
import { truncate } from '../../../utils/utils';
import { FOCUS_TYPE } from '../../../types/common';
import { sizeFormat, maxSize } from './types';
import { getExtension } from '../utils';
import { LOCALES_DEFAULTS, returnIconFromExtension } from '../const';
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
    this._locales = LOCALES_DEFAULTS;
    this.pendingTruncation = false;
    this.isTruncated = false;
    this.ELLIPSIS = '...';
    this.MIN_WIDTH_THRESHOLD = 0;
    this.convertToAppropriateFormat = (size) => {
      if (size < maxSize.Bytes) {
        this.measurementUnit = sizeFormat.Bytes;
        return size.toFixed(1);
      }
      if (size < maxSize.KB) {
        this.measurementUnit = sizeFormat.KB;
        return Math.floor(size / 1024).toFixed(1);
      }
      if (size < maxSize.MB) {
        this.measurementUnit = sizeFormat.MB;
        return (size / (1024 * 1024)).toFixed(1);
      }
      this.measurementUnit = sizeFormat.GB;
      return (size / (1024 * 1024 * 1024)).toFixed(1);
    };
    this.setReaderFormat = (reader) => {
      switch (this.format) {
        case 'arrayBuffer':
          return reader.readAsArrayBuffer(this.file);
        case 'binaryString':
          return reader.readAsBinaryString(this.file);
        default:
          return reader.readAsDataURL(this.file);
      }
    };
    this.scheduleTruncate = () => {
      if (this.pendingTruncation)
        return;
      this.pendingTruncation = true;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.pendingTruncation = false;
          this.truncateFileName();
        });
      });
    };
    this.truncateFileName = () => {
      const text = this.file?.name || '';
      if (!this.fileNameRef || !text || !this.tooltipRef)
        return;
      this.isTruncated = false;
      this.tooltipRef.classList.remove('computed');
      if (this.fileNameRef.textContent !== text)
        this.fileNameRef.textContent = text;
      // Compute the available width of the visible container
      const maxWidth = this.computeAvailableWidth();
      // If not yet laid out, try on the next frame
      if (!maxWidth || maxWidth <= 0) {
        this.scheduleTruncate();
        return;
      }
      const fullWidth = this.measure(text);
      // Fits fully, keep original
      if (fullWidth <= maxWidth) {
        this.updateFileNameAndMarkComputed(text);
        return;
      }
      const ellipsis = '...';
      const ellipsisWidth = this.measure(ellipsis);
      // If even the ellipsis alone can't fit
      if (ellipsisWidth > maxWidth) {
        this.fileNameRef.textContent = ellipsis;
        this.isTruncated = true;
        this.tooltipRef.classList.add('computed');
        return;
      }
      const best = this.findLargestNumberOfCharacters(text, maxWidth, ellipsis);
      this.updateFileNameAndMarkComputed(best);
      this.isTruncated = true;
    };
    this.computeAvailableWidth = () => {
      if (!this.fileNameRef)
        return 0;
      const rect = this.fileNameRef.getBoundingClientRect();
      const hostStyle = getComputedStyle(this.fileNameRef);
      const padL = parseFloat(hostStyle.paddingLeft) || 0;
      const padR = parseFloat(hostStyle.paddingRight) || 0;
      return Math.max(0, rect.width - padL - padR);
    };
    // Helper: measure a candidate using the hidden wpp-typography
    this.measure = (s) => {
      if (!this.measureRef)
        return Number.POSITIVE_INFINITY; // or 0 to force another frame
      this.measureRef.textContent = s;
      return this.measureRef.scrollWidth;
    };
    // Binary search the largest n (equal head and tail length) such that
    // head(n) + '...' + tail(n) fits into maxWidth
    this.findLargestNumberOfCharacters = (text, maxWidth, ellipsis = '...') => {
      let lo = 0;
      let hi = Math.floor(text.length / 2);
      let best = ellipsis;
      while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        const candidate = text.slice(0, mid) + ellipsis + text.slice(text.length - mid);
        const w = this.measure(candidate);
        if (w <= maxWidth) {
          best = candidate;
          lo = mid + 1;
        }
        else {
          hi = mid - 1;
        }
      }
      return best;
    };
    this.updateFileNameAndMarkComputed = (name) => {
      if (!this.fileNameRef || !this.tooltipRef)
        return;
      if (this.fileNameRef.textContent !== name)
        this.fileNameRef.textContent = name;
      if (!this.tooltipRef.classList.contains('computed'))
        this.tooltipRef.classList.add('computed');
    };
    this.isFileLoading = () => !this.uploaded && (this.file.isLoading || !this.isLoadingFinished);
    this.setCurrentIcon = () => {
      if (this.isFileLoading())
        return h("wpp-spinner-v3-6-0", null);
      const { name } = this.file;
      if (this.isFileWithError())
        return null;
      const fileExtension = getExtension(name);
      return returnIconFromExtension(fileExtension, this.thumbnailUrl);
    };
    this.getErrorMessage = () => {
      if (this.file.sizeError)
        return this._locales.sizeError;
      if (this.file.formatError)
        return this._locales.formatError;
      return this.file.validatorError || '';
    };
    this.isFileWithError = () => !!(this.file.sizeError || this.file.formatError || this.file.validatorError);
    this.setCurrentError = () => {
      if (this.isFileWithError()) {
        const currentError = this.getErrorMessage();
        return (h("div", { class: "error-wrapper" }, h("wpp-inline-message-v3-6-0", { class: "inline-message-error", message: currentError, type: "error", showTooltipFrom: 140, tooltipConfig: { popperOptions: { strategy: 'fixed' } } }), this.file.deletable !== false && (h("wpp-icon-cross-v3-6-0", { class: this.crossIconClasses(), part: "cross-icon", role: "button", tabindex: this.parentDisabled || this.file.disabled ? -1 : 0, "aria-disabled": this.parentDisabled || this.file.disabled ? 'true' : undefined, "aria-label": `Remove file ${this.file.name}`, onClick: this.handleCloseClick, onKeyDown: this.handleDeleteKeyDown, onKeyUp: this.handleDeleteKeyUp, onBlur: this.handleDeleteBlur }))));
      }
      return null;
    };
    this.getEventData = () => ({
      index: this.currentIndex,
      name: this.file?.name,
      size: this.file?.size,
    });
    this.handleCloseClick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (this.file.disabled)
        return;
      this.wppDelete.emit(this.getEventData());
      this.focusType = FOCUS_TYPE.MOUSE;
    };
    this.handleDeleteKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.isPressed = true;
        this.handleCloseClick(event);
      }
    };
    this.handleDeleteKeyUp = (event) => {
      if (event.key === 'Tab')
        this.focusType = FOCUS_TYPE.TAB;
      if (event.key === 'Enter' || event.key === ' ') {
        this.isPressed = false;
      }
    };
    this.handleDeleteBlur = () => {
      this.focusType = FOCUS_TYPE.NONE;
      this.isPressed = false;
    };
    this.handleClick = () => {
      if (this.file.disabled)
        return;
      this.wppClick.emit(this.getEventData());
    };
    this.blockCssClasses = () => ({
      block: true,
      'block-error': this.isFileWithError(),
    });
    this.fileNameCssClasses = () => ({
      name: true,
    });
    this.hostCssClasses = () => ({
      'wpp-file-upload-item': true,
      'file-upload-item': true,
    });
    this.itemCssClasses = () => ({
      'item-wrapper': true,
      disabled: !!this.file.disabled,
    });
    this.crossIconClasses = () => ({
      'cross-icon': true,
      pressed: this.isPressed,
      'tab-focus': this.focusType === FOCUS_TYPE.TAB,
    });
    this.thumbnailUrl = null;
    this.percentage = 0;
    this.total = 0;
    this.loaded = 0;
    this.isLoadingFinished = false;
    this.measurementUnit = sizeFormat.MB;
    this.isPressed = false;
    this.focusType = undefined;
    this.fileName = undefined;
    this.file = undefined;
    this.format = 'base64';
    this.maxLabelLength = undefined;
    this.currentIndex = undefined;
    this.locales = undefined;
    this.uploaded = undefined;
    this.parentDisabled = undefined;
  }
  onUpdateLocales(newLocales) {
    this._locales = { ...this._locales, ...newLocales };
  }
  componentWillLoad() {
    this._locales = { ...this._locales, ...this.locales };
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
  componentDidLoad() {
    if (!this.maxLabelLength) {
      const elementsToObserve = [this.host, this.fileNameRef, this.loadingRef].filter((el, i, arr) => el && arr.indexOf(el) === i);
      this.observer = new ResizeObserver(() => this.scheduleTruncate());
      elementsToObserve.forEach(el => this.observer.observe(el));
      this.scheduleTruncate();
    }
    else {
      this.isTruncated = this.file?.name?.length > this.maxLabelLength;
    }
  }
  disconnectedCallback() {
    this.observer?.disconnect();
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
      this.fileLoaded.emit({ name: this.file.name, size: this.file.size });
    };
    this.setReaderFormat(reader);
  }
  generateThumbnail() {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      // Check if the file is a GIF and create a static thumbnail using a canvas
      if (this.file?.name?.toLowerCase().endsWith('.gif')) {
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
          // Use the canvas content as the static thumbnail - Convert to PNG for a static thumbnail
          this.thumbnailUrl = canvas.toDataURL('image/png');
          this.isLoadingFinished = true;
        };
      }
      else {
        this.thumbnailUrl = result;
        this.isLoadingFinished = true;
      }
      this.fileLoaded.emit({ name: this.file.name, size: this.file.size });
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
    return (h(Host, { class: this.hostCssClasses(), exportparts: "file-item, wrapper, content, file-name, tooltip, loading, percentage, cross-icon", onClick: this.handleClick, role: "listitem" }, h("div", { class: this.itemCssClasses(), part: "file-item" }, this.setCurrentError(), h("div", { class: "content-wrapper", part: "wrapper" }, h("div", { class: this.blockCssClasses(), part: "content" }, h("div", { class: "icon-wrapper" }, this.setCurrentIcon()), h("wpp-tooltip-v3-6-0", { class: this.maxLabelLength ? 'computed' : '', ref: ref => (this.tooltipRef = ref), text: this.file.name, config: {
        popperOptions: { strategy: 'fixed' },
        onShow: () => {
          if (!this.isTruncated || (this.maxLabelLength && !(this.file?.name?.length > this.maxLabelLength)))
            return false;
        },
      }, part: "tooltip" }, h("wpp-typography-v3-6-0", { ref: ref => (this.fileNameRef = ref), class: this.fileNameCssClasses(), type: "s-body", part: "file-name", title: this.file.name }, this.maxLabelLength ? truncate(this.file.name, this.maxLabelLength, true) : this.file?.name)), !this.isFileWithError() ? (h("span", { ref: ref => (this.loadingRef = ref), class: "loading", part: "loading" }, this.isFileLoading()
      ? `${this.loaded}/${this.total} ${this.measurementUnit}`
      : `${this.total} ${this.measurementUnit}`)) : (h("span", { class: "error-message", part: "error-message" }, this.total, " ", this.measurementUnit))), h("div", { class: "controls-wrapper", part: "controls" }, this.isFileLoading() && (h("span", { class: "percentage", part: "percentage" }, this.percentage, "%")), this.file.deletable !== false && !this.isFileWithError() && (h("wpp-icon-cross-v3-6-0", { class: this.crossIconClasses(), part: "cross-icon", role: "button", tabindex: this.parentDisabled || this.file.disabled ? -1 : 0, "aria-disabled": this.parentDisabled || this.file.disabled ? 'true' : undefined, "aria-label": `Remove file ${this.file.name}`, onClick: this.handleCloseClick, onKeyDown: this.handleDeleteKeyDown, onBlur: this.handleDeleteBlur, onKeyUp: this.handleDeleteKeyUp }))))), h("wpp-typography-v3-6-0", { ref: ref => (this.measureRef = ref), type: "s-body", class: "measure", "aria-hidden": "true", role: "presentation" })));
  }
  static get is() { return "wpp-file-upload-item"; }
  static get registryIs() { return "wpp-file-upload-item-v3-6-0"; }
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
      "fileName": {
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
          "text": ""
        },
        "attribute": "file-name",
        "reflect": false
      },
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
          "text": "Maximum label length (in characters) of single loading item"
        },
        "attribute": "max-label-length",
        "reflect": false
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
      },
      "uploaded": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [{
              "name": "internal",
              "text": "- This prop is controlled by wpp-chat-input"
            }],
          "text": "Indicates if the file has been uploaded."
        },
        "attribute": "uploaded",
        "reflect": false
      },
      "parentDisabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "When true, this item inherits the parent uploader\u2019s disabled state.\nInteractive controls inside the item (e.g., the delete icon) must be non-interactive:\n- removed from the tab order (tabindex = -1)\n- marked as aria-disabled=\"true\"\n- click/keyboard handlers should no-op"
        },
        "attribute": "parent-disabled",
        "reflect": false
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
      "measurementUnit": {},
      "isPressed": {},
      "focusType": {}
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
      }, {
        "method": "fileLoaded",
        "name": "fileLoaded",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [{
              "name": "internal",
              "text": undefined
            }],
          "text": ""
        },
        "complexType": {
          "original": "{ name: string; size: number }",
          "resolved": "{ name: string; size: number; }",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "locales",
        "methodName": "onUpdateLocales"
      }];
  }
}
