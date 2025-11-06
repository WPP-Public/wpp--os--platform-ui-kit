export { W as wpp_action_button } from './wpp-action-button-eea7b2ce.js';
import { r as registerInstance, h, c as createEvent, H as Host, g as getElement, F as Fragment } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-d0aab502.js';
import { d as debounce, g as getSlotEmptyStates, j as transformToVersionedTag, v as getHighestContainerInDOM } from './utils-f3870f15.js';
import { W as WrappedSlot } from './WrappedSlot-a49aa0dd.js';
import { i as isEqual_1 } from './isEqual-19e8fa15.js';
import { m as menuListConfig } from './menuListConfig-1b46213e.js';
import { Z as Z_INDEX } from './consts-4b0f734e.js';
import './common-69c8ea89.js';
import './_commonjsHelpers-ba3f0406.js';

const wppIconCss$2 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconCross = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-cross", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M5.70711 4.29289C5.31658 3.90237 4.68342 3.90237 4.29289 4.29289C3.90237 4.68342 3.90237 5.31658 4.29289 5.70711L8.58579 10L4.29289 14.2929C3.90237 14.6834 3.90237 15.3166 4.29289 15.7071C4.68342 16.0976 5.31658 16.0976 5.70711 15.7071L10 11.4142L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L11.4142 10L15.7071 5.70711C16.0976 5.31658 16.0976 4.68342 15.7071 4.29289C15.3166 3.90237 14.6834 3.90237 14.2929 4.29289L10 8.58579L5.70711 4.29289Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-cross-v2-22-0"; }
};
WppIconCross.style = wppIconCss$2;

const wppIconCss$1 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconInfoMessage = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-info-message", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M13.073 15L12.6891 16.6051C12.5048 17.3763 11.8236 17.935 11.0181 17.9947L10.8748 18H9.12546C8.30655 18 7.59 17.4839 7.34866 16.7385L7.31108 16.6047L6.928 15H13.073ZM10 2C13.3137 2 16 4.59693 16 7.80041C16 9.47737 15.2546 11.0164 13.7961 12.3942C13.7324 12.4544 13.6831 12.5269 13.6512 12.6065L13.6251 12.6883L13.311 14H10.5002V9.49707C10.5002 9.22093 10.2764 8.99707 10.0002 8.99707C9.7241 8.99707 9.50024 9.22093 9.50024 9.49707V14H6.689L6.37626 12.6886C6.34955 12.5766 6.29016 12.4745 6.20516 12.3942C4.8153 11.0819 4.07265 9.62354 4.00507 8.03903L4 7.80041L4.00321 7.60894C4.1077 4.49409 6.75257 2 10 2ZM9.5 6.50238V7.50391C9.5 7.78005 9.72386 8.00391 10 8.00391C10.2761 8.00391 10.5 7.78005 10.5 7.50391V6.50238C10.5 6.22624 10.2761 6.00238 10 6.00238C9.72386 6.00238 9.5 6.22624 9.5 6.50238ZM12.8506 7.44332C12.6553 7.24806 12.3388 7.24806 12.1435 7.44332L11.4353 8.15151C11.2401 8.34677 11.2401 8.66335 11.4353 8.85861C11.6306 9.05388 11.9472 9.05388 12.1424 8.85861L12.8506 8.15043C13.0459 7.95517 13.0459 7.63858 12.8506 7.44332ZM7.8521 7.44332C7.65684 7.24806 7.34026 7.24806 7.145 7.44332C6.94973 7.63858 6.94973 7.95517 7.145 8.15043L7.85318 8.85861C8.04844 9.05388 8.36503 9.05388 8.56029 8.85861C8.75555 8.66335 8.75555 8.34677 8.56029 8.15151L7.8521 7.44332Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-info-message-v2-22-0"; }
};
WppIconInfoMessage.style = wppIconCss$1;

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconSuccess = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-success-color-400)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-success", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM13.6067 8.89925C13.9742 8.5317 13.9742 7.93578 13.6067 7.56823C13.2391 7.20068 12.6432 7.20068 12.2757 7.56823L9.01961 10.8243L7.72433 9.52901C7.35678 9.16146 6.76086 9.16146 6.39331 9.52901C6.02576 9.89657 6.02576 10.4925 6.39331 10.86L8.35409 12.8208C8.72165 13.1884 9.31757 13.1884 9.68512 12.8208L13.6067 8.89925Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-success-v2-22-0"; }
};
WppIconSuccess.style = wppIconCss;

