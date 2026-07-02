import { h, Host, Fragment } from '@stencil/core';
import { mergeLocales } from '../../../../utils/utils';
import { returnIconFromExtension } from '../../../wpp-file-upload/const';
import { getExtension } from '../../../wpp-file-upload/utils';
const LOCALES_DEFAULTS = {
  removeLabel: 'Remove reference',
};
/**
 * @part reference - root reference container
 * @part block-line - leading vertical block line
 * @part thumbnail - file thumbnail container
 * @part thumbnail-image - file thumbnail image
 * @part content - reference content wrapper
 * @part name - file name text
 * @part type - file type text
 * @part text - text reference content
 * @part close - close icon
 */
export class WppChatReference {
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
    this.type = 'file';
    this.name = undefined;
    this.fileType = undefined;
    this.src = undefined;
    this.fileExtension = undefined;
    this.text = undefined;
    this.lines = 2;
    this.removable = true;
    this.locales = undefined;
  }
  get _locales() {
    return mergeLocales(LOCALES_DEFAULTS, this.locales);
  }
  renderThumbnail() {
    if (this.src) {
      return h("img", { src: this.src, alt: "", class: "thumbnail-image", part: "thumbnail-image" });
    }
    const extension = this.fileExtension || getExtension(this.name || '');
    return returnIconFromExtension(extension, null);
  }
  renderFile() {
    return (h(Fragment, null, h("div", { class: "thumbnail", part: "thumbnail" }, this.renderThumbnail()), h("div", { class: "details", part: "content" }, h("wpp-typography-v4-2-0", { class: "name", type: "xs-midi", part: "name" }, this.name), this.fileType && (h("wpp-typography-v4-2-0", { class: "type", type: "xs-body", part: "type" }, this.fileType)))));
  }
  renderText() {
    return (h("div", { class: "text-content", part: "content" }, h("wpp-typography-v4-2-0", { class: { text: true, [`lines-${this.lines}`]: true }, type: "xs-body", part: "text" }, this.text)));
  }
  render() {
    return (h(Host, null, h("div", { class: "reference", part: "reference" }, h("span", { class: "block-line", part: "block-line", "aria-hidden": "true" }), this.type === 'file' ? this.renderFile() : this.renderText(), this.removable && (h("wpp-icon-cross-v4-2-0", { class: "close", part: "close", role: "button", tabindex: 0, "aria-label": this._locales.removeLabel, onClick: this.handleClose, onKeyDown: this.handleCloseKeyDown })))));
  }
  static get is() { return "wpp-chat-reference"; }
  static get registryIs() { return "wpp-chat-reference-v4-2-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-chat-reference.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-chat-reference.css"]
    };
  }
  static get properties() {
    return {
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "ChatReferenceType",
          "resolved": "\"file\" | \"text\"",
          "references": {
            "ChatReferenceType": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat/components/wpp-chat-reference/types.ts::ChatReferenceType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Reference type: a file card (thumbnail + name + type) or a text snippet."
        },
        "attribute": "type",
        "reflect": true,
        "defaultValue": "'file'"
      },
      "name": {
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
          "text": "File name shown as the title (file type)."
        },
        "attribute": "name",
        "reflect": false
      },
      "fileType": {
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
          "text": "Type label shown as the subtitle, e.g. \"PNG image\" (file type)."
        },
        "attribute": "file-type",
        "reflect": false
      },
      "src": {
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
          "text": "Thumbnail image url. When omitted, a file-type icon is shown (file type)."
        },
        "attribute": "src",
        "reflect": false
      },
      "fileExtension": {
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
          "text": "File extension used to pick the fallback icon, e.g. \".png\" (file type)."
        },
        "attribute": "file-extension",
        "reflect": false
      },
      "text": {
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
          "text": "Text content (text type)."
        },
        "attribute": "text",
        "reflect": false
      },
      "lines": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "ChatReferenceLines",
          "resolved": "1 | 2",
          "references": {
            "ChatReferenceLines": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat/components/wpp-chat-reference/types.ts::ChatReferenceLines"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Number of lines before the text is truncated with an ellipsis (text type)."
        },
        "attribute": "lines",
        "reflect": true,
        "defaultValue": "2"
      },
      "removable": {
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
          "text": "Whether the reference can be removed."
        },
        "attribute": "removable",
        "reflect": false,
        "defaultValue": "true"
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<ChatReferenceLocales>",
          "resolved": "{ removeLabel?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "ChatReferenceLocales": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat/components/wpp-chat-reference/types.ts::ChatReferenceLocales"
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
