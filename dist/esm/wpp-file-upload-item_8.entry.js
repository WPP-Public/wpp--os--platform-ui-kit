import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { e as truncate } from './utils-fb733700.js';
import { F as FOCUS_TYPE } from './common-69c8ea89.js';
import { L as LOCALES_DEFAULTS, a as getExtension, d as returnIconFromExtension } from './const-047a61fd.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';
import './consts-5bf9c29f.js';

var sizeFormat;
(function (sizeFormat) {
  sizeFormat["Bytes"] = "Bytes";
  sizeFormat["KB"] = "KB";
  sizeFormat["MB"] = "MB";
  sizeFormat["GB"] = "GB";
})(sizeFormat || (sizeFormat = {}));
var maxSize;
(function (maxSize) {
  maxSize[maxSize["Bytes"] = 10000] = "Bytes";
  maxSize[maxSize["KB"] = 1000000] = "KB";
  maxSize[maxSize["MB"] = 1000000000] = "MB";
})(maxSize || (maxSize = {}));

const wppFileUploadItemCss = ":host{--fu-item-bg-color:var(--wpp-file-upload-item-bg-color, var(--wpp-grey-color-200));--fu-item-height:var(--wpp-file-upload-item-height, 32px);--fu-item-padding:var(--wpp-file-upload-item-padding, 8px 10px 8px 8px);--fu-item-percentage-margin:var(--wpp-file-upload-item-percentage-margin, 0 8px 0 0);--fu-item-border-radius:var(--wpp-file-upload-item-border-radius, var(--wpp-border-radius-m));--fu-item-thumbnail-border-radius:var(--wpp-file-upload-item-thumbnail-border-radius, var(--wpp-border-radius-xs));--fu-item-icon-wrapper-width:var(--wpp-file-upload-item-icon-wrapper-width, 24px);--fu-item-icon-wrapper-height:var(--wpp-file-upload-item-icon-wrapper-height, 24px);--fu-item-thumbnail-margin:var(--wpp-file-upload-item-thumbnail-margin, 0 8px 0 0);--fu-item-item-icon-margin:var(--wpp-file-upload-item-icon-margin, 0 2px 0 0);--fu-item-item-color:var(--wpp-file-upload-item-color, var(--wpp-grey-color-700));--fu-item-item-name-color:var(--wpp-file-upload-item-name-color, var(--wpp-grey-color-900));--fu-item-close-icon-color-hover:var(--wpp-file-upload-item-close-icon-color-hover, var(--wpp-icon-color-hover));--fu-item-close-icon-active-color:var(--wpp-file-upload-item-close-icon-active-color, var(--wpp-icon-color-active));--fu-item-close-icon-first-border-color-focus:var(\n    --wpp-file-upload-item-close-icon-first-border-color-focus,\n    var(--wpp-grey-color-000)\n  );--fu-item-close-icon-second-border-color-focus:var(\n    --wpp-file-upload-item-close-icon-second-border-color-focus,\n    var(--wpp-brand-color)\n  );--fu-item-close-icon-border-radius-focus:var(\n    --wpp-file-upload-item-close-icon-border-radius-focus,\n    var(--wpp-border-radius-xs)\n  );--fu-item-loading-margin:var(--wpp-file-upload-item-loading-margin, 0px 10px 0px 0px);--fu-item-error-color:var(--wpp-file-upload-item-error-color, var(--wpp-text-color-danger));--fu-item-bg-color-disabled:var(--wpp-file-upload-item-bg-color-disabled, var(--wpp-grey-color-200));--fu-item-text-color-disabled:var(--wpp-file-upload-item-text-color-disabled, var(--wpp-text-color-disabled))}:host .wpp-tooltip{width:100%;overflow:hidden}:host .wpp-tooltip.computed{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}:host .wpp-tooltip::part(anchor){position:relative;width:100%}.thumbnail-preview{width:100%;height:100%;border-radius:var(--fu-item-thumbnail-border-radius);-o-object-fit:cover;object-fit:cover}.error-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:20px;width:100%;-ms-flex-pack:justify;justify-content:space-between}.item-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-sizing:border-box;box-sizing:border-box;-ms-flex-wrap:wrap;flex-wrap:wrap;max-width:var(--fu-item-max-width);min-height:var(--fu-item-height);background-color:var(--fu-item-bg-color);padding:var(--fu-item-padding);border-radius:var(--fu-item-border-radius);font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}.item-wrapper.disabled{background-color:var(--fu-item-bg-color-disabled);color:var(--fu-item-text-color-disabled);cursor:not-allowed}.item-wrapper.disabled .name,.item-wrapper.disabled .loading{--wpp-typography-color:var(--fu-item-text-color-disabled)}.item-wrapper.disabled .wpp-icon{color:var(--wpp-icon-color-disabled);pointer-events:none}.block{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px;overflow:hidden;width:100%;min-width:0}.block.block-error{gap:0}.icon-wrapper{width:100%;max-width:var(--fu-item-icon-wrapper-width);height:var(--fu-item-icon-wrapper-height);display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.extension-icon{display:-ms-flexbox;display:flex;margin:var(--fu-item-item-icon-margin)}.controls-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px}.percentage{color:var(--fu-item-item-color)}.loading{white-space:nowrap;color:var(--fu-item-item-color)}.name{--wpp-typography-color:var(--fu-item-item-name-color);width:100%;white-space:nowrap;-ms-flex:1 1 auto;flex:1 1 auto;min-width:0;overflow:hidden;display:block}.name::part(typography){text-overflow:initial}.measure{position:absolute;visibility:hidden;white-space:nowrap;left:-9999px;top:0;pointer-events:none}.error{-ms-flex:1;flex:1;margin:0}.content-wrapper{width:100%;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;gap:20px;min-width:0}.cross-icon{cursor:pointer;-webkit-transition:width 0.2s ease-in-out, height 0.2s ease-in-out;transition:width 0.2s ease-in-out, height 0.2s ease-in-out}.cross-icon:hover,.cross-icon.tab-focus{color:var(--fu-item-close-icon-color-hover)}.cross-icon:active,.cross-icon.pressed{color:var(--fu-item-close-icon-active-color)}.cross-icon:focus{outline:0}.cross-icon:focus-visible{border-radius:var(--fu-item-close-icon-border-radius-focus);outline:none;-webkit-box-shadow:0 0 0 1px var(--fu-item-close-icon-first-border-color-focus), 0 0 0 3px var(--fu-item-close-icon-second-border-color-focus);box-shadow:0 0 0 1px var(--fu-item-close-icon-first-border-color-focus), 0 0 0 3px var(--fu-item-close-icon-second-border-color-focus)}.inline-message-error::part(message-block){font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0);color:var(--fu-item-error-color)}";

const WppFileUploadItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppDelete = createEvent(this, "wppDelete", 1);
    this.wppClick = createEvent(this, "wppClick", 1);
    this.fileLoaded = createEvent(this, "fileLoaded", 7);
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
        return h("wpp-spinner-v3-4-0", null);
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
        return (h("div", { class: "error-wrapper" }, h("wpp-inline-message-v3-4-0", { class: "inline-message-error", message: currentError, type: "error", showTooltipFrom: 140, tooltipConfig: { popperOptions: { strategy: 'fixed' } } }), this.file.deletable !== false && (h("wpp-icon-cross-v3-4-0", { class: this.crossIconClasses(), part: "cross-icon", role: "button", tabindex: this.parentDisabled || this.file.disabled ? -1 : 0, "aria-disabled": this.parentDisabled || this.file.disabled ? 'true' : undefined, "aria-label": `Remove file ${this.file.name}`, onClick: this.handleCloseClick, onKeyDown: this.handleDeleteKeyDown, onKeyUp: this.handleDeleteKeyUp, onBlur: this.handleDeleteBlur }))));
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
    return (h(Host, { class: this.hostCssClasses(), exportparts: "file-item, wrapper, content, file-name, tooltip, loading, percentage, cross-icon", onClick: this.handleClick, role: "listitem" }, h("div", { class: this.itemCssClasses(), part: "file-item" }, this.setCurrentError(), h("div", { class: "content-wrapper", part: "wrapper" }, h("div", { class: this.blockCssClasses(), part: "content" }, h("div", { class: "icon-wrapper" }, this.setCurrentIcon()), h("wpp-tooltip-v3-4-0", { class: this.maxLabelLength ? 'computed' : '', ref: ref => (this.tooltipRef = ref), text: this.file.name, config: {
        popperOptions: { strategy: 'fixed' },
        onShow: () => {
          if (!this.isTruncated || (this.maxLabelLength && !(this.file?.name?.length > this.maxLabelLength)))
            return false;
        },
      }, part: "tooltip" }, h("wpp-typography-v3-4-0", { ref: ref => (this.fileNameRef = ref), class: this.fileNameCssClasses(), type: "s-body", part: "file-name", title: this.file.name }, this.maxLabelLength ? truncate(this.file.name, this.maxLabelLength, true) : this.file?.name)), !this.isFileWithError() && (h("span", { ref: ref => (this.loadingRef = ref), class: "loading", part: "loading" }, this.isFileLoading()
      ? `${this.loaded}/${this.total} ${this.measurementUnit}`
      : `${this.total} ${this.measurementUnit}`))), h("div", { class: "controls-wrapper", part: "controls" }, this.isFileLoading() && (h("span", { class: "percentage", part: "percentage" }, this.percentage, "%")), this.file.deletable !== false && !this.isFileWithError() && (h("wpp-icon-cross-v3-4-0", { class: this.crossIconClasses(), part: "cross-icon", role: "button", tabindex: this.parentDisabled || this.file.disabled ? -1 : 0, "aria-disabled": this.parentDisabled || this.file.disabled ? 'true' : undefined, "aria-label": `Remove file ${this.file.name}`, onClick: this.handleCloseClick, onKeyDown: this.handleDeleteKeyDown, onBlur: this.handleDeleteBlur, onKeyUp: this.handleDeleteKeyUp }))))), h("wpp-typography-v3-4-0", { ref: ref => (this.measureRef = ref), type: "s-body", class: "measure", "aria-hidden": "true", role: "presentation" })));
  }
  static get registryIs() { return "wpp-file-upload-item-v3-4-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "locales": ["onUpdateLocales"]
  }; }
};
WppFileUploadItem.style = wppFileUploadItemCss;

