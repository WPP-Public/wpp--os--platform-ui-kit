import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { F as FOCUS_TYPE } from './common.js';
import { d as debounce } from './utils.js';
import { t as themeSubscriptionController } from './subscribe-to-theme.js';
import { d as defineCustomElement$a } from './wpp-action-button2.js';
import { d as defineCustomElement$9 } from './wpp-icon-cross2.js';
import { d as defineCustomElement$8 } from './wpp-icon-error2.js';
import { d as defineCustomElement$7 } from './wpp-icon-info-message2.js';
import { d as defineCustomElement$6 } from './wpp-icon-success2.js';
import { d as defineCustomElement$5 } from './wpp-icon-warning2.js';
import { d as defineCustomElement$4 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$3 } from './wpp-spinner2.js';
import { d as defineCustomElement$2 } from './wpp-tooltip2.js';
import { d as defineCustomElement$1 } from './wpp-typography2.js';

const LOCALES_DEFAULTS = {
  close: 'Close inline message button',
};

const wppInlineMessageCss = ":host{--im-m-icon-gap:var(--wpp-inline-message-m-icon-gap, 4px);--im-l-icon-gap:var(--wpp-inline-message-l-icon-gap, 8px);--im-m-padding:var(--wpp-inline-message-m-padding, 5px 8px);--im-l-padding:var(--wpp-inline-message-l-padding, 12px 12px 12px 16px);--im-line-height:var(--wpp-inline-message-line-height, 22px);--im-border-radius:var(--wpp-inline-message-border-radius, var(--wpp-border-radius-s));--im-text-color:var(--wpp-inline-message-text-color, var(--wpp-grey-color-1000));--im-empty-type-text-color:var(--wpp-inline-message-empty-type-text-color, var(--wpp-grey-color-800));--im-warning-text-color:var(--wpp-inline-message-warning-text-color, var(--wpp-text-color-warning));--im-error-text-color:var(--wpp-inline-message-error-text-color, var(--wpp-text-color-danger));--im-information-text-color:var(--wpp-inline-message-information-text-color, var(--wpp-text-color-info));--im-success-text-color:var(--wpp-inline-message-success-text-color, var(--wpp-text-color-success));--im-warning-background-color:var(--wpp-inline-message-warning-background-color, var(--wpp-warning-color-200));--im-error-background-color:var(--wpp-inline-message-error-background-color, var(--wpp-danger-color-200));--im-information-background-color:var(--wpp-inline-message-information-background-color, var(--wpp-grey-color-300));--im-success-background-color:var(--wpp-inline-message-success-background-color, var(--wpp-success-color-200));--im-l-min-width:var(--wpp-l-inline-message-min-width, 376px);--im-l-action-btn-padding:var(--wpp-inline-message-l-action-btn-padding, 5px 6px);--im-l-action-btn-margin-right:var(--wpp-inline-message-l-action-btn-margin-right, 4px);--im-l-body-padding-left:var(--wpp-inline-message-l-body-padding-left, 30px);--im-l-header-gap:var(--wpp-inline-message-l-header-gap, 3px)}.inline-message-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:var(--im-width);color:var(--im-text-color)}.inline-message-wrapper.size-s{font-size:var(--wpp-typography-xs-midi-font-size, 12px);line-height:var(--wpp-typography-xs-midi-line-height, 20px);font-weight:var(--wpp-typography-xs-midi-font-weight, 500);color:var(--wpp-typography-xs-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-xs-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-xs-midi-letter-spacing, 0)}.inline-message-wrapper.size-s.warning-message{color:var(--im-warning-text-color)}.inline-message-wrapper.size-s.error-message{color:var(--im-error-text-color)}.inline-message-wrapper.size-s.information-message{color:var(--im-information-text-color)}.inline-message-wrapper.size-s.success-message{color:var(--im-success-text-color)}.inline-message-wrapper:not(.warning-message,.error-message,.information-message,.success-message){color:var(--im-empty-type-text-color)}.inline-message-wrapper.size-l,.inline-message-wrapper.size-m{padding:var(--im-m-padding);border-radius:var(--im-border-radius);font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}.inline-message-wrapper.size-l.warning-message,.inline-message-wrapper.size-m.warning-message{background-color:var(--im-warning-background-color)}.inline-message-wrapper.size-l.error-message,.inline-message-wrapper.size-m.error-message{background-color:var(--im-error-background-color)}.inline-message-wrapper.size-l.information-message,.inline-message-wrapper.size-m.information-message{background-color:var(--im-information-background-color);background-color:color-mix(in srgb, var(--im-information-background-color) 60%, transparent)}.inline-message-wrapper.size-l.success-message,.inline-message-wrapper.size-m.success-message{background-color:var(--im-success-background-color)}.inline-message-wrapper.size-l .message,.inline-message-wrapper.size-m .message{line-height:var(--im-line-height)}.inline-message-wrapper .left-icon{display:-ms-inline-flexbox;display:inline-flex}.inline-message-wrapper.size-m .message-block .wpp-icon{margin-top:1px}.inline-message-wrapper.size-l{padding:var(--im-l-padding);min-width:var(--im-l-min-width);-webkit-box-sizing:border-box;box-sizing:border-box}.inline-message-wrapper.size-l .container{display:-ms-flexbox;display:flex;gap:24px;-ms-flex-wrap:nowrap;flex-wrap:nowrap;width:100%}.inline-message-wrapper.size-l .container-content{display:-ms-flexbox;display:flex;width:100%;gap:var(--im-l-icon-gap);padding:4px 0}.inline-message-wrapper.size-l .container-content .wpp-icon{margin-top:2px}.inline-message-wrapper.size-l .container .title{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.inline-message-wrapper.size-l .container-actions{display:-ms-flexbox;display:flex;-ms-flex-item-align:start;align-self:flex-start}.inline-message-wrapper.size-l .container-actions .action-btn{width:-webkit-max-content;width:-moz-max-content;width:max-content;--wpp-action-button-padding:var(--im-l-action-btn-padding);margin-right:var(--im-l-action-btn-margin-right)}.inline-message-wrapper.size-l .container-actions .close-btn{--wpp-action-button-padding:6px}.inline-message-wrapper.size-l .container-body .tooltip:hover{cursor:pointer}.inline-message-wrapper.size-l .content-wrapper{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;gap:var(--im-l-header-gap);width:100%}.inline-message-wrapper.size-l .container-body{width:100%}.inline-message-wrapper.size-l .container-content.no-title .content-wrapper{gap:1px}.inline-message-wrapper .message-block{display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;gap:var(--im-m-icon-gap);border-radius:var(--im-border-radius);outline:none}.inline-message-wrapper .message-block.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}.inline-message-wrapper .message-block.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}.inline-message-wrapper .message-block.tooltip-maxlength-auto{display:grid;grid-auto-flow:column;-ms-flex-pack:start;justify-content:flex-start;width:100%;gap:var(--im-m-icon-gap)}.inline-message-wrapper .message-block.tooltip-maxlength-auto .message{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.inline-message-wrapper .message-block.truncated{cursor:pointer}.inline-message-wrapper .message-block .message{width:100%;word-break:break-word}.inline-message-wrapper .message{border-radius:var(--im-border-radius);outline:none}.inline-message-wrapper .message.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}:host(.wpp-information.wpp-size-l),:host(.wpp-information.wpp-size-m){background-color:white;border-radius:var(--im-border-radius)}:host(.wpp-information.wpp-size-l[data-wpp-theme=dark]) .inline-message-wrapper,:host(.wpp-information.wpp-size-m[data-wpp-theme=dark]) .inline-message-wrapper{background:var(--wpp-grey-color-300)}";

