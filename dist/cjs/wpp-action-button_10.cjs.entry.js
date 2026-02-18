'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const wppActionButton = require('./wpp-action-button-116d7a60.js');
const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');
const common = require('./common-ee802540.js');
const utils = require('./utils-ce5c8ac5.js');
const WrappedSlot = require('./WrappedSlot-4a4ef805.js');
const isEqual = require('./isEqual-0b0240b4.js');
const menuListConfig = require('./menuListConfig-bbde46c0.js');
const consts = require('./consts-dba6e6dd.js');
require('./_commonjsHelpers-bcc1208a.js');
require('./tippy.esm-9d703cd4.js');

const wppIconCss$2 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconCross = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-cross", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M5.70711 4.29289C5.31658 3.90237 4.68342 3.90237 4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289 5.70711L8.58579 10L4.29289 14.2929C3.90237 14.6834 3.90237 15.3166 4.29289 15.7071C4.68342 16.0976 5.31658 16.0976 5.70711 15.7071L10 11.4142L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L11.4142 10L15.7071 5.70711C16.0976 5.31658 16.0976 4.68342 15.7071 4.29289C15.3166 3.90237 14.6834 3.90237 14.2929 4.29289L10 8.58579L5.70711 4.29289Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-cross-v4-0-0"; }
};
WppIconCross.style = wppIconCss$2;

const wppIconCss$1 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconInfoMessage = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-info-message", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M13.073 15L12.6891 16.6051C12.5048 17.3763 11.8236 17.935 11.0181 17.9947L10.8748 18H9.12546C8.30655 18 7.59 17.4839 7.34866 16.7385L7.31108 16.6047L6.928 15H13.073ZM10 2C13.3137 2 16 4.59693 16 7.80041C16 9.47737 15.2546 11.0164 13.7961 12.3942C13.7324 12.4544 13.6831 12.5269 13.6512 12.6065L13.6251 12.6883L13.311 14H10.5002V9.49707C10.5002 9.22093 10.2764 8.99707 10.0002 8.99707C9.7241 8.99707 9.50024 9.22093 9.50024 9.49707V14H6.689L6.37626 12.6886C6.34955 12.5766 6.29016 12.4745 6.20516 12.3942C4.8153 11.0819 4.07265 9.62354 4.00507 8.03903L4 7.80041L4.00321 7.60894C4.1077 4.49409 6.75257 2 10 2ZM9.5 6.50238V7.50391C9.5 7.78005 9.72386 8.00391 10 8.00391C10.2761 8.00391 10.5 7.78005 10.5 7.50391V6.50238C10.5 6.22624 10.2761 6.00238 10 6.00238C9.72386 6.00238 9.5 6.22624 9.5 6.50238ZM12.8506 7.44332C12.6553 7.24806 12.3388 7.24806 12.1435 7.44332L11.4353 8.15151C11.2401 8.34677 11.2401 8.66335 11.4353 8.85861C11.6306 9.05388 11.9472 9.05388 12.1424 8.85861L12.8506 8.15043C13.0459 7.95517 13.0459 7.63858 12.8506 7.44332ZM7.8521 7.44332C7.65684 7.24806 7.34026 7.24806 7.145 7.44332C6.94973 7.63858 6.94973 7.95517 7.145 8.15043L7.85318 8.85861C8.04844 9.05388 8.36503 9.05388 8.56029 8.85861C8.75555 8.66335 8.75555 8.34677 8.56029 8.15151L7.8521 7.44332Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-info-message-v4-0-0"; }
};
WppIconInfoMessage.style = wppIconCss$1;

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconSuccess = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-success-color-400)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-success", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM13.6067 8.89925C13.9742 8.5317 13.9742 7.93578 13.6067 7.56823C13.2391 7.20068 12.6432 7.20068 12.2757 7.56823L9.01961 10.8243L7.72433 9.52901C7.35678 9.16146 6.76086 9.16146 6.39331 9.52901C6.02576 9.89657 6.02576 10.4925 6.39331 10.86L8.35409 12.8208C8.72165 13.1884 9.31757 13.1884 9.68512 12.8208L13.6067 8.89925Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-success-v4-0-0"; }
};
WppIconSuccess.style = wppIconCss;

const LOCALES_DEFAULTS$1 = {
  close: 'Close inline message button',
};

