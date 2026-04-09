import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconSubItems {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-sub-items", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M4.39941 2.65002C4.39941 2.23581 4.06363 1.90002 3.64941 1.90002C3.2352 1.90002 2.89941 2.23581 2.89941 2.65002V12.9536C2.89941 14.4724 4.13063 15.7036 5.64941 15.7036H10.9905C11.3261 17.0573 12.5491 18.0608 14.0066 18.0608C15.7226 18.0608 17.1137 16.6696 17.1137 14.9536C17.1137 13.2376 15.7226 11.8465 14.0066 11.8465C12.5491 11.8465 11.3261 12.8499 10.9905 14.2036H5.64941C4.95906 14.2036 4.39941 13.644 4.39941 12.9536V8.40716H10.9905C11.3261 9.76086 12.5491 10.7643 14.0066 10.7643C15.7226 10.7643 17.1137 9.37319 17.1137 7.65716C17.1137 5.94113 15.7226 4.55002 14.0066 4.55002C12.5491 4.55002 11.3261 5.55346 10.9905 6.90716H4.39941V2.65002ZM12.3994 14.9536C12.3994 14.066 13.119 13.3465 14.0066 13.3465C14.8942 13.3465 15.6137 14.066 15.6137 14.9536C15.6137 15.8412 14.8942 16.5608 14.0066 16.5608C13.119 16.5608 12.3994 15.8412 12.3994 14.9536ZM12.3994 7.65716C12.3994 6.76956 13.119 6.05002 14.0066 6.05002C14.8942 6.05002 15.6137 6.76956 15.6137 7.65716C15.6137 8.54476 14.8942 9.2643 14.0066 9.2643C13.119 9.2643 12.3994 8.54476 12.3994 7.65716Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-sub-items"; }
  static get registryIs() { return "wpp-icon-sub-items-v3-6-0"; }
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
