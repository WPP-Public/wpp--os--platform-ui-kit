import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconSmile {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-smile", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2ZM10 3.19981C6.24436 3.19981 3.19981 6.24436 3.19981 10C3.19981 13.7556 6.24436 16.8002 10 16.8002C13.7556 16.8002 16.8002 13.7556 16.8002 10C16.8002 6.24436 13.7556 3.19981 10 3.19981ZM7.16983 12.2263C7.84903 13.0884 8.88169 13.6007 9.99999 13.6007C11.1168 13.6007 12.1482 13.0897 12.8275 12.2296C13.0329 11.9696 13.4101 11.9253 13.6701 12.1307C13.9301 12.336 13.9744 12.7133 13.7691 12.9733C12.8646 14.1185 11.4879 14.8005 9.99999 14.8005C8.51011 14.8005 7.13174 14.1166 6.2274 12.9689C6.02235 12.7086 6.0671 12.3314 6.32734 12.1264C6.58759 11.9213 6.96478 11.9661 7.16983 12.2263ZM7.60073 7.40092C8.15262 7.40092 8.60001 7.84831 8.60001 8.40019C8.60001 8.95208 8.15262 9.39947 7.60073 9.39947C7.04885 9.39947 6.60145 8.95208 6.60145 8.40019C6.60145 7.84831 7.04885 7.40092 7.60073 7.40092ZM12.4 7.40092C12.9519 7.40092 13.3993 7.84831 13.3993 8.40019C13.3993 8.95208 12.9519 9.39947 12.4 9.39947C11.8481 9.39947 11.4007 8.95208 11.4007 8.40019C11.4007 7.84831 11.8481 7.40092 12.4 7.40092Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-smile"; }
  static get registryIs() { return "wpp-icon-smile-v2-22-0"; }
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
