import { r as registerInstance, h, c as createEvent, H as Host, g as getElement } from './index-9177bb6d.js';
import { W as WppIcon } from './WppIcon-f4802cc9.js';
import { F as FOCUS_TYPE } from './common-69c8ea89.js';
import { y as mergeLocales, d as debounce, g as getSlotEmptyStates, k as transformToVersionedTag } from './utils-fc9002c9.js';
import { t as themeSubscriptionController } from './subscribe-to-theme-3920c16c.js';
import { W as WrappedSlot } from './WrappedSlot-629d3e4f.js';
import './consts-744c144f.js';

const wppIconCss$4 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

var ChevronDirectionIconPath;
(function (ChevronDirectionIconPath) {
  ChevronDirectionIconPath["up"] = "M4 13L10 7L16 13";
  ChevronDirectionIconPath["right"] = "M8 4L14 10L8 16";
  ChevronDirectionIconPath["down"] = "M16 8L10 14L4 8";
  ChevronDirectionIconPath["left"] = "M12 16L6 10L12 4";
})(ChevronDirectionIconPath || (ChevronDirectionIconPath = {}));
const WppIconChevron = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
    this.direction = 'right';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-chevron", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: ChevronDirectionIconPath[this.direction], stroke: "currentColor", "stroke-width": "2", "stroke-miterlimit": "10", "stroke-linecap": "round", "stroke-linejoin": "round" })));
  }
  static get registryIs() { return "wpp-icon-chevron-v4-2-0"; }
};
WppIconChevron.style = wppIconCss$4;

const wppIconCss$3 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconDash = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-dash", width: this.width, height: this.height, size: this.size, color: this.color }, h("line", { x1: "7", y1: "10", x2: "13", y2: "10", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round" })));
  }
  static get registryIs() { return "wpp-icon-dash-v4-2-0"; }
};
WppIconDash.style = wppIconCss$3;

const wppIconCss$2 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

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
  static get registryIs() { return "wpp-icon-info-message-v4-2-0"; }
};
WppIconInfoMessage.style = wppIconCss$2;

const wppIconCss$1 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

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
  static get registryIs() { return "wpp-icon-success-v4-2-0"; }
};
WppIconSuccess.style = wppIconCss$1;

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTick = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-tick", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M6.25 10L8.5747 12.1794C8.76703 12.3597 9.06631 12.3597 9.25864 12.1794L14.25 7.5", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round" })));
  }
  static get registryIs() { return "wpp-icon-tick-v4-2-0"; }
};
WppIconTick.style = wppIconCss;

const LOCALES_DEFAULTS$1 = {
  close: 'Close inline message button',
};

