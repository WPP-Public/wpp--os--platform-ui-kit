import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconFile {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-file", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.20837 1.5415C4.10374 1.5415 3.20837 2.43687 3.20837 3.5415V16.4582C3.20837 17.5628 4.10374 18.4582 5.20837 18.4582H14.7917C15.8963 18.4582 16.7917 17.5628 16.7917 16.4582V7.70817C16.7917 7.49872 16.7059 7.30932 16.5674 7.17325L11.16 1.76582C11.0239 1.62737 10.8345 1.5415 10.625 1.5415H5.20837ZM11.375 4.1022V6.45817C11.375 6.73437 11.5988 6.95817 11.875 6.95817H14.231L11.375 4.1022ZM4.70837 3.5415C4.70837 3.2653 4.93217 3.0415 5.20837 3.0415H9.87504V6.45817C9.87504 7.5628 10.7704 8.45817 11.875 8.45817H15.2917V16.4582C15.2917 16.7344 15.0679 16.9582 14.7917 16.9582H5.20837C4.93217 16.9582 4.70837 16.7344 4.70837 16.4582V3.5415Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-file"; }
  static get registryIs() { return "wpp-icon-file-v3-5-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["../../../../wpp-icon.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["../../../../wpp-icon.css"]
    };
  }
  static get properties() {
    return {
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'s' | 'm'",
          "resolved": "\"m\" | \"s\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the icon size, where `s` is **16px** and `m` is **20px**."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
      },
      "width": {
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
          "text": "Defines the icon width and changes its default size. If you use `width` only, the icon width and height will be the same."
        },
        "attribute": "width",
        "reflect": false
      },
      "height": {
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
          "text": "Defines the icon height and changes its default size. If you use `height` only, the icon width will not be affected."
        },
        "attribute": "height",
        "reflect": false
      },
      "color": {
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
          "text": "Defines the icon color."
        },
        "attribute": "color",
        "reflect": false,
        "defaultValue": "'var(--wpp-icon-color)'"
      }
    };
  }
}