const WppInlineMessage = /*@__PURE__*/ proxyCustomElement(class WppInlineMessage extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppClickActionBtn = createEvent(this, "wppClickActionBtn", 1);
    this.wppClickCloseBtn = createEvent(this, "wppClickCloseBtn", 1);
    this.themeSubscription = themeSubscriptionController(() => this.host);
    this._locales = LOCALES_DEFAULTS;
    this.getMessage = () => {
      if (this.showTooltipFrom === 'auto')
        return this.message;
      this.isTruncated = this.message.length > this.showTooltipFrom;
      return this.isTruncated ? this.message.substring(0, this.showTooltipFrom) + ' ...' : this.message;
    };
    this.onBlur = () => {
      this.focusType = FOCUS_TYPE.NONE;
    };
    this.onMouseDown = () => {
      this.focusType = FOCUS_TYPE.MOUSE;
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab' && this.host.shadowRoot?.activeElement === this.messageRef)
        this.focusType = FOCUS_TYPE.TAB;
    };
    this.inlineMessageWrapperCssClasses = () => ({
      'inline-message-wrapper': true,
      [`size-${this.size}`]: true,
      [`${this.type}-message`]: !!this.type,
    });
    this.messageBlockCssClasses = () => ({
      'message-block': true,
      truncated: this.isTruncated,
      'tab-focus': this.focusType === FOCUS_TYPE.TAB,
      'tooltip-maxlength-auto': this.showTooltipFrom === 'auto',
    });
    this.hostCssClasses = () => ({
      'wpp-inline-message': true,
      [`wpp-${this.type}`]: !!this.type,
      [`wpp-size-${this.size}`]: true,
    });
    this.messageCssClasses = () => ({
      message: true,
      'tab-focus': this.focusType === FOCUS_TYPE.TAB,
    });
    this.titleCssClasses = () => ({
      title: true,
    });
    this.getMessageTypesIcons = () => {
      if (this.type === 'warning')
        return h("wpp-icon-warning-v4-1-0", { class: "left-icon", part: "message-icon", role: "presentation" });
      if (this.type === 'error')
        return h("wpp-icon-error-v4-1-0", { class: "left-icon", part: "message-icon", role: "presentation" });
      if (this.type === 'information')
        return (h("wpp-icon-info-message-v4-1-0", { color: "var(--wpp-grey-color-700)", class: "left-icon", part: "message-icon", role: "presentation" }));
      if (this.type === 'success')
        return h("wpp-icon-success-v4-1-0", { class: "left-icon", part: "message-icon", role: "presentation" });
      return null;
    };
    this.handleClickClose = () => {
      const wrapper = this.host.shadowRoot?.querySelector('[part="wrapper"]');
      if (wrapper) {
        const wrapperEl = wrapper;
        wrapperEl.style.display = 'none';
      }
      this.wppClickCloseBtn.emit();
    };
    this.handleClickActionBtn = () => {
      this.wppClickActionBtn.emit();
    };
    this.getContainerContentCssClasses = () => ({
      'container-content': true,
      'no-title': !this.hasTitle,
    });
    this.renderContent = () => {
      const message = this.getMessage();
      return this.size === 'l' ? (h("div", { class: "container", part: "container" }, h("div", { class: this.getContainerContentCssClasses() }, this.getMessageTypesIcons(), h("div", { class: "content-wrapper" }, h("wpp-typography-v4-1-0", { class: this.titleCssClasses(), tag: "h4", type: "m-strong", part: "title" }, this.titleText), h("div", { class: "container-body" }, this.isTruncated ? (h("wpp-tooltip-v4-1-0", { class: "tooltip", text: this.message, config: { placement: 'bottom', triggerTarget: this.messageRef, ...this.tooltipConfig }, part: "tooltip" }, h("span", { ref: ref => (this.messageRef = ref), class: this.messageCssClasses(), tabIndex: 0, part: "message", onBlur: this.onBlur }, message))) : (h("span", { class: "message", part: "message" }, message))))), this.actionBtnText || !this.hideCloseBtn ? (h("div", { class: "container-actions" }, this.actionBtnText?.length > 0 && (h("wpp-action-button-v4-1-0", { part: "action-btn", class: "action-btn", variant: "secondary", onClick: this.handleClickActionBtn }, this.actionBtnText)), !this.hideCloseBtn && (h("wpp-action-button-v4-1-0", { class: "close-btn", ariaProps: { label: this._locales.close }, variant: "secondary", onClick: this.handleClickClose }, h("wpp-icon-cross-v4-1-0", { color: "var(--ab-secondary-text-color)", size: "m" }))))) : null)) : this.isTruncated ? (h("wpp-tooltip-v4-1-0", { text: this.message, config: { placement: 'bottom', ...this.tooltipConfig }, part: "tooltip" }, h("div", { class: this.messageBlockCssClasses(), part: "message-block", ref: ref => (this.messageRef = ref), onBlur: this.onBlur, tabIndex: 0 }, this.getMessageTypesIcons(), h("span", { class: "message", part: "message" }, message)))) : (h("div", { class: this.messageBlockCssClasses(), part: "message-block" }, this.getMessageTypesIcons(), h("span", { class: "message", part: "message" }, message)));
    };
    this.getExportParts = () => {
      let defaultParts = 'wrapper, message-icon, message';
      if (this.size === 'l') {
        this.isTruncated ? (defaultParts += ',tooltip') : (defaultParts += '');
        defaultParts += ', container, title, action-btn';
      }
      else {
        this.isTruncated ? (defaultParts += ',tooltip, message-block') : (defaultParts += ', message-block');
      }
      return defaultParts;
    };
    this.isTruncated = false;
    this.hasTitle = false;
    this.focusType = undefined;
    this.titleText = '';
    this.actionBtnText = '';
    this.message = '';
    this.type = undefined;
    this.size = 's';
    this.tooltipConfig = {};
    this.showTooltipFrom = 'auto';
    this.hideCloseBtn = false;
    this.locales = {};
  }
  onUpdateTitleText() {
    this.hasTitle = this.size === 'l' && this.titleText.length > 0;
  }
  onUpdateLocales(newLocales) {
    this._locales = { ...this._locales, ...newLocales };
  }
  componentWillLoad() {
    this._locales = { ...this._locales, ...this.locales };
    this.hasTitle = this.size === 'l' && this.titleText.length > 0;
  }
  componentDidLoad() {
    this.setupResizeObserver();
    requestAnimationFrame(() => {
      this.checkTruncation();
    });
  }
  connectedCallback() {
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    if (this.resizeObserver)
      this.resizeObserver.disconnect();
  }
  setupResizeObserver() {
    this.resizeObserver = new ResizeObserver(debounce(() => {
      this.checkTruncation();
    }, 50));
    if (this.resizeObserver)
      this.resizeObserver.observe(this.host);
  }
  checkTruncation() {
    const messageSpan = (this.host?.shadowRoot).querySelector('.message');
    if (!messageSpan)
      return;
    this.isTruncated = messageSpan.clientWidth < messageSpan.scrollWidth;
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), onBlur: this.onBlur, onKeyUp: this.onKeyUp, exportparts: this.getExportParts() }, h("div", { class: this.inlineMessageWrapperCssClasses(), part: "wrapper" }, this.renderContent())));
  }
  static get registryIs() { return "wpp-inline-message-v4-1-0"; }
  get host() { return this; }
  static get watchers() { return {
    "titleText": ["onUpdateTitleText"],
    "locales": ["onUpdateLocales"]
  }; }
  static get style() { return wppInlineMessageCss; }
}, [1, "wpp-inline-message", "wpp-inline-message-v4-1-0", {
    "titleText": [1, "title-text"],
    "actionBtnText": [1, "action-btn-text"],
    "message": [1],
    "type": [1],
    "size": [1],
    "tooltipConfig": [16],
    "showTooltipFrom": [1032, "show-tooltip-from"],
    "hideCloseBtn": [4, "hide-close-btn"],
    "locales": [16],
    "isTruncated": [32],
    "hasTitle": [32],
    "focusType": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-inline-message-v4-1-0", "wpp-action-button-v4-1-0", "wpp-icon-cross-v4-1-0", "wpp-icon-error-v4-1-0", "wpp-icon-info-message-v4-1-0", "wpp-icon-success-v4-1-0", "wpp-icon-warning-v4-1-0", "wpp-internal-tooltip-v4-1-0", "wpp-spinner-v4-1-0", "wpp-tooltip-v4-1-0", "wpp-typography-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-inline-message-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppInlineMessage);
      }
      break;
    case "wpp-action-button-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-icon-cross-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-icon-error-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-icon-info-message-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-icon-success-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-icon-warning-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-internal-tooltip-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-spinner-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-tooltip-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-typography-v4-1-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WppInlineMessage as W, defineCustomElement as d };