const wppInlineMessageCss = ":host{--im-m-icon-gap:var(--wpp-inline-message-m-icon-gap, 4px);--im-l-icon-gap:var(--wpp-inline-message-l-icon-gap, 8px);--im-m-padding:var(--wpp-inline-message-m-padding, 5px 8px);--im-l-padding:var(--wpp-inline-message-l-padding, 12px 12px 12px 16px);--im-line-height:var(--wpp-inline-message-line-height, 22px);--im-border-radius:var(--wpp-inline-message-border-radius, var(--wpp-border-radius-s));--im-text-color:var(--wpp-inline-message-text-color, var(--wpp-grey-color-1000));--im-empty-type-text-color:var(--wpp-inline-message-empty-type-text-color, var(--wpp-grey-color-800));--im-warning-text-color:var(--wpp-inline-message-warning-text-color, var(--wpp-text-color-warning));--im-error-text-color:var(--wpp-inline-message-error-text-color, var(--wpp-text-color-danger));--im-information-text-color:var(--wpp-inline-message-information-text-color, var(--wpp-text-color-info));--im-success-text-color:var(--wpp-inline-message-success-text-color, var(--wpp-text-color-success));--im-warning-background-color:var(--wpp-inline-message-warning-background-color, var(--wpp-warning-color-200));--im-error-background-color:var(--wpp-inline-message-error-background-color, var(--wpp-danger-color-200));--im-information-background-color:var(--wpp-inline-message-information-background-color, var(--wpp-grey-color-300));--im-success-background-color:var(--wpp-inline-message-success-background-color, var(--wpp-success-color-200));--im-l-min-width:var(--wpp-l-inline-message-min-width, 376px);--im-l-action-btn-padding:var(--wpp-inline-message-l-action-btn-padding, 5px 6px);--im-l-action-btn-margin-right:var(--wpp-inline-message-l-action-btn-margin-right, 4px);--im-l-body-padding-left:var(--wpp-inline-message-l-body-padding-left, 30px);--im-l-header-gap:var(--wpp-inline-message-l-header-gap, 3px)}.inline-message-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:var(--im-width);color:var(--im-text-color)}.inline-message-wrapper.size-s{font-size:var(--wpp-typography-xs-midi-font-size, 12px);line-height:var(--wpp-typography-xs-midi-line-height, 20px);font-weight:var(--wpp-typography-xs-midi-font-weight, 500);color:var(--wpp-typography-xs-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-xs-midi-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-xs-midi-letter-spacing, 0)}.inline-message-wrapper.size-s.warning-message{color:var(--im-warning-text-color)}.inline-message-wrapper.size-s.error-message{color:var(--im-error-text-color)}.inline-message-wrapper.size-s.information-message{color:var(--im-information-text-color)}.inline-message-wrapper.size-s.success-message{color:var(--im-success-text-color)}.inline-message-wrapper:not(.warning-message,.error-message,.information-message,.success-message){color:var(--im-empty-type-text-color)}.inline-message-wrapper.size-l,.inline-message-wrapper.size-m{padding:var(--im-m-padding);border-radius:var(--im-border-radius);font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}.inline-message-wrapper.size-l.warning-message,.inline-message-wrapper.size-m.warning-message{background-color:var(--im-warning-background-color)}.inline-message-wrapper.size-l.error-message,.inline-message-wrapper.size-m.error-message{background-color:var(--im-error-background-color)}.inline-message-wrapper.size-l.information-message,.inline-message-wrapper.size-m.information-message{background-color:var(--im-information-background-color);background-color:color-mix(in srgb, var(--im-information-background-color) 60%, transparent)}.inline-message-wrapper.size-l.success-message,.inline-message-wrapper.size-m.success-message{background-color:var(--im-success-background-color)}.inline-message-wrapper.size-l .message,.inline-message-wrapper.size-m .message{line-height:var(--im-line-height)}.inline-message-wrapper .left-icon{display:-ms-inline-flexbox;display:inline-flex}.inline-message-wrapper.size-m .message-block .wpp-icon{margin-top:1px}.inline-message-wrapper.size-l{padding:var(--im-l-padding);min-width:var(--im-l-min-width);-webkit-box-sizing:border-box;box-sizing:border-box}.inline-message-wrapper.size-l .container{display:-ms-flexbox;display:flex;gap:24px;-ms-flex-wrap:nowrap;flex-wrap:nowrap;width:100%}.inline-message-wrapper.size-l .container-content{display:-ms-flexbox;display:flex;width:100%;gap:var(--im-l-icon-gap);padding:4px 0}.inline-message-wrapper.size-l .container-content .wpp-icon{margin-top:2px}.inline-message-wrapper.size-l .container .title{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.inline-message-wrapper.size-l .container-actions{display:-ms-flexbox;display:flex;-ms-flex-item-align:start;align-self:flex-start}.inline-message-wrapper.size-l .container-actions .action-btn{width:-webkit-max-content;width:-moz-max-content;width:max-content;--wpp-action-button-padding:var(--im-l-action-btn-padding);margin-right:var(--im-l-action-btn-margin-right)}.inline-message-wrapper.size-l .container-actions .close-btn{--wpp-action-button-padding:6px}.inline-message-wrapper.size-l .container-body .tooltip:hover{cursor:pointer}.inline-message-wrapper.size-l .content-wrapper{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;gap:var(--im-l-header-gap);width:100%}.inline-message-wrapper.size-l .container-body{width:100%}.inline-message-wrapper.size-l .container-content.no-title .content-wrapper{gap:1px}.inline-message-wrapper .message-block{display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;gap:var(--im-m-icon-gap);border-radius:var(--im-border-radius);outline:none}.inline-message-wrapper .message-block.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}.inline-message-wrapper .message-block.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}.inline-message-wrapper .message-block.tooltip-maxlength-auto{display:grid;grid-auto-flow:column;-ms-flex-pack:start;justify-content:flex-start;width:100%;gap:var(--im-m-icon-gap)}.inline-message-wrapper .message-block.tooltip-maxlength-auto .message{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.inline-message-wrapper .message-block.truncated{cursor:pointer}.inline-message-wrapper .message-block .message{width:100%;word-break:break-word}.inline-message-wrapper .message{border-radius:var(--im-border-radius);outline:none}.inline-message-wrapper .message.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}:host(.wpp-information.wpp-size-l),:host(.wpp-information.wpp-size-m){background-color:white;border-radius:var(--im-border-radius)}:host(.wpp-information.wpp-size-l[data-wpp-theme=dark]) .inline-message-wrapper,:host(.wpp-information.wpp-size-m[data-wpp-theme=dark]) .inline-message-wrapper{background:var(--wpp-grey-color-300)}";