const wppInlineMessageCss = ":host{--im-m-icon-gap:var(--wpp-inline-message-m-icon-gap, 4px);--im-l-icon-gap:var(--wpp-inline-message-l-icon-gap, 8px);--im-m-padding:var(--wpp-inline-message-m-padding, 5px 8px);--im-l-padding:var(--wpp-inline-message-l-padding, 12px 12px 12px 16px);--im-line-height:var(--wpp-inline-message-line-height, 22px);--im-border-radius:var(--wpp-inline-message-border-radius, var(--wpp-border-radius-s));--im-text-color:var(--wpp-inline-message-text-color, var(--wpp-grey-color-1000));--im-empty-type-text-color:var(--wpp-inline-message-empty-type-text-color, var(--wpp-grey-color-800));--im-warning-text-color:var(--wpp-inline-message-warning-text-color, var(--wpp-text-color-warning));--im-error-text-color:var(--wpp-inline-message-error-text-color, var(--wpp-text-color-danger));--im-information-text-color:var(--wpp-inline-message-information-text-color, var(--wpp-text-color-info));--im-success-text-color:var(--wpp-inline-message-success-text-color, var(--wpp-text-color-success));--im-warning-background-color:var(--wpp-inline-message-warning-background-color, var(--wpp-warning-color-200));--im-error-background-color:var(--wpp-inline-message-error-background-color, var(--wpp-danger-color-200));--im-information-background-color:var(--wpp-inline-message-information-background-color, var(--wpp-grey-color-300));--im-success-background-color:var(--wpp-inline-message-success-background-color, var(--wpp-success-color-200));--im-l-min-width:var(--wpp-l-inline-message-min-width, 376px);--im-l-action-btn-padding:var(--wpp-inline-message-l-action-btn-padding, 5px 6px);--im-l-action-btn-margin-right:var(--wpp-inline-message-l-action-btn-margin-right, 4px);--im-l-body-padding-left:var(--wpp-inline-message-l-body-padding-left, 30px);--im-l-header-gap:var(--wpp-inline-message-l-header-gap, 3px)}.inline-message-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:var(--im-width);color:var(--im-text-color)}.inline-message-wrapper.size-s{font-size:var(--wpp-typography-xs-midi-font-size, 12px);line-height:var(--wpp-typography-xs-midi-line-height, 20px);font-weight:var(--wpp-typography-xs-midi-font-weight, 500);color:var(--wpp-typography-xs-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-xs-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-xs-midi-letter-spacing, 0)}.inline-message-wrapper.size-s.warning-message{color:var(--im-warning-text-color)}.inline-message-wrapper.size-s.error-message{color:var(--im-error-text-color)}.inline-message-wrapper.size-s.information-message{color:var(--im-information-text-color)}.inline-message-wrapper.size-s.success-message{color:var(--im-success-text-color)}.inline-message-wrapper:not(.warning-message,.error-message,.information-message,.success-message){color:var(--im-empty-type-text-color)}.inline-message-wrapper.size-l,.inline-message-wrapper.size-m{padding:var(--im-m-padding);border-radius:var(--im-border-radius);font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}.inline-message-wrapper.size-l.warning-message,.inline-message-wrapper.size-m.warning-message{background-color:var(--im-warning-background-color)}.inline-message-wrapper.size-l.error-message,.inline-message-wrapper.size-m.error-message{background-color:var(--im-error-background-color)}.inline-message-wrapper.size-l.information-message,.inline-message-wrapper.size-m.information-message{background-color:var(--im-information-background-color);background-color:color-mix(in srgb, var(--im-information-background-color) 60%, transparent)}.inline-message-wrapper.size-l.success-message,.inline-message-wrapper.size-m.success-message{background-color:var(--im-success-background-color)}.inline-message-wrapper.size-l .message,.inline-message-wrapper.size-m .message{line-height:var(--im-line-height)}.inline-message-wrapper .left-icon{display:-ms-inline-flexbox;display:inline-flex}.inline-message-wrapper.size-m .message-block .wpp-icon{margin-top:1px}.inline-message-wrapper.size-l{padding:var(--im-l-padding);min-width:var(--im-l-min-width);-webkit-box-sizing:border-box;box-sizing:border-box}.inline-message-wrapper.size-l .container{display:-ms-flexbox;display:flex;gap:24px;-ms-flex-wrap:nowrap;flex-wrap:nowrap;width:100%}.inline-message-wrapper.size-l .container-content{display:-ms-flexbox;display:flex;width:100%;gap:var(--im-l-icon-gap);padding:4px 0}.inline-message-wrapper.size-l .container-content .wpp-icon{margin-top:2px}.inline-message-wrapper.size-l .container .title{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.inline-message-wrapper.size-l .container-actions{display:-ms-flexbox;display:flex;-ms-flex-item-align:start;align-self:flex-start}.inline-message-wrapper.size-l .container-actions .action-btn{width:-webkit-max-content;width:-moz-max-content;width:max-content;--wpp-action-button-padding:var(--im-l-action-btn-padding);margin-right:var(--im-l-action-btn-margin-right)}.inline-message-wrapper.size-l .container-actions .close-btn{--wpp-action-button-padding:6px}.inline-message-wrapper.size-l .container-body .tooltip:hover{cursor:pointer}.inline-message-wrapper.size-l .content-wrapper{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;gap:var(--im-l-header-gap);width:100%}.inline-message-wrapper.size-l .container-body{width:100%}.inline-message-wrapper.size-l .container-content.no-title .content-wrapper{gap:1px}.inline-message-wrapper .message-block{display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;gap:var(--im-m-icon-gap);border-radius:var(--im-border-radius);outline:none}.inline-message-wrapper .message-block.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}.inline-message-wrapper .message-block.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}.inline-message-wrapper .message-block.tooltip-maxlength-auto{display:grid;grid-auto-flow:column;-ms-flex-pack:start;justify-content:flex-start;width:100%;gap:var(--im-m-icon-gap)}.inline-message-wrapper .message-block.tooltip-maxlength-auto .message{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.inline-message-wrapper .message-block.truncated{cursor:pointer}.inline-message-wrapper .message-block .message{width:100%;word-break:break-word}.inline-message-wrapper .message{border-radius:var(--im-border-radius);outline:none}.inline-message-wrapper .message.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}:host(.wpp-information.wpp-size-l),:host(.wpp-information.wpp-size-m){background-color:white;border-radius:var(--im-border-radius)}";

