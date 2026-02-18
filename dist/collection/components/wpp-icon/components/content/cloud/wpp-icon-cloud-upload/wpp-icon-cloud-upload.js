import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconCloudUpload {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-cloud-upload", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M5.26931 5.8C5.64877 3.63421 7.53966 2 9.8 2C12.0603 2 13.9512 3.63421 14.3307 5.8L14.4 5.8C16.1673 5.8 17.6 7.23269 17.6 9C17.6 9.14969 17.5897 9.29698 17.5698 9.4412C17.2066 9.01229 16.7751 8.64304 16.2921 8.3502C16.0223 7.56461 15.2771 7 14.4 7L13.7951 7.00002C13.4752 7.00003 13.2115 6.74905 13.1958 6.42953C13.107 4.625 11.6144 3.2 9.8 3.2C7.98562 3.2 6.49304 4.625 6.40419 6.42953C6.38845 6.74905 6.1248 7.00003 5.80489 7.00002L5.2 7C4.09543 7 3.2 7.89543 3.2 9C3.2 10.1046 4.09543 11 5.2 11H8.71997C8.57939 11.381 8.48215 11.783 8.43424 12.2H5.2C3.43269 12.2 2 10.7673 2 9C2 7.23269 3.43269 5.8 5.20002 5.8L5.26931 5.8ZM18 12.8C18 15.2301 16.0301 17.2 13.6 17.2C11.1699 17.2 9.2 15.2301 9.2 12.8C9.2 10.3699 11.1699 8.4 13.6 8.4C16.0301 8.4 18 10.3699 18 12.8ZM13.2 11.3657V15.2C13.2 15.4209 13.3791 15.6 13.6 15.6C13.8209 15.6 14 15.4209 14 15.2V11.3657L15.3172 12.6828C15.4734 12.8391 15.7266 12.8391 15.8828 12.6828C16.0391 12.5266 16.0391 12.2734 15.8828 12.1172L13.8828 10.1172C13.7266 9.96095 13.4734 9.96095 13.3172 10.1172L11.3172 12.1172C11.1609 12.2734 11.1609 12.5266 11.3172 12.6828C11.4734 12.8391 11.7266 12.8391 11.8828 12.6828L13.2 11.3657Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-cloud-upload"; }
  static get registryIs() { return "wpp-icon-cloud-upload-v3-5-0"; }
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
