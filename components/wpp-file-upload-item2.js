import { h, proxyCustomElement, HTMLElement, createEvent, Host } from '@stencil/core/internal/client';
import { F as FOCUS_TYPE } from './common.js';
import { d as defineCustomElement$k } from './wpp-action-button2.js';
import { d as defineCustomElement$j } from './wpp-icon-cross2.js';
import { d as defineCustomElement$i } from './wpp-icon-database2.js';
import { d as defineCustomElement$h } from './wpp-icon-document2.js';
import { d as defineCustomElement$g } from './wpp-icon-error2.js';
import { d as defineCustomElement$f } from './wpp-icon-file2.js';
import { d as defineCustomElement$e } from './wpp-icon-file-zip2.js';
import { d as defineCustomElement$d } from './wpp-icon-image2.js';
import { d as defineCustomElement$c } from './wpp-icon-info-message2.js';
import { d as defineCustomElement$b } from './wpp-icon-music2.js';
import { d as defineCustomElement$a } from './wpp-icon-pitch2.js';
import { d as defineCustomElement$9 } from './wpp-icon-spreadsheet2.js';
import { d as defineCustomElement$8 } from './wpp-icon-success2.js';
import { d as defineCustomElement$7 } from './wpp-icon-video-clip2.js';
import { d as defineCustomElement$6 } from './wpp-icon-warning2.js';
import { d as defineCustomElement$5 } from './wpp-inline-message2.js';
import { d as defineCustomElement$4 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$3 } from './wpp-spinner2.js';
import { d as defineCustomElement$2 } from './wpp-tooltip2.js';
import { d as defineCustomElement$1 } from './wpp-typography2.js';

const convertMBToBytes = (size) => size * 1024 ** 2;
const getExtension = (filename = '') => `.${filename.split('.').pop()}`;
const getExtensionsList = (acceptConfig) => Object.entries(acceptConfig).reduce((acc, [_, extensions]) => [...acc, ...extensions], []);
const getBaseName = (fileName = '') => fileName.split('.')[0];
const renameFile = (file, newFileName) => new File([file], newFileName, { type: file.type });
const modifyPropertiesOnFile = (file, properties) => new File([file], file.name, { ...properties });

const EXTENSION_TO_TYPE = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  txt: 'text/plain',
  csv: 'text/csv',
  html: 'text/html',
  xml: 'application/xml',
  json: 'application/json',
  png: 'image/png',
  jpg: 'image/jpg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  bmp: 'image/bmp',
  tiff: 'image/tiff',
  svg: 'image/svg+xml',
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  ogg: 'audio/ogg',
  mp4: 'video/mp4',
  avi: 'video/x-msvideo',
  mov: 'video/quicktime',
  wmv: 'video/x-ms-wmv',
  flv: 'video/x-flv',
  rar: 'application/x-rar-compressed',
  zip: 'application/zip',
  '7z': 'application/x-7z-compressed',
  tar: 'application/x-tar',
  gz: 'application/gzip',
  bz2: 'application/x-bzip2',
  exe: 'application/x-msdownload',
  dmg: 'application/x-apple-diskimage',
  apk: 'application/vnd.android.package-archive',
  iso: 'application/x-iso9660-image',
  css: 'text/css',
  js: 'application/javascript',
  woff: 'application/font-woff',
  woff2: 'application/font-woff2',
  ttf: 'application/font-sfnt',
  otf: 'application/font-sfnt',
  eot: 'application/vnd.ms-fontobject',
  rtf: 'application/rtf',
  ics: 'text/calendar',
  jsonld: 'application/ld+json',
  key: 'application/x-iwork-keynote-sffkey',
};
const returnIconFromExtension = (fileExtension, thumbnailUrl) => {
  if (thumbnailUrl) {
    return h("img", { src: thumbnailUrl, alt: "File Thumbnail", class: "thumbnail-preview" });
  }
  switch (fileExtension) {
    // Text
    case '.txt':
      return h("wpp-icon-document-v4-0-0", null);
    // Compressed
    case '.zip':
    case '.rar':
    case '.7z':
      return h("wpp-icon-file-zip-v4-0-0", null);
    // Image
    case '.png':
    case '.jpg':
    case '.jpeg':
    case '.svg':
    case '.gif':
      return h("wpp-icon-image-v4-0-0", null);
    // Video
    case '.mp4':
    case '.mov':
    case '.avi':
    case '.wmv':
    case '.mkv':
    case '.flv':
    case '.webm':
      return h("wpp-icon-video-clip-v4-0-0", null);
    // Audio
    case '.mp3':
    case '.wav':
    case '.ogg':
    case '.wma':
    case '.m4a':
    case '.aac':
      return h("wpp-icon-music-v4-0-0", null);
    // Data
    case '.csv':
    case '.json':
    case '.xml':
    case '.db':
    case '.sqlite':
    case '.dat':
      return h("wpp-icon-database-v4-0-0", null);
    // Presentation
    case '.pptx':
    case '.key':
    case '.odp':
    case '.pdf':
    case '.pps':
    case '.sldx':
    case '.ppt':
      return h("wpp-icon-pitch-v4-0-0", null);
    // Spreadsheet
    case '.xlsx':
    case '.xls':
    case '.ods':
    case '.numbers':
    case '.tsv':
      return h("wpp-icon-spreadsheet-v4-0-0", null);
    default:
      return h("wpp-icon-file-v4-0-0", null);
  }
};
const LOCALES_DEFAULTS = {
  label: 'Choose a file',
  text: 'to upload or drag it here',
  info: (accept, size) => `Only ${accept} file at ${size} MB or less`,
  sizeError: 'File exceeds size limit',
  formatError: 'Wrong format',
  singleFileLimitError: 'Only one file is allowed',
  multipleFileLimitError: 'File limit has been reached',
};

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

