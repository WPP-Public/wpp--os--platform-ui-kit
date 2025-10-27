import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconCart {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-cart", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M2 3.64286C2 3.28782 2.28782 3 2.64286 3H3.12137C3.93606 3 4.42385 3.54771 4.70278 4.05685C4.88871 4.39624 5.02321 4.78986 5.12842 5.14625C5.15691 5.144 5.18578 5.14286 5.21497 5.14286H15.9269C16.6385 5.14286 17.1524 5.82378 16.9573 6.50811L15.3907 12.0017C15.1019 13.0141 14.1768 13.7124 13.1239 13.7124H8.02552C6.96396 13.7124 6.03337 13.0028 5.75242 11.9791L5.10058 9.6039L4.02178 5.9621L4.02003 5.95572C3.88657 5.46901 3.76131 5.01433 3.5752 4.6746C3.39445 4.34469 3.25037 4.28571 3.12137 4.28571H2.64286C2.28782 4.28571 2 3.9979 2 3.64286ZM6.34814 9.29166L6.99229 11.6388C7.12 12.1041 7.54299 12.4267 8.02552 12.4267H13.1239C13.6025 12.4267 14.023 12.1093 14.1542 11.6491L15.643 6.42857H5.50185L6.33634 9.24584C6.34086 9.26109 6.34479 9.27637 6.34814 9.29166ZM9.28571 16.2857C9.28571 17.2325 8.5182 18 7.57143 18C6.62465 18 5.85714 17.2325 5.85714 16.2857C5.85714 15.3389 6.62465 14.5714 7.57143 14.5714C8.5182 14.5714 9.28571 15.3389 9.28571 16.2857ZM8 16.2857C8 16.049 7.80812 15.8571 7.57143 15.8571C7.33474 15.8571 7.14286 16.049 7.14286 16.2857C7.14286 16.5224 7.33474 16.7143 7.57143 16.7143C7.80812 16.7143 8 16.5224 8 16.2857ZM15.2857 16.2857C15.2857 17.2325 14.5182 18 13.5714 18C12.6247 18 11.8571 17.2325 11.8571 16.2857C11.8571 15.3389 12.6247 14.5714 13.5714 14.5714C14.5182 14.5714 15.2857 15.3389 15.2857 16.2857ZM14 16.2857C14 16.049 13.8081 15.8571 13.5714 15.8571C13.3347 15.8571 13.1429 16.049 13.1429 16.2857C13.1429 16.5224 13.3347 16.7143 13.5714 16.7143C13.8081 16.7143 14 16.5224 14 16.2857Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-cart"; }
  static get registryIs() { return "wpp-icon-cart-v3-3-0"; }
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