const wppInlineMessageCss = ":host{--im-m-icon-gap:var(--wpp-inline-message-m-icon-gap, 4px);--im-l-icon-gap:var(--wpp-inline-message-l-icon-gap, 8px);--im-m-padding:var(--wpp-inline-message-m-padding, 5px 8px);--im-l-padding:var(--wpp-inline-message-l-padding, 12px 12px 12px 16px);--im-line-height:var(--wpp-inline-message-line-height, 22px);--im-border-radius:var(--wpp-inline-message-border-radius, var(--wpp-border-radius-s));--im-text-color:var(--wpp-inline-message-text-color, var(--wpp-grey-color-1000));--im-empty-type-text-color:var(--wpp-inline-message-empty-type-text-color, var(--wpp-grey-color-800));--im-warning-text-color:var(--wpp-inline-message-warning-text-color, var(--wpp-text-color-warning));--im-error-text-color:var(--wpp-inline-message-error-text-color, var(--wpp-text-color-danger));--im-information-text-color:var(--wpp-inline-message-information-text-color, var(--wpp-text-color-info));--im-success-text-color:var(--wpp-inline-message-success-text-color, var(--wpp-text-color-success));--im-warning-background-color:var(--wpp-inline-message-warning-background-color, var(--wpp-warning-color-200));--im-error-background-color:var(--wpp-inline-message-error-background-color, var(--wpp-danger-color-200));--im-information-background-color:var(--wpp-inline-message-information-background-color, var(--wpp-grey-color-300));--im-success-background-color:var(--wpp-inline-message-success-background-color, var(--wpp-success-color-200));--im-l-min-width:var(--wpp-l-inline-message-min-width, 376px);--im-l-action-btn-padding:var(--wpp-inline-message-l-action-btn-padding, 5px 6px);--im-l-action-btn-margin-right:var(--wpp-inline-message-l-action-btn-margin-right, 4px);--im-l-body-padding-left:var(--wpp-inline-message-l-body-padding-left, 30px);--im-l-header-gap:var(--wpp-inline-message-l-header-gap, 3px)}.inline-message-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:var(--im-width);color:var(--im-text-color)}.inline-message-wrapper:not(.warning-message,.error-message,.information-message,.success-message){color:var(--im-empty-type-text-color)}.inline-message-wrapper.size-s{font-size:var(--wpp-typography-xs-midi-font-size, 12px);line-height:var(--wpp-typography-xs-midi-line-height, 20px);font-weight:var(--wpp-typography-xs-midi-font-weight, 500);color:var(--wpp-typography-xs-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-xs-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-xs-midi-letter-spacing, 0)}.inline-message-wrapper.size-s.warning-message{color:var(--im-warning-text-color)}.inline-message-wrapper.size-s.error-message{color:var(--im-error-text-color)}.inline-message-wrapper.size-s.information-message{color:var(--im-information-text-color)}.inline-message-wrapper.size-s.success-message{color:var(--im-success-text-color)}.inline-message-wrapper.size-l,.inline-message-wrapper.size-m{padding:var(--im-m-padding);border-radius:var(--im-border-radius);font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}.inline-message-wrapper.size-l.warning-message,.inline-message-wrapper.size-m.warning-message{background-color:var(--im-warning-background-color)}.inline-message-wrapper.size-l.error-message,.inline-message-wrapper.size-m.error-message{background-color:var(--im-error-background-color)}.inline-message-wrapper.size-l.information-message,.inline-message-wrapper.size-m.information-message{background-color:var(--im-information-background-color)}.inline-message-wrapper.size-l.success-message,.inline-message-wrapper.size-m.success-message{background-color:var(--im-success-background-color)}.inline-message-wrapper.size-l .message,.inline-message-wrapper.size-m .message{line-height:var(--im-line-height)}.inline-message-wrapper .left-icon{display:-ms-inline-flexbox;display:inline-flex;margin:var(--im-m-icon-margin)}.inline-message-wrapper.size-l{padding:var(--im-l-padding);min-width:var(--im-l-min-width);-webkit-box-sizing:border-box;box-sizing:border-box}.inline-message-wrapper.size-l .container{display:-ms-flexbox;display:flex;gap:24px;-ms-flex-wrap:nowrap;flex-wrap:nowrap;width:100%}.inline-message-wrapper.size-l .container-content{display:-ms-flexbox;display:flex;width:100%;gap:var(--im-l-icon-gap);padding:4px 0}.inline-message-wrapper.size-l .container .title{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;font-size:var(--wpp-typography-m-strong-font-size, 16px);line-height:var(--wpp-typography-m-strong-line-height, 24px);font-weight:var(--wpp-typography-m-strong-font-weight, 700);color:var(--wpp-typography-m-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-m-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-m-strong-letter-spacing, 0)}.inline-message-wrapper.size-l .container-actions{display:-ms-flexbox;display:flex;-ms-flex-item-align:start;align-self:flex-start}.inline-message-wrapper.size-l .container-actions .action-btn{--wpp-action-button-padding:var(--im-l-action-btn-padding);margin-right:var(--im-l-action-btn-margin-right)}.inline-message-wrapper.size-l .container-actions .close-btn{--wpp-action-button-padding:6px}.inline-message-wrapper.size-l .container-body .tooltip:hover{cursor:pointer}.inline-message-wrapper.size-l .content-wrapper{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;gap:var(--im-l-header-gap);width:100%}.inline-message-wrapper.size-l .container-body{width:100%}.inline-message-wrapper .message-block{display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;gap:var(--im-m-icon-gap)}.inline-message-wrapper .message-block.tooltip-maxlength-auto{display:grid;grid-auto-flow:column;-ms-flex-pack:start;justify-content:flex-start;width:100%;gap:var(--im-m-icon-gap)}.inline-message-wrapper .message-block.tooltip-maxlength-auto .message{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.inline-message-wrapper .message-block.truncated{cursor:pointer}.inline-message-wrapper .message-block .message{width:100%;word-break:break-word}";

