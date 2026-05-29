import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconCloudSuccess {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-cloud-success", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M5.26931 5.8C5.64877 3.63421 7.53966 2 9.8 2C12.0603 2 13.9512 3.63421 14.3307 5.8L14.4 5.8C16.1673 5.8 17.6 7.23269 17.6 9C17.6 9.14969 17.5897 9.29698 17.5698 9.4412C17.2066 9.01229 16.7751 8.64304 16.2921 8.3502C16.0223 7.56461 15.2771 7 14.4 7L13.7951 7.00002C13.4752 7.00003 13.2115 6.74905 13.1958 6.42953C13.107 4.625 11.6144 3.2 9.8 3.2C7.98562 3.2 6.49304 4.625 6.40419 6.42953C6.38845 6.74905 6.1248 7.00003 5.80489 7.00002L5.2 7C4.09543 7 3.2 7.89543 3.2 9C3.2 10.1046 4.09543 11 5.2 11H8.71997C8.57939 11.381 8.48215 11.783 8.43424 12.2H5.2C3.43269 12.2 2 10.7673 2 9C2 7.23269 3.43269 5.8 5.20002 5.8L5.26931 5.8ZM18 12.8C18 15.2301 16.0301 17.2 13.6 17.2C11.1699 17.2 9.2 15.2301 9.2 12.8C9.2 10.3699 11.1699 8.4 13.6 8.4C16.0301 8.4 18 10.3699 18 12.8ZM16.2828 10.9172C16.1266 10.7609 15.8734 10.7609 15.7172 10.9172L12.8 13.8343L11.4828 12.5172C11.3266 12.3609 11.0734 12.3609 10.9172 12.5172C10.7609 12.6734 10.7609 12.9266 10.9172 13.0828L12.5172 14.6828C12.6734 14.8391 12.9266 14.8391 13.0828 14.6828L16.2828 11.4828C16.4391 11.3266 16.4391 11.0734 16.2828 10.9172Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-cloud-success"; }
  static get registryIs() { return "wpp-icon-cloud-success-v4-1-0"; }
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
