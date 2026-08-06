import { proxyCustomElement, HTMLElement, createEvent, h, Fragment, Host } from '@stencil/core/internal/client';
import { y as mergeLocales } from './utils.js';
import { g as getExtension, d as returnIconFromExtension } from './const2.js';
import { d as defineCustomElement$c } from './wpp-icon-cross2.js';
import { d as defineCustomElement$b } from './wpp-icon-database2.js';
import { d as defineCustomElement$a } from './wpp-icon-document2.js';
import { d as defineCustomElement$9 } from './wpp-icon-file2.js';
import { d as defineCustomElement$8 } from './wpp-icon-file-zip2.js';
import { d as defineCustomElement$7 } from './wpp-icon-image2.js';
import { d as defineCustomElement$6 } from './wpp-icon-music2.js';
import { d as defineCustomElement$5 } from './wpp-icon-pitch2.js';
import { d as defineCustomElement$4 } from './wpp-icon-spreadsheet2.js';
import { d as defineCustomElement$3 } from './wpp-icon-video-clip2.js';
import { d as defineCustomElement$2 } from './wpp-typography2.js';

const wppChatReferenceCss = ":host{--cr-bg-color:var(--wpp-chat-reference-bg-color, var(--wpp-grey-color-100));--cr-padding:var(--wpp-chat-reference-padding, 12px 12px 12px 4px);--cr-gap:var(--wpp-chat-reference-gap, 8px);--cr-border-radius:var(--wpp-chat-reference-border-radius, var(--wpp-border-radius-m, 8px));--cr-max-width:var(--wpp-chat-reference-max-width, 476px);--cr-block-line-color:var(--wpp-chat-reference-block-line-color, var(--wpp-primary-color-500));--cr-thumbnail-size:40px;--cr-thumbnail-bg-color:var(--wpp-chat-reference-thumbnail-bg-color, var(--wpp-grey-color-300));--cr-thumbnail-radius:var(--wpp-border-radius-m, 8px);--cr-thumbnail-icon-color:var(--wpp-chat-reference-thumbnail-icon-color, var(--wpp-grey-color-800));--cr-name-color:var(--wpp-chat-reference-name-color, var(--wpp-grey-color-1000));--cr-type-color:var(--wpp-chat-reference-type-color, var(--wpp-grey-color-800));--cr-text-color:var(--wpp-chat-reference-text-color, var(--wpp-grey-color-800));--cr-close-icon-color:var(--wpp-chat-reference-close-icon-color, var(--wpp-grey-color-600));--cr-close-icon-color-hover:var(--wpp-chat-reference-close-icon-color-hover, var(--wpp-grey-color-800));--cr-close-icon-color-active:var(--wpp-chat-reference-close-icon-color-active, var(--wpp-grey-color-900));display:block;width:100%;max-width:var(--cr-max-width)}.reference{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;overflow:hidden;gap:0;width:100%;padding:var(--cr-padding);background-color:var(--cr-bg-color);border-radius:var(--cr-border-radius)}.block-line{position:absolute;left:0;top:0;bottom:0;width:4px;background-color:var(--cr-block-line-color)}.thumbnail{display:-ms-flexbox;display:flex;-ms-flex:0 0 auto;flex:0 0 auto;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;margin-left:12px;width:var(--cr-thumbnail-size);height:var(--cr-thumbnail-size);border-radius:var(--cr-thumbnail-radius);background-color:var(--cr-thumbnail-bg-color);--wpp-icon-color:var(--cr-thumbnail-icon-color);color:var(--cr-thumbnail-icon-color);overflow:hidden}.thumbnail-image{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.details{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;gap:0;margin-left:8px;min-width:0;-ms-flex:1 1 auto;flex:1 1 auto}.name{min-width:0}.name::part(typography){overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:var(--cr-name-color)}.type::part(typography){color:var(--cr-type-color)}.text-content{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;margin-left:12px;min-width:0;-ms-flex:1 1 auto;flex:1 1 auto}.text{min-width:0}.text::part(typography){display:-webkit-box;overflow:hidden;text-overflow:ellipsis;-webkit-box-orient:vertical;color:var(--cr-text-color)}.text.lines-1::part(typography){-webkit-line-clamp:1}.text.lines-2::part(typography){-webkit-line-clamp:2}.close{-ms-flex:0 0 auto;flex:0 0 auto;margin-left:12px;-ms-flex-item-align:start;align-self:flex-start;cursor:pointer;color:var(--cr-close-icon-color);outline:none}.close:hover{color:var(--cr-close-icon-color-hover)}.close:active{color:var(--cr-close-icon-color-active)}.close:focus-visible{border-radius:var(--wpp-border-radius-xs, 4px);-webkit-box-shadow:0 0 0 2px var(--wpp-primary-color-500);box-shadow:0 0 0 2px var(--wpp-primary-color-500)}";

