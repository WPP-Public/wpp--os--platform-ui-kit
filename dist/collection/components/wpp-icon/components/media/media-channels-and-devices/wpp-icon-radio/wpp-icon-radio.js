import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconRadio {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-radio", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M13.2498 14.25C13.802 14.25 14.2498 13.8023 14.2498 13.25C14.2498 12.6977 13.802 12.25 13.2498 12.25C12.6975 12.25 12.2498 12.6977 12.2498 13.25C12.2498 13.8023 12.6975 14.25 13.2498 14.25Z", fill: "currentColor" }), h("path", { d: "M11.2498 13.25C11.2498 13.8023 10.802 14.25 10.2498 14.25C9.69747 14.25 9.24976 13.8023 9.24976 13.25C9.24976 12.6977 9.69747 12.25 10.2498 12.25C10.802 12.25 11.2498 12.6977 11.2498 13.25Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M11.9449 3.19636C12.3295 3.0425 12.5165 2.60601 12.3627 2.22143C12.2088 1.83686 11.7723 1.64982 11.3878 1.80367L3.57859 4.92784C3.28493 5.04524 3.03315 5.24789 2.8557 5.50969C2.67819 5.77159 2.58321 6.08113 2.58301 6.39752V15.8333C2.58301 16.2533 2.74982 16.656 3.04676 16.9529C3.34369 17.2499 3.74642 17.4167 4.16634 17.4167H15.833C16.2529 17.4167 16.6557 17.2499 16.9526 16.9529C17.2495 16.656 17.4163 16.2533 17.4163 15.8333V6.66668C17.4163 6.24676 17.2495 5.84403 16.9526 5.5471C16.6557 5.25016 16.2529 5.08335 15.833 5.08335H7.2282L11.9449 3.19636ZM15.9163 9.25V6.66668C15.9163 6.64458 15.9076 6.62338 15.8919 6.60776C15.8763 6.59213 15.8551 6.58335 15.833 6.58335H4.08301V9.25H15.9163ZM4.08301 10.75H15.9163V15.8333C15.9163 15.8555 15.9076 15.8766 15.8919 15.8923C15.8763 15.9079 15.8551 15.9167 15.833 15.9167H4.16634C4.14424 15.9167 4.12304 15.9079 4.10742 15.8923C4.09179 15.8766 4.08301 15.8555 4.08301 15.8333V10.75Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-radio"; }
  static get registryIs() { return "wpp-icon-radio-v2-22-0"; }
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
