import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { F as FOCUS_TYPE } from './common.js';
import { g as getExtension, d as returnIconFromExtension, e as returnFileTypeLabel, L as LOCALES_DEFAULTS } from './const2.js';
import { y as mergeLocales } from './utils.js';
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

const wppFileUploadItemCss = ":host{--fu-item-bg-color:var(--wpp-file-upload-item-bg-color, var(--wpp-grey-color-200));--fu-item-height:var(--wpp-file-upload-item-height, 32px);--fu-item-padding:var(--wpp-file-upload-item-padding, 8px 10px 8px 8px);--fu-item-percentage-margin:var(--wpp-file-upload-item-percentage-margin, 0 8px 0 0);--fu-item-border-radius:var(--wpp-file-upload-item-border-radius, var(--wpp-border-radius-m));--fu-item-thumbnail-border-radius:var(--wpp-file-upload-item-thumbnail-border-radius, var(--wpp-border-radius-xs));--fu-item-icon-wrapper-width:var(--wpp-file-upload-item-icon-wrapper-width, 24px);--fu-item-icon-wrapper-height:var(--wpp-file-upload-item-icon-wrapper-height, 24px);--fu-item-thumbnail-margin:var(--wpp-file-upload-item-thumbnail-margin, 0 8px 0 0);--fu-item-item-icon-margin:var(--wpp-file-upload-item-icon-margin, 0 2px 0 0);--fu-item-item-color:var(--wpp-file-upload-item-color, var(--wpp-grey-color-700));--fu-item-item-name-color:var(--wpp-file-upload-item-name-color, var(--wpp-grey-color-900));--fu-item-close-icon-color-hover:var(--wpp-file-upload-item-close-icon-color-hover, var(--wpp-icon-color-hover));--fu-item-close-icon-active-color:var(--wpp-file-upload-item-close-icon-active-color, var(--wpp-icon-color-active));--fu-item-close-icon-first-border-color-focus:var(\n    --wpp-file-upload-item-close-icon-first-border-color-focus,\n    var(--wpp-grey-color-000)\n  );--fu-item-close-icon-second-border-color-focus:var(\n    --wpp-file-upload-item-close-icon-second-border-color-focus,\n    var(--wpp-brand-color)\n  );--fu-item-close-icon-border-radius-focus:var(\n    --wpp-file-upload-item-close-icon-border-radius-focus,\n    var(--wpp-border-radius-xs)\n  );--fu-item-loading-margin:var(--wpp-file-upload-item-loading-margin, 0px 10px 0px 0px);--fu-item-error-color:var(--wpp-file-upload-item-error-color, var(--wpp-text-color-danger));--fu-item-bg-color-disabled:var(--wpp-file-upload-item-bg-color-disabled, var(--wpp-grey-color-200));--fu-item-text-color-disabled:var(--wpp-file-upload-item-text-color-disabled, var(--wpp-text-color-disabled));--fu-item-chat-max-width:var(--wpp-fu-item-chat-max-width, 720px);--fu-item-chat-bg-color:var(--wpp-file-upload-item-chat-bg-color, var(--wpp-grey-color-100));--fu-item-chat-padding:var(--wpp-file-upload-item-chat-padding, 8px);--fu-item-chat-gap:var(--wpp-file-upload-item-chat-gap, 12px);--fu-item-chat-border-radius:var(--wpp-file-upload-item-chat-border-radius, var(--wpp-border-radius-l));--fu-item-chat-min-height:var(--wpp-file-upload-item-chat-min-height, 56px);--fu-item-chat-name-color:var(--wpp-file-upload-item-chat-name-color, var(--wpp-grey-color-1000));--fu-item-chat-subtitle-color:var(--wpp-file-upload-item-chat-subtitle-color, var(--wpp-grey-color-800));--fu-item-chat-subtitle-error-color:var(\n    --wpp-file-upload-item-chat-subtitle-error-color,\n    var(--wpp-danger-color-500)\n  );--fu-item-thumbnail-size:var(--wpp-file-upload-item-thumbnail-size, 40px);--fu-item-thumbnail-bg-color:var(--wpp-file-upload-item-thumbnail-bg-color, var(--wpp-grey-color-300));--fu-item-thumbnail-radius:var(--wpp-file-upload-item-chat-thumbnail-border-radius, var(--wpp-border-radius-m));--fu-item-thumbnail-icon-color:var(--wpp-file-upload-item-thumbnail-icon-color, var(--wpp-grey-color-800));--fu-item-thumbnail-error-bg-color:var(--wpp-file-upload-item-thumbnail-error-bg-color, var(--wpp-grey-color-300))}:host .wpp-tooltip{width:100%;overflow:hidden}:host .wpp-tooltip.computed{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}:host .wpp-tooltip::part(anchor){position:relative;width:100%}.thumbnail-preview{width:100%;height:100%;border-radius:var(--fu-item-thumbnail-border-radius);-o-object-fit:cover;object-fit:cover}.error-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:20px;width:100%;-ms-flex-pack:justify;justify-content:space-between}.item-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-sizing:border-box;box-sizing:border-box;-ms-flex-wrap:wrap;flex-wrap:wrap;max-width:var(--fu-item-max-width);min-height:var(--fu-item-height);background-color:var(--fu-item-bg-color);padding:var(--fu-item-padding);border-radius:var(--fu-item-border-radius);font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}.item-wrapper.disabled{background-color:var(--fu-item-bg-color-disabled);color:var(--fu-item-text-color-disabled);cursor:not-allowed}.item-wrapper.disabled .name,.item-wrapper.disabled .loading{--wpp-typography-color:var(--fu-item-text-color-disabled)}.item-wrapper.disabled .wpp-icon{color:var(--wpp-icon-color-disabled);pointer-events:none}.block{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px;overflow:hidden;width:100%;min-width:0}.block.block-error{gap:0}.icon-wrapper{width:100%;max-width:var(--fu-item-icon-wrapper-width);height:var(--fu-item-icon-wrapper-height);display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.extension-icon{display:-ms-flexbox;display:flex;margin:var(--fu-item-item-icon-margin)}.controls-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:8px}.percentage{color:var(--fu-item-item-color)}.loading{white-space:nowrap;color:var(--fu-item-item-color)}.error-message{margin-left:8px;white-space:nowrap;color:var(--fu-item-item-color)}.name{--wpp-typography-color:var(--fu-item-item-name-color);width:100%;white-space:nowrap;-ms-flex:1 1 auto;flex:1 1 auto;min-width:0;overflow:hidden;display:block}.name::part(typography){text-overflow:initial}.measure{position:absolute;visibility:hidden;white-space:nowrap;left:-9999px;top:0;pointer-events:none}.error{-ms-flex:1;flex:1;margin:0}.content-wrapper{width:100%;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;gap:20px;min-width:0}.cross-icon{cursor:pointer;-webkit-transition:width 0.2s ease-in-out, height 0.2s ease-in-out;transition:width 0.2s ease-in-out, height 0.2s ease-in-out}.cross-icon:hover,.cross-icon.tab-focus{color:var(--fu-item-close-icon-color-hover)}.cross-icon:active,.cross-icon.pressed{color:var(--fu-item-close-icon-active-color)}.cross-icon:focus{outline:0}.cross-icon:focus-visible{border-radius:var(--fu-item-close-icon-border-radius-focus);outline:none;-webkit-box-shadow:0 0 0 1px var(--fu-item-close-icon-first-border-color-focus), 0 0 0 3px var(--fu-item-close-icon-second-border-color-focus);box-shadow:0 0 0 1px var(--fu-item-close-icon-first-border-color-focus), 0 0 0 3px var(--fu-item-close-icon-second-border-color-focus)}.inline-message-error::part(message-block){font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0);color:var(--fu-item-error-color)}:host(.variant-chat){display:block}:host(.variant-chat) .item-wrapper{display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-ms-flex-align:center;align-items:center;gap:var(--fu-item-chat-gap);-webkit-box-sizing:border-box;box-sizing:border-box;min-height:var(--fu-item-chat-min-height);max-width:var(--fu-item-chat-max-width);padding:var(--fu-item-chat-padding);background-color:var(--fu-item-chat-bg-color);border-radius:var(--fu-item-chat-border-radius);font-size:var(--wpp-typography-xs-midi-font-size, 12px);line-height:var(--wpp-typography-xs-midi-line-height, 20px);font-weight:var(--wpp-typography-xs-midi-font-weight, 500);color:var(--wpp-typography-xs-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-xs-midi-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-xs-midi-letter-spacing, 0)}:host(.variant-chat) .item-wrapper.disabled{background-color:var(--fu-item-bg-color-disabled)}:host(.variant-chat) .thumbnail{display:-ms-flexbox;display:flex;-ms-flex:0 0 auto;flex:0 0 auto;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:var(--fu-item-thumbnail-size);height:var(--fu-item-thumbnail-size);overflow:hidden;--wpp-icon-color:var(--fu-item-thumbnail-icon-color);color:var(--fu-item-thumbnail-icon-color);background-color:var(--fu-item-thumbnail-bg-color);border-radius:var(--fu-item-thumbnail-radius)}:host(.variant-chat) .thumbnail.error{background-color:var(--fu-item-thumbnail-error-bg-color)}:host(.variant-chat) .thumbnail-image{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}:host(.variant-chat) .details{display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-direction:column;flex-direction:column;min-width:0;overflow:hidden}:host(.variant-chat) .name{width:100%;overflow:hidden;white-space:nowrap}:host(.variant-chat) .name::part(typography){color:var(--fu-item-chat-name-color);text-overflow:ellipsis}:host(.variant-chat) .subtitle{width:100%;min-width:0;overflow:hidden;white-space:nowrap}:host(.variant-chat) .subtitle::part(typography){display:block;max-width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:var(--fu-item-chat-subtitle-color)}:host(.variant-chat) .subtitle.subtitle-error::part(typography){color:var(--fu-item-chat-subtitle-error-color)}:host(.variant-chat) .cross-icon{-ms-flex:0 0 auto;flex:0 0 auto;-ms-flex-item-align:start;align-self:flex-start;opacity:0;-webkit-transition:opacity 0.15s ease-in-out;transition:opacity 0.15s ease-in-out}:host(.variant-chat:hover) .cross-icon,:host(.variant-chat) .cross-icon:focus-visible{opacity:1}";