const LOCALES_DEFAULTS = {
  removeLabel: 'Remove reference',
};
const WppChatReference$1 = /*@__PURE__*/ proxyCustomElement(class WppChatReference extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppClose = createEvent(this, "wppClose", 7);
    this.handleClose = () => {
      this.wppClose.emit();
    };
    this.handleCloseKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.handleClose();
      }
    };
    this.type = 'file';
    this.name = undefined;
    this.fileType = undefined;
    this.src = undefined;
    this.fileExtension = undefined;
    this.text = undefined;
    this.lines = 2;
    this.removable = true;
    this.locales = undefined;
  }
  get _locales() {
    return mergeLocales(LOCALES_DEFAULTS, this.locales);
  }
  renderThumbnail() {
    if (this.src) {
      return h("img", { src: this.src, alt: "", class: "thumbnail-image", part: "thumbnail-image" });
    }
    const extension = this.fileExtension || getExtension(this.name || '');
    return returnIconFromExtension(extension, null);
  }
  renderFile() {
    return (h(Fragment, null, h("div", { class: "thumbnail", part: "thumbnail" }, this.renderThumbnail()), h("div", { class: "details", part: "content" }, h("wpp-typography-v4-3-0", { class: "name", type: "xs-midi", part: "name" }, this.name), this.fileType && (h("wpp-typography-v4-3-0", { class: "type", type: "xs-body", part: "type" }, this.fileType)))));
  }
  renderText() {
    return (h("div", { class: "text-content", part: "content" }, h("wpp-typography-v4-3-0", { class: { text: true, [`lines-${this.lines}`]: true }, type: "xs-body", part: "text" }, this.text)));
  }
  render() {
    return (h(Host, null, h("div", { class: "reference", part: "reference" }, h("span", { class: "block-line", part: "block-line", "aria-hidden": "true" }), this.type === 'file' ? this.renderFile() : this.renderText(), this.removable && (h("wpp-icon-cross-v4-3-0", { class: "close", part: "close", role: "button", tabindex: 0, "aria-label": this._locales.removeLabel, onClick: this.handleClose, onKeyDown: this.handleCloseKeyDown })))));
  }
  static get registryIs() { return "wpp-chat-reference-v4-3-0"; }
  static get style() { return wppChatReferenceCss; }
}, [1, "wpp-chat-reference", "wpp-chat-reference-v4-3-0", {
    "type": [513],
    "name": [1],
    "fileType": [1, "file-type"],
    "src": [1],
    "fileExtension": [1, "file-extension"],
    "text": [1],
    "lines": [514],
    "removable": [4],
    "locales": [16]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-chat-reference-v4-3-0", "wpp-icon-cross-v4-3-0", "wpp-icon-database-v4-3-0", "wpp-icon-document-v4-3-0", "wpp-icon-file-v4-3-0", "wpp-icon-file-zip-v4-3-0", "wpp-icon-image-v4-3-0", "wpp-icon-music-v4-3-0", "wpp-icon-pitch-v4-3-0", "wpp-icon-spreadsheet-v4-3-0", "wpp-icon-video-clip-v4-3-0", "wpp-typography-v4-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-chat-reference-v4-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppChatReference$1);
      }
      break;
    case "wpp-icon-cross-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-icon-database-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-icon-document-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-icon-file-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-icon-file-zip-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-icon-image-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-icon-music-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-icon-pitch-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-icon-spreadsheet-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-icon-video-clip-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-typography-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppChatReference = WppChatReference$1;
const defineCustomElement = defineCustomElement$1;

export { WppChatReference, defineCustomElement };
