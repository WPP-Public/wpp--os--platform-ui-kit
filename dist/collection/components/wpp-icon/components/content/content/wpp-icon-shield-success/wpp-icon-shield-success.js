import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconShieldSuccess {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-shield-success", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M13.8055 7.8423C14.0498 7.61838 14.0663 7.23884 13.8423 6.99457C13.6184 6.7503 13.2389 6.7338 12.9946 6.95771L8.61809 10.9695L7.02431 9.37574C6.79 9.14143 6.4101 9.14143 6.17578 9.37574C5.94147 9.61005 5.94147 9.98995 6.17578 10.2243L8.17578 12.2243C8.40293 12.4514 8.76868 12.4594 9.00548 12.2423L13.8055 7.8423ZM16.6 4.4C14.4693 4.4 12.3937 3.64522 10.36 2.12C10.1467 1.96 9.85338 1.96 9.64005 2.12C7.60642 3.64522 5.53078 4.4 3.40005 4.4C3.06868 4.4 2.80005 4.66863 2.80005 5V9.2C2.80005 13.201 5.1661 16.1406 9.78013 17.9582C9.92146 18.0139 10.0786 18.0139 10.22 17.9582C14.834 16.1406 17.2 13.201 17.2 9.2V5C17.2 4.66863 16.9314 4.4 16.6 4.4ZM4.00005 5.58234C6.06193 5.46068 8.06472 4.71063 10 3.34225C11.9354 4.71063 13.9382 5.46068 16 5.58234V9.2C16 12.6045 14.0374 15.1031 10 16.7535C5.96274 15.1031 4.00005 12.6045 4.00005 9.2V5.58234Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-shield-success"; }
  static get registryIs() { return "wpp-icon-shield-success-v3-3-0"; }
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