const WppInlineMessage = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppClickActionBtn = createEvent(this, "wppClickActionBtn", 1);
    this.wppClickCloseBtn = createEvent(this, "wppClickCloseBtn", 1);
    this.getMessage = () => {
      if (this.showTooltipFrom === 'auto')
        return this.message;
      this.isTruncated = this.message.length > this.showTooltipFrom;
      return this.isTruncated ? this.message.substring(0, this.showTooltipFrom) + ' ...' : this.message;
    };
    this.inlineMessageWrapperCssClasses = () => ({
      'inline-message-wrapper': true,
      [`size-${this.size}`]: true,
      [`${this.type}-message`]: !!this.type,
    });
    this.messageBlockCssClasses = () => ({
      'message-block': true,
      truncated: this.isTruncated,
      'tooltip-maxlength-auto': this.showTooltipFrom === 'auto',
    });
    this.hostCssClasses = () => ({
      'wpp-inline-message': true,
    });
    this.titleCssClasses = () => ({
      title: true,
    });
    this.getMessageTypesIcons = () => {
      if (this.type === 'warning')
        return h("wpp-icon-warning-v2-22-0", { class: "left-icon", part: "message-icon" });
      if (this.type === 'error')
        return h("wpp-icon-error-v2-22-0", { class: "left-icon", part: "message-icon" });
      if (this.type === 'information')
        return h("wpp-icon-info-message-v2-22-0", { class: "left-icon", part: "message-icon" });
      if (this.type === 'success')
        return h("wpp-icon-success-v2-22-0", { class: "left-icon", part: "message-icon" });
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
    this.renderContent = () => {
      const message = this.getMessage();
      return this.size === 'l' ? (h("div", { class: "container", part: "container" }, h("div", { class: "container-content" }, this.getMessageTypesIcons(), h("div", { class: "content-wrapper" }, h("div", { class: this.titleCssClasses(), part: "title" }, this.titleText), h("div", { class: "container-body" }, this.isTruncated ? (h("wpp-tooltip-v2-22-0", { class: "tooltip", text: this.message, config: { placement: 'bottom', ...this.tooltipConfig }, part: "tooltip" }, h("span", { class: "message", part: "message" }, message))) : (h("span", { class: "message", part: "message" }, message))))), h("div", { class: "container-actions" }, this.actionBtnText.length > 0 && (h("wpp-action-button-v2-22-0", { part: "action-btn", class: "action-btn", variant: "secondary", onClick: this.handleClickActionBtn }, this.actionBtnText)), !this.hideCloseBtn && (h("wpp-action-button-v2-22-0", { class: "close-btn", variant: "secondary", onClick: this.handleClickClose }, h("wpp-icon-cross-v2-22-0", { color: "var(--ab-secondary-text-color)", size: "m" })))))) : this.isTruncated ? (h("wpp-tooltip-v2-22-0", { text: this.message, config: { placement: 'bottom', ...this.tooltipConfig }, part: "tooltip" }, h("div", { class: this.messageBlockCssClasses(), part: "message-block" }, this.getMessageTypesIcons(), h("span", { class: "message", part: "message" }, message)))) : (h("div", { class: this.messageBlockCssClasses(), part: "message-block" }, this.getMessageTypesIcons(), h("span", { class: "message", part: "message" }, message)));
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
    this.titleText = '';
    this.actionBtnText = '';
    this.message = '';
    this.type = undefined;
    this.size = 's';
    this.tooltipConfig = {};
    this.showTooltipFrom = 'auto';
    this.hideCloseBtn = false;
  }
  componentDidLoad() {
    this.setupResizeObserver();
  }
  disconnectedCallback() {
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
    return (h(Host, { exportparts: this.getExportParts(), class: this.hostCssClasses() }, h("div", { class: this.inlineMessageWrapperCssClasses(), part: "wrapper" }, this.renderContent())));
  }
  static get registryIs() { return "wpp-inline-message-v2-22-0"; }
  get host() { return getElement(this); }
};
WppInlineMessage.style = wppInlineMessageCss;