const WppInlineMessage = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppClickActionBtn = createEvent(this, "wppClickActionBtn", 1);
    this.wppClickCloseBtn = createEvent(this, "wppClickCloseBtn", 1);
    this.themeSubscription = themeSubscriptionController(() => this.host);
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
        return h("wpp-icon-warning-v4-2-0", { class: "left-icon", part: "message-icon", role: "presentation" });
      if (this.type === 'error')
        return h("wpp-icon-error-v4-2-0", { class: "left-icon", part: "message-icon", role: "presentation" });
      if (this.type === 'information')
        return (h("wpp-icon-info-message-v4-2-0", { color: "var(--wpp-grey-color-700)", class: "left-icon", part: "message-icon", role: "presentation" }));
      if (this.type === 'success')
        return h("wpp-icon-success-v4-2-0", { class: "left-icon", part: "message-icon", role: "presentation" });
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
      return this.size === 'l' ? (h("div", { class: "container", part: "container" }, h("div", { class: this.getContainerContentCssClasses() }, this.getMessageTypesIcons(), h("div", { class: "content-wrapper" }, h("wpp-typography-v4-2-0", { class: this.titleCssClasses(), tag: "h4", type: "m-strong", part: "title" }, this.titleText), h("div", { class: "container-body" }, this.isTruncated ? (h("wpp-tooltip-v4-2-0", { class: "tooltip", text: this.message, config: { placement: 'bottom', triggerTarget: this.messageRef, ...this.tooltipConfig }, part: "tooltip" }, h("span", { ref: ref => (this.messageRef = ref), class: this.messageCssClasses(), tabIndex: 0, part: "message", onBlur: this.onBlur }, message))) : (h("span", { class: "message", part: "message" }, message))))), this.actionBtnText || !this.hideCloseBtn ? (h("div", { class: "container-actions" }, this.actionBtnText?.length > 0 && (h("wpp-action-button-v4-2-0", { part: "action-btn", class: "action-btn", variant: "secondary", onClick: this.handleClickActionBtn }, this.actionBtnText)), !this.hideCloseBtn && (h("wpp-action-button-v4-2-0", { class: "close-btn", ariaProps: { label: this._locales.close }, variant: "secondary", onClick: this.handleClickClose }, h("wpp-icon-cross-v4-2-0", { color: "var(--ab-secondary-text-color)", size: "m" }))))) : null)) : this.isTruncated ? (h("wpp-tooltip-v4-2-0", { text: this.message, config: { placement: 'bottom', ...this.tooltipConfig }, part: "tooltip" }, h("div", { class: this.messageBlockCssClasses(), part: "message-block", ref: ref => (this.messageRef = ref), onBlur: this.onBlur, tabIndex: 0 }, this.getMessageTypesIcons(), h("span", { class: "message", part: "message" }, message)))) : (h("div", { class: this.messageBlockCssClasses(), part: "message-block" }, this.getMessageTypesIcons(), h("span", { class: "message", part: "message" }, message)));
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
  componentWillLoad() {
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
  get _locales() {
    return mergeLocales(LOCALES_DEFAULTS$1, this.locales);
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
  static get registryIs() { return "wpp-inline-message-v4-2-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "titleText": ["onUpdateTitleText"]
  }; }
};
WppInlineMessage.style = wppInlineMessageCss;

const LOCALES_DEFAULTS = {
  optional: 'Optional',
};

const wppInternalLabelCss = ":host{--label-tooltip-width:var(--wpp-label-tooltip-width, 100%);--label-optional-text-color:var(--wpp-label-optional-text-color, var(--wpp-text-color-info));--label-optional-margin:var(--wpp-label-optional-margin, 0 0 0 4px);--label-text-color:var(--wpp-label-text-color, var(--wpp-grey-color-800));--label-text-color-disabled:var(--wpp-label-text-color-disabled, var(--wpp-text-color-disabled));--label-info-wrapper-margin:var(--wpp-label-info-wrapper-margin, 0 4px 0 0);--label-icon-color:var(--wpp-label-icon-color, var(--wpp-icon-color));--label-s-strong-text-color:var(--wpp-label-s-strong-text-color, var(--wpp-text-color-info));--label-s-body-text-color:var(--wpp-label-s-body-text-color, var(--wpp-text-color));--icon-first-border-color-focus:var(--wpp-icon-first-border-color-focus, var(--wpp-grey-color-000));--icon-second-border-color-focus:var(--wpp-icon-second-border-color-focus, var(--wpp-brand-color));display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center}:host .info-wrapper{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;cursor:pointer}:host .info-wrapper .optional{color:var(--label-optional-text-color);margin:var(--label-optional-margin)}:host .info-wrapper.with-icon{margin:var(--label-info-wrapper-margin)}:host .tooltip{--tooltip-width:var(--label-tooltip-width)}:host .icon{display:-ms-inline-flexbox;display:inline-flex;color:var(--label-icon-color);cursor:pointer;outline:none;border-radius:50%}:host .icon.slot-hidden{display:none}:host .icon.tab-focus.tab-focus{border-radius:\"\";outline:none;-webkit-box-shadow:0 0 0 1px var(--icon-first-border-color-focus), 0 0 0 3px var(--icon-second-border-color-focus);box-shadow:0 0 0 1px var(--icon-first-border-color-focus), 0 0 0 3px var(--icon-second-border-color-focus)}:host:host(.s-strong) .info-wrapper .text{color:var(--label-s-strong-text-color)}:host:host(.disabled){pointer-events:none}:host:host(.disabled) .info-wrapper .text,:host:host(.disabled) .info-wrapper .optional{color:var(--label-text-color-disabled)}";

