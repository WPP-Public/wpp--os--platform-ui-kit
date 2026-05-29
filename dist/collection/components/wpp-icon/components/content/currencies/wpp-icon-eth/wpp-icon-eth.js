import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconEth {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-eth", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M9.395 1.55699L3.41075 9.53599C3.37991 9.57525 3.35255 9.6182 3.32934 9.6646C3.19496 9.93337 3.2371 10.2443 3.41182 10.4654L9.39503 18.4431C9.405 18.4566 9.41542 18.4699 9.42626 18.4828C9.45559 18.5176 9.48804 18.5497 9.52317 18.5787C9.65282 18.6857 9.81903 18.75 10.0002 18.75C10.1904 18.75 10.3641 18.6792 10.4963 18.5626C10.5368 18.5268 10.5734 18.4867 10.6055 18.4431L16.5923 10.4606C16.6117 10.4356 16.6294 10.4095 16.6455 10.3824C16.7525 10.202 16.7775 9.98729 16.7205 9.79084C16.6995 9.71848 16.6674 9.64861 16.6242 9.58383C16.6146 9.56939 16.6045 9.55537 16.5941 9.54179L10.6055 1.55699C10.5893 1.53493 10.572 1.51378 10.5535 1.49365C10.5356 1.4741 10.5168 1.4556 10.4971 1.4382C10.3648 1.32109 10.1908 1.25 10.0002 1.25C9.80966 1.25 9.63567 1.32109 9.50336 1.4382C9.48368 1.4556 9.46485 1.4741 9.44697 1.49365C9.42853 1.51378 9.41118 1.53493 9.395 1.55699ZM14.861 9.73105L10.7502 4.25V11.7864L14.861 9.73105ZM13.494 12.0916L10.7502 13.4635V15.75L13.494 12.0916ZM9.25024 15.75V13.4636L6.50654 12.0917L9.25024 15.75ZM5.13941 9.73111L9.25024 11.7865V4.25L5.13941 9.73111Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-eth"; }
  static get registryIs() { return "wpp-icon-eth-v4-1-0"; }
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
