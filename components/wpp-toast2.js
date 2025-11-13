import { proxyCustomElement, HTMLElement, createEvent, h, Host, Fragment } from '@stencil/core/internal/client';
import { k as transformToVersionedTag } from './utils.js';
import { Z as Z_INDEX } from './consts.js';
import { d as defineCustomElement$8 } from './wpp-action-button2.js';
import { d as defineCustomElement$7 } from './wpp-icon-cross2.js';
import { d as defineCustomElement$6 } from './wpp-icon-error2.js';
import { d as defineCustomElement$5 } from './wpp-icon-info-message2.js';
import { d as defineCustomElement$4 } from './wpp-icon-success2.js';
import { d as defineCustomElement$3 } from './wpp-icon-warning2.js';
import { d as defineCustomElement$2 } from './wpp-spinner2.js';
import { d as defineCustomElement$1 } from './wpp-typography2.js';

const ANIMATION_DURATION = 500;

const wppToastCss = ":host{--toast-width:var(--wpp-toast-width, 400px);--toast-border-radius:var(--wpp-toast-border-radius, var(--wpp-border-radius-m));--toast-message-color:var(--wpp-toast-message-color, var(--wpp-grey-color-000));--toast-padding:var(--wpp-toast-padding, 12px 8px 12px 16px);--toast-with-header-message-color:var(--wpp-toast-with-header-message-color, var(--wpp-grey-color-200));--toast-actions-block-margin:var(--wpp-toast-actions-block-margin, 0 0 0 8px);--toast-icon-wrapper-bg-color:var(--wpp-toast-icon-wrapper-bg-color, transparent);--toast-icon-wrapper-margin:var(--wpp-toast-icon-wrapper-margin, 0 8px 0 0);--toast-icon-wrapper-padding:var(--wpp-toast-icon-wrapper-padding, 4px);--toast-icon-wrapper-border-radius:var(--wpp-toast-icon-wrapper-border-radius, 24px);--toast-icon-wrapper-warning-padding:var(--wpp-toast-icon-wrapper-warning-padding, 3.5px 4px 4.5px 4px);--toast-icon-wrapper-warning-bg-color:var(--wpp-toast-icon-wrapper-warning-bg-color, var(--wpp-warning-color-200));--toast-icon-wrapper-error-bg-color:var(--wpp-toast-icon-wrapper-error-bg-color, var(--wpp-danger-color-200));--toast-icon-wrapper-information-bg-color:var(--wpp-toast-icon-wrapper-information-bg-color, var(--wpp-grey-color-200));--toast-icon-wrapper-success-bg-color:var(--wpp-toast-icon-wrapper-success-bg-color, var(--wpp-success-color-200));--toast-custom-icon-wrapper-bg-color:var(--wpp-toast-custom-icon-wrapper-bg-color, transparent);--toast-custom-icon-color:var(--wpp-toast-custom-icon-color, var(--wpp-icon-color));--toast-custom-logo-wrapper-bg-color:var(--wpp-toast-custom-logo-wrapper-bg-color, transparent);--toast-custom-logo-wrapper-padding:var(--wpp-toast-custom-logo-wrapper-padding, 0);--toast-custom-logo-wrapper-width:var(--wpp-toast-custom-logo-wrapper-width, 24px);--toast-custom-logo-wrapper-height:var(--wpp-toast-custom-logo-wrapper-height, 24px);--toast-custom-logo-width:var(--wpp-toast-custom-logo-width, 24px);--toast-custom-logo-height:var(--wpp-toast-custom-logo-height, 24px);--toast-custom-logo-object-fit:var(--wpp-toast-custom-logo-object-fit, cover);--toast-custom-logo-border-radius:var(--wpp-toast-custom-logo-border-radius, var(--wpp-border-radius-xs))}:host(.wpp-toast-wrapper){position:relative;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-sizing:border-box;box-sizing:border-box;width:var(--toast-width);padding:var(--toast-padding);background:var(--wpp-grey-color-900);border-radius:var(--toast-border-radius);-webkit-box-shadow:0 4px 12px rgba(52, 58, 63, 0.102);box-shadow:0 4px 12px rgba(52, 58, 63, 0.102);-webkit-transform:translate(calc(100% + 16px), 0);transform:translate(calc(100% + 16px), 0);opacity:0;max-height:var(--mt-height);-webkit-transition-timing-function:ease;transition-timing-function:ease;-webkit-transition-duration:var(--mt-show-animation-duration);transition-duration:var(--mt-show-animation-duration);-webkit-transition-property:opacity, -webkit-transform;transition-property:opacity, -webkit-transform;transition-property:opacity, transform;transition-property:opacity, transform, -webkit-transform}:host(.wpp-toast-wrapper) .body{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;overflow:hidden}:host(.wpp-toast-wrapper) .body .message{color:var(--toast-message-color)}:host(.wpp-toast-wrapper) .actions{display:-ms-flexbox;display:flex;margin:var(--toast-actions-block-margin)}:host(.wpp-visible){-webkit-transform:translate(0, 0);transform:translate(0, 0);opacity:1}:host(.wpp-with-header) .body{display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;overflow:hidden}:host(.wpp-with-header) .info{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;overflow:hidden;padding-top:1px}:host(.wpp-with-header) .info .message{color:var(--toast-with-header-message-color)}:host(.wpp-with-header-and-without-message) .body{-ms-flex-align:center;align-items:center}:host(.wpp-with-multiple-message-lines){-ms-flex-align:start;align-items:flex-start}:host(.wpp-with-multiple-message-lines) .body{padding:4px 0;-ms-flex-align:start;align-items:flex-start}:host(.wpp-with-custom-icon:hover){background:var(--wpp-grey-color-800);cursor:pointer}.wpp-typography{overflow:hidden;color:var(--toast-message-color);white-space:nowrap;text-overflow:ellipsis}.wpp-action-button{--ab-first-border-color-focus:var(--wpp-grey-color-900);--ab-second-border-color-focus:var(--wpp-grey-color-000)}.wpp-action-button:nth-child(2){margin-left:4px}.icon-wrapper{display:-ms-flexbox;display:flex;padding:var(--toast-icon-wrapper-padding);-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;margin:var(--toast-icon-wrapper-margin);border-radius:var(--toast-icon-wrapper-border-radius);background:var(--toast-icon-wrapper-bg-color)}.icon-wrapper.warning{background-color:var(--toast-icon-wrapper-warning-bg-color);padding:var(--toast-icon-wrapper-warning-padding)}.icon-wrapper.error{background-color:var(--toast-icon-wrapper-error-bg-color)}.icon-wrapper.information{background-color:var(--toast-icon-wrapper-information-bg-color)}.icon-wrapper.success{background-color:var(--toast-icon-wrapper-success-bg-color)}.icon-wrapper.hidden{display:none}.icon-wrapper.logo-wrapper{padding:var(--toast-custom-logo-wrapper-padding);width:var(--toast-custom-logo-wrapper-width);height:var(--toast-custom-logo-wrapper-height);background:var(--toast-custom-logo-wrapper-bg-color)}.icon-wrapper.custom-icon-wrapper{background:var(--toast-custom-icon-wrapper-bg-color)}.icon-wrapper.custom-icon-wrapper .wpp-icon{color:var(--toast-custom-icon-color)}.icon-wrapper .custom-logo{width:var(--toast-custom-logo-width);height:var(--toast-custom-logo-height);-o-object-fit:var(--toast-custom-logo-object-fit);object-fit:var(--toast-custom-logo-object-fit);border-radius:var(--toast-custom-logo-border-radius)}:host(.wpp-hide){opacity:0;padding:0;margin:0;max-height:0;-webkit-transform:translateX(calc(100% + 16px));transform:translateX(calc(100% + 16px));-webkit-transition:opacity var(--mt-hide-animation-duration) ease-in-out 0s, padding 0.15s ease-in-out var(--mt-hide-animation-duration), margin 0.15s ease-in-out var(--mt-hide-animation-duration), max-height 0.15s ease-in-out var(--mt-hide-animation-duration), -webkit-transform var(--mt-hide-animation-duration) ease-in-out 0s;transition:opacity var(--mt-hide-animation-duration) ease-in-out 0s, padding 0.15s ease-in-out var(--mt-hide-animation-duration), margin 0.15s ease-in-out var(--mt-hide-animation-duration), max-height 0.15s ease-in-out var(--mt-hide-animation-duration), -webkit-transform var(--mt-hide-animation-duration) ease-in-out 0s;transition:transform var(--mt-hide-animation-duration) ease-in-out 0s, opacity var(--mt-hide-animation-duration) ease-in-out 0s, padding 0.15s ease-in-out var(--mt-hide-animation-duration), margin 0.15s ease-in-out var(--mt-hide-animation-duration), max-height 0.15s ease-in-out var(--mt-hide-animation-duration);transition:transform var(--mt-hide-animation-duration) ease-in-out 0s, opacity var(--mt-hide-animation-duration) ease-in-out 0s, padding 0.15s ease-in-out var(--mt-hide-animation-duration), margin 0.15s ease-in-out var(--mt-hide-animation-duration), max-height 0.15s ease-in-out var(--mt-hide-animation-duration), -webkit-transform var(--mt-hide-animation-duration) ease-in-out 0s}.message{white-space:normal;color:var(--toast-with-header-message-color);display:-webkit-box;-webkit-line-clamp:var(--mt-max-message-lines);line-clamp:var(--mt-max-message-lines);-webkit-box-orient:vertical}@-webkit-keyframes chatSlideFromTop{from{-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);opacity:0}to{-webkit-transform:translateX(-50%) translateY(0);transform:translateX(-50%) translateY(0);opacity:1}}@keyframes chatSlideFromTop{from{-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);opacity:0}to{-webkit-transform:translateX(-50%) translateY(0);transform:translateX(-50%) translateY(0);opacity:1}}@-webkit-keyframes chatSlideToTop{from{-webkit-transform:translateX(-50%) translateY(0);transform:translateX(-50%) translateY(0);opacity:1}to{-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);opacity:0}}@keyframes chatSlideToTop{from{-webkit-transform:translateX(-50%) translateY(0);transform:translateX(-50%) translateY(0);opacity:1}to{-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);opacity:0}}:host(.wpp-chat-variant){position:absolute;width:auto;height:auto;padding:0;-webkit-box-shadow:none;box-shadow:none;border-radius:6px;background-color:var(--wpp-grey-color-300);-webkit-box-sizing:border-box;box-sizing:border-box;top:8px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);opacity:1;-webkit-animation:chatSlideFromTop 0.3s ease-in-out;animation:chatSlideFromTop 0.3s ease-in-out;-webkit-transition:opacity var(--mt-show-animation-duration) ease, -webkit-transform var(--mt-show-animation-duration) ease;transition:opacity var(--mt-show-animation-duration) ease, -webkit-transform var(--mt-show-animation-duration) ease;transition:opacity var(--mt-show-animation-duration) ease, transform var(--mt-show-animation-duration) ease;transition:opacity var(--mt-show-animation-duration) ease, transform var(--mt-show-animation-duration) ease, -webkit-transform var(--mt-show-animation-duration) ease}:host(.wpp-chat-variant) .chat-toast-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:auto;height:auto;padding:0px 8px;border-radius:6px;background-color:var(--wpp-grey-color-300)}:host(.wpp-chat-variant) .chat-toast-wrapper .chat-toast-message{--wpp-typography-text-transform:UPPERCASE;color:var(--wpp-grey-color-800)}:host(.wpp-chat-variant) .chat-toast-wrapper .chat-toast-message .wpp-typography::part(typography){text-transform:uppercase}:host(.wpp-chat-variant) .success{background-color:var(--wpp-success-color-200)}:host(.wpp-chat-variant) .error{background-color:var(--wpp-danger-color-200)}:host(.wpp-chat-variant) .information{background-color:var(--wpp-grey-color-300)}:host(.wpp-hide.wpp-chat-variant){-webkit-animation:chatSlideToTop 0.3s ease-in-out forwards;animation:chatSlideToTop 0.3s ease-in-out forwards}";

