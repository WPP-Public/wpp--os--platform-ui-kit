'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');
const _const = require('./const-cfc205bf.js');
const utils = require('./utils-15defa44.js');
const consts = require('./consts-dba6e6dd.js');

const wppIconCss$1 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconMicOn = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-mic-on", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M15 9.2C15.3038 9.2 15.5548 9.42572 15.5945 9.71858L15.6 9.8V10.2C15.6 13.0475 13.396 15.3803 10.6008 15.5854L10.6 17.4C10.6 17.7314 10.3314 18 10 18C9.69627 18 9.44523 17.7743 9.4055 17.4814L9.40002 17.4L9.40004 15.5854C6.66661 15.3853 4.49829 13.1504 4.40327 10.3891L4.40002 10.2V9.8C4.40002 9.46863 4.66865 9.2 5.00002 9.2C5.30378 9.2 5.55482 9.42572 5.59455 9.71858L5.60002 9.8V10.2C5.60002 12.4616 7.38758 14.3057 9.6269 14.3965L9.80002 14.4H10.2C12.4616 14.4 14.3057 12.6124 14.3965 10.3731L14.4 10.2V9.8C14.4 9.46863 14.6687 9.2 15 9.2ZM10 2C11.7673 2 13.2 3.43269 13.2 5.2V10C13.2 11.7673 11.7673 13.2 10 13.2C8.23271 13.2 6.80002 11.7673 6.80002 10V5.2C6.80002 3.43269 8.23271 2 10 2ZM10 3.2C8.89545 3.2 8.00002 4.09543 8.00002 5.2V10C8.00002 11.1046 8.89545 12 10 12C11.1046 12 12 11.1046 12 10V5.2C12 4.09543 11.1046 3.2 10 3.2Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-mic-on-v4-0-0"; }
};
WppIconMicOn.style = wppIconCss$1;

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconSend = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-send", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M4.82799 10L2.04367 2.84033C1.84989 2.34203 2.33578 1.86549 2.81645 2.03488L2.8922 2.06708L17.6575 9.44973C18.0826 9.66228 18.1092 10.2443 17.7372 10.503L17.6575 10.5503L2.8922 17.9329C2.41398 18.172 1.89449 17.7324 2.01862 17.2381L2.04367 17.1597L4.82799 10L2.04367 2.84033L4.82799 10ZM3.76856 3.88094L5.9087 9.38429L11.3453 9.38478C11.6567 9.38478 11.9141 9.61623 11.9549 9.91652L11.9605 10C11.9605 10.3115 11.729 10.5689 11.4287 10.6096L11.3453 10.6152L5.9087 10.6147L3.76856 16.1191L16.0067 10L3.76856 3.88094Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-send-v4-0-0"; }
};
WppIconSend.style = wppIconCss;

