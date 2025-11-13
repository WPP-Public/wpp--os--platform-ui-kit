import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconBounce {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-bounce", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M2.75 6C2.33579 6 2 6.33579 2 6.75V13.25C2 13.6642 2.33579 14 2.75 14C3.16421 14 3.5 13.6642 3.5 13.25V8.56066L9.96967 15.0303C10.2626 15.3232 10.7374 15.3232 11.0303 15.0303L17.7842 8.27642C18.0771 7.98353 18.0771 7.50866 17.7842 7.21576C17.4913 6.92287 17.0165 6.92287 16.7236 7.21576L10.5 13.4393L4.56066 7.5H9.25C9.66421 7.5 10 7.16421 10 6.75C10 6.33579 9.66421 6 9.25 6H2.75Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-bounce"; }
  static get registryIs() { return "wpp-icon-bounce-v3-3-1"; }
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
