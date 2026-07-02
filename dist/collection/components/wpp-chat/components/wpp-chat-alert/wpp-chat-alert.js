import { h, Host } from '@stencil/core';
import { mergeLocales, transformToVersionedTag } from '../../../../utils/utils';
const LOCALES_DEFAULTS = {
  closeLabel: 'Dismiss',
};
const ICON_BY_TYPE = {
  error: 'wpp-icon-error',
  warning: 'wpp-icon-warning',
  info: 'wpp-icon-info-message',
  success: 'wpp-icon-success',
};
/**
 * @part alert - root alert container
 * @part icon - status icon
 * @part message - main message text
 * @part description - secondary description text
 * @part close - close icon
 */
export class WppChatAlert {
  constructor() {
    this.handleClose = () => {
      this.wppClose.emit();
    };
    this.handleCloseKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.handleClose();
      }
    };
    this.type = 'error';
    this.message = undefined;
    this.description = undefined;
    this.closable = true;
    this.locales = undefined;
  }
  get _locales() {
    return mergeLocales(LOCALES_DEFAULTS, this.locales);
  }
  renderIcon() {
    const iconTag = ICON_BY_TYPE[this.type] ?? ICON_BY_TYPE.error;
    return (h("span", { class: "icon", part: "icon", "aria-hidden": "true" }, h(transformToVersionedTag(iconTag), {})));
  }
  render() {
    return (h(Host, null, h("div", { class: "alert", part: "alert", role: "alert" }, this.renderIcon(), h("wpp-typography-v4-2-0", { class: "message", type: "s-body", part: "message" }, this.message), this.description && (h("wpp-typography-v4-2-0", { class: "description", type: "xs-body", part: "description" }, this.description)), this.closable && (h("wpp-icon-cross-v4-2-0", { class: "close", part: "close", role: "button", tabindex: 0, "aria-label": this._locales.closeLabel, onClick: this.handleClose, onKeyDown: this.handleCloseKeyDown })))));
  }
  static get is() { return "wpp-chat-alert"; }
  static get registryIs() { return "wpp-chat-alert-v4-2-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-chat-alert.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-chat-alert.css"]
    };
  }
  static get properties() {
    return {
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "ChatAlertType",
          "resolved": "\"error\" | \"info\" | \"success\" | \"warning\"",
          "references": {
            "ChatAlertType": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat/components/wpp-chat-alert/types.ts::ChatAlertType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Alert intent, controls the colour scheme and status icon."
        },
        "attribute": "type",
        "reflect": true,
        "defaultValue": "'error'"
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
          "text": "Main message text."
        },
        "attribute": "message",
        "reflect": false
      },
      "description": {
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
          "text": "Optional secondary text shown inline as a trailing hint on the same row as\nthe message (for example a size limit). Leave unset for a single message."
        },
        "attribute": "description",
        "reflect": false
      },
      "closable": {
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
          "text": "Whether the alert can be dismissed."
        },
        "attribute": "closable",
        "reflect": false,
        "defaultValue": "true"
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<ChatAlertLocales>",
          "resolved": "{ closeLabel?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "ChatAlertLocales": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat/components/wpp-chat-alert/types.ts::ChatAlertLocales"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Localisation strings."
        }
      }
    };
  }
  static get events() {
    return [{
        "method": "wppClose",
        "name": "wppClose",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the close icon is activated."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
}
