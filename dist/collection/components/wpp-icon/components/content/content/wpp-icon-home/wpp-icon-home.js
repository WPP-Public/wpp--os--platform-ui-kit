import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconHome {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-home", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M3.54167 17.2917H7.70833C7.93833 17.2917 8.125 17.1051 8.125 16.8751V12.7084C8.125 12.248 8.49792 11.8751 8.95833 11.8751H11.0417C11.5021 11.8751 11.875 12.248 11.875 12.7084V16.8751C11.875 17.1051 12.0617 17.2917 12.2917 17.2917H16.4583C16.6883 17.2917 16.875 17.1051 16.875 16.8751V8.92133C16.875 8.1555 16.5238 7.43175 15.9221 6.95758L10 2.29175L4.07792 6.95758C3.47625 7.43175 3.125 8.1555 3.125 8.92133V16.8751C3.125 17.1051 3.31167 17.2917 3.54167 17.2917Z", stroke: "currentColor", "stroke-width": "1.5", "stroke-miterlimit": "10", "stroke-linejoin": "round" })));
  }
  static get is() { return "wpp-icon-home"; }
  static get registryIs() { return "wpp-icon-home-v2-22-0"; }
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
