import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconUserSearch {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-user-search", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M8.92865 11.5969L15.205 11.5979C16.1993 11.5979 17.0053 12.404 17.0053 13.3983V14.1225C17.0053 14.9976 16.6233 15.829 15.9593 16.3991C14.7067 17.4744 12.9141 18 10.6017 18L10.4584 17.9991C10.6454 17.6225 10.6524 17.1794 10.4795 16.7979L10.6017 16.7998C12.6501 16.7998 14.1686 16.3546 15.1775 15.4884C15.5759 15.1464 15.8051 14.6475 15.8051 14.1225V13.3983C15.8051 13.0668 15.5364 12.7982 15.205 12.7982L8.98341 12.7982C8.99537 12.6659 9.00142 12.5325 9.00142 12.3981C9.00142 12.1245 8.97645 11.8567 8.92865 11.5969ZM4.60064 8.79751C6.58922 8.79751 8.20128 10.4096 8.20128 12.3981C8.20128 13.2733 7.88902 14.0756 7.36984 14.6996L9.62773 16.9514C9.86237 17.1855 9.86282 17.5655 9.62874 17.8001C9.41595 18.0134 9.08258 18.0332 8.84744 17.8592L8.78007 17.8011L6.45717 15.4839C5.91506 15.8107 5.27981 15.9988 4.60064 15.9988C2.61206 15.9988 1 14.3867 1 12.3981C1 10.4096 2.61206 8.79751 4.60064 8.79751ZM4.60064 9.99772C3.27492 9.99772 2.20021 11.0724 2.20021 12.3981C2.20021 13.7239 3.27492 14.7986 4.60064 14.7986C5.92636 14.7986 7.00107 13.7239 7.00107 12.3981C7.00107 11.0724 5.92636 9.99772 4.60064 9.99772ZM10.6017 2C12.8112 2 14.6024 3.79118 14.6024 6.00071C14.6024 8.21024 12.8112 10.0014 10.6017 10.0014C8.39217 10.0014 6.601 8.21024 6.601 6.00071C6.601 3.79118 8.39217 2 10.6017 2ZM10.6017 3.20021C9.05503 3.20021 7.80121 4.45404 7.80121 6.00071C7.80121 7.54738 9.05503 8.80121 10.6017 8.80121C12.1484 8.80121 13.4022 7.54738 13.4022 6.00071C13.4022 4.45404 12.1484 3.20021 10.6017 3.20021Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-user-search"; }
  static get registryIs() { return "wpp-icon-user-search-v4-0-0"; }
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