const wppIconCss$6 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconDatabase = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-database", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M3.59998 5.2C3.59998 4.64756 3.85222 4.16531 4.21936 3.7762C4.58349 3.39028 5.08238 3.06996 5.65332 2.81402C6.79658 2.30152 8.33388 2 9.99998 2C11.6661 2 13.2034 2.30152 14.3466 2.81402C14.9176 3.06996 15.4165 3.39028 15.7806 3.7762C16.1477 4.16531 16.4 4.64756 16.4 5.2V14.8C16.4 15.3524 16.1477 15.8347 15.7806 16.2238C15.4165 16.6097 14.9176 16.93 14.3466 17.186C13.2034 17.6985 11.6661 18 9.99998 18C8.33388 18 6.79658 17.6985 5.65332 17.186C5.08238 16.93 4.58349 16.6097 4.21936 16.2238C3.85222 15.8347 3.59998 15.3524 3.59998 14.8V5.2ZM4.79998 5.2C4.79998 5.36553 4.87233 5.56727 5.09217 5.80027C5.31503 6.03647 5.66554 6.2764 6.14419 6.49097C7.10012 6.91949 8.46282 7.2 9.99998 7.2C11.5371 7.2 12.8998 6.91949 13.8558 6.49097C14.3344 6.2764 14.6849 6.03647 14.9078 5.80027C15.1276 5.56727 15.2 5.36553 15.2 5.2C15.2 5.03447 15.1276 4.83273 14.9078 4.59973C14.6849 4.36353 14.3344 4.1236 13.8558 3.90903C12.8998 3.48051 11.5371 3.2 9.99998 3.2C8.46282 3.2 7.10012 3.48051 6.14419 3.90903C5.66554 4.1236 5.31503 4.36353 5.09217 4.59973C4.87233 4.83273 4.79998 5.03447 4.79998 5.2ZM15.2 7.11394C14.9432 7.29025 14.6555 7.44754 14.3466 7.58598C13.2034 8.09848 11.6661 8.4 9.99998 8.4C8.33388 8.4 6.79658 8.09848 5.65332 7.58598C5.34448 7.44754 5.05672 7.29025 4.79998 7.11394V14.8C4.79998 14.9655 4.87233 15.1673 5.09217 15.4003C5.31503 15.6365 5.66554 15.8764 6.14419 16.091C7.10012 16.5195 8.46282 16.8 9.99998 16.8C11.5371 16.8 12.8998 16.5195 13.8558 16.091C14.3344 15.8764 14.6849 15.6365 14.9078 15.4003C15.1276 15.1673 15.2 14.9655 15.2 14.8V7.11394Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-database-v3-4-0"; }
};
WppIconDatabase.style = wppIconCss$6;