const WppInlineMessage = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppClickActionBtn = index.createEvent(this, "wppClickActionBtn", 1);
    this.wppClickCloseBtn = index.createEvent(this, "wppClickCloseBtn", 1);
    this._locales = LOCALES_DEFAULTS$1;
    this.getMessage = () => {
      if (this.showTooltipFrom === 'auto')
        return this.message;
      this.isTruncated = this.message.length > this.showTooltipFrom;
      return this.isTruncated ? this.message.substring(0, this.showTooltipFrom) + ' ...' : this.message;
    };
    this.onBlur = () => {
      this.focusType = common.FOCUS_TYPE.NONE;
    };
    this.onMouseDown = () => {
      this.focusType = common.FOCUS_TYPE.MOUSE;
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab' && this.host.shadowRoot?.activeElement === this.messageRef)
        this.focusType = common.FOCUS_TYPE.TAB;
    };
    this.inlineMessageWrapperCssClasses = () => ({
      'inline-message-wrapper': true,
      [`size-${this.size}`]: true,
      [`${this.type}-message`]: !!this.type,
    });
    this.messageBlockCssClasses = () => ({
      'message-block': true,
      truncated: this.isTruncated,
      'tab-focus': this.focusType === common.FOCUS_TYPE.TAB,
      'tooltip-maxlength-auto': this.showTooltipFrom === 'auto',
    });
    this.hostCssClasses = () => ({
      'wpp-inline-message': true,
      [`wpp-${this.type}`]: !!this.type,
      [`wpp-size-${this.size}`]: true,
    });
    this.messageCssClasses = () => ({
      message: true,
      'tab-focus': this.focusType === common.FOCUS_TYPE.TAB,
    });
    this.titleCssClasses = () => ({
      title: true,
    });
    this.getMessageTypesIcons = () => {
      if (this.type === 'warning')
        return index.h("wpp-icon-warning-v4-0-0", { class: "left-icon", part: "message-icon", role: "presentation" });
      if (this.type === 'error')
        return index.h("wpp-icon-error-v4-0-0", { class: "left-icon", part: "message-icon", role: "presentation" });
      if (this.type === 'information')
        return (index.h("wpp-icon-info-message-v4-0-0", { color: "var(--wpp-grey-color-700)", class: "left-icon", part: "message-icon", role: "presentation" }));
      if (this.type === 'success')
        return index.h("wpp-icon-success-v4-0-0", { class: "left-icon", part: "message-icon", role: "presentation" });
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
      return this.size === 'l' ? (index.h("div", { class: "container", part: "container" }, index.h("div", { class: this.getContainerContentCssClasses() }, this.getMessageTypesIcons(), index.h("div", { class: "content-wrapper" }, index.h("wpp-typography-v4-0-0", { class: this.titleCssClasses(), tag: "h4", type: "m-strong", part: "title" }, this.titleText), index.h("div", { class: "container-body" }, this.isTruncated ? (index.h("wpp-tooltip-v4-0-0", { class: "tooltip", text: this.message, config: { placement: 'bottom', triggerTarget: this.messageRef, ...this.tooltipConfig }, part: "tooltip" }, index.h("span", { ref: ref => (this.messageRef = ref), class: this.messageCssClasses(), tabIndex: 0, part: "message", onBlur: this.onBlur }, message))) : (index.h("span", { class: "message", part: "message" }, message))))), this.actionBtnText || !this.hideCloseBtn ? (index.h("div", { class: "container-actions" }, this.actionBtnText?.length > 0 && (index.h("wpp-action-button-v4-0-0", { part: "action-btn", class: "action-btn", variant: "secondary", onClick: this.handleClickActionBtn }, this.actionBtnText)), !this.hideCloseBtn && (index.h("wpp-action-button-v4-0-0", { class: "close-btn", ariaProps: { label: this._locales.close }, variant: "secondary", onClick: this.handleClickClose }, index.h("wpp-icon-cross-v4-0-0", { color: "var(--ab-secondary-text-color)", size: "m" }))))) : null)) : this.isTruncated ? (index.h("wpp-tooltip-v4-0-0", { text: this.message, config: { placement: 'bottom', ...this.tooltipConfig }, part: "tooltip" }, index.h("div", { class: this.messageBlockCssClasses(), part: "message-block", ref: ref => (this.messageRef = ref), onBlur: this.onBlur, tabIndex: 0 }, this.getMessageTypesIcons(), index.h("span", { class: "message", part: "message" }, message)))) : (index.h("div", { class: this.messageBlockCssClasses(), part: "message-block" }, this.getMessageTypesIcons(), index.h("span", { class: "message", part: "message" }, message)));
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
  disconnectedCallback() {
    if (this.resizeObserver)
      this.resizeObserver.disconnect();
  }
  setupResizeObserver() {
    this.resizeObserver = new ResizeObserver(utils.debounce(() => {
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
    return (index.h(index.Host, { class: this.hostCssClasses(), onBlur: this.onBlur, onKeyUp: this.onKeyUp, exportparts: this.getExportParts() }, index.h("div", { class: this.inlineMessageWrapperCssClasses(), part: "wrapper" }, this.renderContent())));
  }
  static get registryIs() { return "wpp-inline-message-v4-0-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "titleText": ["onUpdateTitleText"],
    "locales": ["onUpdateLocales"]
  }; }
};
WppInlineMessage.style = wppInlineMessageCss;

const LOCALES_DEFAULTS = {
  optional: 'Optional',
};

const wppInternalLabelCss = ":host{--label-tooltip-width:var(--wpp-label-tooltip-width, 100%);--label-optional-text-color:var(--wpp-label-optional-text-color, var(--wpp-text-color-info));--label-optional-margin:var(--wpp-label-optional-margin, 0 0 0 4px);--label-text-color:var(--wpp-label-text-color, var(--wpp-text-color));--label-text-color-disabled:var(--wpp-label-text-color-disabled, var(--wpp-text-color-disabled));--label-info-wrapper-margin:var(--wpp-label-info-wrapper-margin, 0 4px 0 0);--label-icon-color:var(--wpp-label-icon-color, var(--wpp-icon-color));--label-s-strong-text-color:var(--wpp-label-s-strong-text-color, var(--wpp-text-color-info));--label-s-body-text-color:var(--wpp-label-s-body-text-color, var(--wpp-text-color));--icon-first-border-color-focus:var(--wpp-icon-first-border-color-focus, var(--wpp-grey-color-000));--icon-second-border-color-focus:var(--wpp-icon-second-border-color-focus, var(--wpp-brand-color));display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center}:host .info-wrapper{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;cursor:pointer}:host .info-wrapper .optional{color:var(--label-optional-text-color);margin:var(--label-optional-margin)}:host .info-wrapper.with-icon{margin:var(--label-info-wrapper-margin)}:host .tooltip{--tooltip-width:var(--label-tooltip-width)}:host .icon{display:-ms-inline-flexbox;display:inline-flex;color:var(--label-icon-color);cursor:pointer;outline:none;border-radius:50%}:host .icon.slot-hidden{display:none}:host .icon.tab-focus.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--icon-first-border-color-focus), 0 0 0 3px var(--icon-second-border-color-focus);box-shadow:0 0 0 1px var(--icon-first-border-color-focus), 0 0 0 3px var(--icon-second-border-color-focus)}:host:host(.s-strong) .info-wrapper .text{color:var(--label-s-strong-text-color)}:host:host(.disabled){pointer-events:none}:host:host(.disabled) .info-wrapper .text,:host:host(.disabled) .info-wrapper .optional{color:var(--label-text-color-disabled)}";

const WppInternalLabel = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this._locales = LOCALES_DEFAULTS;
    this.updateSlotData = () => {
      const emptyStates = utils.getSlotEmptyStates(this.host.childNodes, {
        icon: '[slot="icon"]',
      });
      this.hasIconSlot = !emptyStates.icon;
    };
    this.onBlur = () => {
      this.focusType = common.FOCUS_TYPE.NONE;
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab')
        this.focusType = common.FOCUS_TYPE.TAB;
    };
    this.iconCssClasses = () => ({
      icon: true,
      'slot-hidden': !this.hasIconSlot,
      'tab-focus': this.focusType === common.FOCUS_TYPE.TAB,
    });
    this.hostCssClasses = () => ({
      'wpp-internal-label': true,
      [this.typography]: true,
      disabled: this.disabled,
    });
    this.infoWrapperCssClasses = () => ({
      'info-wrapper': true,
      'with-icon': this.hasIconSlot,
    });
    this.hasIconSlot = true;
    this.focusType = undefined;
    this.labelText = undefined;
    this.description = undefined;
    this.optional = false;
    this.typography = 's-body';
    this.disabled = false;
    this.locales = {};
    this.tooltipConfig = {};
    this.role = 'presentation';
  }
  onUpdateLocales(newLocales) {
    this._locales = { ...this._locales, ...newLocales };
  }
  componentWillLoad() {
    this._locales = { ...this._locales, ...this.locales };
    this.updateSlotData();
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses(), onKeyUp: this.onKeyUp, onBlur: this.onBlur, exportparts: "info-wrapper, text, optional-text, tooltip, icon, icon-wrapper" }, !!this.labelText && (index.h("div", { class: this.infoWrapperCssClasses(), part: "info-wrapper", role: this.role }, index.h("wpp-typography-v4-0-0", { type: this.typography, class: "text", part: "text" }, this.labelText), this.optional && (index.h("wpp-typography-v4-0-0", { type: "s-body", class: "optional", part: "optional-text" }, "(", this._locales.optional, ")")))), !!this.description && this.hasIconSlot ? (index.h("wpp-tooltip-v4-0-0", { class: "tooltip", text: this.description, config: this.tooltipConfig, part: "tooltip" }, index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.iconCssClasses(), name: "icon", onSlotchange: this.updateSlotData, role: this.tooltipConfig.tabIndex === -1 ? 'none' : 'button', tabIndex: this.tooltipConfig.tabIndex ?? 0, "aria-label": this.tooltipConfig.tabIndex !== -1 ? 'Show info' : undefined }))) : (index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.iconCssClasses(), name: "icon", onSlotchange: this.updateSlotData, role: "button", tabIndex: 0, "aria-label": "Show info" }))));
  }
  static get registryIs() { return "wpp-internal-label-v4-0-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "locales": ["onUpdateLocales"]
  }; }
};
WppInternalLabel.style = wppInternalLabelCss;