const wppFileUploadItemCss = ":host{--fu-item-bg-color:var(--wpp-file-upload-item-bg-color, var(--wpp-grey-color-200));--fu-item-height:var(--wpp-file-upload-item-height, 32px);--fu-item-padding:var(--wpp-file-upload-item-padding, 8px 10px 8px 8px);--fu-item-percentage-margin:var(--wpp-file-upload-item-percentage-margin, 0 8px 0 0);--fu-item-border-radius:var(--wpp-file-upload-item-border-radius, var(--wpp-border-radius-m));--fu-item-thumbnail-border-radius:var(--wpp-file-upload-item-thumbnail-border-radius, var(--wpp-border-radius-xs));--fu-item-icon-wrapper-width:var(--wpp-file-upload-item-icon-wrapper-width, 24px);--fu-item-icon-wrapper-height:var(--wpp-file-upload-item-icon-wrapper-height, 24px);--fu-item-thumbnail-margin:var(--wpp-file-upload-item-thumbnail-margin, 0 8px 0 0);--fu-item-item-icon-margin:var(--wpp-file-upload-item-icon-margin, 0 2px 0 0);--fu-item-item-color:var(--wpp-file-upload-item-color, var(--wpp-grey-color-700));--fu-item-item-name-color:var(--wpp-file-upload-item-name-color, var(--wpp-grey-color-900));--fu-item-close-icon-color-hover:var(--wpp-file-upload-item-close-icon-color-hover, var(--wpp-icon-color-hover));--fu-item-close-icon-active-color:var(--wpp-file-upload-item-close-icon-active-color, var(--wpp-icon-color-active));--fu-item-close-icon-first-border-color-focus:var(\n    --wpp-file-upload-item-close-icon-first-border-color-focus,\n    var(--wpp-grey-color-000)\n  );--fu-item-close-icon-second-border-color-focus:var(\n    --wpp-file-upload-item-close-icon-second-border-color-focus,\n    var(--wpp-brand-color)\n  );--fu-item-close-icon-border-radius-focus:var(\n    --wpp-file-upload-item-close-icon-border-radius-focus,\n    var(--wpp-border-radius-xs)\n  );--fu-item-loading-margin:var(--wpp-file-upload-item-loading-margin, 0px 10px 0px 0px);--fu-item-error-color:var(--wpp-file-upload-item-error-color, var(--wpp-text-color-danger));--fu-item-bg-color-disabled:var(--wpp-file-upload-item-bg-color-disabled, var(--wpp-grey-color-200));--fu-item-text-color-disabled:var(--wpp-file-upload-item-text-color-disabled, var(--wpp-text-color-disabled))}:host .wpp-tooltip{width:100%;overflow:hidden}:host .wpp-tooltip.computed{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}:host .wpp-tooltip::part(anchor){position:relative;width:100%}.thumbnail-preview{width:100%;height:100%;border-radius:var(--fu-item-thumbnail-border-radius);-o-object-fit:cover;object-fit:cover}.error-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:20px;width:100%;-ms-flex-pack:justify;justify-content:space-between}.item-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-sizing:border-box;box-sizing:border-box;-ms-flex-wrap:wrap;flex-wrap:wrap;max-width:var(--fu-item-max-width);min-height:var(--fu-item-height);background-color:var(--fu-item-bg-color);padding:var(--fu-item-padding);border-radius:var(--fu-item-border-radius);font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}.item-wrapper.disabled{background-color:var(--fu-item-bg-color-disabled);color:var(--fu-item-text-color-disabled);cursor:not-allowed}.item-wrapper.disabled .name,.item-wrapper.disabled .loading{--wpp-typography-color:var(--fu-item-text-color-disabled)}.item-wrapper.disabled .wpp-icon{color:var(--wpp-icon-color-disabled);pointer-events:none}.block{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px;overflow:hidden;width:100%;min-width:0}.block.block-error{gap:0}.icon-wrapper{width:100%;max-width:var(--fu-item-icon-wrapper-width);height:var(--fu-item-icon-wrapper-height);display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.extension-icon{display:-ms-flexbox;display:flex;margin:var(--fu-item-item-icon-margin)}.controls-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px}.percentage{color:var(--fu-item-item-color)}.loading{white-space:nowrap;color:var(--fu-item-item-color)}.error-message{margin-left:8px;white-space:nowrap;color:var(--fu-item-item-color)}.name{--wpp-typography-color:var(--fu-item-item-name-color);width:100%;white-space:nowrap;-ms-flex:1 1 auto;flex:1 1 auto;min-width:0;overflow:hidden;display:block}.name::part(typography){text-overflow:initial}.measure{position:absolute;visibility:hidden;white-space:nowrap;left:-9999px;top:0;pointer-events:none}.error{-ms-flex:1;flex:1;margin:0}.content-wrapper{width:100%;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;gap:20px;min-width:0}.cross-icon{cursor:pointer;-webkit-transition:width 0.2s ease-in-out, height 0.2s ease-in-out;transition:width 0.2s ease-in-out, height 0.2s ease-in-out}.cross-icon:hover,.cross-icon.tab-focus{color:var(--fu-item-close-icon-color-hover)}.cross-icon:active,.cross-icon.pressed{color:var(--fu-item-close-icon-active-color)}.cross-icon:focus{outline:0}.cross-icon:focus-visible{border-radius:var(--fu-item-close-icon-border-radius-focus);outline:none;-webkit-box-shadow:0 0 0 1px var(--fu-item-close-icon-first-border-color-focus), 0 0 0 3px var(--fu-item-close-icon-second-border-color-focus);box-shadow:0 0 0 1px var(--fu-item-close-icon-first-border-color-focus), 0 0 0 3px var(--fu-item-close-icon-second-border-color-focus)}.inline-message-error::part(message-block){font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0);color:var(--fu-item-error-color)}";