const wppToastCss = ":host{--toast-width:var(--wpp-toast-width, 400px);--toast-border-radius:var(--wpp-toast-border-radius, var(--wpp-border-radius-m));--toast-message-color:var(--wpp-toast-message-color, var(--wpp-grey-color-000));--toast-padding:var(--wpp-toast-padding, 12px 8px 12px 16px);--toast-with-header-message-color:var(--wpp-toast-with-header-message-color, var(--wpp-grey-color-200));--toast-actions-block-margin:var(--wpp-toast-actions-block-margin, 0 0 0 8px);--toast-icon-wrapper-bg-color:var(--wpp-toast-icon-wrapper-bg-color, transparent);--toast-icon-wrapper-margin:var(--wpp-toast-icon-wrapper-margin, 0 8px 0 0);--toast-icon-wrapper-padding:var(--wpp-toast-icon-wrapper-padding, 4px);--toast-icon-wrapper-border-radius:var(--wpp-toast-icon-wrapper-border-radius, 24px);--toast-icon-wrapper-warning-padding:var(--wpp-toast-icon-wrapper-warning-padding, 3.5px 4px 4.5px 4px);--toast-icon-wrapper-warning-bg-color:var(--wpp-toast-icon-wrapper-warning-bg-color, var(--wpp-warning-color-200));--toast-icon-wrapper-error-bg-color:var(--wpp-toast-icon-wrapper-error-bg-color, var(--wpp-danger-color-200));--toast-icon-wrapper-information-bg-color:var(--wpp-toast-icon-wrapper-information-bg-color, var(--wpp-grey-color-200));--toast-icon-wrapper-success-bg-color:var(--wpp-toast-icon-wrapper-success-bg-color, var(--wpp-success-color-200));--toast-custom-icon-wrapper-bg-color:var(--wpp-toast-custom-icon-wrapper-bg-color, transparent);--toast-custom-icon-color:var(--wpp-toast-custom-icon-color, var(--wpp-icon-color));--toast-custom-logo-wrapper-bg-color:var(--wpp-toast-custom-logo-wrapper-bg-color, transparent);--toast-custom-logo-wrapper-padding:var(--wpp-toast-custom-logo-wrapper-padding, 0);--toast-custom-logo-wrapper-width:var(--wpp-toast-custom-logo-wrapper-width, 24px);--toast-custom-logo-wrapper-height:var(--wpp-toast-custom-logo-wrapper-height, 24px);--toast-custom-logo-width:var(--wpp-toast-custom-logo-width, 24px);--toast-custom-logo-height:var(--wpp-toast-custom-logo-height, 24px);--toast-custom-logo-object-fit:var(--wpp-toast-custom-logo-object-fit, cover);--toast-custom-logo-border-radius:var(--wpp-toast-custom-logo-border-radius, var(--wpp-border-radius-xs))}:host(.wpp-toast-wrapper){position:relative;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-sizing:border-box;box-sizing:border-box;width:var(--toast-width);padding:var(--toast-padding);background:var(--wpp-grey-color-900);border-radius:var(--toast-border-radius);-webkit-box-shadow:0 4px 12px rgba(52, 58, 63, 0.102);box-shadow:0 4px 12px rgba(52, 58, 63, 0.102);-webkit-transform:translate(calc(100% + 16px), 0);transform:translate(calc(100% + 16px), 0);opacity:0;max-height:var(--mt-height);-webkit-transition-timing-function:ease;transition-timing-function:ease;-webkit-transition-duration:var(--mt-show-animation-duration);transition-duration:var(--mt-show-animation-duration);-webkit-transition-property:opacity, -webkit-transform;transition-property:opacity, -webkit-transform;transition-property:opacity, transform;transition-property:opacity, transform, -webkit-transform}:host(.wpp-toast-wrapper) .body{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;overflow:hidden}:host(.wpp-toast-wrapper) .body .message{color:var(--toast-message-color)}:host(.wpp-toast-wrapper) .actions{display:-ms-flexbox;display:flex;margin:var(--toast-actions-block-margin)}:host(.wpp-visible){-webkit-transform:translate(0, 0);transform:translate(0, 0);opacity:1}:host(.wpp-with-header) .body{display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;overflow:hidden}:host(.wpp-with-header) .info{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;overflow:hidden;padding-top:1px}:host(.wpp-with-header) .info .message{color:var(--toast-with-header-message-color)}:host(.wpp-with-header-and-without-message) .body{-ms-flex-align:center;align-items:center}:host(.wpp-with-multiple-message-lines){-ms-flex-align:start;align-items:flex-start}:host(.wpp-with-multiple-message-lines) .body{padding:4px 0;-ms-flex-align:start;align-items:flex-start}:host(.wpp-with-custom-icon:hover){background:var(--wpp-grey-color-800);cursor:pointer}.wpp-typography{overflow:hidden;color:var(--toast-message-color);white-space:nowrap;text-overflow:ellipsis}.wpp-action-button{--ab-first-border-color-focus:var(--wpp-grey-color-900);--ab-second-border-color-focus:var(--wpp-grey-color-000)}.wpp-action-button:nth-child(2){margin-left:4px}.icon-wrapper{display:-ms-flexbox;display:flex;padding:var(--toast-icon-wrapper-padding);-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;margin:var(--toast-icon-wrapper-margin);border-radius:var(--toast-icon-wrapper-border-radius);background:var(--toast-icon-wrapper-bg-color)}.icon-wrapper.warning{background-color:var(--toast-icon-wrapper-warning-bg-color);padding:var(--toast-icon-wrapper-warning-padding)}.icon-wrapper.error{background-color:var(--toast-icon-wrapper-error-bg-color)}.icon-wrapper.information{background-color:var(--toast-icon-wrapper-information-bg-color)}.icon-wrapper.success{background-color:var(--toast-icon-wrapper-success-bg-color)}.icon-wrapper.hidden{display:none}.icon-wrapper.logo-wrapper{padding:var(--toast-custom-logo-wrapper-padding);width:var(--toast-custom-logo-wrapper-width);height:var(--toast-custom-logo-wrapper-height);background:var(--toast-custom-logo-wrapper-bg-color)}.icon-wrapper.custom-icon-wrapper{background:var(--toast-custom-icon-wrapper-bg-color)}.icon-wrapper.custom-icon-wrapper .wpp-icon{color:var(--toast-custom-icon-color)}.icon-wrapper .custom-logo{width:var(--toast-custom-logo-width);height:var(--toast-custom-logo-height);-o-object-fit:var(--toast-custom-logo-object-fit);object-fit:var(--toast-custom-logo-object-fit);border-radius:var(--toast-custom-logo-border-radius)}:host(.wpp-hide){opacity:0;padding:0;margin:0;max-height:0;-webkit-transform:translateX(calc(100% + 16px));transform:translateX(calc(100% + 16px));-webkit-transition:opacity var(--mt-hide-animation-duration) ease-in-out 0s, padding 0.15s ease-in-out var(--mt-hide-animation-duration), margin 0.15s ease-in-out var(--mt-hide-animation-duration), max-height 0.15s ease-in-out var(--mt-hide-animation-duration), -webkit-transform var(--mt-hide-animation-duration) ease-in-out 0s;transition:opacity var(--mt-hide-animation-duration) ease-in-out 0s, padding 0.15s ease-in-out var(--mt-hide-animation-duration), margin 0.15s ease-in-out var(--mt-hide-animation-duration), max-height 0.15s ease-in-out var(--mt-hide-animation-duration), -webkit-transform var(--mt-hide-animation-duration) ease-in-out 0s;transition:transform var(--mt-hide-animation-duration) ease-in-out 0s, opacity var(--mt-hide-animation-duration) ease-in-out 0s, padding 0.15s ease-in-out var(--mt-hide-animation-duration), margin 0.15s ease-in-out var(--mt-hide-animation-duration), max-height 0.15s ease-in-out var(--mt-hide-animation-duration);transition:transform var(--mt-hide-animation-duration) ease-in-out 0s, opacity var(--mt-hide-animation-duration) ease-in-out 0s, padding 0.15s ease-in-out var(--mt-hide-animation-duration), margin 0.15s ease-in-out var(--mt-hide-animation-duration), max-height 0.15s ease-in-out var(--mt-hide-animation-duration), -webkit-transform var(--mt-hide-animation-duration) ease-in-out 0s}.message{white-space:normal;color:var(--toast-with-header-message-color);display:-webkit-box;-webkit-line-clamp:var(--mt-max-message-lines);line-clamp:var(--mt-max-message-lines);-webkit-box-orient:vertical}@-webkit-keyframes chatSlideFromTop{from{-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);opacity:0}to{-webkit-transform:translateX(-50%) translateY(0);transform:translateX(-50%) translateY(0);opacity:1}}@keyframes chatSlideFromTop{from{-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);opacity:0}to{-webkit-transform:translateX(-50%) translateY(0);transform:translateX(-50%) translateY(0);opacity:1}}@-webkit-keyframes chatSlideToTop{from{-webkit-transform:translateX(-50%) translateY(0);transform:translateX(-50%) translateY(0);opacity:1}to{-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);opacity:0}}@keyframes chatSlideToTop{from{-webkit-transform:translateX(-50%) translateY(0);transform:translateX(-50%) translateY(0);opacity:1}to{-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);opacity:0}}:host(.wpp-chat-variant){position:absolute;width:auto;height:auto;padding:0;-webkit-box-shadow:none;box-shadow:none;border-radius:6px;background-color:var(--wpp-grey-color-300);-webkit-box-sizing:border-box;box-sizing:border-box;top:8px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);opacity:1;-webkit-animation:chatSlideFromTop 0.3s ease-in-out;animation:chatSlideFromTop 0.3s ease-in-out;-webkit-transition:opacity var(--mt-show-animation-duration) ease, -webkit-transform var(--mt-show-animation-duration) ease;transition:opacity var(--mt-show-animation-duration) ease, -webkit-transform var(--mt-show-animation-duration) ease;transition:opacity var(--mt-show-animation-duration) ease, transform var(--mt-show-animation-duration) ease;transition:opacity var(--mt-show-animation-duration) ease, transform var(--mt-show-animation-duration) ease, -webkit-transform var(--mt-show-animation-duration) ease}:host(.wpp-chat-variant) .chat-toast-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:auto;height:auto;padding:0px 8px;border-radius:6px;background-color:var(--wpp-grey-color-300)}:host(.wpp-chat-variant) .chat-toast-wrapper .chat-toast-message{--wpp-typography-text-transform:UPPERCASE;color:var(--wpp-grey-color-800)}:host(.wpp-chat-variant) .chat-toast-wrapper .chat-toast-message .wpp-typography::part(typography){text-transform:uppercase}:host(.wpp-chat-variant) .success{background-color:var(--wpp-success-color-200)}:host(.wpp-chat-variant) .error{background-color:var(--wpp-danger-color-200)}:host(.wpp-chat-variant) .information{background-color:var(--wpp-grey-color-300)}:host(.wpp-hide.wpp-chat-variant){-webkit-animation:chatSlideToTop 0.3s ease-in-out forwards;animation:chatSlideToTop 0.3s ease-in-out forwards}";

