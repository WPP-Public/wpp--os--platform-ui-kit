'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5f5af6a9.js');
const utils = require('./utils-9529c2fe.js');
require('./consts-d8f5ef98.js');

const wppChatAlertCss = ":host{--ca-padding:var(--wpp-chat-alert-padding, 11px 16px);--ca-gap:var(--wpp-chat-alert-gap, 8px);--ca-border-radius:var(--wpp-chat-alert-border-radius, 0px);--ca-bg-color:var(--wpp-chat-alert-bg-color, var(--wpp-danger-color-200));--ca-icon-color:var(--wpp-chat-alert-icon-color, var(--wpp-danger-color-400));--ca-message-color:var(--wpp-chat-alert-message-color, var(--wpp-grey-color-1000));--ca-description-color:var(--wpp-chat-alert-description-color, var(--wpp-grey-color-900));--ca-close-icon-color:var(--wpp-chat-alert-close-icon-color, var(--wpp-grey-color-600));--ca-close-icon-color-hover:var(--wpp-chat-alert-close-icon-color-hover, var(--wpp-grey-color-800));--ca-close-icon-color-active:var(--wpp-chat-alert-close-icon-color-active, var(--wpp-grey-color-900));display:block}:host([type=warning]){--ca-bg-color:var(--wpp-chat-alert-bg-color, var(--wpp-warning-color-200));--ca-icon-color:var(--wpp-chat-alert-icon-color, var(--wpp-warning-color-400))}:host([type=info]){--ca-bg-color:var(--wpp-chat-alert-bg-color, var(--wpp-grey-color-300));--ca-icon-color:var(--wpp-chat-alert-icon-color, var(--wpp-text-color-info))}:host([type=success]){--ca-bg-color:var(--wpp-chat-alert-bg-color, var(--wpp-success-color-200));--ca-icon-color:var(--wpp-chat-alert-icon-color, var(--wpp-text-color-success))}.alert{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-box-sizing:border-box;box-sizing:border-box;gap:var(--ca-gap);padding:var(--ca-padding);background-color:var(--ca-bg-color);border-radius:var(--ca-border-radius)}.icon{display:-ms-inline-flexbox;display:inline-flex;-ms-flex:0 0 auto;flex:0 0 auto;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;color:var(--ca-icon-color)}.message{-ms-flex:1 1 auto;flex:1 1 auto;min-width:0}.message::part(typography){color:var(--ca-message-color)}.description{-ms-flex:0 0 auto;flex:0 0 auto}.description::part(typography){color:var(--ca-description-color)}.close{-ms-flex:0 0 auto;flex:0 0 auto;cursor:pointer;color:var(--ca-close-icon-color);outline:none}.close:hover{color:var(--ca-close-icon-color-hover)}.close:active{color:var(--ca-close-icon-color-active)}.close:focus-visible{border-radius:var(--wpp-border-radius-xs, 4px);-webkit-box-shadow:0 0 0 2px var(--wpp-primary-color-500);box-shadow:0 0 0 2px var(--wpp-primary-color-500)}";

const LOCALES_DEFAULTS = {
  closeLabel: 'Dismiss',
};
const ICON_BY_TYPE = {
  error: 'wpp-icon-error',
  warning: 'wpp-icon-warning',
  info: 'wpp-icon-info-message',
  success: 'wpp-icon-success',
};
const WppChatAlert = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppClose = index.createEvent(this, "wppClose", 7);
    this.handleClose = () => {
      this.wppClose.emit();
    };
    this.handleCloseKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.handleClose();
      }
    };
    this.type = 'error';
    this.message = undefined;
    this.description = undefined;
    this.closable = true;
    this.locales = undefined;
  }
  get _locales() {
    return utils.mergeLocales(LOCALES_DEFAULTS, this.locales);
  }
  renderIcon() {
    const iconTag = ICON_BY_TYPE[this.type] ?? ICON_BY_TYPE.error;
    return (index.h("span", { class: "icon", part: "icon", "aria-hidden": "true" }, index.h(utils.transformToVersionedTag(iconTag), {})));
  }
  render() {
    return (index.h(index.Host, null, index.h("div", { class: "alert", part: "alert", role: "alert" }, this.renderIcon(), index.h("wpp-typography-v4-3-0", { class: "message", type: "s-body", part: "message" }, this.message), this.description && (index.h("wpp-typography-v4-3-0", { class: "description", type: "xs-body", part: "description" }, this.description)), this.closable && (index.h("wpp-icon-cross-v4-3-0", { class: "close", part: "close", role: "button", tabindex: 0, "aria-label": this._locales.closeLabel, onClick: this.handleClose, onKeyDown: this.handleCloseKeyDown })))));
  }
  static get registryIs() { return "wpp-chat-alert-v4-3-0"; }
};
WppChatAlert.style = wppChatAlertCss;

exports.wpp_chat_alert = WppChatAlert;
