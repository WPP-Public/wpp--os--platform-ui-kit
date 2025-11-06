'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const utils = require('./utils-9c925efe.js');
const WrappedSlot = require('./WrappedSlot-736c2736.js');
require('./consts-255c1066.js');

const wppBannerCss = ":host{--banner-animation-duration:var(--wpp-banner-animation-duration, 0.5s);--banner-padding:var(--wpp-banner-padding, 8px 28px);--banner-top-position:var(--wpp-banner-top-position, 0);--banner-z-index:var(--wpp-banner-z-index, 1);--banner-min-height:var(--wpp-banner-min-height, 48px);--banner-content-wrapper-padding:var(--wpp-banner-content-wrapper-padding, 5px 0);--banner-content-wrapper-icon-margin:var(--wpp-banner-content-wrapper-icon-margin, 0 12px 0 0);--banner-actions-wrapper-margin:var(--wpp-banner-actions-wrapper-margin, 0 0 0 32px);--banner-actions-wrapper-icon-margin:var(--wpp-banner-actions-wrapper-icon-margin, 0 0 0 4px);--banner-max-width:var(--wpp-banner-max-width, 1812px);--banner-information-bg-color:var(--wpp-banner-information-bg-color, var(--wpp-grey-color-700));--banner-information-box-shadow:var(\n    --wpp-banner-information-box-shadow,\n    0px 1px 2px rgba(52, 58, 63, 0.05),\n    0px 2px 8px rgba(52, 58, 63, 0.12)\n  );--banner-information-icon-message-color:var(--wpp-banner-information-icon-message-color, var(--wpp-grey-color-000));--banner-warning-bg-color:var(--wpp-banner-warning-bg-color, var(--wpp-highlight-color-400));--banner-warning-box-shadow:var(\n    --wpp-banner-warning-box-shadow,\n    0px 1px 2px rgba(52, 58, 63, 0.05),\n    0px 2px 8px rgba(52, 58, 63, 0.12)\n  );--banner-warning-icon-message-color:var(--wpp-banner-warning-icon-message-color, var(--wpp-text-color));position:-webkit-sticky;position:sticky;top:var(--banner-top-position);z-index:var(--banner-z-index)}:host .hidden-banner-wrapper{position:relative;overflow:hidden;max-height:0;-webkit-transition:max-height var(--banner-animation-duration) ease-in-out;transition:max-height var(--banner-animation-duration) ease-in-out}:host .hidden-banner-wrapper.warning{background-color:var(--banner-warning-bg-color);-webkit-box-shadow:var(--banner-warning-box-shadow);box-shadow:var(--banner-warning-box-shadow)}:host .hidden-banner-wrapper.information{background-color:var(--banner-information-bg-color);-webkit-box-shadow:var(--banner-information-box-shadow);box-shadow:var(--banner-information-box-shadow)}:host .hidden-banner-wrapper .banner-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;padding:var(--banner-padding);min-height:var(--banner-min-height);-webkit-box-sizing:border-box;box-sizing:border-box;-ms-flex-pack:justify;justify-content:space-between;overflow:hidden;opacity:0;-webkit-transform:translateY(-100%);transform:translateY(-100%);-webkit-transition:all var(--banner-animation-duration) ease-in-out;transition:all var(--banner-animation-duration) ease-in-out;max-width:var(--banner-max-width);margin:0px auto}:host .hidden-banner-wrapper .banner-wrapper .content-wrapper{padding:var(--banner-content-wrapper-padding);display:-ms-flexbox;display:flex;min-width:0}:host .hidden-banner-wrapper .banner-wrapper .content-wrapper .left-icon{margin:var(--banner-content-wrapper-icon-margin);height:20px;margin-top:1px}:host .hidden-banner-wrapper .banner-wrapper .content-wrapper .message{font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0);overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host .hidden-banner-wrapper .banner-wrapper .content-wrapper .with-tooltip{cursor:pointer;min-width:0}:host .hidden-banner-wrapper .banner-wrapper .content-wrapper .with-tooltip::part(anchor){min-width:0}:host .hidden-banner-wrapper .banner-wrapper .actions-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;margin:var(--banner-actions-wrapper-margin)}:host .hidden-banner-wrapper .banner-wrapper .actions-wrapper .close-button{cursor:pointer;margin:var(--banner-actions-wrapper-icon-margin)}:host .hidden-banner-wrapper .banner-wrapper .actions-wrapper .actions.slot-hidden{display:none}:host .hidden-banner-wrapper .banner-wrapper.information .content-wrapper .left-icon,:host .hidden-banner-wrapper .banner-wrapper.information .content-wrapper .message{color:var(--banner-information-icon-message-color)}:host .hidden-banner-wrapper .banner-wrapper.information .actions-wrapper .actions{color:var(--banner-information-icon-message-color)}:host .hidden-banner-wrapper .banner-wrapper.information .actions-wrapper .close-button,:host .hidden-banner-wrapper .banner-wrapper.information .actions-wrapper ::slotted(.wpp-action-button){--ab-first-border-color-focus:var(--banner-information-bg-color);--ab-second-border-color-focus:var(--wpp-grey-color-000)}:host .hidden-banner-wrapper .banner-wrapper.warning .content-wrapper .left-icon,:host .hidden-banner-wrapper .banner-wrapper.warning .content-wrapper .message{color:var(--banner-warning-icon-message-color)}:host .hidden-banner-wrapper .banner-wrapper.warning .actions-wrapper .actions{color:var(--banner-warning-icon-message-color)}:host .hidden-banner-wrapper .banner-wrapper.warning .actions-wrapper .close-button,:host .hidden-banner-wrapper .banner-wrapper.warning .actions-wrapper ::slotted(.wpp-action-button){--ab-first-border-color-focus:var(--banner-warning-bg-color);--ab-second-border-color-focus:var(--wpp-brand-color)}:host .hidden-banner-wrapper .banner-wrapper.show{opacity:1;-webkit-transform:translateY(0%);transform:translateY(0%)}:host .hidden-banner-wrapper.show{max-height:var(--banner-height);-webkit-transition:max-height var(--banner-animation-duration) ease-in-out;transition:max-height var(--banner-animation-duration) ease-in-out}";