const WppToast = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppToastComplete = index.createEvent(this, "wppToastComplete", 1);
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
        return index.h("wpp-icon-warning-v4-0-0", { width: 16, height: 16, class: "icon" });
      if (iconType === 'error')
        return index.h("wpp-icon-error-v4-0-0", { width: 16, height: 16, class: "icon" });
      if (iconType === 'information')
        return index.h("wpp-icon-info-message-v4-0-0", { color: "var(--wpp-grey-color-700)", width: 16, height: 16, class: "icon" });
      if (iconType === 'success')
        return index.h("wpp-icon-success-v4-0-0", { width: 16, height: 16, class: "icon" });
      return null;
    };
    this.handleCloseClick = () => {
      this.isHide = true;
      setTimeout(() => {
        this.onComplete();
      }, _const.ANIMATION_DURATION);
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
        return index.h("img", { src: this.icon.url, class: "custom-logo", alt: "custom-logo" });
      }
      if ('name' in this.icon && this.icon.name) {
        return index.h(utils.transformToVersionedTag(this.icon.name), { width: 16, height: 16, part: 'icon' });
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
    this.zIndex = consts.Z_INDEX.TOAST;
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
          }, _const.ANIMATION_DURATION);
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
      '--mt-show-animation-duration': _const.ANIMATION_DURATION / 1000 + 's',
      '--mt-hide-animation-duration': _const.ANIMATION_DURATION / 1500 + 's',
      '--mt-max-message-lines': this.maxMessageLines + '',
      zIndex: this.zIndex.toString(),
    };
    return (index.h(index.Host, { class: this.hostCssClasses(), style: style, exportparts: "body, message, body, info-wrapper, header, message, actions, action-button, icon-start, icon-wrapper", onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, role: "alert" }, this.variant === 'chat' ? (index.h("div", { class: this.chatToastWrapper() }, index.h("wpp-typography-v4-0-0", { class: "chat-toast-message", type: "2xs-strong" }, this.message))) : (index.h(index.Fragment, null, this.message && !this.header && (index.h("div", { class: "body", part: "body" }, index.h("div", { class: this.iconWrapperCssClasses(), style: this.icon?.styles, part: "icon-wrapper" }, this.isIconProvided() ? this.renderIcon() : this.getIconType(this.type)), index.h("wpp-typography-v4-0-0", { type: "s-body", class: "message", part: "message" }, this.message))), this.header && (index.h("div", { class: "body", part: "body" }, index.h("div", { class: this.iconWrapperCssClasses(), style: this.icon?.styles, part: "icon-wrapper" }, this.isIconProvided() ? this.renderIcon() : this.getIconType(this.type)), index.h("div", { class: "info", part: "info-wrapper" }, index.h("wpp-typography-v4-0-0", { type: "s-strong", class: "header", part: "header" }, this.header), index.h("wpp-typography-v4-0-0", { type: "s-body", class: "message", part: "message" }, this.message)))), !!this.primaryBtn && (index.h("div", { class: "actions", part: "actions" }, this.primaryBtn && (index.h("wpp-action-button-v4-0-0", { onClick: () => this.primaryBtn?.onClick(this.index || ''), disabled: this.primaryBtn.disabled, loading: this.primaryBtn.loading, variant: this.primaryBtn.variant, ariaProps: this.ariaProps, part: "action-button" }, this.primaryBtn.label)), index.h("wpp-action-button-v4-0-0", { ariaProps: { label: 'Remove message' }, variant: "inverted", part: "action-button", onClick: this.handleCloseClick }, index.h("wpp-icon-cross-v4-0-0", { slot: "icon-start", part: "icon-start" })))), !this.primaryBtn && (index.h("div", { class: "actions", part: "actions" }, index.h("wpp-action-button-v4-0-0", { ariaProps: { label: 'Remove message' }, variant: "inverted", part: "action-button", onClick: this.handleCloseClick }, index.h("wpp-icon-cross-v4-0-0", { slot: "icon-start", part: "icon-start" }))))))));
  }
  static get registryIs() { return "wpp-toast-v4-0-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "header": ["onContentChange"],
    "message": ["onContentChange"],
    "maxMessageLines": ["onContentChange"]
  }; }
};
WppToast.style = wppToastCss;

exports.wpp_icon_mic_on = WppIconMicOn;
exports.wpp_icon_send = WppIconSend;
exports.wpp_toast = WppToast;
