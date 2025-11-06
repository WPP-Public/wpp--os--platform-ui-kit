import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconDatabase {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-database", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M3.59998 5.2C3.59998 4.64756 3.85222 4.16531 4.21936 3.7762C4.58349 3.39028 5.08238 3.06996 5.65332 2.81402C6.79658 2.30152 8.33388 2 9.99998 2C11.6661 2 13.2034 2.30152 14.3466 2.81402C14.9176 3.06996 15.4165 3.39028 15.7806 3.7762C16.1477 4.16531 16.4 4.64756 16.4 5.2V14.8C16.4 15.3524 16.1477 15.8347 15.7806 16.2238C15.4165 16.6097 14.9176 16.93 14.3466 17.186C13.2034 17.6985 11.6661 18 9.99998 18C8.33388 18 6.79658 17.6985 5.65332 17.186C5.08238 16.93 4.58349 16.6097 4.21936 16.2238C3.85222 15.8347 3.59998 15.3524 3.59998 14.8V5.2ZM4.79998 5.2C4.79998 5.36553 4.87233 5.56727 5.09217 5.80027C5.31503 6.03647 5.66554 6.2764 6.14419 6.49097C7.10012 6.91949 8.46282 7.2 9.99998 7.2C11.5371 7.2 12.8998 6.91949 13.8558 6.49097C14.3344 6.2764 14.6849 6.03647 14.9078 5.80027C15.1276 5.56727 15.2 5.36553 15.2 5.2C15.2 5.03447 15.1276 4.83273 14.9078 4.59973C14.6849 4.36353 14.3344 4.1236 13.8558 3.90903C12.8998 3.48051 11.5371 3.2 9.99998 3.2C8.46282 3.2 7.10012 3.48051 6.14419 3.90903C5.66554 4.1236 5.31503 4.36353 5.09217 4.59973C4.87233 4.83273 4.79998 5.03447 4.79998 5.2ZM15.2 7.11394C14.9432 7.29025 14.6555 7.44754 14.3466 7.58598C13.2034 8.09848 11.6661 8.4 9.99998 8.4C8.33388 8.4 6.79658 8.09848 5.65332 7.58598C5.34448 7.44754 5.05672 7.29025 4.79998 7.11394V14.8C4.79998 14.9655 4.87233 15.1673 5.09217 15.4003C5.31503 15.6365 5.66554 15.8764 6.14419 16.091C7.10012 16.5195 8.46282 16.8 9.99998 16.8C11.5371 16.8 12.8998 16.5195 13.8558 16.091C14.3344 15.8764 14.6849 15.6365 14.9078 15.4003C15.1276 15.1673 15.2 14.9655 15.2 14.8V7.11394Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-database"; }
  static get registryIs() { return "wpp-icon-database-v2-22-0"; }
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