const wppInternalLabelCss = ":host{--label-tooltip-width:var(--wpp-label-tooltip-width, 100%);--label-optional-text-color:var(--wpp-label-optional-text-color, var(--wpp-text-color-info));--label-optional-margin:var(--wpp-label-optional-margin, 0 0 0 4px);--label-text-color:var(--wpp-label-text-color, var(--wpp-text-color));--label-text-color-disabled:var(--wpp-label-text-color-disabled, var(--wpp-text-color-disabled));--label-info-wrapper-margin:var(--wpp-label-info-wrapper-margin, 0 4px 0 0);--label-icon-color:var(--wpp-label-icon-color, var(--wpp-icon-color));--label-s-strong-text-color:var(--wpp-label-s-strong-text-color, var(--wpp-text-color-info));--label-s-body-text-color:var(--wpp-label-s-body-text-color, var(--wpp-text-color));display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center}:host .info-wrapper{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;cursor:pointer}:host .info-wrapper .optional{color:var(--label-optional-text-color);margin:var(--label-optional-margin)}:host .info-wrapper.with-icon{margin:var(--label-info-wrapper-margin)}:host .tooltip{--tooltip-width:var(--label-tooltip-width)}:host .icon{display:-ms-inline-flexbox;display:inline-flex;color:var(--label-icon-color);cursor:pointer}:host .icon.slot-hidden{display:none}:host:host(.s-strong) .info-wrapper .text{color:var(--label-s-strong-text-color)}:host:host(.disabled){pointer-events:none}:host:host(.disabled) .info-wrapper .text,:host:host(.disabled) .info-wrapper .optional{color:var(--label-text-color-disabled)}";

const WppInternalLabel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        icon: '[slot="icon"]',
      });
      this.hasIconSlot = !emptyStates.icon;
    };
    this.iconCssClasses = () => ({
      icon: true,
      'slot-hidden': !this.hasIconSlot,
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
    this.labelText = undefined;
    this.description = undefined;
    this.optional = false;
    this.typography = 's-body';
    this.disabled = false;
    this.locales = {
      optional: 'Optional',
    };
    this.tooltipConfig = {};
  }
  componentWillLoad() {
    this.updateSlotData();
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "info-wrapper, text, optional-text, tooltip, icon, icon-wrapper" }, !!this.labelText && (h("div", { class: this.infoWrapperCssClasses(), part: "info-wrapper" }, h("wpp-typography-v2-22-0", { type: this.typography, class: "text", part: "text" }, this.labelText), this.optional && (h("wpp-typography-v2-22-0", { type: "s-body", class: "optional", part: "optional-text" }, "(", this.locales.optional, ")")))), !!this.description && this.hasIconSlot ? (h("wpp-tooltip-v2-22-0", { class: "tooltip", text: this.description, config: this.tooltipConfig, part: "tooltip" }, h(WrappedSlot, { wrapperClass: this.iconCssClasses(), name: "icon", onSlotchange: this.updateSlotData }))) : (h(WrappedSlot, { wrapperClass: this.iconCssClasses(), name: "icon", onSlotchange: this.updateSlotData }))));
  }
  static get registryIs() { return "wpp-internal-label-v2-22-0"; }
  get host() { return getElement(this); }
};
WppInternalLabel.style = wppInternalLabelCss;