const wppInternalTooltipCss = ":host{display:-ms-inline-flexbox;display:inline-flex;width:100%}.tooltip-wrapper{width:100%;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start;-ms-flex-pack:center;justify-content:center;padding:6px 8px;border-radius:var(--wpp-border-radius-s);overflow-wrap:break-word;hyphens:auto;-webkit-hyphens:auto;-moz-hyphens:auto;-ms-hyphens:auto;-webkit-box-sizing:border-box;box-sizing:border-box}.tooltip-wrapper .content-with-icon{display:-ms-flexbox;display:flex;gap:4px;-ms-flex-align:start;align-items:flex-start}.tooltip-wrapper .content-wrapper{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.tooltip-wrapper .text{width:100%;font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}.tooltip-wrapper .header{width:100%;margin-bottom:2px;font-size:var(--wpp-typography-m-strong-font-size, 16px);line-height:var(--wpp-typography-m-strong-line-height, 24px);font-weight:var(--wpp-typography-m-strong-font-weight, 700);color:var(--wpp-typography-m-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-m-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-m-strong-letter-spacing, 0)}.tooltip-wrapper .value{font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0)}.tooltip-wrapper.with-header{padding:8px 12px}.tooltip-wrapper.with-header .content-with-icon .icon-wrapper .left-icon{padding-top:2px}.tooltip-wrapper.with-value{padding:6px 12px}.tooltip-wrapper.dark{background-color:var(--wpp-text-color-info)}.tooltip-wrapper.dark .text{color:var(--wpp-grey-color-000)}.tooltip-wrapper.dark .header{color:var(--wpp-grey-color-000)}.tooltip-wrapper.dark.with-header .header{color:var(--wpp-grey-color-000)}.tooltip-wrapper.dark.with-header .text{color:var(--wpp-grey-color-100)}.tooltip-wrapper.dark.with-value .text{color:var(--wpp-grey-color-200)}.tooltip-wrapper.dark.with-value .value{color:var(--wpp-grey-color-000)}.tooltip-wrapper.dark .value{color:var(--wpp-grey-color-000)}.tooltip-wrapper.dark:not(.with-header):not(.with-value) .text{color:var(--wpp-grey-color-000)}.tooltip-wrapper.light{-webkit-box-shadow:var(--wpp-box-shadow-m);box-shadow:var(--wpp-box-shadow-m);background-color:var(--wpp-grey-color-000)}.tooltip-wrapper.light .text{color:var(--wpp-grey-color-1000)}.tooltip-wrapper.light .header{color:var(--wpp-text-color)}.tooltip-wrapper.light.with-header .header{color:var(--wpp-grey-color-1000)}.tooltip-wrapper.light.with-header .text{color:var(--wpp-grey-color-800)}.tooltip-wrapper.light.with-value .text{color:var(--wpp-grey-color-800)}.tooltip-wrapper.light.with-value .value{color:var(--wpp-grey-color-1000)}.tooltip-wrapper.light .value{color:var(--wpp-text-color)}.tooltip-wrapper.light:not(.with-header):not(.with-value) .text{color:var(--wpp-grey-color-1000)}.tooltip-wrapper.error,.tooltip-wrapper.warning{position:relative;background-color:var(--wpp-danger-color-200);-webkit-box-shadow:var(--wpp-box-shadow-m);box-shadow:var(--wpp-box-shadow-m)}.tooltip-wrapper.error.with-value .text,.tooltip-wrapper.warning.with-value .text{color:var(--wpp-grey-color-800)}.tooltip-wrapper.error.with-value .value,.tooltip-wrapper.warning.with-value .value{color:var(--wpp-grey-color-1000)}.tooltip-wrapper.error .header,.tooltip-wrapper.warning .header{color:var(--wpp-grey-color-1000)}.tooltip-wrapper.error .text,.tooltip-wrapper.warning .text{color:var(--wpp-grey-color-1000)}.tooltip-wrapper.error.with-header .header,.tooltip-wrapper.warning.with-header .header{color:var(--wpp-grey-color-1000)}.tooltip-wrapper.error.with-header .text,.tooltip-wrapper.warning.with-header .text{color:var(--wpp-grey-color-800)}.tooltip-wrapper.error:not(.with-header):not(.with-value) .text,.tooltip-wrapper.warning:not(.with-header):not(.with-value) .text{color:var(--wpp-grey-color-1000)}.tooltip-wrapper.warning{background-color:var(--wpp-warning-color-200)}";