const WppToast = /*@__PURE__*/ proxyCustomElement(class WppToast extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppToastComplete = createEvent(this, "wppToastComplete", 1);
    this.handleMouseEnter = () => {
      if (this.isIconProvided())
        this.isHovering = true;
    };
    this.handleMouseLeave = () => {
      if (this.isIconProvided())
        this.isHovering = false;
    };
    this.getIconType = (iconType) => {
      if (iconType === 'warning')
        return h("wpp-icon-warning-v3-3-1", { width: 16, height: 16, class: "icon" });
      if (iconType === 'error')
        return h("wpp-icon-error-v3-3-1", { width: 16, height: 16, class: "icon" });
      if (iconType === 'information')
        return h("wpp-icon-info-message-v3-3-1", { color: "var(--wpp-grey-color-700)", width: 16, height: 16, class: "icon" });
      if (iconType === 'success')
        return h("wpp-icon-success-v3-3-1", { width: 16, height: 16, class: "icon" });
      return null;
    };
    this.handleCloseClick = () => {
      this.isHide = true;
      setTimeout(() => {
        this.onComplete();
      }, ANIMATION_DURATION);
    };
    this.onComplete = () => {
      this.wppToastComplete.emit({ currentIndex: this.index || '' });
    };
    this.checkIfTextHasOneLine = () => {
      const host = this.host.shadowRoot;
      const message = host.querySelector('.message');
      const lineHeightElement = message?.shadowRoot?.querySelector('.typography');
      if (!lineHeightElement || !message) {
        console.warn('Line height element or message element not found');
        return;
      }
      const messageLineHeight = parseFloat(getComputedStyle(lineHeightElement).lineHeight);
      const contentHeight = host.querySelector('.body')?.clientHeight || 0;
      this.isMessageFitsWithinSingleLine = contentHeight - 10 <= messageLineHeight;
    };
    this.hostCssClasses = () => ({
      'wpp-toast': true,
      'wpp-toast-wrapper': this.variant !== 'chat',
      'wpp-chat-variant': this.variant === 'chat',
      'wpp-with-header': !!this.header,
      'wpp-with-header-and-without-message': !!this.header && !this.message,
      'wpp-with-multiple-message-lines': !this.isMessageFitsWithinSingleLine,
      'wpp-with-custom-icon': this.isIconProvided(),
      'wpp-visible': this.isShown,
      'wpp-hide': this.isHide,
    });
    this.iconWrapperCssClasses = () => ({
      'icon-wrapper': true,
      'logo-wrapper': !!(this.icon && 'url' in this.icon && this.icon.url),
      'custom-icon-wrapper': !!(this.icon && 'name' in this.icon && this.icon.name),
      information: this.type === 'information',
      success: this.type === 'success',
      error: this.type === 'error',
      warning: this.type === 'warning',
    });
    this.chatToastWrapper = () => ({
      information: this.type === 'information',
      success: this.type === 'success',
      error: this.type === 'error',
      warning: this.type === 'warning',
      'chat-toast-wrapper': true,
    });
    this.renderIcon = () => {
      if (!this.icon)
        return null;
      if ('url' in this.icon && this.icon.url) {
        return h("img", { src: this.icon.url, class: "custom-logo", alt: "custom-logo" });
      }
      if ('name' in this.icon && this.icon.name) {
        return h(transformToVersionedTag(this.icon.name), { width: 16, height: 16, part: 'icon' });
      }
    };
    this.isIconProvided = () => !!this.icon && (('url' in this.icon && !!this.icon.url) || ('name' in this.icon && !!this.icon.name));
    this.isShown = false;
    this.isHide = false;
    this.toastHeight = undefined;
    this.remainingTime = undefined;
    this.isMessageFitsWithinSingleLine = undefined;
    this.hasIconSlot = false;
    this.isHovering = false;
    this.variant = 'default';
    this.index = undefined;
    this.message = undefined;
    this.header = undefined;
    this.type = 'error';
    this.duration = 5000;
    this.primaryBtn = undefined;
    this.maxMessageLines = 3;
    this.icon = undefined;
    this.ariaProps = {};
    this.zIndex = Z_INDEX.TOAST;
  }
  onContentChange() {
    this.checkIfTextHasOneLine();
    this.toastHeight = 0;
    setTimeout(() => {
      this.toastHeight = this.host.clientHeight;
    }, 0);
  }
  componentWillLoad() {
    this.remainingTime = this.duration;
  }
  componentDidLoad() {
    // it's used to add animation to the toast, at first we render component and than we add class that's add move animation
    requestAnimationFrame(() => {
      this.checkIfTextHasOneLine();
      this.toastHeight = this.host.clientHeight;
      this.isShown = true;
    });
    if (this.duration) {
      this.startTimer();
    }
  }
  disconnectedCallback() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  startTimer() {
    const interval = 1000;
    this.timer = setInterval(() => {
      if (!this.isHovering) {
        if (this.remainingTime <= interval) {
          clearInterval(this.timer);
          this.isHide = true;
          setTimeout(() => {
            this.onComplete();
          }, ANIMATION_DURATION);
        }
        else {
          this.remainingTime -= interval;
        }
      }
    }, interval);
  }
  render() {
    const style = {
      '--mt-height': this.toastHeight ? this.toastHeight + 'px' : '',
      '--mt-show-animation-duration': ANIMATION_DURATION / 1000 + 's',
      '--mt-hide-animation-duration': ANIMATION_DURATION / 1500 + 's',
      '--mt-max-message-lines': this.maxMessageLines + '',
      zIndex: this.zIndex.toString(),
    };
    return (h(Host, { class: this.hostCssClasses(), style: style, exportparts: "body, message, body, info-wrapper, header, message, actions, action-button, icon-start, icon-wrapper", onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, role: "alert" }, this.variant === 'chat' ? (h("div", { class: this.chatToastWrapper() }, h("wpp-typography-v3-3-1", { class: "chat-toast-message", type: "2xs-strong" }, this.message))) : (h(Fragment, null, this.message && !this.header && (h("div", { class: "body", part: "body" }, h("div", { class: this.iconWrapperCssClasses(), style: this.icon?.styles, part: "icon-wrapper" }, this.isIconProvided() ? this.renderIcon() : this.getIconType(this.type)), h("wpp-typography-v3-3-1", { type: "s-body", class: "message", part: "message" }, this.message))), this.header && (h("div", { class: "body", part: "body" }, h("div", { class: this.iconWrapperCssClasses(), style: this.icon?.styles, part: "icon-wrapper" }, this.isIconProvided() ? this.renderIcon() : this.getIconType(this.type)), h("div", { class: "info", part: "info-wrapper" }, h("wpp-typography-v3-3-1", { type: "s-strong", class: "header", part: "header" }, this.header), h("wpp-typography-v3-3-1", { type: "s-body", class: "message", part: "message" }, this.message)))), !!this.primaryBtn && (h("div", { class: "actions", part: "actions" }, this.primaryBtn && (h("wpp-action-button-v3-3-1", { onClick: () => this.primaryBtn?.onClick(this.index || ''), disabled: this.primaryBtn.disabled, loading: this.primaryBtn.loading, variant: this.primaryBtn.variant, ariaProps: this.ariaProps, part: "action-button" }, this.primaryBtn.label)), h("wpp-action-button-v3-3-1", { ariaProps: { label: 'Remove message' }, variant: "inverted", part: "action-button", onClick: this.handleCloseClick }, h("wpp-icon-cross-v3-3-1", { slot: "icon-start", part: "icon-start" })))), !this.primaryBtn && (h("div", { class: "actions", part: "actions" }, h("wpp-action-button-v3-3-1", { ariaProps: { label: 'Remove message' }, variant: "inverted", part: "action-button", onClick: this.handleCloseClick }, h("wpp-icon-cross-v3-3-1", { slot: "icon-start", part: "icon-start" }))))))));
  }
  static get registryIs() { return "wpp-toast-v3-3-1"; }
  get host() { return this; }
  static get watchers() { return {
    "header": ["onContentChange"],
    "message": ["onContentChange"],
    "maxMessageLines": ["onContentChange"]
  }; }
  static get style() { return wppToastCss; }
}, [1, "wpp-toast", "wpp-toast-v3-3-1", {
    "variant": [1],
    "index": [1],
    "message": [1],
    "header": [1],
    "type": [1],
    "duration": [2],
    "primaryBtn": [16],
    "maxMessageLines": [2, "max-message-lines"],
    "icon": [16],
    "ariaProps": [16],
    "zIndex": [2, "z-index"],
    "isShown": [32],
    "isHide": [32],
    "toastHeight": [32],
    "remainingTime": [32],
    "isMessageFitsWithinSingleLine": [32],
    "hasIconSlot": [32],
    "isHovering": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-toast-v3-3-1", "wpp-action-button-v3-3-1", "wpp-icon-cross-v3-3-1", "wpp-icon-error-v3-3-1", "wpp-icon-info-message-v3-3-1", "wpp-icon-success-v3-3-1", "wpp-icon-warning-v3-3-1", "wpp-spinner-v3-3-1", "wpp-typography-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-toast-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppToast);
      }
      break;
    case "wpp-action-button-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-icon-cross-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-icon-error-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-icon-info-message-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-icon-success-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-icon-warning-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-spinner-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-typography-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { ANIMATION_DURATION as A, WppToast as W, defineCustomElement as d };
