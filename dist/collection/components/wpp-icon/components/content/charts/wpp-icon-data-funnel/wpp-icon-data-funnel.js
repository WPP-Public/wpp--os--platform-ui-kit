import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconDataFunnel {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-data-funnel", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M18 4.40144C18 5.61716 17.0145 6.60269 15.7988 6.60269L4.20125 6.60269C2.98553 6.60269 2 5.61716 2 4.40144C2 3.18573 2.98553 2.2002 4.20125 2.2002L15.7988 2.2002C17.0145 2.2002 18 3.18573 18 4.40144ZM16.4002 10.0008C16.4002 11.2165 15.4147 12.202 14.1989 12.202H5.80106C4.58535 12.202 3.59982 11.2165 3.59982 10.0008C3.59982 8.78509 4.58535 7.79956 5.80106 7.79956L14.1989 7.79956C15.4147 7.79956 16.4002 8.78509 16.4002 10.0008ZM14.0005 15.6002C14.0005 16.8159 13.0149 17.8014 11.7992 17.8014H8.20079C6.98507 17.8014 5.99955 16.8159 5.99955 15.6002C5.99955 14.3845 6.98507 13.3989 8.20079 13.3989H11.7992C13.0149 13.3989 14.0005 14.3845 14.0005 15.6002ZM16.8001 4.40144C16.8001 3.84839 16.3518 3.40006 15.7988 3.40006L4.20125 3.40006C3.6482 3.40006 3.19986 3.84839 3.19986 4.40144C3.19986 4.95449 3.6482 5.40282 4.20125 5.40282L15.7988 5.40282C16.3518 5.40282 16.8001 4.95449 16.8001 4.40144ZM15.2003 10.0008C15.2003 9.44776 14.752 8.99942 14.1989 8.99942H5.80106C5.24801 8.99942 4.79968 9.44776 4.79968 10.0008C4.79968 10.5539 5.24801 11.0022 5.80106 11.0022H14.1989C14.752 11.0022 15.2003 10.5539 15.2003 10.0008ZM12.8006 15.6002C12.8006 15.0471 12.3523 14.5988 11.7992 14.5988H8.20079C7.64774 14.5988 7.19941 15.0471 7.19941 15.6002C7.19941 16.1532 7.64774 16.6015 8.20079 16.6015H11.7992C12.3523 16.6015 12.8006 16.1532 12.8006 15.6002Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-data-funnel"; }
  static get registryIs() { return "wpp-icon-data-funnel-v3-6-0"; }
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
