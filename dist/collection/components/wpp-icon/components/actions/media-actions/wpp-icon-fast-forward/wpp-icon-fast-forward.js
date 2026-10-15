import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconFastForward {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-fast-forward", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M12.9028 3.85156C12.5486 3.38603 11.7782 3.609 11.7778 4.25684V15.7432C11.7782 16.3916 12.549 16.6141 12.9028 16.1475L17.2651 10.3945C17.4456 10.1565 17.445 9.82167 17.2642 9.58398L12.9028 3.85156ZM5.7251 3.85156C5.37084 3.38603 4.60048 3.609 4.6001 4.25684V15.7432C4.60047 16.3916 5.37227 16.6141 5.72607 16.1475L10.0884 10.3945C10.2687 10.1565 10.2681 9.82161 10.0874 9.58398L5.7251 3.85156Z", stroke: "currentColor", "stroke-width": "1.2" })));
  }
  static get is() { return "wpp-icon-fast-forward"; }
  static get registryIs() { return "wpp-icon-fast-forward-v4-5-0"; }
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