const wppIconCss$5 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconDocument = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-document", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.20837 1.5415C4.10374 1.5415 3.20837 2.43687 3.20837 3.5415V16.4582C3.20837 17.5628 4.10374 18.4582 5.20837 18.4582H14.7917C15.8963 18.4582 16.7917 17.5628 16.7917 16.4582V7.70817C16.7917 7.49872 16.7059 7.30932 16.5674 7.17325L11.16 1.76582C11.0239 1.62737 10.8345 1.5415 10.625 1.5415H5.20837ZM11.375 4.1022V6.45817C11.375 6.73437 11.5988 6.95817 11.875 6.95817H14.231L11.375 4.1022ZM4.70837 3.5415C4.70837 3.2653 4.93217 3.0415 5.20837 3.0415H9.87504V6.45817C9.87504 7.5628 10.7704 8.45817 11.875 8.45817H15.2917V16.4582C15.2917 16.7344 15.0679 16.9582 14.7917 16.9582H5.20837C4.93217 16.9582 4.70837 16.7344 4.70837 16.4582V3.5415ZM6.54163 11.0415C6.54163 10.6273 6.87741 10.2915 7.29163 10.2915H12.7083C13.1225 10.2915 13.4583 10.6273 13.4583 11.0415C13.4583 11.4557 13.1225 11.7915 12.7083 11.7915H7.29163C6.87741 11.7915 6.54163 11.4557 6.54163 11.0415ZM7.29163 13.2085C6.87741 13.2085 6.54163 13.5443 6.54163 13.9585C6.54163 14.3727 6.87741 14.7085 7.29163 14.7085H11.0416C11.4558 14.7085 11.7916 14.3727 11.7916 13.9585C11.7916 13.5443 11.4558 13.2085 11.0416 13.2085H7.29163Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-document-v3-4-0"; }
};
WppIconDocument.style = wppIconCss$5;

const wppIconCss$4 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFile = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-file", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.20837 1.5415C4.10374 1.5415 3.20837 2.43687 3.20837 3.5415V16.4582C3.20837 17.5628 4.10374 18.4582 5.20837 18.4582H14.7917C15.8963 18.4582 16.7917 17.5628 16.7917 16.4582V7.70817C16.7917 7.49872 16.7059 7.30932 16.5674 7.17325L11.16 1.76582C11.0239 1.62737 10.8345 1.5415 10.625 1.5415H5.20837ZM11.375 4.1022V6.45817C11.375 6.73437 11.5988 6.95817 11.875 6.95817H14.231L11.375 4.1022ZM4.70837 3.5415C4.70837 3.2653 4.93217 3.0415 5.20837 3.0415H9.87504V6.45817C9.87504 7.5628 10.7704 8.45817 11.875 8.45817H15.2917V16.4582C15.2917 16.7344 15.0679 16.9582 14.7917 16.9582H5.20837C4.93217 16.9582 4.70837 16.7344 4.70837 16.4582V3.5415Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-file-v3-4-0"; }
};
WppIconFile.style = wppIconCss$4;