const wppInternalTooltipCss = ":host{display:-ms-inline-flexbox;display:inline-flex;width:100%}.tooltip-wrapper{width:100%;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:start;align-items:flex-start;-ms-flex-pack:center;justify-content:center;padding:var(--internal-tooltip-padding);border-radius:var(--internal-tooltip-border-radius);overflow-wrap:break-word;hyphens:auto;-webkit-hyphens:auto;-moz-hyphens:auto;-ms-hyphens:auto}.tooltip-wrapper .text{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}.tooltip-wrapper .header{margin-bottom:var(--internal-tooltip-text-margin-bottom);font-size:var(--wpp-typography-m-strong-font-size, 16px);line-height:var(--wpp-typography-m-strong-line-height, 24px);font-weight:var(--wpp-typography-m-strong-font-weight, 700);color:var(--wpp-typography-m-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-m-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-m-strong-letter-spacing, 0)}.tooltip-wrapper .value{font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0)}.tooltip-wrapper.with-header{padding:var(--internal-tooltip-with-header-padding)}.tooltip-wrapper.with-value{padding:var(--internal-tooltip-with-value-padding)}.tooltip-wrapper.dark{background-color:var(--internal-tooltip-dark-bg-color)}.tooltip-wrapper.dark .text{color:var(--internal-tooltip-dark-text-color)}.tooltip-wrapper.dark .header{color:var(--internal-tooltip-dark-header-text-color)}.tooltip-wrapper.dark.with-value .text{color:var(--internal-tooltip-dark-with-value-text-color)}.tooltip-wrapper.dark .value{color:var(--internal-tooltip-dark-value-color)}.tooltip-wrapper.light{-webkit-box-shadow:var(--internal-tooltip-light-box-shadow);box-shadow:var(--internal-tooltip-light-box-shadow);background-color:var(--internal-tooltip-light-bg-color)}.tooltip-wrapper.light .text{color:var(--internal-tooltip-light-text-color)}.tooltip-wrapper.light .header{color:var(--internal-tooltip-light-header-text-color)}.tooltip-wrapper.light.with-value .text{color:var(--internal-tooltip-light-with-value-text-color)}.tooltip-wrapper.light .value{color:var(--internal-tooltip-light-value-color)}.tooltip-wrapper.error,.tooltip-wrapper.warning{position:relative;background-color:var(--internal-tooltip-error-bg-color);-webkit-box-shadow:var(--internal-tooltip-variant-box-shadow);box-shadow:var(--internal-tooltip-variant-box-shadow)}.tooltip-wrapper.error.with-value .text,.tooltip-wrapper.warning.with-value .text{color:var(--internal-tooltip-error-text-color)}.tooltip-wrapper.error .text,.tooltip-wrapper.warning .text{margin-left:calc(20px + var(--internal-tooltip-icon-margin-right));color:var(--internal-tooltip-error-text-color)}.tooltip-wrapper.warning{background-color:var(--internal-tooltip-warning-bg-color)}.tooltip-wrapper .left-icon{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);left:8px}";

const WppTooltip$1 = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
        return h("wpp-icon-error-v2-22-0", { class: "left-icon", part: "icon-error" });
      }
      if (this.warning) {
        return h("wpp-icon-warning-v2-22-0", { color: "var(--wpp-warning-color-400)", class: "left-icon" });
      }
      return null;
    };
    this.getTextLines = () => {
      if (!this.text)
        return null;
      return this.text
        .trim()
        .split('\n')
        .map((line) => (h(Fragment, null, line, h("br", null))));
    };
    this.cssStyle = undefined;
    this.header = undefined;
    this.text = undefined;
    this.wordBreak = 'break-word';
    this.value = undefined;
    this.error = false;
    this.warning = false;
    this.theme = 'dark';
    this.allowHTML = undefined;
    this.externalClass = '';
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), style: this.cssStyle, exportparts: "tooltip-content" }, h("div", { class: this.cssClasses(), style: { wordBreak: this.wordBreak }, part: "tooltip-content" }, !!this.header && (h("span", { class: this.headerCssClasses(), part: "header" }, this.header)), !!this.text && (h("span", { class: this.textCssClasses(), part: "text" }, this.getTextLines())), !!this.value && (h("span", { class: this.valueCssClasses(), part: "value" }, this.value)), this.getIconBasedOnProps())));
  }
  static get registryIs() { return "wpp-internal-tooltip-v2-22-0"; }
  get host() { return getElement(this); }
};
WppTooltip$1.style = wppInternalTooltipCss;

