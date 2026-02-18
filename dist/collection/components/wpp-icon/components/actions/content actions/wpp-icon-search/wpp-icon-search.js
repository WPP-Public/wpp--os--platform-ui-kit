import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconSearch {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-search", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.875 8.54167C3.875 5.96434 5.96434 3.875 8.54167 3.875C11.119 3.875 13.2083 5.96434 13.2083 8.54167C13.2083 9.82314 12.6918 10.984 11.8556 11.8273C11.8508 11.8319 11.846 11.8366 11.8413 11.8413C11.8365 11.846 11.8319 11.8508 11.8273 11.8556C10.9839 12.6918 9.82312 13.2083 8.54167 13.2083C5.96434 13.2083 3.875 11.119 3.875 8.54167ZM12.3396 13.4003C11.2927 14.2198 9.97424 14.7083 8.54167 14.7083C5.13591 14.7083 2.375 11.9474 2.375 8.54167C2.375 5.13591 5.13591 2.375 8.54167 2.375C11.9474 2.375 14.7083 5.13591 14.7083 8.54167C14.7083 9.97427 14.2198 11.2928 13.4003 12.3397L17.4052 16.3446C17.6981 16.6375 17.6981 17.1124 17.4052 17.4053C17.1124 17.6982 16.6375 17.6982 16.3446 17.4053L12.3396 13.4003Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-search"; }
  static get registryIs() { return "wpp-icon-search-v4-0-0"; }
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