const WppTooltip$1 = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.cssClasses = () => ({
      'tooltip-wrapper': true,
      [`${this.theme}`]: true,
      'with-header': !!this.header,
      'with-value': !!this.value,
      error: this.error,
      warning: this.warning,
    });
    this.hostCssClasses = () => ({
      'wpp-internal-tooltip': true,
      [`${this.externalClass}`]: true,
    });
    this.headerCssClasses = () => ({
      header: !!this.header,
    });
    this.textCssClasses = () => ({
      text: !!this.text,
    });
    this.valueCssClasses = () => ({
      value: !!this.value,
    });
    this.getIconBasedOnProps = () => {
      if (this.error) {
        return index.h("wpp-icon-error-v4-0-0", { class: "left-icon", part: "icon-error" });
      }
      if (this.warning) {
        return index.h("wpp-icon-warning-v4-0-0", { color: "var(--wpp-warning-color-400)", class: "left-icon" });
      }
      return null;
    };
    this.getTextLines = () => {
      if (!this.text)
        return null;
      return this.text
        .trim()
        .split('\n')
        .map((line) => (index.h(index.Fragment, null, line, index.h("br", null))));
    };
    this.cssStyle = undefined;
    this.header = undefined;
    this.text = undefined;
    this.wordBreak = 'break-word';
    this.value = undefined;
    this.error = false;
    this.warning = false;
    this.theme = 'dark';
    this.externalClass = '';
    this.ariaProp = {};
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses(), style: this.cssStyle, exportparts: "tooltip-content" }, index.h("div", { class: this.cssClasses(), style: { wordBreak: this.wordBreak }, part: "tooltip-content" }, index.h("div", { class: "content-with-icon", id: this.ariaProp.describedby }, this.getIconBasedOnProps() && index.h("div", { class: "icon-wrapper" }, this.getIconBasedOnProps()), index.h("div", { class: "content-wrapper" }, !!this.header && (index.h("span", { class: this.headerCssClasses(), part: "header" }, this.header)), !!this.text && (index.h("span", { class: this.textCssClasses(), part: "text" }, this.getTextLines())), !!this.value && (index.h("span", { class: this.valueCssClasses(), part: "value" }, this.value)))))));
  }
  static get registryIs() { return "wpp-internal-tooltip-v4-0-0"; }
  get host() { return index.getElement(this); }
};
WppTooltip$1.style = wppInternalTooltipCss;