const WppInternalLabel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        icon: '[slot="icon"]',
      });
      this.hasIconSlot = !emptyStates.icon;
    };
    this.onBlur = () => {
      this.focusType = FOCUS_TYPE.NONE;
    };
    this.onKeyUp = (event) => {
      if (event.key === 'Tab')
        this.focusType = FOCUS_TYPE.TAB;
    };
    this.iconCssClasses = () => ({
      icon: true,
      'slot-hidden': !this.hasIconSlot,
      'tab-focus': this.focusType === FOCUS_TYPE.TAB,
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
  componentWillLoad() {
    this.updateSlotData();
  }
  get _locales() {
    return mergeLocales(LOCALES_DEFAULTS, this.locales);
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), onKeyUp: this.onKeyUp, onBlur: this.onBlur, exportparts: "info-wrapper, text, optional-text, tooltip, icon, icon-wrapper" }, !!this.labelText && (h("div", { class: this.infoWrapperCssClasses(), part: "info-wrapper", role: this.role }, h("wpp-typography-v4-2-0", { type: this.typography, class: "text", part: "text" }, this.labelText), this.optional && (h("wpp-typography-v4-2-0", { type: "s-body", class: "optional", part: "optional-text" }, "(", this._locales.optional, ")")))), !!this.description && this.hasIconSlot ? (h("wpp-tooltip-v4-2-0", { class: "tooltip", text: this.description, config: this.tooltipConfig, part: "tooltip" }, h(WrappedSlot, { wrapperClass: this.iconCssClasses(), name: "icon", onSlotchange: this.updateSlotData, role: this.tooltipConfig.tabIndex === -1 ? 'none' : 'button', tabIndex: this.tooltipConfig.tabIndex ?? 0, "aria-label": this.tooltipConfig.tabIndex !== -1 ? 'Show info' : undefined }))) : (h(WrappedSlot, { wrapperClass: this.iconCssClasses(), name: "icon", onSlotchange: this.updateSlotData, role: "button", tabIndex: 0, "aria-label": "Show info" }))));
  }
  static get registryIs() { return "wpp-internal-label-v4-2-0"; }
  get host() { return getElement(this); }
};
WppInternalLabel.style = wppInternalLabelCss;

const wppLabelCss = ".sc-wpp-label-h{display:-ms-flexbox;display:flex}.sc-wpp-label-h .internal-label-wrapper.sc-wpp-label{display:-ms-flexbox;display:flex;margin:0}";

const WppLabel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.hostCssClasses = () => ({
      'wpp-label': true,
    });
    this.renderContent = () => (h("wpp-internal-label-v4-2-0", { labelText: this.config?.text, description: this.config?.description, optional: this.optional, typography: this.typography, disabled: this.disabled, locales: this.config?.locales, tooltipConfig: this.tooltipConfig, part: "content", id: this.labelId }, this.config?.icon && h(transformToVersionedTag(this.config?.icon), { slot: 'icon', part: 'icon' })));
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
    return (h(Host, { class: this.hostCssClasses(), exportparts: "wrapper, content, icon" }, h(this.tag, { class: "internal-label-wrapper", part: "wrapper", ...(this.tag === 'label' && { htmlFor: this.htmlFor, 'aria-label': this.htmlFor }) }, this.renderContent())));
  }
  static get registryIs() { return "wpp-label-v4-2-0"; }
};
WppLabel.style = wppLabelCss;

export { WppIconChevron as wpp_icon_chevron, WppIconDash as wpp_icon_dash, WppIconInfoMessage as wpp_icon_info_message, WppIconSuccess as wpp_icon_success, WppIconTick as wpp_icon_tick, WppInlineMessage as wpp_inline_message, WppInternalLabel as wpp_internal_label, WppLabel as wpp_label };
