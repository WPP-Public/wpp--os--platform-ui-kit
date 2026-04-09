import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconBorderAll {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-border-all", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M6.25 4.5C5.2835 4.5 4.5 5.2835 4.5 6.25V9.25H9.25V4.5H6.25ZM10.75 4.5V9.25H15.5V6.25C15.5 5.2835 14.7165 4.5 13.75 4.5H10.75ZM15.5 10.75H10.75V15.5H13.75C14.7165 15.5 15.5 14.7165 15.5 13.75V10.75ZM9.25 15.5V10.75H4.5V13.75C4.5 14.7165 5.2835 15.5 6.25 15.5H9.25ZM3 6.25C3 4.45507 4.45507 3 6.25 3H13.75C15.5449 3 17 4.45507 17 6.25V13.75C17 15.5449 15.5449 17 13.75 17H6.25C4.45507 17 3 15.5449 3 13.75V6.25Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-border-all"; }
  static get registryIs() { return "wpp-icon-border-all-v4-0-0"; }
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