const wppLabelCss = ".sc-wpp-label-h{display:-ms-flexbox;display:flex}.sc-wpp-label-h .internal-label-wrapper.sc-wpp-label{display:-ms-flexbox;display:flex;margin:0}";

const WppLabel = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hostCssClasses = () => ({
      'wpp-label': true,
    });
    this.renderContent = () => (index.h("wpp-internal-label-v4-0-0", { labelText: this.config?.text, description: this.config?.description, optional: this.optional, typography: this.typography, disabled: this.disabled, locales: this.config?.locales, tooltipConfig: this.tooltipConfig, part: "content", id: this.labelId }, this.config?.icon && index.h(utils.transformToVersionedTag(this.config?.icon), { slot: 'icon', part: 'icon' })));
    this.description = undefined;
    this.htmlFor = undefined;
    this.optional = false;
    this.typography = 's-strong';
    this.disabled = false;
    this.config = undefined;
    this.tag = 'label';
    this.tooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.labelId = undefined;
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses(), exportparts: "wrapper, content, icon" }, index.h(this.tag, { class: "internal-label-wrapper", part: "wrapper", ...(this.tag === 'label' && { htmlFor: this.htmlFor, 'aria-label': this.htmlFor }) }, this.renderContent())));
  }
  static get registryIs() { return "wpp-label-v4-0-0"; }
};
WppLabel.style = wppLabelCss;

const wppSpinnerCss = ":host{--spinner-padding-s:var(--wpp-spinner-padding-s, 3px);--spinner-padding-m:var(--wpp-spinner-padding-m, 8px);--spinner-padding-l:var(--wpp-spinner-padding-l, 8px);display:-ms-inline-flexbox;display:inline-flex}:host(.wpp-size-s){padding:var(--spinner-padding-s)}:host(.wpp-size-m){padding:var(--spinner-padding-m)}:host(.wpp-size-l){padding:var(--spinner-padding-l)}.spinner{-webkit-animation:rotate-spinner 3s linear infinite;animation:rotate-spinner 3s linear infinite}@-webkit-keyframes spinner-s{0%{stroke-dashoffset:9.24}50%{stroke-dashoffset:43.96}100%{stroke-dashoffset:0.66}}@keyframes spinner-s{0%{stroke-dashoffset:9.24}50%{stroke-dashoffset:43.96}100%{stroke-dashoffset:0.66}}@-webkit-keyframes spinner-m{0%{stroke-dashoffset:21.12}50%{stroke-dashoffset:100.48}100%{stroke-dashoffset:0.66}}@keyframes spinner-m{0%{stroke-dashoffset:21.12}50%{stroke-dashoffset:100.48}100%{stroke-dashoffset:0.66}}@-webkit-keyframes spinner-l{0%{stroke-dashoffset:42.24}50%{stroke-dashoffset:200.96}100%{stroke-dashoffset:0.66}}@keyframes spinner-l{0%{stroke-dashoffset:42.24}50%{stroke-dashoffset:200.96}100%{stroke-dashoffset:0.66}}.spinner.size-s{width:14px;height:14px;-webkit-transform-origin:7px 7px 0;transform-origin:7px 7px 0}.spinner.size-s circle{-webkit-animation:spinner-s 3s linear infinite;animation:spinner-s 3s linear infinite;stroke-dasharray:43.96px;stroke-dashoffset:14;stroke-width:2}.spinner.size-m{width:32px;height:32px;-webkit-transform-origin:16px 16px 0;transform-origin:16px 16px 0}.spinner.size-m circle{-webkit-animation:spinner-m 3s linear infinite;animation:spinner-m 3s linear infinite;stroke-dasharray:100.48px;stroke-dashoffset:32;stroke-width:4}.spinner.size-l{width:64px;height:64px;-webkit-transform-origin:32px 32px 0;transform-origin:32px 32px 0}.spinner.size-l circle{-webkit-animation:spinner-l 3s linear infinite;animation:spinner-l 3s linear infinite;stroke-dasharray:200.96px;stroke-dashoffset:64;stroke-width:6}@-webkit-keyframes rotate-spinner{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(720deg);transform:rotate(720deg)}100%{-webkit-transform:rotate(1080deg);transform:rotate(1080deg)}}@keyframes rotate-spinner{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(720deg);transform:rotate(720deg)}100%{-webkit-transform:rotate(1080deg);transform:rotate(1080deg)}}@media (prefers-reduced-motion: reduce){:host .spinner{-webkit-animation:none !important;animation:none !important;}}";

