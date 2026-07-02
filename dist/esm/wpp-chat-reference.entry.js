import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host } from './index-9177bb6d.js';
import { y as mergeLocales } from './utils-fc9002c9.js';
import { g as getExtension, r as returnIconFromExtension } from './utils-1f8c3b95.js';
import './consts-744c144f.js';

const wppChatReferenceCss = ":host{--cr-bg-color:var(--wpp-chat-reference-bg-color, var(--wpp-grey-color-100));--cr-padding:var(--wpp-chat-reference-padding, 12px 12px 12px 8px);--cr-gap:var(--wpp-chat-reference-gap, 8px);--cr-border-radius:var(--wpp-chat-reference-border-radius, var(--wpp-border-radius-l, 12px));--cr-min-height:var(--wpp-chat-reference-min-height, 64px);--cr-max-width:var(--wpp-chat-reference-max-width, 476px);--cr-block-line-color:var(--wpp-chat-reference-block-line-color, var(--wpp-grey-color-400));--cr-thumbnail-size:40px;--cr-thumbnail-bg-color:var(--wpp-chat-reference-thumbnail-bg-color, var(--wpp-grey-color-300));--cr-thumbnail-radius:var(--wpp-border-radius-m, 8px);--cr-thumbnail-icon-color:var(--wpp-chat-reference-thumbnail-icon-color, var(--wpp-grey-color-800));--cr-name-color:var(--wpp-chat-reference-name-color, var(--wpp-grey-color-1000));--cr-type-color:var(--wpp-chat-reference-type-color, var(--wpp-grey-color-800));--cr-text-color:var(--wpp-chat-reference-text-color, var(--wpp-grey-color-800));--cr-close-icon-color:var(--wpp-chat-reference-close-icon-color, var(--wpp-grey-color-600));--cr-close-icon-color-hover:var(--wpp-chat-reference-close-icon-color-hover, var(--wpp-grey-color-800));--cr-close-icon-color-active:var(--wpp-chat-reference-close-icon-color-active, var(--wpp-grey-color-900));display:block;width:100%;max-width:var(--cr-max-width)}.reference{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;gap:0;width:100%;min-height:var(--cr-min-height);padding:var(--cr-padding);background-color:var(--cr-bg-color);border-radius:var(--cr-border-radius)}.block-line{-ms-flex:0 0 auto;flex:0 0 auto;width:4px;height:40px;border-radius:var(--wpp-border-radius-xs, 4px);background-color:var(--cr-block-line-color)}.thumbnail{display:-ms-flexbox;display:flex;-ms-flex:0 0 auto;flex:0 0 auto;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;margin-left:12px;width:var(--cr-thumbnail-size);height:var(--cr-thumbnail-size);border-radius:var(--cr-thumbnail-radius);background-color:var(--cr-thumbnail-bg-color);--wpp-icon-color:var(--cr-thumbnail-icon-color);color:var(--cr-thumbnail-icon-color);overflow:hidden}.thumbnail-image{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.details{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;gap:0;margin-left:8px;min-width:0;-ms-flex:1 1 auto;flex:1 1 auto}.name{min-width:0}.name::part(typography){overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:var(--cr-name-color)}.type::part(typography){color:var(--cr-type-color)}.text-content{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;margin-left:12px;min-width:0;-ms-flex:1 1 auto;flex:1 1 auto}.text{min-width:0}.text::part(typography){display:-webkit-box;overflow:hidden;text-overflow:ellipsis;-webkit-box-orient:vertical;color:var(--cr-text-color)}.text.lines-1::part(typography){-webkit-line-clamp:1}.text.lines-2::part(typography){-webkit-line-clamp:2}.close{-ms-flex:0 0 auto;flex:0 0 auto;margin-left:12px;-ms-flex-item-align:start;align-self:flex-start;cursor:pointer;color:var(--cr-close-icon-color);outline:none}.close:hover{color:var(--cr-close-icon-color-hover)}.close:active{color:var(--cr-close-icon-color-active)}.close:focus-visible{border-radius:var(--wpp-border-radius-xs, 4px);-webkit-box-shadow:0 0 0 2px var(--wpp-primary-color-500);box-shadow:0 0 0 2px var(--wpp-primary-color-500)}";

const LOCALES_DEFAULTS = {
  removeLabel: 'Remove reference',
};
const WppChatReference = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    return (h(Fragment, null, h("div", { class: "thumbnail", part: "thumbnail" }, this.renderThumbnail()), h("div", { class: "details", part: "content" }, h("wpp-typography-v4-2-0", { class: "name", type: "xs-midi", part: "name" }, this.name), this.fileType && (h("wpp-typography-v4-2-0", { class: "type", type: "xs-body", part: "type" }, this.fileType)))));
  }
  renderText() {
    return (h("div", { class: "text-content", part: "content" }, h("wpp-typography-v4-2-0", { class: { text: true, [`lines-${this.lines}`]: true }, type: "xs-body", part: "text" }, this.text)));
  }
  render() {
    return (h(Host, null, h("div", { class: "reference", part: "reference" }, h("span", { class: "block-line", part: "block-line", "aria-hidden": "true" }), this.type === 'file' ? this.renderFile() : this.renderText(), this.removable && (h("wpp-icon-cross-v4-2-0", { class: "close", part: "close", role: "button", tabindex: 0, "aria-label": this._locales.removeLabel, onClick: this.handleClose, onKeyDown: this.handleCloseKeyDown })))));
  }
  static get registryIs() { return "wpp-chat-reference-v4-2-0"; }
};
WppChatReference.style = wppChatReferenceCss;

export { WppChatReference as wpp_chat_reference };