const wppLabelCss = ".sc-wpp-label-h{display:-ms-flexbox;display:flex}.sc-wpp-label-h .internal-label-wrapper.sc-wpp-label{display:-ms-flexbox;display:flex}";

const WppLabel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hostCssClasses = () => ({
      'wpp-label': true,
    });
    this.description = undefined;
    this.htmlFor = undefined;
    this.optional = false;
    this.typography = 's-strong';
    this.disabled = false;
    this.config = undefined;
    this.tooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "wrapper, content, icon" }, h("label", { class: "internal-label-wrapper", htmlFor: this.htmlFor, part: "wrapper" }, h("wpp-internal-label-v2-22-0", { labelText: this.config?.text, description: this.config?.description, optional: this.optional, typography: this.typography, disabled: this.disabled, locales: this.config?.locales, tooltipConfig: this.tooltipConfig, part: "content" }, this.config?.icon && h(transformToVersionedTag(this.config?.icon), { slot: 'icon', part: 'icon' })))));
  }
  static get registryIs() { return "wpp-label-v2-22-0"; }
};
WppLabel.style = wppLabelCss;

const wppSpinnerCss = ":host{--spinner-padding-s:var(--wpp-spinner-padding-s, 3px);--spinner-padding-m:var(--wpp-spinner-padding-m, 8px);--spinner-padding-l:var(--wpp-spinner-padding-l, 8px);display:-ms-inline-flexbox;display:inline-flex}:host(.wpp-size-s){padding:var(--spinner-padding-s)}:host(.wpp-size-m){padding:var(--spinner-padding-m)}:host(.wpp-size-l){padding:var(--spinner-padding-l)}.spinner{-webkit-animation:rotate-spinner 3s linear infinite;animation:rotate-spinner 3s linear infinite}@-webkit-keyframes spinner-s{0%{stroke-dashoffset:9.24}50%{stroke-dashoffset:43.96}100%{stroke-dashoffset:0.66}}@keyframes spinner-s{0%{stroke-dashoffset:9.24}50%{stroke-dashoffset:43.96}100%{stroke-dashoffset:0.66}}@-webkit-keyframes spinner-m{0%{stroke-dashoffset:21.12}50%{stroke-dashoffset:100.48}100%{stroke-dashoffset:0.66}}@keyframes spinner-m{0%{stroke-dashoffset:21.12}50%{stroke-dashoffset:100.48}100%{stroke-dashoffset:0.66}}@-webkit-keyframes spinner-l{0%{stroke-dashoffset:42.24}50%{stroke-dashoffset:200.96}100%{stroke-dashoffset:0.66}}@keyframes spinner-l{0%{stroke-dashoffset:42.24}50%{stroke-dashoffset:200.96}100%{stroke-dashoffset:0.66}}.spinner.size-s{width:14px;height:14px;-webkit-transform-origin:7px 7px 0;transform-origin:7px 7px 0}.spinner.size-s circle{-webkit-animation:spinner-s 3s linear infinite;animation:spinner-s 3s linear infinite;stroke-dasharray:43.96px;stroke-dashoffset:14;stroke-width:2}.spinner.size-m{width:32px;height:32px;-webkit-transform-origin:16px 16px 0;transform-origin:16px 16px 0}.spinner.size-m circle{-webkit-animation:spinner-m 3s linear infinite;animation:spinner-m 3s linear infinite;stroke-dasharray:100.48px;stroke-dashoffset:32;stroke-width:4}.spinner.size-l{width:64px;height:64px;-webkit-transform-origin:32px 32px 0;transform-origin:32px 32px 0}.spinner.size-l circle{-webkit-animation:spinner-l 3s linear infinite;animation:spinner-l 3s linear infinite;stroke-dasharray:200.96px;stroke-dashoffset:64;stroke-width:6}@-webkit-keyframes rotate-spinner{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(720deg);transform:rotate(720deg)}100%{-webkit-transform:rotate(1080deg);transform:rotate(1080deg)}}@keyframes rotate-spinner{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(720deg);transform:rotate(720deg)}100%{-webkit-transform:rotate(1080deg);transform:rotate(1080deg)}}";

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
    registerInstance(this, hostRef);
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
  }
  render() {
    return (h(Host, { class: this.hostCssClasses() }, h("svg", { class: this.spinnerCssClasses(), role: "alert", "aria-busy": "true" }, h("circle", { cx: SPINNER_SIZES[this.size], cy: SPINNER_SIZES[this.size], r: SPINNER_RADIUS[this.size], fill: "transparent", stroke: this.color, "stroke-linecap": "round" }))));
  }
  static get registryIs() { return "wpp-spinner-v2-22-0"; }
};
WppSpinner.style = wppSpinnerCss;