const SPINNER_SIZES = {
  s: 7,
  m: 16,
  l: 32,
};
const SPINNER_RADIUS = {
  s: 6,
  m: 14,
  l: 29,
};
const WppSpinner = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.hostCssClasses = () => ({
      'wpp-spinner': true,
      [`wpp-size-${this.size}`]: true,
    });
    this.spinnerCssClasses = () => ({
      spinner: true,
      [`size-${this.size}`]: true,
    });
    this.color = 'var(--wpp-primary-color-500)';
    this.size = 's';
    this.ariaProps = undefined;
  }
  render() {
    const isAnnounced = this.ariaProps?.label && this.ariaProps?.label !== '';
    return (index.h(index.Host, { class: this.hostCssClasses(), role: isAnnounced ? 'status' : null, "aria-hidden": isAnnounced ? null : 'true', "aria-live": isAnnounced ? 'polite' : null, "aria-label": isAnnounced ? this.ariaProps?.label : null }, index.h("svg", { class: this.spinnerCssClasses(), "aria-hidden": "true", focusable: "false" }, index.h("circle", { cx: SPINNER_SIZES[this.size], cy: SPINNER_SIZES[this.size], r: SPINNER_RADIUS[this.size], fill: "transparent", stroke: this.color, "stroke-linecap": "round" }))));
  }
  static get registryIs() { return "wpp-spinner-v4-0-0"; }
};
WppSpinner.style = wppSpinnerCss;

const ARROW_COLORS = {
  dark: 'var(--wpp-text-color-info)',
  light: 'var(--wpp-grey-color-000)',
  error: 'var(--wpp-danger-color-200)',
  warning: 'var(--wpp-warning-color-200)',
};

const defaultTooltipConfig = {
  placement: 'top',
  offset: [0, 7.2],
  trigger: 'mouseenter focus',
  zIndex: consts.Z_INDEX.TOOLTIP,
  popperOptions: {
    modifiers: [
      {
        name: 'arrow',
        options: {
          padding: 0,
        },
      },
    ],
  },
  appendTo: () => utils.getHighestContainerInDOM(),
};

const wppTooltipCss = ":host{display:-ms-inline-flexbox;display:inline-flex;width:-webkit-fit-content}:host .anchor{display:-ms-inline-flexbox;display:inline-flex;max-width:100%}:host .content-wrapper.hidden{position:absolute;display:none}:host .tooltip-custom-content{width:100%;background-color:var(--wpp-text-color-info);padding:6px 8px;border-radius:var(--wpp-border-radius-s);overflow-wrap:break-word}:host .tooltip-custom-content.light{-webkit-box-shadow:var(--wpp-box-shadow-m);box-shadow:var(--wpp-box-shadow-m);background-color:var(--wpp-grey-color-000)}";

