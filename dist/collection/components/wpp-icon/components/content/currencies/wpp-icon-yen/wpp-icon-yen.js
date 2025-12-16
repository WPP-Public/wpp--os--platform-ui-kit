import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconYen {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-yen", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.58405 3.37598C5.9287 3.14622 6.39435 3.23935 6.62412 3.58399L10.0001 8.64793L13.376 3.58399C13.6058 3.23935 14.0715 3.14622 14.4161 3.37598C14.7608 3.60575 14.8539 4.0714 14.6241 4.41604L10.8459 10.0833H13.3334C13.7476 10.0833 14.0834 10.4191 14.0834 10.8333C14.0834 11.2476 13.7476 11.5833 13.3334 11.5833H10.7501V13.4167H13.3334C13.7476 13.4167 14.0834 13.7525 14.0834 14.1667C14.0834 14.5809 13.7476 14.9167 13.3334 14.9167H10.7501V16C10.7501 16.4142 10.4143 16.75 10.0001 16.75C9.58586 16.75 9.25007 16.4142 9.25007 16L9.25007 14.9167H6.66674C6.25253 14.9167 5.91674 14.5809 5.91674 14.1667C5.91674 13.7525 6.25253 13.4167 6.66674 13.4167H9.25007L9.25007 11.5833H6.66674C6.25253 11.5833 5.91674 11.2476 5.91674 10.8333C5.91674 10.4191 6.25253 10.0833 6.66674 10.0833H9.15424L5.37604 4.41604C5.14628 4.0714 5.23941 3.60575 5.58405 3.37598Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-yen"; }
  static get registryIs() { return "wpp-icon-yen-v3-4-0"; }
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
