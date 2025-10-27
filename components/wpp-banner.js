import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { g as getSlotEmptyStates } from './utils.js';
import { W as WrappedSlot } from './WrappedSlot.js';
import { Z as Z_INDEX } from './consts.js';
import { d as defineCustomElement$9 } from './wpp-action-button2.js';
import { d as defineCustomElement$8 } from './wpp-icon-cross2.js';
import { d as defineCustomElement$7 } from './wpp-icon-error2.js';
import { d as defineCustomElement$6 } from './wpp-icon-info-message2.js';
import { d as defineCustomElement$5 } from './wpp-icon-warning2.js';
import { d as defineCustomElement$4 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$3 } from './wpp-spinner2.js';
import { d as defineCustomElement$2 } from './wpp-tooltip2.js';

const wppBannerCss = ":host{--banner-animation-duration:var(--wpp-banner-animation-duration, 0.5s);--banner-padding:var(--wpp-banner-padding, 8px 28px);--banner-top-position:var(--wpp-banner-top-position, 0);--banner-min-height:var(--wpp-banner-min-height, 48px);--banner-content-wrapper-padding:var(--wpp-banner-content-wrapper-padding, 5px 0);--banner-content-wrapper-icon-margin:var(--wpp-banner-content-wrapper-icon-margin, 0 12px 0 0);--banner-actions-wrapper-margin:var(--wpp-banner-actions-wrapper-margin, 0 0 0 32px);--banner-actions-wrapper-icon-margin:var(--wpp-banner-actions-wrapper-icon-margin, 0 0 0 4px);--banner-max-width:var(--wpp-banner-max-width, 1812px);--banner-information-bg-color:var(--wpp-banner-information-bg-color, var(--wpp-grey-color-700));--banner-information-icon-color:var(--wpp-banner-information-icon-color, var(--wpp-grey-color-400));--banner-information-box-shadow:var(\n    --wpp-banner-information-box-shadow,\n    0px 1px 2px rgba(52, 58, 63, 0.05),\n    0px 2px 8px rgba(52, 58, 63, 0.12)\n  );--banner-information-icon-message-color:var(--wpp-banner-information-icon-message-color, var(--wpp-grey-color-000));--banner-warning-bg-color:var(--wpp-banner-warning-bg-color, var(--wpp-highlight-color-400));--banner-warning-box-shadow:var(\n    --wpp-banner-warning-box-shadow,\n    0px 1px 2px rgba(52, 58, 63, 0.05),\n    0px 2px 8px rgba(52, 58, 63, 0.12)\n  );--banner-warning-icon-message-color:var(--wpp-banner-warning-icon-message-color, var(--wpp-text-color));position:-webkit-sticky;position:sticky;top:var(--banner-top-position)}:host .hidden-banner-wrapper{position:relative;overflow:hidden;max-height:0;-webkit-transition:max-height var(--banner-animation-duration) ease-in-out;transition:max-height var(--banner-animation-duration) ease-in-out}:host .hidden-banner-wrapper.warning{background-color:var(--banner-warning-bg-color);-webkit-box-shadow:var(--banner-warning-box-shadow);box-shadow:var(--banner-warning-box-shadow)}:host .hidden-banner-wrapper.information{background-color:var(--banner-information-bg-color);-webkit-box-shadow:var(--banner-information-box-shadow);box-shadow:var(--banner-information-box-shadow)}:host .hidden-banner-wrapper .banner-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:var(--banner-padding);min-height:var(--banner-min-height);-webkit-box-sizing:border-box;box-sizing:border-box;-ms-flex-pack:justify;justify-content:space-between;overflow:hidden;opacity:0;-webkit-transform:translateY(-100%);transform:translateY(-100%);-webkit-transition:all var(--banner-animation-duration) ease-in-out;transition:all var(--banner-animation-duration) ease-in-out;max-width:var(--banner-max-width);margin:0px auto}:host .hidden-banner-wrapper .banner-wrapper .content-wrapper{padding:var(--banner-content-wrapper-padding);display:-ms-flexbox;display:flex;min-width:0}:host .hidden-banner-wrapper .banner-wrapper .content-wrapper .left-icon{margin:var(--banner-content-wrapper-icon-margin);height:20px;margin-top:1px}:host .hidden-banner-wrapper .banner-wrapper .content-wrapper .message{font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0);overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host .hidden-banner-wrapper .banner-wrapper .content-wrapper .with-tooltip{cursor:pointer;min-width:0}:host .hidden-banner-wrapper .banner-wrapper .content-wrapper .with-tooltip::part(anchor){min-width:0}:host .hidden-banner-wrapper .banner-wrapper .actions-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;margin:var(--banner-actions-wrapper-margin)}:host .hidden-banner-wrapper .banner-wrapper .actions-wrapper .close-button{cursor:pointer;margin:var(--banner-actions-wrapper-icon-margin)}:host .hidden-banner-wrapper .banner-wrapper .actions-wrapper .actions.slot-hidden{display:none}:host .hidden-banner-wrapper .banner-wrapper.information .content-wrapper .message{color:var(--banner-information-icon-message-color)}:host .hidden-banner-wrapper .banner-wrapper.information .content-wrapper .left-icon{color:var(--banner-information-icon-color)}:host .hidden-banner-wrapper .banner-wrapper.information .actions-wrapper .actions{color:var(--banner-information-icon-message-color)}:host .hidden-banner-wrapper .banner-wrapper.information .actions-wrapper .close-button,:host .hidden-banner-wrapper .banner-wrapper.information .actions-wrapper ::slotted(.wpp-action-button){--ab-first-border-color-focus:var(--banner-information-bg-color);--ab-second-border-color-focus:var(--wpp-grey-color-000)}:host .hidden-banner-wrapper .banner-wrapper.warning .content-wrapper .left-icon,:host .hidden-banner-wrapper .banner-wrapper.warning .content-wrapper .message{color:var(--banner-warning-icon-message-color)}:host .hidden-banner-wrapper .banner-wrapper.warning .actions-wrapper .actions{color:var(--banner-warning-icon-message-color)}:host .hidden-banner-wrapper .banner-wrapper.warning .actions-wrapper .close-button,:host .hidden-banner-wrapper .banner-wrapper.warning .actions-wrapper ::slotted(.wpp-action-button){--ab-first-border-color-focus:var(--banner-warning-bg-color);--ab-second-border-color-focus:var(--wpp-brand-color)}:host .hidden-banner-wrapper .banner-wrapper.show{opacity:1;-webkit-transform:translateY(0%);transform:translateY(0%)}:host .hidden-banner-wrapper.show{max-height:var(--banner-height);-webkit-transition:max-height var(--banner-animation-duration) ease-in-out;transition:max-height var(--banner-animation-duration) ease-in-out}";