const WppFileUploadItem = /*@__PURE__*/ proxyCustomElement(class WppFileUploadItem extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
        return h("wpp-spinner-v4-0-0", null);
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
        return (h("div", { class: "error-wrapper" }, h("wpp-inline-message-v4-0-0", { class: "inline-message-error", message: currentError, type: "error", showTooltipFrom: 140, tooltipConfig: { popperOptions: { strategy: 'fixed' } } }), this.file.deletable !== false && (h("wpp-icon-cross-v4-0-0", { class: this.crossIconClasses(), part: "cross-icon", role: "button", tabindex: this.parentDisabled || this.file.disabled ? -1 : 0, "aria-disabled": this.parentDisabled || this.file.disabled ? 'true' : undefined, "aria-label": `Remove file ${this.file.name}`, onClick: this.handleCloseClick, onKeyDown: this.handleDeleteKeyDown, onKeyUp: this.handleDeleteKeyUp, onBlur: this.handleDeleteBlur }))));
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
    // Auto-calculate truncation using ResizeObserver
    const elementsToObserve = [this.host, this.fileNameRef, this.loadingRef].filter((el, i, arr) => el && arr.indexOf(el) === i);
    this.observer = new ResizeObserver(() => this.scheduleTruncate());
    elementsToObserve.forEach(el => this.observer.observe(el));
    this.scheduleTruncate();
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
    return (h(Host, { class: this.hostCssClasses(), exportparts: "file-item, wrapper, content, file-name, tooltip, loading, percentage, cross-icon", onClick: this.handleClick, role: "listitem" }, h("div", { class: this.itemCssClasses(), part: "file-item" }, this.setCurrentError(), h("div", { class: "content-wrapper", part: "wrapper" }, h("div", { class: this.blockCssClasses(), part: "content" }, h("div", { class: "icon-wrapper" }, this.setCurrentIcon()), h("wpp-tooltip-v4-0-0", { ref: ref => (this.tooltipRef = ref), text: this.file.name, config: {
        popperOptions: { strategy: 'fixed' },
        onShow: () => {
          if (!this.isTruncated)
            return false;
        },
      }, part: "tooltip" }, h("wpp-typography-v4-0-0", { ref: ref => (this.fileNameRef = ref), class: this.fileNameCssClasses(), type: "s-body", part: "file-name", title: this.file.name }, this.file?.name)), !this.isFileWithError() ? (h("span", { ref: ref => (this.loadingRef = ref), class: "loading", part: "loading" }, this.isFileLoading()
      ? `${this.loaded}/${this.total} ${this.measurementUnit}`
      : `${this.total} ${this.measurementUnit}`)) : (h("span", { class: "error-message", part: "error-message" }, this.total, " ", this.measurementUnit))), h("div", { class: "controls-wrapper", part: "controls" }, this.isFileLoading() && (h("span", { class: "percentage", part: "percentage" }, this.percentage, "%")), this.file.deletable !== false && !this.isFileWithError() && (h("wpp-icon-cross-v4-0-0", { class: this.crossIconClasses(), part: "cross-icon", role: "button", tabindex: this.parentDisabled || this.file.disabled ? -1 : 0, "aria-disabled": this.parentDisabled || this.file.disabled ? 'true' : undefined, "aria-label": `Remove file ${this.file.name}`, onClick: this.handleCloseClick, onKeyDown: this.handleDeleteKeyDown, onBlur: this.handleDeleteBlur, onKeyUp: this.handleDeleteKeyUp }))))), h("wpp-typography-v4-0-0", { ref: ref => (this.measureRef = ref), type: "s-body", class: "measure", "aria-hidden": "true", role: "presentation" })));
  }
  static get registryIs() { return "wpp-file-upload-item-v4-0-0"; }
  get host() { return this; }
  static get watchers() { return {
    "locales": ["onUpdateLocales"]
  }; }
  static get style() { return wppFileUploadItemCss; }
}, [1, "wpp-file-upload-item", "wpp-file-upload-item-v4-0-0", {
    "fileName": [1, "file-name"],
    "file": [1040],
    "format": [1],
    "currentIndex": [2, "current-index"],
    "locales": [16],
    "uploaded": [4],
    "parentDisabled": [4, "parent-disabled"],
    "thumbnailUrl": [32],
    "percentage": [32],
    "total": [32],
    "loaded": [32],
    "isLoadingFinished": [32],
    "measurementUnit": [32],
    "isPressed": [32],
    "focusType": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-file-upload-item-v4-0-0", "wpp-action-button-v4-0-0", "wpp-icon-cross-v4-0-0", "wpp-icon-database-v4-0-0", "wpp-icon-document-v4-0-0", "wpp-icon-error-v4-0-0", "wpp-icon-file-v4-0-0", "wpp-icon-file-zip-v4-0-0", "wpp-icon-image-v4-0-0", "wpp-icon-info-message-v4-0-0", "wpp-icon-music-v4-0-0", "wpp-icon-pitch-v4-0-0", "wpp-icon-spreadsheet-v4-0-0", "wpp-icon-success-v4-0-0", "wpp-icon-video-clip-v4-0-0", "wpp-icon-warning-v4-0-0", "wpp-inline-message-v4-0-0", "wpp-internal-tooltip-v4-0-0", "wpp-spinner-v4-0-0", "wpp-tooltip-v4-0-0", "wpp-typography-v4-0-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-file-upload-item-v4-0-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppFileUploadItem);
      }
      break;
    case "wpp-action-button-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$k();
      }
      break;
    case "wpp-icon-cross-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$j();
      }
      break;
    case "wpp-icon-database-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "wpp-icon-document-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "wpp-icon-error-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "wpp-icon-file-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "wpp-icon-file-zip-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-icon-image-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-icon-info-message-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-icon-music-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-icon-pitch-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-icon-spreadsheet-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-icon-success-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-icon-video-clip-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-icon-warning-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-inline-message-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-internal-tooltip-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-spinner-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-tooltip-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-typography-v4-0-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { EXTENSION_TO_TYPE as E, LOCALES_DEFAULTS as L, WppFileUploadItem as W, getBaseName as a, getExtensionsList as b, convertMBToBytes as c, defineCustomElement as d, getExtension as g, modifyPropertiesOnFile as m, renameFile as r };
