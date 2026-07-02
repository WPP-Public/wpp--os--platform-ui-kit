'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-ecf423ba.js');
const WppIcon = require('./WppIcon-55327707.js');
const _const = require('./const-4c1004b0.js');
const utils = require('./utils-06b46408.js');
const consts = require('./consts-d8f5ef98.js');

const wppIconCss$2 = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

var ArrowDirectionIconPath;
(function (ArrowDirectionIconPath) {
  ArrowDirectionIconPath["up"] = "M10.3233 2.59467C10.0305 2.30185 9.55574 2.30177 9.26282 2.59449L3.42688 8.42653C3.13389 8.71932 3.13373 9.1942 3.42652 9.48719C3.71932 9.78018 4.19419 9.78034 4.48718 9.48754L9.04297 4.93481V16.875C9.04297 17.2892 9.37876 17.625 9.79297 17.625C10.2072 17.625 10.543 17.2892 10.543 16.875V4.93566L15.0947 9.48737C15.3876 9.78026 15.8624 9.78026 16.1553 9.48737C16.4482 9.19447 16.4482 8.7196 16.1553 8.42671L10.3233 2.59467Z";
  ArrowDirectionIconPath["right"] = "M11.5733 3.84467C11.2804 3.55178 10.8055 3.55178 10.5126 3.84467C10.2197 4.13756 10.2197 4.61244 10.5126 4.90533L15.0643 9.45703H3.95703C3.54282 9.45703 3.20703 9.79282 3.20703 10.207C3.20703 10.6212 3.54282 10.957 3.95703 10.957H15.0652L10.5125 15.5128C10.2197 15.8058 10.2198 16.2807 10.5128 16.5735C10.8058 16.8663 11.2807 16.8661 11.5735 16.5731L17.4046 10.7381L17.4055 10.7372C17.4082 10.7345 17.4109 10.7318 17.4136 10.729C17.6299 10.5059 17.6802 10.1817 17.5645 9.9115C17.5318 9.83498 17.4857 9.76281 17.4263 9.69851C17.4837 9.76069 17.5307 9.8326 17.5645 9.9115M11.5733 3.84467L17.4029 9.67432L11.5733 3.84467Z";
  ArrowDirectionIconPath["down"] = "M10.582 3C10.582 2.58579 10.2462 2.25 9.83203 2.25C9.41782 2.25 9.08203 2.58579 9.08203 3V14.9393L4.53033 10.3876C4.23744 10.0947 3.76256 10.0947 3.46967 10.3876C3.17678 10.6805 3.17678 11.1554 3.46967 11.4483L9.30171 17.2803C9.59453 17.5732 10.0693 17.5732 10.3622 17.2805L16.1981 11.4485C16.4911 11.1557 16.4913 10.6808 16.1985 10.3878C15.9057 10.0948 15.4308 10.0947 15.1378 10.3875L10.582 14.9402V3Z";
  ArrowDirectionIconPath["left"] = "M9.48737 4.90533C9.78026 4.61244 9.78026 4.13756 9.48737 3.84467C9.19447 3.55178 8.7196 3.55178 8.42671 3.84467L2.59467 9.67671C2.30185 9.96953 2.30177 10.4443 2.59449 10.7372L8.42653 16.5731C8.71932 16.8661 9.1942 16.8663 9.48719 16.5735C9.78018 16.2807 9.78034 15.8058 9.48754 15.5128L4.9348 10.957H16.875C17.2892 10.957 17.625 10.6212 17.625 10.207C17.625 9.79282 17.2892 9.45703 16.875 9.45703H4.93567L9.48737 4.90533Z";
})(ArrowDirectionIconPath || (ArrowDirectionIconPath = {}));
const WppIconArrow = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
    this.direction = 'right';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-arrow", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: ArrowDirectionIconPath[this.direction], fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-arrow-v4-2-0"; }
};
WppIconArrow.style = wppIconCss$2;

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
  static get registryIs() { return "wpp-icon-mic-on-v4-2-0"; }
};
WppIconMicOn.style = wppIconCss$1;

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconStop = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (index.h(WppIcon.WppIcon, { name: "wpp-icon-stop", width: this.width, height: this.height, size: this.size, color: this.color }, index.h("path", { d: "M10 3.2C6.24446 3.2 3.2 6.24446 3.2 10C3.2 13.7555 6.24446 16.8 10 16.8C13.7555 16.8 16.8 13.7555 16.8 10C16.8 6.24446 13.7555 3.2 10 3.2ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM6.8 8C6.8 7.33726 7.33726 6.8 8 6.8H12C12.6627 6.8 13.2 7.33726 13.2 8V12C13.2 12.6627 12.6627 13.2 12 13.2H8C7.33726 13.2 6.8 12.6627 6.8 12V8Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-stop-v4-2-0"; }
};
WppIconStop.style = wppIconCss;

const wppToastCss = ":host{--toast-width:var(--wpp-toast-width, 400px);--toast-border-radius:var(--wpp-toast-border-radius, var(--wpp-border-radius-m));--toast-message-color:var(--wpp-toast-message-color, var(--wpp-grey-color-000));--toast-padding:var(--wpp-toast-padding, 12px 8px 12px 16px);--toast-with-header-message-color:var(--wpp-toast-with-header-message-color, var(--wpp-grey-color-200));--toast-actions-block-margin:var(--wpp-toast-actions-block-margin, 0 0 0 8px);--toast-icon-wrapper-bg-color:var(--wpp-toast-icon-wrapper-bg-color, transparent);--toast-icon-wrapper-margin:var(--wpp-toast-icon-wrapper-margin, 0 8px 0 0);--toast-icon-wrapper-padding:var(--wpp-toast-icon-wrapper-padding, 4px);--toast-icon-wrapper-border-radius:var(--wpp-toast-icon-wrapper-border-radius, 24px);--toast-icon-wrapper-warning-padding:var(--wpp-toast-icon-wrapper-warning-padding, 3.5px 4px 4.5px 4px);--toast-icon-wrapper-warning-bg-color:var(--wpp-toast-icon-wrapper-warning-bg-color, var(--wpp-warning-color-200));--toast-icon-wrapper-error-bg-color:var(--wpp-toast-icon-wrapper-error-bg-color, var(--wpp-danger-color-200));--toast-icon-wrapper-information-bg-color:var(--wpp-toast-icon-wrapper-information-bg-color, var(--wpp-grey-color-200));--toast-icon-wrapper-success-bg-color:var(--wpp-toast-icon-wrapper-success-bg-color, var(--wpp-success-color-200));--toast-custom-icon-wrapper-bg-color:var(--wpp-toast-custom-icon-wrapper-bg-color, transparent);--toast-custom-icon-color:var(--wpp-toast-custom-icon-color, var(--wpp-icon-color));--toast-custom-logo-wrapper-bg-color:var(--wpp-toast-custom-logo-wrapper-bg-color, transparent);--toast-custom-logo-wrapper-padding:var(--wpp-toast-custom-logo-wrapper-padding, 0);--toast-custom-logo-wrapper-width:var(--wpp-toast-custom-logo-wrapper-width, 24px);--toast-custom-logo-wrapper-height:var(--wpp-toast-custom-logo-wrapper-height, 24px);--toast-custom-logo-width:var(--wpp-toast-custom-logo-width, 24px);--toast-custom-logo-height:var(--wpp-toast-custom-logo-height, 24px);--toast-custom-logo-object-fit:var(--wpp-toast-custom-logo-object-fit, cover);--toast-custom-logo-border-radius:var(--wpp-toast-custom-logo-border-radius, var(--wpp-border-radius-xs))}:host(.wpp-toast-wrapper){position:relative;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-sizing:border-box;box-sizing:border-box;width:var(--toast-width);padding:var(--toast-padding);background:var(--wpp-grey-color-900);border-radius:var(--toast-border-radius);-webkit-box-shadow:0 4px 12px rgba(52, 58, 63, 0.102);box-shadow:0 4px 12px rgba(52, 58, 63, 0.102);-webkit-transform:translate(calc(100% + 16px), 0);transform:translate(calc(100% + 16px), 0);opacity:0;max-height:var(--mt-height);-webkit-transition-timing-function:ease;transition-timing-function:ease;-webkit-transition-duration:var(--mt-show-animation-duration);transition-duration:var(--mt-show-animation-duration);-webkit-transition-property:opacity, -webkit-transform;transition-property:opacity, -webkit-transform;transition-property:opacity, transform;transition-property:opacity, transform, -webkit-transform}:host(.wpp-toast-wrapper) .body{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;overflow:hidden}:host(.wpp-toast-wrapper) .body .message{color:var(--toast-message-color)}:host(.wpp-toast-wrapper) .actions{display:-ms-flexbox;display:flex;margin:var(--toast-actions-block-margin)}:host(.wpp-visible){-webkit-transform:translate(0, 0);transform:translate(0, 0);opacity:1}:host(.wpp-with-header) .body{display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;overflow:hidden}:host(.wpp-with-header) .info{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;overflow:hidden;padding-top:1px}:host(.wpp-with-header) .info .message{color:var(--toast-with-header-message-color)}:host(.wpp-with-header-and-without-message) .body{-ms-flex-align:center;align-items:center}:host(.wpp-with-multiple-message-lines){-ms-flex-align:start;align-items:flex-start}:host(.wpp-with-multiple-message-lines) .body{padding:4px 0;-ms-flex-align:start;align-items:flex-start}:host(.wpp-with-custom-icon:hover){background:var(--wpp-grey-color-800);cursor:pointer}.wpp-typography{overflow:hidden;color:var(--toast-message-color);white-space:nowrap;text-overflow:ellipsis}.wpp-action-button{--ab-first-border-color-focus:var(--wpp-grey-color-900);--ab-second-border-color-focus:var(--wpp-grey-color-000)}.wpp-action-button:nth-child(2){margin-left:4px}.icon-wrapper{display:-ms-flexbox;display:flex;padding:var(--toast-icon-wrapper-padding);-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;margin:var(--toast-icon-wrapper-margin);border-radius:var(--toast-icon-wrapper-border-radius);background:var(--toast-icon-wrapper-bg-color)}.icon-wrapper.warning{background-color:var(--toast-icon-wrapper-warning-bg-color);padding:var(--toast-icon-wrapper-warning-padding)}.icon-wrapper.error{background-color:var(--toast-icon-wrapper-error-bg-color)}.icon-wrapper.information{background-color:var(--toast-icon-wrapper-information-bg-color)}.icon-wrapper.success{background-color:var(--toast-icon-wrapper-success-bg-color)}.icon-wrapper.hidden{display:none}.icon-wrapper.logo-wrapper{padding:var(--toast-custom-logo-wrapper-padding);width:var(--toast-custom-logo-wrapper-width);height:var(--toast-custom-logo-wrapper-height);background:var(--toast-custom-logo-wrapper-bg-color)}.icon-wrapper.custom-icon-wrapper{background:var(--toast-custom-icon-wrapper-bg-color)}.icon-wrapper.custom-icon-wrapper .wpp-icon{color:var(--toast-custom-icon-color)}.icon-wrapper .custom-logo{width:var(--toast-custom-logo-width);height:var(--toast-custom-logo-height);-o-object-fit:var(--toast-custom-logo-object-fit);object-fit:var(--toast-custom-logo-object-fit);border-radius:var(--toast-custom-logo-border-radius)}:host(.wpp-hide){opacity:0;padding:0;margin:0;max-height:0;-webkit-transform:translateX(calc(100% + 16px));transform:translateX(calc(100% + 16px));-webkit-transition:opacity var(--mt-hide-animation-duration) ease-in-out 0s, padding 0.15s ease-in-out var(--mt-hide-animation-duration), margin 0.15s ease-in-out var(--mt-hide-animation-duration), max-height 0.15s ease-in-out var(--mt-hide-animation-duration), -webkit-transform var(--mt-hide-animation-duration) ease-in-out 0s;transition:opacity var(--mt-hide-animation-duration) ease-in-out 0s, padding 0.15s ease-in-out var(--mt-hide-animation-duration), margin 0.15s ease-in-out var(--mt-hide-animation-duration), max-height 0.15s ease-in-out var(--mt-hide-animation-duration), -webkit-transform var(--mt-hide-animation-duration) ease-in-out 0s;transition:transform var(--mt-hide-animation-duration) ease-in-out 0s, opacity var(--mt-hide-animation-duration) ease-in-out 0s, padding 0.15s ease-in-out var(--mt-hide-animation-duration), margin 0.15s ease-in-out var(--mt-hide-animation-duration), max-height 0.15s ease-in-out var(--mt-hide-animation-duration);transition:transform var(--mt-hide-animation-duration) ease-in-out 0s, opacity var(--mt-hide-animation-duration) ease-in-out 0s, padding 0.15s ease-in-out var(--mt-hide-animation-duration), margin 0.15s ease-in-out var(--mt-hide-animation-duration), max-height 0.15s ease-in-out var(--mt-hide-animation-duration), -webkit-transform var(--mt-hide-animation-duration) ease-in-out 0s}.message{white-space:normal;color:var(--toast-with-header-message-color);display:-webkit-box;-webkit-line-clamp:var(--mt-max-message-lines);line-clamp:var(--mt-max-message-lines);-webkit-box-orient:vertical}@-webkit-keyframes chatSlideFromTop{from{-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);opacity:0}to{-webkit-transform:translateX(-50%) translateY(0);transform:translateX(-50%) translateY(0);opacity:1}}@keyframes chatSlideFromTop{from{-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);opacity:0}to{-webkit-transform:translateX(-50%) translateY(0);transform:translateX(-50%) translateY(0);opacity:1}}@-webkit-keyframes chatSlideToTop{from{-webkit-transform:translateX(-50%) translateY(0);transform:translateX(-50%) translateY(0);opacity:1}to{-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);opacity:0}}@keyframes chatSlideToTop{from{-webkit-transform:translateX(-50%) translateY(0);transform:translateX(-50%) translateY(0);opacity:1}to{-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);opacity:0}}:host(.wpp-chat-variant){position:absolute;width:auto;height:auto;padding:0;-webkit-box-shadow:none;box-shadow:none;border-radius:6px;background-color:var(--wpp-grey-color-300);-webkit-box-sizing:border-box;box-sizing:border-box;top:8px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);opacity:1;-webkit-animation:chatSlideFromTop 0.3s ease-in-out;animation:chatSlideFromTop 0.3s ease-in-out;-webkit-transition:opacity var(--mt-show-animation-duration) ease, -webkit-transform var(--mt-show-animation-duration) ease;transition:opacity var(--mt-show-animation-duration) ease, -webkit-transform var(--mt-show-animation-duration) ease;transition:opacity var(--mt-show-animation-duration) ease, transform var(--mt-show-animation-duration) ease;transition:opacity var(--mt-show-animation-duration) ease, transform var(--mt-show-animation-duration) ease, -webkit-transform var(--mt-show-animation-duration) ease}:host(.wpp-chat-variant) .chat-toast-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:auto;height:auto;padding:0px 8px;border-radius:6px;background-color:var(--wpp-grey-color-300)}:host(.wpp-chat-variant) .chat-toast-wrapper .chat-toast-message{--wpp-typography-text-transform:UPPERCASE;color:var(--wpp-grey-color-800)}:host(.wpp-chat-variant) .chat-toast-wrapper .chat-toast-message .wpp-typography::part(typography){text-transform:uppercase}:host(.wpp-chat-variant) .success{background-color:var(--wpp-success-color-200)}:host(.wpp-chat-variant) .error{background-color:var(--wpp-danger-color-200)}:host(.wpp-chat-variant) .information{background-color:var(--wpp-grey-color-300)}:host(.wpp-hide.wpp-chat-variant){-webkit-animation:chatSlideToTop 0.3s ease-in-out forwards;animation:chatSlideToTop 0.3s ease-in-out forwards}";

const WppToast = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wppToastComplete = index.createEvent(this, "wppToastComplete", 1);
    this.hasLoaded = false;
    this.remainingTime = 0;
    this.isHovering = false;
    this.isHideStarted = false;
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
        return index.h("wpp-icon-warning-v4-2-0", { width: 16, height: 16, class: "icon" });
      if (iconType === 'error')
        return index.h("wpp-icon-error-v4-2-0", { width: 16, height: 16, class: "icon" });
      if (iconType === 'information')
        return index.h("wpp-icon-info-message-v4-2-0", { color: "var(--wpp-grey-color-700)", width: 16, height: 16, class: "icon" });
      if (iconType === 'success')
        return index.h("wpp-icon-success-v4-2-0", { width: 16, height: 16, class: "icon" });
      return null;
    };
    this.handleCloseClick = () => {
      this.clearAllTimers();
      this.isHideStarted = true;
      this.isHide = true;
      const capturedIndex = this.index;
      this.hideTimeout = setTimeout(() => {
        if (!this.isHostConnected())
          return;
        this.wppToastComplete.emit({ currentIndex: capturedIndex || '' });
      }, _const.ANIMATION_DURATION);
      WppToast.unrefTimer(this.hideTimeout);
    };
    this.onComplete = () => {
      this.wppToastComplete.emit({ currentIndex: this.index || '' });
    };
    this.checkIfTextHasOneLine = () => {
      const host = this.hostElement?.shadowRoot;
      if (!host)
        return;
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
    this.isMessageFitsWithinSingleLine = undefined;
    this.hasIconSlot = false;
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
    if (this.contentChangeTimeout)
      clearTimeout(this.contentChangeTimeout);
    this.contentChangeTimeout = setTimeout(() => {
      if (!this.isHostConnected())
        return;
      this.toastHeight = this.hostElement?.clientHeight || 0;
      this.contentChangeTimeout = undefined;
    }, 0);
    WppToast.unrefTimer(this.contentChangeTimeout);
  }
  componentWillLoad() {
    this.hostElement = this.host;
    this.remainingTime = this.duration;
  }
  componentDidLoad() {
    // it's used to add animation to the toast, at first we render component and than we add class that's add move animation
    this.animationFrame = requestAnimationFrame(() => {
      this.animationFrame = undefined;
      if (!this.isHostConnected())
        return;
      this.checkIfTextHasOneLine();
      this.toastHeight = this.hostElement?.clientHeight || 0;
      this.isShown = true;
    });
    if (this.duration) {
      this.startTimer();
    }
    this.hasLoaded = true;
  }
  connectedCallback() {
    this.hostElement = this.host;
    if (!this.hasLoaded)
      return;
    if (this.isHideStarted) {
      // Was in hide-animation phase when VDOM disconnected us — re-schedule the
      // complete event so the container eventually removes this toast.
      if (!this.hideTimeout) {
        const capturedIndex = this.index;
        this.hideTimeout = setTimeout(() => {
          if (!this.isHostConnected())
            return;
          this.wppToastComplete.emit({ currentIndex: capturedIndex || '' });
        }, _const.ANIMATION_DURATION);
        WppToast.unrefTimer(this.hideTimeout);
      }
    }
    else if (!this.timer && this.duration) {
      // VDOM reconciliation reconnection — restart the countdown timer from
      // the current remainingTime instead of resetting to full duration.
      // Do NOT replay the entry animation (isShown is already true).
      this.startTimer();
    }
  }
  disconnectedCallback() {
    this.clearAllTimers();
  }
  clearAllTimers() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = undefined;
    }
    if (this.contentChangeTimeout) {
      clearTimeout(this.contentChangeTimeout);
      this.contentChangeTimeout = undefined;
    }
    if (this.animationFrame !== undefined) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = undefined;
    }
  }
  static unrefTimer(timer) {
    if (typeof timer === 'object' && timer !== null && 'unref' in timer) {
      const unref = timer.unref;
      if (typeof unref === 'function') {
        unref.call(timer);
      }
    }
  }
  isHostConnected() {
    return this.hostElement?.isConnected ?? false;
  }
  startTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
    const interval = 1000;
    const capturedIndex = this.index;
    this.timer = setInterval(() => {
      if (!this.isHostConnected()) {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = undefined;
        }
        return;
      }
      if (!this.isHovering) {
        if (this.remainingTime <= interval) {
          clearInterval(this.timer);
          this.timer = undefined;
          this.isHideStarted = true;
          this.isHide = true;
          this.hideTimeout = setTimeout(() => {
            if (!this.isHostConnected())
              return;
            this.wppToastComplete.emit({ currentIndex: capturedIndex || '' });
          }, _const.ANIMATION_DURATION);
          WppToast.unrefTimer(this.hideTimeout);
        }
        else {
          this.remainingTime -= interval;
        }
      }
    }, interval);
    WppToast.unrefTimer(this.timer);
  }
  render() {
    const style = {
      '--mt-height': this.toastHeight ? this.toastHeight + 'px' : '',
      '--mt-show-animation-duration': _const.ANIMATION_DURATION / 1000 + 's',
      '--mt-hide-animation-duration': _const.ANIMATION_DURATION / 1500 + 's',
      '--mt-max-message-lines': this.maxMessageLines + '',
      zIndex: this.zIndex.toString(),
    };
    return (index.h(index.Host, { class: this.hostCssClasses(), style: style, exportparts: "body, message, body, info-wrapper, header, message, actions, action-button, icon-start, icon-wrapper", onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, role: "alert" }, this.variant === 'chat' ? (index.h("div", { class: this.chatToastWrapper() }, index.h("wpp-typography-v4-2-0", { class: "chat-toast-message", type: "2xs-strong" }, this.message))) : (index.h(index.Fragment, null, this.message && !this.header && (index.h("div", { class: "body", part: "body" }, index.h("div", { class: this.iconWrapperCssClasses(), style: this.icon?.styles, part: "icon-wrapper" }, this.isIconProvided() ? this.renderIcon() : this.getIconType(this.type)), index.h("wpp-typography-v4-2-0", { type: "s-body", class: "message", part: "message" }, this.message))), this.header && (index.h("div", { class: "body", part: "body" }, index.h("div", { class: this.iconWrapperCssClasses(), style: this.icon?.styles, part: "icon-wrapper" }, this.isIconProvided() ? this.renderIcon() : this.getIconType(this.type)), index.h("div", { class: "info", part: "info-wrapper" }, index.h("wpp-typography-v4-2-0", { type: "s-strong", class: "header", part: "header" }, this.header), index.h("wpp-typography-v4-2-0", { type: "s-body", class: "message", part: "message" }, this.message)))), !!this.primaryBtn && (index.h("div", { class: "actions", part: "actions" }, this.primaryBtn && (index.h("wpp-action-button-v4-2-0", { onClick: () => this.primaryBtn?.onClick(this.index || ''), disabled: this.primaryBtn.disabled, loading: this.primaryBtn.loading, variant: this.primaryBtn.variant, ariaProps: this.ariaProps, part: "action-button" }, this.primaryBtn.label)), index.h("wpp-action-button-v4-2-0", { ariaProps: { label: 'Remove message' }, variant: "inverted", part: "action-button", onClick: this.handleCloseClick }, index.h("wpp-icon-cross-v4-2-0", { slot: "icon-start", part: "icon-start" })))), !this.primaryBtn && (index.h("div", { class: "actions", part: "actions" }, index.h("wpp-action-button-v4-2-0", { ariaProps: { label: 'Remove message' }, variant: "inverted", part: "action-button", onClick: this.handleCloseClick }, index.h("wpp-icon-cross-v4-2-0", { slot: "icon-start", part: "icon-start" }))))))));
  }
  static get registryIs() { return "wpp-toast-v4-2-0"; }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "header": ["onContentChange"],
    "message": ["onContentChange"],
    "maxMessageLines": ["onContentChange"]
  }; }
};
WppToast.style = wppToastCss;

exports.wpp_icon_arrow = WppIconArrow;
exports.wpp_icon_mic_on = WppIconMicOn;
exports.wpp_icon_stop = WppIconStop;
exports.wpp_toast = WppToast;
