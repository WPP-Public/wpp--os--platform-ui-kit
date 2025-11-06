import { h, Fragment, proxyCustomElement, HTMLElement, createEvent, Host } from '@stencil/core/internal/client';
import { c as truncate } from './utils.js';
import { d as renderIcons, g as getExtension } from './utils2.js';
import { d as defineCustomElement$j } from './wpp-action-button2.js';
import { d as defineCustomElement$i } from './wpp-icon-cross2.js';
import { d as defineCustomElement$h } from './wpp-icon-database2.js';
import { d as defineCustomElement$g } from './wpp-icon-document2.js';
import { d as defineCustomElement$f } from './wpp-icon-error2.js';
import { d as defineCustomElement$e } from './wpp-icon-file2.js';
import { d as defineCustomElement$d } from './wpp-icon-file-zip2.js';
import { d as defineCustomElement$c } from './wpp-icon-image2.js';
import { d as defineCustomElement$b } from './wpp-icon-info-message2.js';
import { d as defineCustomElement$a } from './wpp-icon-music2.js';
import { d as defineCustomElement$9 } from './wpp-icon-pitch2.js';
import { d as defineCustomElement$8 } from './wpp-icon-spreadsheet2.js';
import { d as defineCustomElement$7 } from './wpp-icon-success2.js';
import { d as defineCustomElement$6 } from './wpp-icon-video-clip2.js';
import { d as defineCustomElement$5 } from './wpp-icon-warning2.js';
import { d as defineCustomElement$4 } from './wpp-inline-message2.js';
import { d as defineCustomElement$3 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$2 } from './wpp-spinner2.js';
import { d as defineCustomElement$1 } from './wpp-tooltip2.js';

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
      return h("wpp-icon-document-v2-22-0", null);
    // Compressed
    case '.zip':
    case '.rar':
    case '.7z':
      return h("wpp-icon-file-zip-v2-22-0", null);
    // Image
    case '.png':
    case '.jpg':
    case '.jpeg':
    case '.svg':
    case '.gif':
      return h("wpp-icon-image-v2-22-0", null);
    // Video
    case '.mp4':
    case '.mov':
    case '.avi':
    case '.wmv':
    case '.mkv':
    case '.flv':
    case '.webm':
      return h("wpp-icon-video-clip-v2-22-0", null);
    // Audio
    case '.mp3':
    case '.wav':
    case '.ogg':
    case '.wma':
    case '.m4a':
    case '.aac':
      return h("wpp-icon-music-v2-22-0", null);
    // Data
    case '.csv':
    case '.json':
    case '.xml':
    case '.db':
    case '.sqlite':
    case '.dat':
      return h("wpp-icon-database-v2-22-0", null);
    // Presentation
    case '.pptx':
    case '.key':
    case '.odp':
    case '.pdf':
    case '.pps':
    case '.sldx':
    case '.ppt':
      return h("wpp-icon-pitch-v2-22-0", null);
    // Spreadsheet
    case '.xlsx':
    case '.xls':
    case '.ods':
    case '.numbers':
    case '.tsv':
      return h("wpp-icon-spreadsheet-v2-22-0", null);
    //  * WPPOPENDS-512 WPPOPENDS-311
    // Adding an edge case to ensure inclusion
    // Extracting all the icon names from iconsList, to force register and prevent tree shaking during build
    case '.rtf':
      return h(Fragment, null, renderIcons());
    default:
      return h("wpp-icon-file-v2-22-0", null);
  }
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

