import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconUnpinned {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-unpinned", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M9.27648 16.424L6.9128 14.0604L3.4732 17.5H2.5L2.50008 16.5269L5.93967 13.0872L3.57603 10.7236C3.01185 10.1594 3.233 9.19932 3.98713 8.9388L7.25408 7.81021C7.37471 7.76854 7.47421 7.68129 7.53128 7.56715L9.44099 3.74768C10.1298 2.37015 11.9657 2.07222 13.0547 3.16125L16.8388 6.94534C17.9278 8.03437 17.6299 9.87026 16.2524 10.559L12.4329 12.4688C12.3188 12.5258 12.2315 12.6253 12.1898 12.746L11.0613 16.0129C10.8007 16.7671 9.84065 16.9882 9.27648 16.424ZM12.0816 4.13438L15.8656 7.91847C16.2905 8.34328 16.1742 9.05943 15.6369 9.32811L11.8174 11.2378C11.3815 11.4558 11.0482 11.8359 10.8891 12.2966L9.91499 15.1163L4.88378 10.0851L7.70344 9.111C8.16416 8.95184 8.54422 8.61858 8.76221 8.1826L10.6719 4.36314C10.9406 3.82579 11.6567 3.70957 12.0816 4.13438Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-unpinned"; }
  static get registryIs() { return "wpp-icon-unpinned-v3-5-0"; }
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