const WppTooltip = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.FORBIDDEN_PREFIX = 'wpp-';
    this.ALLOWED_TAGS = ['wpp-typography'];
    this.handleSlotChange = () => {
      if (this.slotRef) {
        // Get all assigned elements from the slot
        const slot = this.slotRef;
        const assignedElements = slot.assignedElements();
        this.anchorRef = assignedElements[0];
      }
    };
    this.transformAllowedTags = () => this.ALLOWED_TAGS.map(el => el
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(''));
    this.arrowSVG = () => {
      const arrowSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      arrowSVG.setAttribute('width', '8');
      arrowSVG.setAttribute('height', '4');
      const arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      arrowPath.setAttribute('fill', this.getArrowBgColor());
      arrowPath.setAttribute('fill-rule', 'evenodd');
      arrowPath.setAttribute('clip-rule', 'evenodd');
      arrowPath.setAttribute('d', 'M3.29289 0.707106C3.68342 0.316582 4.31658 0.316583 4.70711 0.707107L8 4L0 4L3.29289 0.707106Z');
      arrowSVG.appendChild(arrowPath);
      return arrowSVG;
    };
    this.createTippyInstance = () => {
      if (this.disabled) {
        return;
      }
      const content = this.config.allowHTML ? this.customContentEl : this.contentEl;
      if (this.anchorRef && content) {
        this.tippyInstance = menuListConfig.menuListConfig({
          anchor: this.anchorRef,
          content,
          triggerElementWidth: false,
          arrow: this.arrowSVG(),
          hideOnEsc: true,
          aria: {
            expanded: undefined,
          },
          ...defaultTooltipConfig,
          ...this.config,
          // Duration and Delay are not configurable,
          duration: [150, 100],
          delay: [500, 30],
          onMount(instance) {
            const referenceElement = instance.reference;
            if (!referenceElement)
              return;
            if (utils.isWppElement(referenceElement)) {
              referenceElement.ariaProps = {
                ...referenceElement.ariaProps,
                describedby: `tippy-${instance.id}`,
              };
            }
            else {
              referenceElement.setAttribute('aria-describedby', `tippy-${instance.id}`);
            }
          },
          onHide(instance) {
            const referenceElement = instance.reference;
            if (!referenceElement)
              return;
            if (utils.isWppElement(referenceElement)) {
              const { describedby, ...restProps } = referenceElement.ariaProps;
              referenceElement.ariaProps = restProps;
            }
            else {
              referenceElement.removeAttribute('aria-describedby');
            }
          },
          onShow: (instance) => {
            if (this.dropdownWidth !== 'auto') {
              instance.popper.style.width = this.dropdownWidth;
              instance.popper.style.maxWidth = this.dropdownWidth;
            }
            else {
              instance.popper.style.maxWidth = '350px';
            }
            if (this.config.onShow) {
              return this.config.onShow(instance);
            }
          },
          popperOptions: {
            strategy: 'fixed',
            ...(this.config.popperOptions || {}),
            modifiers: [
              {
                name: 'autoUpdate',
                enabled: true,
              },
              ...(this.config.popperOptions?.modifiers || []),
            ],
          },
        });
      }
    };
    this.getArrowBgColor = () => {
      const currColor = this.error ? 'error' : this.warning ? 'warning' : this.theme;
      return ARROW_COLORS[currColor];
    };
    this.hostCssClasses = () => ({
      'wpp-tooltip': true,
    });
    this.contentWrapperCssClasses = () => ({
      'content-wrapper': true,
      hidden: this.hidden || this.disabled,
    });
    this.hidden = true;
    this.style = {};
    this.disabled = false;
    this.header = undefined;
    this.text = undefined;
    this.value = undefined;
    this.error = false;
    this.warning = false;
    this.wordBreak = 'break-word';
    this.theme = 'dark';
    this.config = {};
    this.externalClass = '';
    this.dropdownWidth = 'auto';
    this.ariaProps = {};
    this.anchorTabIndex = 0;
  }
  updateConfig(newConfig, oldConfig) {
    if (!isEqual.isEqual_1(newConfig, oldConfig)) {
      this.config = newConfig;
      this.tippyInstance?.setProps(newConfig);
    }
  }
  updateTheme() {
    this.tippyInstance?.setProps({
      arrow: this.arrowSVG(),
    });
    this.tippyInstance?.popperInstance?.update();
  }
  textChanged(newText, oldText) {
    if (newText !== oldText && this.contentEl) {
      const contentEl = this.contentEl;
      contentEl.text = newText;
      requestAnimationFrame(() => {
        this.tippyInstance?.setProps({
          placement: this.config.placement || 'top',
        });
        this.tippyInstance?.popperInstance?.update();
      });
    }
  }
  handleDisabledChange(newDisabled) {
    if (newDisabled) {
      if (this.tippyInstance) {
        this.tippyInstance.destroy();
        this.tippyInstance = undefined;
      }
    }
    else {
      this.createTippyInstance();
    }
  }
  componentWillLoad() {
    if (this.config.allowHTML) {
      const content = this.host?.querySelector('[slot="tooltip-content"]');
      if (content) {
        const validateElement = (element) => {
          element.childNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const tagName = node.tagName.toLowerCase();
              if (tagName.startsWith(this.FORBIDDEN_PREFIX) && !this.ALLOWED_TAGS.some(el => tagName.startsWith(el))) {
                console.warn(`WPP components are not allowed in WppTooltip, except for: ${this.transformAllowedTags()}`);
              }
              validateElement(node);
            }
          });
        };
        validateElement(content);
      }
    }
  }
  componentDidLoad() {
    setTimeout(() => {
      this.createTippyInstance();
      this.hidden = false;
    }, 0);
    if (this.config.allowHTML) {
      const content = this.host.querySelector('[slot="tooltip-content"]');
      if (content && this.customContentEl) {
        this.customContentEl.appendChild(content);
      }
    }
  }
  disconnectedCallback() {
    this.tippyInstance?.destroy();
  }
  connectedCallback() {
    this.tippyInstance?.setProps({
      arrow: this.arrowSVG(),
    });
    if (this.tippyInstance?.state.isDestroyed) {
      this.createTippyInstance();
    }
  }
  render() {
    return (index.h(index.Host, { class: this.hostCssClasses(), role: "presentation" }, index.h("div", { "aria-label": this.ariaProps?.label, part: "anchor", class: "anchor", ...(this.anchorTabIndex ? { tabIndex: this.anchorTabIndex } : {}) }, index.h("slot", { part: "inner", ref: (slotRef) => (this.slotRef = slotRef), onSlotchange: this.handleSlotChange })), index.h("div", { class: this.contentWrapperCssClasses() }, !this.config.allowHTML ? (index.h("wpp-internal-tooltip-v4-0-0", { cssStyle: this.style, ref: contentEl => (this.contentEl = contentEl), header: this.header, text: this.text, value: this.value, error: this.error, wordBreak: this.wordBreak, warning: this.warning, theme: this.theme, externalClass: this.externalClass, ariaProp: this.ariaProps })) : (index.h("div", { ref: customContentEl => (this.customContentEl = customContentEl), class: `tooltip-custom-content ${this.theme}`, id: this.ariaProps?.describedby })))));
  }
  static get registryIs() { return "wpp-tooltip-v4-0-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "config": ["updateConfig"],
    "theme": ["updateTheme"],
    "error": ["updateTheme"],
    "warning": ["updateTheme"],
    "text": ["textChanged"],
    "disabled": ["handleDisabledChange"]
  }; }
};
WppTooltip.style = wppTooltipCss;

exports.wpp_action_button = wppActionButton.WppActionButton;
exports.wpp_icon_cross = WppIconCross;
exports.wpp_icon_info_message = WppIconInfoMessage;
exports.wpp_icon_success = WppIconSuccess;
exports.wpp_inline_message = WppInlineMessage;
exports.wpp_internal_label = WppInternalLabel;
exports.wpp_internal_tooltip = WppTooltip$1;
exports.wpp_label = WppLabel;
exports.wpp_spinner = WppSpinner;
exports.wpp_tooltip = WppTooltip;