const wppIconCss$3 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconFileZip = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-file-zip", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M7.99275 4.32188C7.69224 4.11303 7.33399 4 6.96554 4H3.8L3.67676 4.00415C2.74013 4.06748 2 4.84731 2 5.8V15L2.00415 15.1232C2.06748 16.0599 2.84731 16.8 3.8 16.8H16.2L16.3232 16.7958C17.2599 16.7325 18 15.9527 18 15V7.8L17.9958 7.67676L17.9828 7.55031C17.8613 6.67437 17.1094 6 16.2 6H10.0176L8.11787 4.4172L7.99275 4.32188ZM11.1974 7.2V8.99611C11.1974 9.32748 11.466 9.59611 11.7974 9.59611H12.3974V10.3981H12.1974C11.866 10.3981 11.5974 10.6667 11.5974 10.9981C11.5974 11.3295 11.866 11.5981 12.1974 11.5981H12.3974V12.7981H12.1974C11.866 12.7981 11.5974 13.0667 11.5974 13.3981C11.5974 13.7295 11.866 13.9981 12.1974 13.9981H12.3974V15.6H3.8L3.71858 15.5945C3.42572 15.5548 3.2 15.3038 3.2 15V9.1992L6.96554 9.2L7.12268 9.19313C7.48725 9.16119 7.83482 9.01867 8.11787 8.7828L10.0168 7.2H11.1974ZM13.5974 15.2003H13.7974C14.1287 15.2003 14.3974 14.9317 14.3974 14.6003C14.3974 14.269 14.1287 14.0003 13.7974 14.0003H13.5974V12.8003H13.7974C14.1287 12.8003 14.3974 12.5317 14.3974 12.2003C14.3974 11.869 14.1287 11.6003 13.7974 11.6003H13.5974V9.59611H14.1974C14.5287 9.59611 14.7974 9.32748 14.7974 8.99611V7.2H16.2L16.2814 7.20548C16.5743 7.24521 16.8 7.49624 16.8 7.8V15L16.7945 15.0814C16.7548 15.3743 16.5038 15.6 16.2 15.6H13.5974V15.2003ZM13.5974 7.2V8.39611L12.3974 8.39611V7.2H13.5974ZM3.8 5.2H6.96554L7.04904 5.20584C7.15915 5.22131 7.26339 5.26718 7.34965 5.33907L8.8624 6.5992L7.34965 7.86093L7.28177 7.9099C7.18728 7.96851 7.07783 8 6.96554 8L3.2 7.9992V5.8L3.20548 5.71858C3.24521 5.42572 3.49624 5.2 3.8 5.2Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-file-zip-v3-4-0"; }
};
WppIconFileZip.style = wppIconCss$3;

const wppIconCss$2 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconMusic = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-music", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M16.0581 2.11863C16.2103 2.23185 16.3 2.41034 16.3 2.60001V13.4C16.3 13.4213 16.2988 13.4424 16.2967 13.4632C16.2988 13.5085 16.3 13.5541 16.3 13.6C16.3 15.1464 15.0463 16.4 13.5 16.4C11.9536 16.4 10.7 15.1464 10.7 13.6C10.7 12.0536 11.9536 10.8 13.5 10.8C14.0949 10.8 14.6464 10.9855 15.1 11.3019V6.60642L8.29995 8.64642V15C8.29995 15.0213 8.29884 15.0424 8.29667 15.0631C8.29885 15.1085 8.29995 15.1541 8.29995 15.2C8.29995 16.7464 7.04635 18 5.49995 18C3.95355 18 2.69995 16.7464 2.69995 15.2C2.69995 13.6536 3.95355 12.4 5.49995 12.4C6.09485 12.4 6.64642 12.5855 7.09995 12.9019V5.00001C7.09995 4.73504 7.27375 4.50145 7.52754 4.42531L15.5275 2.02531C15.7092 1.97081 15.9059 2.00541 16.0581 2.11863ZM8.29995 7.39359L15.1 5.35359V3.40642L8.29995 5.44642V7.39359ZM5.49995 13.6C4.6163 13.6 3.89995 14.3163 3.89995 15.2C3.89995 16.0837 4.6163 16.8 5.49995 16.8C6.38361 16.8 7.09995 16.0837 7.09995 15.2C7.09995 14.3163 6.38361 13.6 5.49995 13.6ZM11.9 13.6C11.9 14.4837 12.6163 15.2 13.5 15.2C14.3836 15.2 15.1 14.4837 15.1 13.6C15.1 12.7163 14.3836 12 13.5 12C12.6163 12 11.9 12.7163 11.9 13.6Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-music-v3-4-0"; }
};
WppIconMusic.style = wppIconCss$2;

