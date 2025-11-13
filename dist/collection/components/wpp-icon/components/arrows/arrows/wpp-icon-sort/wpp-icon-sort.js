import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconSort {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-danger-colour-400)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-sort", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M14.8393 16.7223C14.702 16.8917 14.4849 17 14.25 17C14.0571 17.001 13.8704 16.9277 13.7232 16.7803L10.7193 13.772C10.4269 13.4791 10.4269 13.0043 10.7193 12.7114C11.0118 12.4185 11.486 12.4185 11.7784 12.7114L13.5 14.4441V3.75C13.5 3.33579 13.8364 3 14.25 3C14.6636 3 15 3.33579 15 3.75V14.4336L16.7216 12.7159C17.014 12.423 17.4882 12.423 17.7807 12.7159C18.0731 13.0088 18.0731 13.4837 17.7807 13.7765L14.8393 16.7223ZM6.33931 3.27775C6.202 3.1083 5.98488 3.00001 5.75 3.00001C5.55709 2.99905 5.37038 3.07227 5.2232 3.21967L2.21934 6.22798C1.92689 6.52087 1.92689 6.99575 2.21934 7.28864C2.5118 7.58153 2.98597 7.58153 3.27843 7.28864L5 5.5559V16.25C5 16.6642 5.3364 17 5.75 17C6.1636 17 6.5 16.6642 6.5 16.25V5.5664L8.22157 7.28412C8.51403 7.57702 8.9882 7.57702 9.28066 7.28412C9.57311 6.99123 9.57311 6.51636 9.28066 6.22346L6.33931 3.27775Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-sort"; }
  static get registryIs() { return "wpp-icon-sort-v3-3-1"; }
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
        "defaultValue": "'var(--wpp-danger-colour-400)'"
      }
    };
  }
}
