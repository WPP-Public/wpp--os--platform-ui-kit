import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconMap {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-map", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M7.51304 2.99868L7.55485 2.99756L7.59552 2.99863C7.61546 2.99978 7.63544 3.00186 7.65541 3.00488L7.66969 3.00826C7.7456 3.02046 7.82104 3.04757 7.89294 3.09016L7.93904 3.11997L12.4454 6.28869L16.9489 3.12295C17.3645 2.83073 17.9278 3.09338 17.9926 3.5754L17.9988 3.66827V13.1182C17.9988 13.3042 17.9211 13.4803 17.7871 13.6054L17.7155 13.6635L12.8273 17.0998C12.5901 17.2666 12.3048 17.2527 12.0916 17.1204L7.5545 13.9286L3.04871 17.0969C2.63301 17.3891 2.06976 17.1264 2.00494 16.6444L1.99878 16.5515V7.10163C1.99878 6.91559 2.07642 6.73953 2.21041 6.61443L2.28201 6.55631L7.17027 3.11997C7.22715 3.07999 7.2868 3.05039 7.34755 3.03032L7.4564 3.00543L7.51304 2.99868ZM16.6656 4.95166L13.1105 7.45081V15.2711L16.6656 12.772V4.95166ZM6.88703 4.94869L3.33194 7.44784V15.2681L6.88703 12.769V4.94869ZM8.22227 4.94869V12.769L11.7774 15.2681V7.44784L8.22227 4.94869Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-map"; }
  static get registryIs() { return "wpp-icon-map-v3-6-0"; }
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
