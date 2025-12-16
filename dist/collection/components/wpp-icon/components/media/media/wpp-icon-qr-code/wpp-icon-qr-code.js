import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconQrCode {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-qr-code", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M13 11H11V13H13V15H11V17H13V15H15V17H17V15H15V13H17V11H15V13H13V11ZM5 5H7V7H5V5ZM5 3C3.89543 3 3 3.89543 3 5V7C3 8.10457 3.89543 9 5 9H7C8.10457 9 9 8.10457 9 7V5C9 3.89543 8.10457 3 7 3H5ZM4.25 4.75C4.25 4.47386 4.47386 4.25 4.75 4.25H7.25C7.52614 4.25 7.75 4.47386 7.75 4.75V7.25C7.75 7.52614 7.52614 7.75 7.25 7.75H4.75C4.47386 7.75 4.25 7.52614 4.25 7.25V4.75ZM5 13H7V15H5V13ZM5 11C3.89543 11 3 11.8954 3 13V15C3 16.1046 3.89543 17 5 17H7C8.10457 17 9 16.1046 9 15V13C9 11.8954 8.10457 11 7 11H5ZM4.25 12.75C4.25 12.4739 4.47386 12.25 4.75 12.25H7.25C7.52614 12.25 7.75 12.4739 7.75 12.75V15.25C7.75 15.5261 7.52614 15.75 7.25 15.75H4.75C4.47386 15.75 4.25 15.5261 4.25 15.25V12.75ZM13 5H15V7H13V5ZM13 3C11.8954 3 11 3.89543 11 5V7C11 8.10457 11.8954 9 13 9H15C16.1046 9 17 8.10457 17 7V5C17 3.89543 16.1046 3 15 3H13ZM12.25 4.75C12.25 4.47386 12.4739 4.25 12.75 4.25H15.25C15.5261 4.25 15.75 4.47386 15.75 4.75V7.25C15.75 7.52614 15.5261 7.75 15.25 7.75H12.75C12.4739 7.75 12.25 7.52614 12.25 7.25V4.75Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-qr-code"; }
  static get registryIs() { return "wpp-icon-qr-code-v3-4-0"; }
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