const wppIconCss$1 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconPitch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-pitch", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M13.864 7.28033C14.1569 6.98744 14.1569 6.51256 13.864 6.21967C13.5711 5.92678 13.0962 5.92678 12.8033 6.21967L10.8337 8.18934L9.69732 7.053C9.40443 6.76011 8.92955 6.76011 8.63666 7.053L6.13666 9.553C5.84377 9.8459 5.84377 10.3208 6.13666 10.6137C6.42956 10.9066 6.90443 10.9066 7.19732 10.6137L9.16699 8.64399L10.3033 9.78033C10.5962 10.0732 11.0711 10.0732 11.364 9.78033L13.864 7.28033Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M0.75 3C0.75 2.58579 1.08579 2.25 1.5 2.25H18.5C18.9142 2.25 19.25 2.58579 19.25 3C19.25 3.41421 18.9142 3.75 18.5 3.75H18.25V12.1667C18.25 12.8573 17.9692 13.5162 17.4752 13.9993C16.9817 14.4818 16.3158 14.75 15.625 14.75H10.75V16.75H12.5C12.9142 16.75 13.25 17.0858 13.25 17.5C13.25 17.9142 12.9142 18.25 12.5 18.25H7.5C7.08579 18.25 6.75 17.9142 6.75 17.5C6.75 17.0858 7.08579 16.75 7.5 16.75H9.25V14.75H4.375C3.68418 14.75 3.01835 14.4818 2.52484 13.9993C2.03075 13.5162 1.75 12.8573 1.75 12.1667V3.75H1.5C1.08579 3.75 0.75 3.41421 0.75 3ZM3.25 12.1667V3.75H16.75V12.1667C16.75 12.4485 16.6357 12.7222 16.4265 12.9268C16.2167 13.1319 15.9287 13.25 15.625 13.25H4.375C4.07126 13.25 3.78326 13.1319 3.57351 12.9268C3.36434 12.7222 3.25 12.4485 3.25 12.1667Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-pitch-v3-4-0"; }
};
WppIconPitch.style = wppIconCss$1;

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconSpreadsheet = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-spreadsheet", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M7.24897 9.57704H12.748C13.5656 9.57704 14.2285 10.2399 14.2285 11.0575V14.4415C14.2285 15.2592 13.5656 15.922 12.748 15.922H7.24897C6.43131 15.922 5.76847 15.2592 5.76847 14.4415V11.0575C5.76847 10.2399 6.43131 9.57704 7.24897 9.57704ZM7.03747 11.0575V12.115H8.30647V10.846H7.24897C7.13216 10.846 7.03747 10.9407 7.03747 11.0575ZM7.03747 13.384V14.4415C7.03747 14.5583 7.13216 14.653 7.24897 14.653H8.30647V13.384H7.03747ZM9.57547 13.384V14.653H12.748C12.8648 14.653 12.9595 14.5583 12.9595 14.4415V13.384H9.57547ZM12.9595 12.115V11.0575C12.9595 10.9407 12.8648 10.846 12.748 10.846H9.57547V12.115H12.9595ZM11.3394 2.0358C11.3267 2.02315 11.3124 2.01218 11.2982 2.00127C11.2876 1.99322 11.2772 1.9852 11.2675 1.97658C11.2074 1.92243 11.1482 1.86913 11.0822 1.8243C11.0608 1.80986 11.0374 1.79847 11.0141 1.78713C11.0005 1.78052 10.987 1.77393 10.9739 1.76677C10.9598 1.75881 10.9457 1.75066 10.9316 1.74251C10.8858 1.71598 10.8397 1.68934 10.7912 1.66863C10.6245 1.59926 10.4452 1.56457 10.2633 1.55188C10.2466 1.55082 10.2301 1.54857 10.2135 1.54631C10.1906 1.54318 10.1676 1.54004 10.144 1.54004H4.92247C3.98848 1.54004 3.23047 2.29806 3.23047 3.23204V16.768C3.23047 17.702 3.98848 18.46 4.92247 18.46H15.0745C16.0085 18.46 16.7665 17.702 16.7665 16.768V8.16253C16.7665 7.71415 16.588 7.28353 16.2707 6.96628L11.3394 2.0358ZM15.0745 17.191H4.92247C4.68897 17.191 4.49947 17.0007 4.49947 16.768V3.23204C4.49947 2.99939 4.68897 2.80904 4.92247 2.80904H9.99847V6.61604C9.99847 7.55002 10.7565 8.30804 11.6905 8.30804H15.4975V16.768C15.4975 17.0007 15.308 17.191 15.0745 17.191ZM14.5483 7.03904H11.6905C11.457 7.03904 11.2675 6.84869 11.2675 6.61604V3.75741L14.5483 7.03904Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-spreadsheet-v3-4-0"; }
};
WppIconSpreadsheet.style = wppIconCss;

export { WppFileUploadItem as wpp_file_upload_item, WppIconDatabase as wpp_icon_database, WppIconDocument as wpp_icon_document, WppIconFile as wpp_icon_file, WppIconFileZip as wpp_icon_file_zip, WppIconMusic as wpp_icon_music, WppIconPitch as wpp_icon_pitch, WppIconSpreadsheet as wpp_icon_spreadsheet };
