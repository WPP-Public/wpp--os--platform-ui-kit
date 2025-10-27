import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconReply {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-reply", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M4.31 9.49981L7.27297 12.4628C7.56586 12.7557 7.56586 13.2305 7.27297 13.5234C7.0067 13.7897 6.59004 13.8139 6.29643 13.596L6.21231 13.5234L1.96967 9.28078C1.7034 9.01452 1.6792 8.59785 1.89705 8.30424L1.96967 8.22012L6.21231 3.97748C6.5052 3.68459 6.98008 3.68459 7.27297 3.97748C7.53924 4.24375 7.56344 4.66041 7.34559 4.95402L7.27297 5.03814L4.31 7.99981L10 8.00045C14.1979 8.00045 17.6162 11.3381 17.7462 15.5044L17.75 15.7505C17.75 16.1647 17.4142 16.5005 17 16.5005C16.5858 16.5005 16.25 16.1647 16.25 15.7505C16.25 12.3754 13.5748 9.62514 10.2291 9.50458L10 9.50045L4.31 9.49981L7.27297 12.4628L4.31 9.49981Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-reply"; }
  static get registryIs() { return "wpp-icon-reply-v3-3-0"; }
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
