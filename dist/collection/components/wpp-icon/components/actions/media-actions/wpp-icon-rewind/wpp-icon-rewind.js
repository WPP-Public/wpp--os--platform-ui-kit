import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconRewind {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-rewind", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M7.09766 3.85156C7.45192 3.38603 8.22228 3.609 8.22266 4.25684V15.7432C8.22228 16.3916 7.45146 16.6141 7.09766 16.1475L2.73535 10.3945C2.55491 10.1565 2.55547 9.82167 2.73633 9.58398L7.09766 3.85156ZM14.2754 3.85156C14.6296 3.38603 15.4 3.609 15.4004 4.25684V15.7432C15.4 16.3916 14.6282 16.6141 14.2744 16.1475L9.91211 10.3945C9.73183 10.1565 9.73239 9.82161 9.91309 9.58398L14.2754 3.85156Z", stroke: "currentColor", "stroke-width": "1.2" })));
  }
  static get is() { return "wpp-icon-rewind"; }
  static get registryIs() { return "wpp-icon-rewind-v4-6-0"; }
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
