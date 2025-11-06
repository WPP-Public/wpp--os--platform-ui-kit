import { Host, h } from '@stencil/core';
import { debounce } from '../../utils/utils';
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
  static get is() { return "wpp-inline-message"; }
  static get registryIs() { return "wpp-inline-message-v2-22-0"; }
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
      }
    };
  }
  static get states() {
    return {
      "isTruncated": {}
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
}