const WppFileUploadItem = /*@__PURE__*/ proxyCustomElement(class WppFileUploadItem extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppDelete = createEvent(this, "wppDelete", 1);
    this.wppClick = createEvent(this, "wppClick", 1);
    this.fileLoaded = createEvent(this, "fileLoaded", 7);
    this.isSubtitleTruncated = false;
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
          this.checkSubtitleTruncation();
        });
      });
    };
    // Detect whether the chat subtitle overflows its available width so the
    // tooltip is only shown when the text is actually truncated.
    this.checkSubtitleTruncation = () => {
      if (this.variant !== 'chat')
        return;
      const text = this.getChatSubtitle();
      if (!this.subtitleRef || !this.subtitleMeasureRef || !text) {
        this.isSubtitleTruncated = false;
        return;
      }
      this.subtitleMeasureRef.textContent = text;
      const fullWidth = this.subtitleMeasureRef.scrollWidth;
      const available = this.subtitleRef.getBoundingClientRect().width;
      this.isSubtitleTruncated = available > 0 && fullWidth > available + 1;
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
      const maxWidth = Math.ceil(this.computeAvailableWidth());
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
        return h("wpp-spinner-v4-3-0", null);
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
        return (h("div", { class: "error-wrapper" }, h("wpp-inline-message-v4-3-0", { class: "inline-message-error", message: currentError, type: "error", showTooltipFrom: 140, tooltipConfig: { popperOptions: { strategy: 'fixed' } } }), this.file.deletable !== false && (h("wpp-icon-cross-v4-3-0", { class: this.crossIconClasses(), part: "cross-icon", role: "button", tabindex: this.parentDisabled || this.file.disabled ? -1 : 0, "aria-disabled": this.parentDisabled || this.file.disabled ? 'true' : undefined, "aria-label": `Remove file ${this.file.name}`, onClick: this.handleCloseClick, onKeyDown: this.handleDeleteKeyDown, onKeyUp: this.handleDeleteKeyUp, onBlur: this.handleDeleteBlur }))));
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
      [`variant-${this.variant}`]: true,
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
    this.getImagePreviewUrl = () => {
      const fileExtension = getExtension(this.file.name).toLowerCase();
      const isImage = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp'].includes(fileExtension);
      return isImage && 'url' in this.file && this.file.url ? this.file.url : null;
    };
    this.renderThumbnail = () => {
      if (this.isFileLoading())
        return h("wpp-spinner-v4-3-0", null);
      if (this.isFileWithError())
        return h("wpp-icon-error-v4-3-0", { class: "thumbnail-error-icon", "aria-hidden": "true" });
      const previewUrl = this.thumbnailUrl ?? this.getImagePreviewUrl();
      if (previewUrl)
        return h("img", { src: previewUrl, alt: "", class: "thumbnail-image" });
      return returnIconFromExtension(getExtension(this.file.name), null);
    };
    this.getChatSubtitle = () => {
      if (this.isFileLoading())
        return `${this.percentage}%`;
      if (this.isFileWithError())
        return this.getErrorMessage();
      return returnFileTypeLabel(getExtension(this.file.name));
    };
    this.renderDeleteIcon = () => this.file.deletable !== false && (h("wpp-icon-cross-v4-3-0", { class: this.crossIconClasses(), part: "cross-icon", role: "button", tabindex: this.parentDisabled || this.file.disabled ? -1 : 0, "aria-disabled": this.parentDisabled || this.file.disabled ? 'true' : undefined, "aria-label": `Remove file ${this.file.name}`, onClick: this.handleCloseClick, onKeyDown: this.handleDeleteKeyDown, onKeyUp: this.handleDeleteKeyUp, onBlur: this.handleDeleteBlur }));
    this.thumbnailUrl = null;
    this.percentage = 0;
    this.total = 0;
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
    this.variant = 'default';
    this.parentDisabled = undefined;
  }
  componentWillLoad() {
    const { size, name } = this.file;
    this.total = +this.convertToAppropriateFormat(size);
    if (this.isFileWithError()) {
      this.isLoadingFinished = true;
      return;
    }
    if ('url' in this.file) {
      this.isLoadingFinished = true;
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
  get _locales() {
    return mergeLocales(LOCALES_DEFAULTS, this.locales);
  }
  handleFileReading() {
    const reader = new FileReader();
    reader.onload = (event) => {
      const currentTarget = event.currentTarget;
      this.file.result = currentTarget.result;
    };
    reader.onprogress = (event) => {
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
      const currentPercent = (event.loaded / event.total) * 100;
      this.percentage = +currentPercent.toFixed(1);
    };
    reader.readAsDataURL(this.file);
  }
  renderChatVariant() {
    const subtitle = this.getChatSubtitle();
    return (h(Host, { class: this.hostCssClasses(), exportparts: "file-item, thumbnail, content, file-name, subtitle, cross-icon", onClick: this.handleClick, role: "listitem" }, h("div", { class: this.itemCssClasses(), part: "file-item" }, h("div", { class: { thumbnail: true, error: this.isFileWithError(), loading: this.isFileLoading() }, part: "thumbnail" }, this.renderThumbnail()), h("div", { class: "details", part: "content" }, h("wpp-tooltip-v4-3-0", { ref: ref => (this.tooltipRef = ref), text: this.file.name, config: {
        popperOptions: { strategy: 'fixed' },
        onShow: () => {
          if (!this.isTruncated)
            return false;
        },
      }, part: "tooltip" }, h("wpp-typography-v4-3-0", { ref: ref => (this.fileNameRef = ref), class: this.fileNameCssClasses(), type: "xs-midi", part: "file-name", title: this.file.name }, this.file?.name)), h("wpp-tooltip-v4-3-0", { text: subtitle, config: {
        popperOptions: { strategy: 'fixed' },
        onShow: () => {
          // Recompute truncation on demand so the guard is never stale
          // when the subtitle text changes (e.g. progress -> error).
          this.checkSubtitleTruncation();
          if (!this.isSubtitleTruncated)
            return false;
        },
      } }, h("wpp-typography-v4-3-0", { ref: ref => (this.subtitleRef = ref), type: "xs-body", class: { subtitle: true, 'subtitle-error': this.isFileWithError() }, part: "subtitle" }, subtitle))), this.renderDeleteIcon()), h("wpp-typography-v4-3-0", { ref: ref => (this.measureRef = ref), type: "xs-midi", class: "measure", "aria-hidden": "true", role: "presentation" }), h("wpp-typography-v4-3-0", { ref: ref => (this.subtitleMeasureRef = ref), type: "xs-body", class: "measure", "aria-hidden": "true", role: "presentation" })));
  }
  render() {
    if (this.variant === 'chat')
      return this.renderChatVariant();
    return (h(Host, { class: this.hostCssClasses(), exportparts: "file-item, wrapper, content, file-name, tooltip, loading, percentage, cross-icon", onClick: this.handleClick, role: "listitem" }, h("div", { class: this.itemCssClasses(), part: "file-item" }, this.setCurrentError(), h("div", { class: "content-wrapper", part: "wrapper" }, h("div", { class: this.blockCssClasses(), part: "content" }, h("div", { class: "icon-wrapper" }, this.setCurrentIcon()), h("wpp-tooltip-v4-3-0", { ref: ref => (this.tooltipRef = ref), text: this.file.name, config: {
        popperOptions: { strategy: 'fixed' },
        onShow: () => {
          if (!this.isTruncated)
            return false;
        },
      }, part: "tooltip" }, h("wpp-typography-v4-3-0", { ref: ref => (this.fileNameRef = ref), class: this.fileNameCssClasses(), type: "s-body", part: "file-name", title: this.file.name }, this.file?.name)), !this.isFileWithError() ? (h("span", { ref: ref => (this.loadingRef = ref), class: "loading", part: "loading" }, this.total, " ", this.measurementUnit)) : (h("span", { class: "error-message", part: "error-message" }, this.total, " ", this.measurementUnit))), h("div", { class: "controls-wrapper", part: "controls" }, this.isFileLoading() && (h("span", { class: "percentage", part: "percentage" }, this.percentage, "%")), this.file.deletable !== false && !this.isFileWithError() && (h("wpp-icon-cross-v4-3-0", { class: this.crossIconClasses(), part: "cross-icon", role: "button", tabindex: this.parentDisabled || this.file.disabled ? -1 : 0, "aria-disabled": this.parentDisabled || this.file.disabled ? 'true' : undefined, "aria-label": `Remove file ${this.file.name}`, onClick: this.handleCloseClick, onKeyDown: this.handleDeleteKeyDown, onBlur: this.handleDeleteBlur, onKeyUp: this.handleDeleteKeyUp }))))), h("wpp-typography-v4-3-0", { ref: ref => (this.measureRef = ref), type: "s-body", class: "measure", "aria-hidden": "true", role: "presentation" })));
  }
  static get registryIs() { return "wpp-file-upload-item-v4-3-0"; }
  get host() { return this; }
  static get style() { return wppFileUploadItemCss; }
}, [1, "wpp-file-upload-item", "wpp-file-upload-item-v4-3-0", {
    "fileName": [1, "file-name"],
    "file": [1040],
    "format": [1],
    "currentIndex": [2, "current-index"],
    "locales": [16],
    "uploaded": [4],
    "variant": [513],
    "parentDisabled": [4, "parent-disabled"],
    "thumbnailUrl": [32],
    "percentage": [32],
    "total": [32],
    "isLoadingFinished": [32],
    "measurementUnit": [32],
    "isPressed": [32],
    "focusType": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-file-upload-item-v4-3-0", "wpp-action-button-v4-3-0", "wpp-icon-cross-v4-3-0", "wpp-icon-database-v4-3-0", "wpp-icon-document-v4-3-0", "wpp-icon-error-v4-3-0", "wpp-icon-file-v4-3-0", "wpp-icon-file-zip-v4-3-0", "wpp-icon-image-v4-3-0", "wpp-icon-info-message-v4-3-0", "wpp-icon-music-v4-3-0", "wpp-icon-pitch-v4-3-0", "wpp-icon-spreadsheet-v4-3-0", "wpp-icon-success-v4-3-0", "wpp-icon-video-clip-v4-3-0", "wpp-icon-warning-v4-3-0", "wpp-inline-message-v4-3-0", "wpp-internal-tooltip-v4-3-0", "wpp-spinner-v4-3-0", "wpp-tooltip-v4-3-0", "wpp-typography-v4-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-file-upload-item-v4-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppFileUploadItem);
      }
      break;
    case "wpp-action-button-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$k();
      }
      break;
    case "wpp-icon-cross-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$j();
      }
      break;
    case "wpp-icon-database-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "wpp-icon-document-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "wpp-icon-error-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "wpp-icon-file-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "wpp-icon-file-zip-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-icon-image-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-icon-info-message-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-icon-music-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-icon-pitch-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-icon-spreadsheet-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-icon-success-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-icon-video-clip-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-icon-warning-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-inline-message-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-internal-tooltip-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-spinner-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-tooltip-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-typography-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WppFileUploadItem as W, defineCustomElement as d };
