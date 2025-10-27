import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconPremium {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-premium", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M5.50001 2.75C5.22649 2.75 4.97466 2.8989 4.84284 3.13856L2.09284 8.13856C1.94446 8.40835 1.97604 8.74142 2.17249 8.97851L9.42249 17.7285C9.56498 17.9005 9.77668 18 10 18C10.2233 18 10.435 17.9005 10.5775 17.7285L17.8275 8.97851C18.024 8.74142 18.0556 8.40835 17.9072 8.13856L15.1572 3.13856C15.0254 2.8989 14.7735 2.75 14.5 2.75H5.50001ZM4.15596 7.5L5.94346 4.25H7.44287L6.30537 7.5H4.15596ZM6.14357 9L8.07254 13.7482L4.13829 9H6.14357ZM9.9893 14.481L7.76262 9H12.1485L9.9893 14.481ZM7.89459 7.5L9.03209 4.25H10.9771L12.1745 7.5H7.89459ZM13.773 7.5L12.5756 4.25H14.0566L15.8441 7.5H13.773ZM13.7607 9H15.8617L11.8564 13.834L13.7607 9Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-premium"; }
  static get registryIs() { return "wpp-icon-premium-v3-3-0"; }
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
