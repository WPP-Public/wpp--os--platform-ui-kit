import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconMailCopy {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-mail-copy", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M3.17031 5.74049C2.46648 6.1913 2 6.9802 2 7.87805V12.561C2 14.824 3.83454 16.6585 6.09756 16.6585H13.122C14.0198 16.6585 14.8087 16.1921 15.2595 15.4882L6.09756 15.4878C4.48112 15.4878 3.17073 14.1774 3.17073 12.561L3.17031 5.74049ZM15.4634 3H6.4878C5.13519 3 4.02986 4.0587 3.95523 5.39264L3.95122 5.53659V12.1707C3.95122 13.5233 5.00992 14.6287 6.34386 14.7033L6.4878 14.7073H15.4634C16.816 14.7073 17.9214 13.6486 17.996 12.3147L18 12.1707V5.53659C18 4.18398 16.9413 3.07864 15.6074 3.00402L15.4634 3ZM5.12195 6.82361L10.703 9.7619C10.8493 9.83889 11.02 9.84989 11.1733 9.7949L11.2482 9.7619L16.8293 6.82439V12.1707C16.8293 12.8874 16.2774 13.4751 15.5754 13.5321L15.4634 13.5366H6.4878C5.77118 13.5366 5.18346 12.9847 5.12648 12.2828L5.12195 12.1707V6.82361ZM6.4878 4.17073H15.4634C16.18 4.17073 16.7678 4.72262 16.8247 5.42456L16.8277 5.50224L10.9756 8.58241L5.1224 5.50133C5.1411 4.76328 5.74525 4.17073 6.4878 4.17073Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-mail-copy"; }
  static get registryIs() { return "wpp-icon-mail-copy-v3-5-0"; }
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
