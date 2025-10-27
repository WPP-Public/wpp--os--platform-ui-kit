import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconBookInformation {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-book-information", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10.8 6C10.8 6.44183 10.4419 6.8 10 6.8C9.5582 6.8 9.20002 6.44183 9.20002 6C9.20002 5.55817 9.5582 5.2 10 5.2C10.4419 5.2 10.8 5.55817 10.8 6ZM9.40002 8.2L9.40002 12.2C9.40002 12.5314 9.66865 12.8 10 12.8C10.3314 12.8 10.6 12.5314 10.6 12.2V8.2C10.6 7.86863 10.3314 7.6 10 7.6C9.66865 7.6 9.40002 7.86863 9.40002 8.2ZM3.40002 4C3.40002 2.89543 4.29545 2 5.40002 2H14.6C15.7046 2 16.6 2.89543 16.6 4V15.4C16.6 15.7314 16.3314 16 16 16H4.60002C4.60002 16.4418 4.9582 16.8 5.40002 16.8H16C16.3314 16.8 16.6 17.0686 16.6 17.4C16.6 17.7314 16.3314 18 16 18H5.40002C4.29545 18 3.40002 17.1046 3.40002 16V4ZM15.4 14.8V4C15.4 3.55817 15.0419 3.2 14.6 3.2H5.40002C4.9582 3.2 4.60002 3.55817 4.60002 4V14.8H15.4Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-book-information"; }
  static get registryIs() { return "wpp-icon-book-information-v3-3-0"; }
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
