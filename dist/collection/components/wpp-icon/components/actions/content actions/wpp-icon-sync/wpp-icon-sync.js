import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconSync {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-sync", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M14.4393 4L5.25 4C4.00736 4 3 5.00736 3 6.25L3 11.25C3 11.6642 3.33579 12 3.75 12C4.16421 12 4.5 11.6642 4.5 11.25L4.5 6.25C4.5 5.83579 4.83579 5.5 5.25 5.5L14.4393 5.5L13.2197 6.71967C12.9268 7.01256 12.9268 7.48744 13.2197 7.78033C13.5126 8.07322 13.9874 8.07322 14.2803 7.78033L16.7803 5.28033C17.0732 4.98744 17.0732 4.51256 16.7803 4.21967L14.2803 1.71967C13.9874 1.42678 13.5126 1.42678 13.2197 1.71967C12.9268 2.01256 12.9268 2.48744 13.2197 2.78033L14.4393 4ZM5.71967 18.2803C6.01256 18.5732 6.48744 18.5732 6.78033 18.2803C7.07322 17.9874 7.07322 17.5126 6.78033 17.2197L5.56066 16L14.75 16C15.9926 16 17 14.9926 17 13.75L17 8.75C17 8.33579 16.6642 8 16.25 8C15.8358 8 15.5 8.33579 15.5 8.75L15.5 13.75C15.5 14.1642 15.1642 14.5 14.75 14.5L5.56066 14.5L6.78033 13.2803C7.07322 12.9874 7.07322 12.5126 6.78033 12.2197C6.48744 11.9268 6.01256 11.9268 5.71967 12.2197L3.21967 14.7197C2.92678 15.0126 2.92678 15.4874 3.21967 15.7803L5.71967 18.2803Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-sync"; }
  static get registryIs() { return "wpp-icon-sync-v4-0-0"; }
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