const wppFileUploadItemCss = ":host{--fu-item-bg-color:var(--wpp-file-upload-item-bg-color, var(--wpp-grey-color-200));--fu-item-height:var(--wpp-file-upload-item-height, 32px);--fu-item-padding:var(--wpp-file-upload-item-padding, 8px);--fu-item-margin:var(--wpp-file-upload-item-margin, 8px 0 0 0);--fu-item-percentage-margin:var(--wpp-file-upload-item-percentage-margin, 0 8px 0 0);--fu-item-name-margin:var(--wpp-file-upload-item-name-margin, 0);--fu-item-name-error-margin:var(--wpp-file-upload-item-name-error-margin, 0 8px 0 24px);--fu-item-border-radius:var(--wpp-file-upload-item-border-radius, var(--wpp-border-radius-m));--fu-item-thumbnail-border-radius:var(--wpp-file-upload-item-thumbnail-border-radius, var(--wpp-border-radius-xs));--fu-item-thumbnail-width:var(--wpp-file-upload-item-thumbnail-width, 24px);--fu-item-thumbnail-height:var(--wpp-file-upload-item-thumbnail-height, 24px);--fu-item-thumbnail-margin:var(--wpp-file-upload-item-thumbnail-margin, 0 8px 0 0);--fu-item-item-icon-margin:var(--wpp-file-upload-item-icon-margin, 0 2px 0 0);--fu-item-item-color:var(--wpp-file-upload-item-color, var(--wpp-grey-color-700));--fu-item-item-name-color:var(--wpp-file-upload-item-name-color, var(--wpp-grey-color-900));--fu-item-close-icon-color-hover:var(--wpp-file-upload-item-close-icon-color-hover, var(--wpp-icon-color-hover));--fu-item-close-icon-active-color:var(--wpp-file-upload-item-close-icon-active-color, var(--wpp-icon-color-active));--fu-item-close-icon-first-border-color-focus:var(--wpp-file-upload-item-close-icon-first-border-color-focus, var(--wpp-grey-color-000));--fu-item-close-icon-second-border-color-focus:var(--wpp-file-upload-item-close-icon-second-border-color-focus, var(--wpp-brand-color));--fu-item-loading-margin:var(--wpp-file-upload-item-loading-margin, 0px 10px 0px 0px);--fu-item-error-color:var(--wpp-file-upload-item-error-color, var(--wpp-text-color-danger));--fu-item-bg-color-disabled:var(--wpp-file-upload-item-bg-color-disabled, var(--wpp-grey-color-200));--fu-item-text-color-disabled:var(--wpp-file-upload-item-text-color-disabled, var(--wpp-text-color-disabled))}.thumbnail-preview{width:var(--fu-item-thumbnail-width);height:var(--fu-item-thumbnail-height);border-radius:var(--fu-item-thumbnail-border-radius);-o-object-fit:cover;object-fit:cover}.error-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:20px;width:100%;-ms-flex-pack:justify;justify-content:space-between}.item-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-sizing:border-box;box-sizing:border-box;-ms-flex-wrap:wrap;flex-wrap:wrap;max-width:var(--fu-item-max-width);min-height:var(--fu-item-height);background-color:var(--fu-item-bg-color);padding:var(--fu-item-padding);border-radius:var(--fu-item-border-radius);margin:var(--fu-item-margin);font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}.item-wrapper.disabled{background-color:var(--fu-item-bg-color-disabled);color:var(--fu-item-text-color-disabled);cursor:not-allowed}.item-wrapper.disabled .name,.item-wrapper.disabled .loading{color:var(--fu-item-text-color-disabled)}.item-wrapper.disabled .wpp-icon{color:var(--wpp-icon-color-disabled);pointer-events:none}.block{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px}.extension-icon{display:-ms-flexbox;display:flex;margin:var(--fu-item-item-icon-margin)}.controls-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px}.percentage{color:var(--fu-item-item-color)}.loading{color:var(--fu-item-item-color);margin:var(--fu-item-loading-margin)}.name{margin:var(--fu-item-name-margin);color:var(--fu-item-item-name-color)}.name.name-error{margin:var(--fu-item-name-error-margin)}.error{-ms-flex:1;flex:1;margin:0}.content-wrapper{width:100%;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;gap:8px}.cross-icon{cursor:pointer;-webkit-transition:0.2s ease-in-out;transition:0.2s ease-in-out}.cross-icon:hover{color:var(--fu-item-close-icon-color-hover)}.cross-icon:active{color:var(--fu-item-close-icon-active-color)}.inline-message-error::part(message-block){font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0);color:var(--fu-item-error-color)}:host(:focus-visible){outline:none}:host(:focus-visible) .cross-icon{border-radius:3px;outline:none;-webkit-box-shadow:0 0 0 1px var(--fu-item-close-icon-first-border-color-focus), 0 0 0 2px var(--fu-item-close-icon-second-border-color-focus);box-shadow:0 0 0 1px var(--fu-item-close-icon-first-border-color-focus), 0 0 0 2px var(--fu-item-close-icon-second-border-color-focus)}";

const WppFileUploadItem = /*@__PURE__*/ proxyCustomElement(class WppFileUploadItem extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppDelete = createEvent(this, "wppDelete", 1);
    this.wppClick = createEvent(this, "wppClick", 1);
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
  static get registryIs() { return "wpp-file-upload-item-v2-22-0"; }
  static get style() { return wppFileUploadItemCss; }
}, [1, "wpp-file-upload-item", "wpp-file-upload-item-v2-22-0", {
    "file": [1040],
    "format": [1],
    "maxLabelLength": [2, "max-label-length"],
    "currentIndex": [2, "current-index"],
    "locales": [16],
    "thumbnailUrl": [32],
    "percentage": [32],
    "total": [32],
    "loaded": [32],
    "isLoadingFinished": [32],
    "measurementUnit": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-file-upload-item-v2-22-0", "wpp-action-button-v2-22-0", "wpp-icon-cross-v2-22-0", "wpp-icon-database-v2-22-0", "wpp-icon-document-v2-22-0", "wpp-icon-error-v2-22-0", "wpp-icon-file-v2-22-0", "wpp-icon-file-zip-v2-22-0", "wpp-icon-image-v2-22-0", "wpp-icon-info-message-v2-22-0", "wpp-icon-music-v2-22-0", "wpp-icon-pitch-v2-22-0", "wpp-icon-spreadsheet-v2-22-0", "wpp-icon-success-v2-22-0", "wpp-icon-video-clip-v2-22-0", "wpp-icon-warning-v2-22-0", "wpp-inline-message-v2-22-0", "wpp-internal-tooltip-v2-22-0", "wpp-spinner-v2-22-0", "wpp-tooltip-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-file-upload-item-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppFileUploadItem);
      }
      break;
    case "wpp-action-button-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$j();
      }
      break;
    case "wpp-icon-cross-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "wpp-icon-database-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "wpp-icon-document-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "wpp-icon-error-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "wpp-icon-file-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-icon-file-zip-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-icon-image-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-icon-info-message-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-icon-music-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-icon-pitch-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-icon-spreadsheet-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-icon-success-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-icon-video-clip-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-icon-warning-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-inline-message-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-internal-tooltip-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-spinner-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-tooltip-v2-22-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { EXTENSION_TO_TYPE as E, WppFileUploadItem as W, defineCustomElement as d };
