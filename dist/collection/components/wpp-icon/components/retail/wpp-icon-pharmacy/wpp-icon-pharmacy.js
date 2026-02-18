import { h } from '@stencil/core';
import { WppIcon } from '../../../WppIcon';
export class WppIconPharmacy {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-pharmacy", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8.41071 3.5C8.27264 3.5 8.16071 3.61193 8.16071 3.75V7.41071C8.16071 7.82493 7.82493 8.16071 7.41071 8.16071H3.75C3.61193 8.16071 3.5 8.27264 3.5 8.41071L3.5 11.5893C3.5 11.7274 3.61193 11.8393 3.75 11.8393H7.41071C7.82493 11.8393 8.16071 12.1751 8.16071 12.5893V16.25C8.16071 16.3881 8.27264 16.5 8.41071 16.5H11.5893C11.7274 16.5 11.8393 16.3881 11.8393 16.25V12.5893C11.8393 12.1751 12.1751 11.8393 12.5893 11.8393H16.25C16.3881 11.8393 16.5 11.7274 16.5 11.5893V8.41071C16.5 8.27264 16.3881 8.16071 16.25 8.16071H12.5893C12.1751 8.16071 11.8393 7.82493 11.8393 7.41071V3.75C11.8393 3.61193 11.7274 3.5 11.5893 3.5H8.41071ZM6.66071 3.75C6.66071 2.7835 7.44422 2 8.41071 2H11.5893C12.5558 2 13.3393 2.7835 13.3393 3.75V6.66071H16.25C17.2165 6.66071 18 7.44422 18 8.41071V11.5893C18 12.5558 17.2165 13.3393 16.25 13.3393H13.3393V16.25C13.3393 17.2165 12.5558 18 11.5893 18H8.41071C7.44422 18 6.66071 17.2165 6.66071 16.25V13.3393H3.75C2.7835 13.3393 2 12.5558 2 11.5893L2 8.41071C2 7.44422 2.7835 6.66071 3.75 6.66071H6.66071V3.75Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-pharmacy"; }
  static get registryIs() { return "wpp-icon-pharmacy-v3-5-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["../../../wpp-icon.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["../../../wpp-icon.css"]
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
