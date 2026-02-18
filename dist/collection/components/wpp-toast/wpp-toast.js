import { Host, h, Fragment } from '@stencil/core';
import { ANIMATION_DURATION } from './const';
import { transformToVersionedTag } from '../../utils/utils';
import { Z_INDEX } from '../../common/consts';
/**
 * @part body - Main content wrapper
 * @part actions - Action buttons wrapper
 * @part message - Message text
 * @part header - Header text
 * @part info-wrapper - info wrapper element
 * @part action-button - action button element
 * @part icon-start - icon-start element
 * @part icon-wrapper - icon-wrapper element
 */
export class WppToast {
  constructor() {
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
        return h("wpp-icon-warning-v3-5-0", { width: 16, height: 16, class: "icon" });
      if (iconType === 'error')
        return h("wpp-icon-error-v3-5-0", { width: 16, height: 16, class: "icon" });
      if (iconType === 'information')
        return h("wpp-icon-info-message-v3-5-0", { color: "var(--wpp-grey-color-700)", width: 16, height: 16, class: "icon" });
      if (iconType === 'success')
        return h("wpp-icon-success-v3-5-0", { width: 16, height: 16, class: "icon" });
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
    return (h(Host, { class: this.hostCssClasses(), style: style, exportparts: "body, message, body, info-wrapper, header, message, actions, action-button, icon-start, icon-wrapper", onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, role: "alert" }, this.variant === 'chat' ? (h("div", { class: this.chatToastWrapper() }, h("wpp-typography-v3-5-0", { class: "chat-toast-message", type: "2xs-strong" }, this.message))) : (h(Fragment, null, this.message && !this.header && (h("div", { class: "body", part: "body" }, h("div", { class: this.iconWrapperCssClasses(), style: this.icon?.styles, part: "icon-wrapper" }, this.isIconProvided() ? this.renderIcon() : this.getIconType(this.type)), h("wpp-typography-v3-5-0", { type: "s-body", class: "message", part: "message" }, this.message))), this.header && (h("div", { class: "body", part: "body" }, h("div", { class: this.iconWrapperCssClasses(), style: this.icon?.styles, part: "icon-wrapper" }, this.isIconProvided() ? this.renderIcon() : this.getIconType(this.type)), h("div", { class: "info", part: "info-wrapper" }, h("wpp-typography-v3-5-0", { type: "s-strong", class: "header", part: "header" }, this.header), h("wpp-typography-v3-5-0", { type: "s-body", class: "message", part: "message" }, this.message)))), !!this.primaryBtn && (h("div", { class: "actions", part: "actions" }, this.primaryBtn && (h("wpp-action-button-v3-5-0", { onClick: () => this.primaryBtn?.onClick(this.index || ''), disabled: this.primaryBtn.disabled, loading: this.primaryBtn.loading, variant: this.primaryBtn.variant, ariaProps: this.ariaProps, part: "action-button" }, this.primaryBtn.label)), h("wpp-action-button-v3-5-0", { ariaProps: { label: 'Remove message' }, variant: "inverted", part: "action-button", onClick: this.handleCloseClick }, h("wpp-icon-cross-v3-5-0", { slot: "icon-start", part: "icon-start" })))), !this.primaryBtn && (h("div", { class: "actions", part: "actions" }, h("wpp-action-button-v3-5-0", { ariaProps: { label: 'Remove message' }, variant: "inverted", part: "action-button", onClick: this.handleCloseClick }, h("wpp-icon-cross-v3-5-0", { slot: "icon-start", part: "icon-start" }))))))));
  }
  static get is() { return "wpp-toast"; }
  static get registryIs() { return "wpp-toast-v3-5-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-toast.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-toast.css"]
    };
  }
  static get properties() {
    return {
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'default' | 'chat'",
          "resolved": "\"chat\" | \"default\" | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the toast style variant.\nThis property is primarily intended for internal use in the chat component."
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "'default'"
      },
      "index": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the toast index."
        },
        "attribute": "index",
        "reflect": false
      },
      "message": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": true,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the toast text."
        },
        "attribute": "message",
        "reflect": false
      },
      "header": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the toast header."
        },
        "attribute": "header",
        "reflect": false
      },
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "Exclude<MessageTypes, 'brand'>",
          "resolved": "\"error\" | \"information\" | \"success\" | \"warning\"",
          "references": {
            "Exclude": {
              "location": "global",
              "id": "global::Exclude"
            },
            "MessageTypes": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::MessageTypes"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the toast style based on the available types."
        },
        "attribute": "type",
        "reflect": false,
        "defaultValue": "'error'"
      },
      "duration": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines for how long the toast is displayed."
        },
        "attribute": "duration",
        "reflect": false,
        "defaultValue": "5000"
      },
      "primaryBtn": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ButtonState",
          "resolved": "ButtonState | undefined",
          "references": {
            "ButtonState": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-toast/types.ts::ButtonState"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the toast primary action button."
        }
      },
      "maxMessageLines": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the toast max message lines, by default it's 3"
        },
        "attribute": "max-message-lines",
        "reflect": false,
        "defaultValue": "3"
      },
      "icon": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ToastIcon",
          "resolved": "undefined | { name: string; styles?: Record<string, string> | undefined; } | { url: string; styles?: Record<string, string> | undefined; }",
          "references": {
            "ToastIcon": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-toast/types.ts::ToastIcon"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "If you only provide the \u2018name\u2019 key, you should use an icon from the CL (e.g., \u2018wpp-icon-user\u2019).\nAlternatively, if you provide the \u2018URL\u2019 key, you can pass an icon using a URL (e.g., \u2018https://avatar/1.jpg\u2019)"
        }
      },
      "ariaProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "AriaProps",
          "resolved": "AriaProps",
          "references": {
            "AriaProps": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::AriaProps"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Contains the `aria-` props of the wpp-action-button."
        },
        "defaultValue": "{}"
      },
      "zIndex": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the z-index of the WppToast."
        },
        "attribute": "z-index",
        "reflect": false,
        "defaultValue": "Z_INDEX.TOAST"
      }
    };
  }
  static get states() {
    return {
      "isShown": {},
      "isHide": {},
      "toastHeight": {},
      "remainingTime": {},
      "isMessageFitsWithinSingleLine": {},
      "hasIconSlot": {},
      "isHovering": {}
    };
  }
  static get events() {
    return [{
        "method": "wppToastComplete",
        "name": "wppToastComplete",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the toast index is displayed."
        },
        "complexType": {
          "original": "ToastCompleteDetail",
          "resolved": "ToastCompleteDetail",
          "references": {
            "ToastCompleteDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-toast/types.ts::ToastCompleteDetail"
            }
          }
        }
      }];
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "header",
        "methodName": "onContentChange"
      }, {
        "propName": "message",
        "methodName": "onContentChange"
      }, {
        "propName": "maxMessageLines",
        "methodName": "onContentChange"
      }];
  }
}
