import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconImage {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-image", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M4.79167 3.875C4.28546 3.875 3.875 4.28546 3.875 4.79167V15.09L8.74115 10.383C9.44315 9.70374 10.5575 9.70372 11.2596 10.3829C11.2596 10.3829 11.2596 10.383 11.2596 10.383L16.125 15.0897V4.79167C16.125 4.28546 15.7145 3.875 15.2083 3.875H4.79167ZM15.0378 16.125L10.2166 11.461L10.2166 11.461C10.0961 11.3444 9.90468 11.3444 9.7842 11.461L9.78412 11.461L4.9625 16.125H15.0378ZM2.375 4.79167C2.375 3.45704 3.45704 2.375 4.79167 2.375H15.2083C16.543 2.375 17.625 3.45704 17.625 4.79167V15.2083C17.625 16.543 16.543 17.625 15.2083 17.625H4.79167C3.45704 17.625 2.375 16.543 2.375 15.2083V4.79167ZM12.7085 6.79175C12.4324 6.79175 12.2085 7.01561 12.2085 7.29175C12.2085 7.56789 12.4324 7.79175 12.7085 7.79175C12.9846 7.79175 13.2085 7.56789 13.2085 7.29175C13.2085 7.01561 12.9846 6.79175 12.7085 6.79175ZM10.7085 7.29175C10.7085 6.18718 11.6039 5.29175 12.7085 5.29175C13.8131 5.29175 14.7085 6.18718 14.7085 7.29175C14.7085 8.39632 13.8131 9.29175 12.7085 9.29175C11.6039 9.29175 10.7085 8.39632 10.7085 7.29175Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-image"; }
  static get registryIs() { return "wpp-icon-image-v3-5-0"; }
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
