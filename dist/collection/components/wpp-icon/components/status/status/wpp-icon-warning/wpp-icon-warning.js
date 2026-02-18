import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconWarning {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-warning-color-400)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-warning", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8.83422 2.68592L1.77378 15.024C1.26617 15.9112 1.92884 17 2.97644 17H17.0978C18.1454 17 18.808 15.9112 18.3004 15.024L11.2395 2.68592C10.716 1.77136 9.35779 1.77136 8.83422 2.68592ZM10.0374 5.75C10.5552 5.74994 10.9749 6.16963 10.975 6.68739L10.9751 11.3746L9.10014 11.3749L9.09999 6.68761C9.09993 6.16984 9.51962 5.75006 10.0374 5.75ZM10.9751 11.3746C10.9751 11.8923 10.5554 12.3125 10.0376 12.3125C9.51985 12.3125 9.10013 11.8927 9.10014 11.3749L10.9751 11.3746ZM10.9746 14.1875C10.9746 14.7053 10.5549 15.125 10.0371 15.125C9.51934 15.125 9.09961 14.7053 9.09961 14.1875C9.09961 13.6697 9.51934 13.25 10.0371 13.25C10.5549 13.25 10.9746 13.6697 10.9746 14.1875Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-warning"; }
  static get registryIs() { return "wpp-icon-warning-v3-5-0"; }
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
        "defaultValue": "'var(--wpp-warning-color-400)'"
      }
    };
  }
}
