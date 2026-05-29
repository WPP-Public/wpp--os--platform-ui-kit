import { h, Host } from '@stencil/core';
import { FOCUS_TYPE } from '../../types/common';
import { debounce } from '../../utils/utils';
import { LOCALES_DEFAULTS } from './const';
import { themeSubscriptionController } from '../../utils/subscribe-to-theme';
/**
 * @part message-block - Wrapper around the icon and message.
 *
 * @part message-icon - message icon element
 * @part message-block - message block element
 * @part message - message element
 * @part wrapper - component wrapper element
 * @part tooltip - tooltip wrapper content
 */
export class WppInlineMessage {
  constructor() {
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
  static get is() { return "wpp-inline-message"; }
  static get registryIs() { return "wpp-inline-message-v4-1-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-inline-message.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-inline-message.css"]
    };
  }
  static get properties() {
    return {
      "titleText": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the title of the component. This prop is available only for inline-messages with size=\"l\"."
        },
        "attribute": "title-text",
        "reflect": false,
        "defaultValue": "''"
      },
      "actionBtnText": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the text of the action button. This prop is available only for inline-messages with size=\"l\"."
        },
        "attribute": "action-btn-text",
        "reflect": false,
        "defaultValue": "''"
      },
      "message": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the inline message."
        },
        "attribute": "message",
        "reflect": false,
        "defaultValue": "''"
      },
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "MessageTypes",
          "resolved": "\"error\" | \"information\" | \"success\" | \"warning\"",
          "references": {
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
          "text": "Defines the inline message style based on the available types."
        },
        "attribute": "type",
        "reflect": false
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'s' | 'm' | 'l'",
          "resolved": "\"l\" | \"m\" | \"s\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the inline message size."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'s'"
      },
      "tooltipConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "DropdownConfig",
          "resolved": "DropdownConfig",
          "references": {
            "DropdownConfig": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the dropdown configuration. Under the hood dropdown using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{}"
      },
      "showTooltipFrom": {
        "type": "any",
        "mutable": true,
        "complexType": {
          "original": "number | 'auto'",
          "resolved": "\"auto\" | number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Controls message truncation behavior. When set to a number, limits visible characters to that value.\nWhen set to 'auto' (default), truncates based on input width. In both cases, full message appears in tooltip when truncated."
        },
        "attribute": "show-tooltip-from",
        "reflect": false,
        "defaultValue": "'auto'"
      },
      "hideCloseBtn": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, the close button on the right of the container for the inline-message with size='l' will not be displayed."
        },
        "attribute": "hide-close-btn",
        "reflect": false,
        "defaultValue": "false"
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<InlineMessageLocalesType>",
          "resolved": "{ close?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "InlineMessageLocalesType": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-inline-message/types.ts::InlineMessageLocalesType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the component locale types."
        },
        "defaultValue": "{}"
      }
    };
  }
  static get states() {
    return {
      "isTruncated": {},
      "hasTitle": {},
      "focusType": {}
    };
  }
  static get events() {
    return [{
        "method": "wppClickActionBtn",
        "name": "wppClickActionBtn",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the action button is clicked. This event is emitted only for the inline-messages with size=\"l\"."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "wppClickCloseBtn",
        "name": "wppClickCloseBtn",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the close button is clicked. This event is emitted only for the inline-messages with size=\"l\"."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "titleText",
        "methodName": "onUpdateTitleText"
      }, {
        "propName": "locales",
        "methodName": "onUpdateLocales"
      }];
  }
}
