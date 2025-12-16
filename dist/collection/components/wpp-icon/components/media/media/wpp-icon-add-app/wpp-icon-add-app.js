import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconAddApp {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-add-app", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M8.92105 2.78947C9.90208 2.78947 10.6974 3.58476 10.6974 4.56579V9.30263H15.4342C16.4152 9.30263 17.2105 10.0979 17.2105 11.0789V15.2237C17.2105 16.2047 16.4152 17 15.4342 17H4.77632C3.79528 17 3 16.2047 3 15.2237V4.56579C3 3.58476 3.79528 2.78947 4.77632 2.78947H8.92105ZM9.51316 10.4868H4.18421V15.2237C4.18421 15.5507 4.44931 15.8158 4.77632 15.8158H9.51237L9.51316 10.4868ZM15.4342 10.4868H10.6966V15.8158H15.4342C15.7612 15.8158 16.0263 15.5507 16.0263 15.2237V11.0789C16.0263 10.7519 15.7612 10.4868 15.4342 10.4868ZM8.92105 3.97368H4.77632C4.44931 3.97368 4.18421 4.23878 4.18421 4.56579V9.30263H9.51316V4.56579C9.51316 4.23878 9.24806 3.97368 8.92105 3.97368ZM14.7618 2.00541L14.8421 2C15.1419 2 15.3896 2.22275 15.4288 2.51176L15.4342 2.59211V4.56579H17.4079C17.7077 4.56579 17.9554 4.78854 17.9946 5.07755L18 5.15789C18 5.45765 17.7772 5.70539 17.4882 5.7446L17.4079 5.75H15.4342V7.72368C15.4342 8.02344 15.2115 8.27118 14.9225 8.31038L14.8421 8.31579C14.5423 8.31579 14.2946 8.09304 14.2554 7.80403L14.25 7.72368V5.75H12.2763C11.9766 5.75 11.7288 5.52725 11.6896 5.23824L11.6842 5.15789C11.6842 4.85813 11.907 4.6104 12.196 4.57119L12.2763 4.56579H14.25V2.59211C14.25 2.29235 14.4728 2.04461 14.7618 2.00541Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-add-app"; }
  static get registryIs() { return "wpp-icon-add-app-v3-4-0"; }
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