const cssStyles = {
  '--tooltip-padding': '',
  '--tooltip-border-radius': '',
  '--tooltip-with-header-padding': '',
  '--tooltip-with-value-padding': '',
  '--tooltip-icon-margin-right': '',
  '--tooltip-text-margin-bottom': '',
  '--tooltip-error-text-color': '',
  '--tooltip-error-bg-color': '',
  '--tooltip-dark-bg-color': '',
  '--tooltip-dark-value-color': '',
  '--tooltip-dark-text-color': '',
  '--tooltip-dark-with-value-text-color': '',
  '--tooltip-dark-header-text-color': '',
  '--tooltip-light-bg-color': '',
  '--tooltip-light-value-color': '',
  '--tooltip-light-text-color': '',
  '--tooltip-light-with-value-text-color': '',
  '--tooltip-light-header-text-color': '',
  '--tooltip-light-box-shadow': '',
  '--tooltip-warning-bg-color': '',
  '--tooltip-variant-box-shadow': '',
};

const defaultTooltipConfig = {
  placement: 'top',
  offset: [0, 7.2],
  trigger: 'mouseenter focus',
  duration: [500, 500],
  zIndex: Z_INDEX.TOOLTIP,
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
  appendTo: () => getHighestContainerInDOM(),
};

const wppTooltipCss = ":host{--tooltip-padding:var(--wpp-tooltip-padding, 6px 8px);--tooltip-border-radius:var(--wpp-tooltip-border-radius, var(--wpp-border-radius-s));--tooltip-with-header-padding:var(--wpp-tooltip-with-header-padding, 8px 12px);--tooltip-with-value-padding:var(--wpp-tooltip-with-value-padding, 6px 12px);--tooltip-icon-margin-right:var(--wpp-tooltip-icon-margin-right, 4px);--tooltip-text-margin-bottom:var(--wpp-tooltip-text-margin-bottom, 2px);--tooltip-error-text-color:var(--wpp-tooltip-error-text-color, var(--wpp-text-color));--tooltip-error-bg-color:var(--wpp-tooltip-error-bg-color, var(--wpp-danger-color-200));--tooltip-dark-bg-color:var(--wpp-tooltip-dark-bg-color, var(--wpp-text-color-info));--tooltip-dark-value-color:var(--wpp-tooltip-dark-value-color, var(--wpp-grey-color-000));--tooltip-dark-text-color:var(--wpp-tooltip-dark-text-color, var(--wpp-grey-color-000));--tooltip-dark-with-value-text-color:var(--wpp-tooltip-dark-with-value-text-color, var(--wpp-grey-color-200));--tooltip-dark-header-text-color:var(--wpp-tooltip-dark-header-text-color, var(--wpp-grey-color-000));--tooltip-light-bg-color:var(--wpp-tooltip-light-bg-color, var(--wpp-grey-color-000));--tooltip-light-value-color:var(--wpp-tooltip-light-value-color, var(--wpp-text-color));--tooltip-light-text-color:var(--wpp-tooltip-light-text-color, var(--wpp-text-color));--tooltip-light-with-value-text-color:var(--wpp-tooltip-light-with-value-text-color, var(--wpp-text-color-info));--tooltip-light-header-text-color:var(--wpp-tooltip-light-header-text-color, var(--wpp-text-color));--tooltip-light-box-shadow:var(--wpp-tooltip-light-box-shadow, var(--wpp-box-shadow-m));--tooltip-warning-bg-color:var(--wpp-tooltip-warning-bg-color, var(--wpp-warning-color-200));--tooltip-variant-box-shadow:var(--wpp-tooltip-variant-box-shadow, var(--wpp-box-shadow-m));display:-ms-inline-flexbox;display:inline-flex;width:-webkit-fit-content}:host .anchor{display:-ms-inline-flexbox;display:inline-flex}:host .content-wrapper.hidden{position:absolute;z-index:-1;opacity:0}:host .tooltip-custom-content{width:100%;background-color:var(--tooltip-dark-bg-color);padding:var(--tooltip-padding);border-radius:var(--tooltip-border-radius);overflow-wrap:break-word}:host .tooltip-custom-content.light{-webkit-box-shadow:var(--tooltip-light-box-shadow);box-shadow:var(--tooltip-light-box-shadow);background-color:var(--tooltip-light-bg-color)}:host(.in-dropdown){max-width:100%}:host(.in-dropdown) .anchor{max-width:100%}:host(.transparent){opacity:0;pointer-events:none}";

