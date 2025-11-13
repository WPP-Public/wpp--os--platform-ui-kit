import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconTv {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-tv", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3 3.25C2.0335 3.25 1.25 4.0335 1.25 5V14C1.25 14.9665 2.0335 15.75 3 15.75H4.41778L4.04779 16.7366C3.90235 17.1245 4.09886 17.5568 4.4867 17.7022C4.87454 17.8477 5.30685 17.6512 5.45229 17.2633L6.01978 15.75H13.9803L14.5478 17.2633C14.6932 17.6512 15.1255 17.8477 15.5134 17.7022C15.9012 17.5568 16.0977 17.1245 15.9523 16.7366L15.5823 15.75H17C17.9665 15.75 18.75 14.9665 18.75 14V5C18.75 4.0335 17.9665 3.25 17 3.25H3ZM14.5055 14.25H17C17.1381 14.25 17.25 14.1381 17.25 14V5C17.25 4.86193 17.1381 4.75 17 4.75H3C2.86193 4.75 2.75 4.86193 2.75 5V14C2.75 14.1381 2.86193 14.25 3 14.25H5.49454L5.50004 14.25H14.5L14.5055 14.25Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-tv"; }
  static get registryIs() { return "wpp-icon-tv-v3-3-1"; }
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