const WppBanner = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppClose = index.createEvent(this, "wppClose", 1);
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
      const emptyStates = utils.getSlotEmptyStates(this.host.childNodes, {
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
        return index.h("wpp-icon-warning-v2-22-0", { class: "left-icon", part: "left-icon" });
      if (this.type === 'information')
        return index.h("wpp-icon-info-v2-22-0", { class: "left-icon", part: "left-icon" });
      return null;
    };
    this.hasActionsSlot = false;
    this.heightBanner = undefined;
    this.isOverflowing = false;
    this.show = false;
    this.closable = false;
    this.type = undefined;
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
    };
    const messageWrapper = (index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.messageWrapperCssClasses(), part: "message", onSlotchange: this.updateMessageText }));
    return (index.h(index.Host, { style: style, class: this.hostCssClasses(), exportparts: "left-icon, wrapper, body, content-wrapper, message, actions-wrapper, close-button, close-icon, actions, actions-wrapper" }, index.h("div", { class: this.hiddenBannerWrapperCssClasses(), part: "wrapper" }, index.h("div", { class: this.bannerWrapperCssClasses(), part: "body" }, index.h("div", { class: "content-wrapper", part: "content-wrapper" }, this.getMessageTypesIcons(), !this.isOverflowing ? (messageWrapper) : (index.h("wpp-tooltip-v2-22-0", { text: this.messageText, class: this.tooltipCSSClasses() }, messageWrapper))), index.h("div", { class: "actions-wrapper", part: "actions-wrapper" }, index.h(WrappedSlot.WrappedSlot, { wrapperClass: this.actionsCssClasses(), name: "actions", onSlotchange: this.updateSlotData }), this.closable && (index.h("wpp-action-button-v2-22-0", { variant: this.type === 'information' ? 'inverted' : 'secondary', onClick: this.handleCloseIconClick, class: "close-button", part: "close-button" }, index.h("wpp-icon-cross-v2-22-0", { slot: "icon-start", part: "close-icon" }))))))));
  }
  static get registryIs() { return "wpp-banner-v2-22-0"; }
  get host() { return index.getElement(this); }
};
WppBanner.style = wppBannerCss;

exports.wpp_banner = WppBanner;