const WppTooltip = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.arrowColor = {};
    this.FORBIDDEN_PREFIX = 'wpp-';
    this.ALLOWED_TAGS = ['wpp-typography'];
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
      if (this.anchorEl && content) {
        this.tippyInstance = menuListConfig({
          anchor: this.anchorEl,
          content,
          triggerElementWidth: false,
          arrow: this.arrowSVG(),
          ...defaultTooltipConfig,
          ...this.config,
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
      const colorKeys = ['dark', 'light', 'error', 'warning'];
      for (const colorKey of colorKeys) {
        if (!this.arrowColor[colorKey]) {
          this.arrowColor[colorKey] = getComputedStyle(this.host).getPropertyValue(`--tooltip-${colorKey}-bg-color`);
        }
      }
      return getComputedStyle(this.host).getPropertyValue(`--tooltip-${currColor}-bg-color`) || this.arrowColor[currColor];
    };
    this.getCssValues = () => {
      const cssVariableNames = Object.keys(cssStyles);
      const updatedCssStyles = {};
      cssVariableNames.forEach(cssVariable => {
        const computedValue = getComputedStyle(this.host).getPropertyValue(cssVariable);
        const internalKey = `--internal-${cssVariable.substring(2)}`;
        updatedCssStyles[internalKey] = computedValue;
      });
      this.style = updatedCssStyles;
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
  }
  updateConfig(newConfig, oldConfig) {
    if (!isEqual_1(newConfig, oldConfig)) {
      this.config = newConfig;
      this.tippyInstance?.setProps(newConfig);
    }
  }
  updateTheme() {
    this.tippyInstance?.setProps({
      arrow: this.arrowSVG(),
    });
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
      this.getCssValues();
      this.createTippyInstance();
    }
  }
  componentWillLoad() {
    if (this.config.allowHTML) {
      const content = this.host.querySelector('[slot="tooltip-content"]');
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
      this.getCssValues();
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
    this.getCssValues();
    this.tippyInstance?.setProps({
      arrow: this.arrowSVG(),
    });
    if (this.tippyInstance?.state.isDestroyed) {
      this.createTippyInstance();
    }
  }
  render() {
    return (h(Host, { class: this.hostCssClasses() }, h("div", { part: "anchor", class: "anchor", ref: anchorEl => (this.anchorEl = anchorEl) }, h("slot", { part: "inner" })), h("div", { class: this.contentWrapperCssClasses() }, !this.config.allowHTML ? (h("wpp-internal-tooltip-v2-22-0", { cssStyle: this.style, ref: contentEl => (this.contentEl = contentEl), header: this.header, text: this.text, value: this.value, error: this.error, wordBreak: this.wordBreak, warning: this.warning, theme: this.theme, externalClass: this.externalClass })) : (h("div", { ref: customContentEl => (this.customContentEl = customContentEl), class: `tooltip-custom-content ${this.theme}` })))));
  }
  static get registryIs() { return "wpp-tooltip-v2-22-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "config": ["updateConfig"],
    "theme": ["updateTheme"],
    "text": ["textChanged"],
    "disabled": ["handleDisabledChange"]
  }; }
};
WppTooltip.style = wppTooltipCss;

export { WppIconCross as wpp_icon_cross, WppIconInfoMessage as wpp_icon_info_message, WppIconSuccess as wpp_icon_success, WppInlineMessage as wpp_inline_message, WppInternalLabel as wpp_internal_label, WppTooltip$1 as wpp_internal_tooltip, WppLabel as wpp_label, WppSpinner as wpp_spinner, WppTooltip as wpp_tooltip };