const WppBanner$1 = /*@__PURE__*/ proxyCustomElement(class WppBanner extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppClose = createEvent(this, "wppClose", 1);
    this.updateOverflowState = () => {
      requestAnimationFrame(() => {
        const messageSpan = this.host.shadowRoot.querySelector('.message');
        this.isOverflowing = messageSpan.scrollWidth > messageSpan.clientWidth;
      });
    };
    this.updateMessageText = () => {
      this.messageText = '';
      this.host.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          this.messageText += node.textContent.trim() + ' ';
        }
        else if (node.nodeType === Node.ELEMENT_NODE && !node.hasAttribute('slot')) {
          this.messageText += node.textContent.trim() + ' ';
        }
      });
      this.messageText = this.messageText.trim();
    };
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        actions: '[slot="actions"]',
      });
      this.hasActionsSlot = !emptyStates.actions;
    };
    this.handleCloseIconClick = () => {
      this.show = false;
      this.wppClose.emit({
        show: this.show,
      });
    };
    this.messageWrapperCssClasses = () => ({
      message: true,
    });
    this.tooltipCSSClasses = () => ({
      'with-tooltip': true,
    });
    this.actionsCssClasses = () => ({
      actions: true,
      'slot-hidden': !this.hasActionsSlot,
    });
    this.bannerWrapperCssClasses = () => ({
      'banner-wrapper': true,
      [this.type]: true,
      show: this.show,
    });
    this.hiddenBannerWrapperCssClasses = () => ({
      'hidden-banner-wrapper': true,
      [this.type]: true,
      show: this.show,
    });
    this.hostCssClasses = () => ({
      'wpp-banner': true,
    });
    this.getMessageTypesIcons = () => {
      if (this.type === 'warning')
        return h("wpp-icon-warning-v3-3-0", { class: "left-icon", part: "left-icon" });
      if (this.type === 'information')
        return h("wpp-icon-info-message-v3-3-0", { class: "left-icon", part: "left-icon" });
      return null;
    };
    this.hasActionsSlot = false;
    this.heightBanner = undefined;
    this.isOverflowing = false;
    this.ariaProps = {};
    this.role = 'alert';
    this.show = false;
    this.closable = false;
    this.type = undefined;
    this.zIndex = Z_INDEX.BANNER;
  }
  componentWillLoad() {
    this.updateSlotData();
    this.updateMessageText();
    setTimeout(() => {
      this.heightBanner = this.host.shadowRoot.querySelector('.banner-wrapper').clientHeight;
    }, 0);
  }
  componentDidLoad() {
    const contentWrapper = this.host.shadowRoot.querySelector('.content-wrapper');
    this.resizeObserver = new ResizeObserver(() => {
      this.updateOverflowState();
    });
    if (this.resizeObserver) {
      this.resizeObserver.observe(contentWrapper);
    }
  }
  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
  render() {
    const style = {
      '--banner-height': this.heightBanner + 'px',
      zIndex: this.zIndex.toString(),
    };
    const messageWrapper = (h(WrappedSlot, { wrapperClass: this.messageWrapperCssClasses(), part: "message", onSlotchange: this.updateMessageText }));
    return (h(Host, { style: style, class: this.hostCssClasses(), role: this.role, "aria-label": this.ariaProps.label || 'banner', exportparts: "left-icon, wrapper, body, content-wrapper, message, actions-wrapper, close-button, close-icon, actions, actions-wrapper" }, h("div", { class: this.hiddenBannerWrapperCssClasses(), part: "wrapper" }, h("div", { class: this.bannerWrapperCssClasses(), part: "body" }, h("div", { class: "content-wrapper", part: "content-wrapper" }, this.getMessageTypesIcons(), !this.isOverflowing ? (messageWrapper) : (h("wpp-tooltip-v3-3-0", { text: this.messageText, class: this.tooltipCSSClasses() }, messageWrapper))), h("div", { class: "actions-wrapper", part: "actions-wrapper" }, h(WrappedSlot, { wrapperClass: this.actionsCssClasses(), name: "actions", onSlotchange: this.updateSlotData, role: "presentation" }), this.closable && (h("wpp-action-button-v3-3-0", { variant: this.type === 'information' ? 'inverted' : 'secondary', onClick: this.handleCloseIconClick, class: "close-button", part: "close-button", ariaProps: { label: 'close banner' }, role: "presentation" }, h("wpp-icon-cross-v3-3-0", { slot: "icon-start", part: "close-icon", "aria-hidden": "true" }))))))));
  }
  static get registryIs() { return "wpp-banner-v3-3-0"; }
  get host() { return this; }
  static get style() { return wppBannerCss; }
}, [1, "wpp-banner", "wpp-banner-v3-3-0", {
    "ariaProps": [16],
    "role": [1],
    "show": [1540],
    "closable": [4],
    "type": [1],
    "zIndex": [2, "z-index"],
    "hasActionsSlot": [32],
    "heightBanner": [32],
    "isOverflowing": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-banner-v3-3-0", "wpp-action-button-v3-3-0", "wpp-icon-cross-v3-3-0", "wpp-icon-error-v3-3-0", "wpp-icon-info-message-v3-3-0", "wpp-icon-warning-v3-3-0", "wpp-internal-tooltip-v3-3-0", "wpp-spinner-v3-3-0", "wpp-tooltip-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-banner-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppBanner$1);
      }
      break;
    case "wpp-action-button-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-icon-cross-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-icon-error-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-icon-info-message-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-icon-warning-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-internal-tooltip-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-spinner-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-tooltip-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppBanner = WppBanner$1;
const defineCustomElement = defineCustomElement$1;

export { WppBanner, defineCustomElement };
