import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconFrame {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-frame", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M14.167 1.79199C14.558 1.79226 14.875 2.10896 14.875 2.5V5.125H17.5C17.8911 5.125 18.2078 5.44196 18.208 5.83301C18.208 6.22421 17.8912 6.54102 17.5 6.54102H14.875V13.459H17.5C17.8912 13.459 18.208 13.7758 18.208 14.167C18.2078 14.558 17.8911 14.875 17.5 14.875H14.875V17.5C14.875 17.891 14.558 18.2077 14.167 18.208C13.7758 18.208 13.459 17.8912 13.459 17.5V14.875H6.54199V17.5C6.54199 17.891 6.22496 18.2077 5.83398 18.208C5.44278 18.208 5.12598 17.8912 5.12598 17.5V14.875H2.5C2.10891 14.875 1.79217 14.558 1.79199 14.167C1.79199 13.7758 2.1088 13.459 2.5 13.459H5.12598V6.54102H2.5C2.1088 6.54102 1.79199 6.22421 1.79199 5.83301C1.79217 5.44196 2.10891 5.125 2.5 5.125H5.12598V2.5C5.12598 2.1088 5.44278 1.79199 5.83398 1.79199C6.22496 1.79226 6.54199 2.10896 6.54199 2.5V5.125H13.459V2.5C13.459 2.1088 13.7758 1.79199 14.167 1.79199ZM6.54199 13.459H13.459V6.54102H6.54199V13.459Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-frame"; }
  static get registryIs() { return "wpp-icon-frame-v4-3-0"; }
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
