import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconIndentDecrease {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-indent-decrease", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M7.83322 13.3333H14.9166C15.129 13.3336 15.3332 13.4149 15.4877 13.5607C15.6421 13.7065 15.7351 13.9058 15.7475 14.1178C15.76 14.3299 15.691 14.5386 15.5547 14.7015C15.4183 14.8644 15.225 14.9691 15.0141 14.9942L14.9166 15H7.83322C7.62082 14.9998 7.41652 14.9184 7.26208 14.7726C7.10763 14.6268 7.01469 14.4275 7.00224 14.2155C6.98979 14.0035 7.05878 13.7947 7.1951 13.6318C7.33143 13.4689 7.5248 13.3643 7.73572 13.3392L7.83322 13.3333ZM2.24405 9.41083L3.91072 7.74417C4.06068 7.59471 4.26191 7.50794 4.47354 7.50148C4.68516 7.49501 4.89131 7.56935 5.05012 7.70937C5.20892 7.8494 5.30847 8.04463 5.32855 8.25539C5.34863 8.46616 5.28773 8.67667 5.15822 8.84417L5.08905 8.9225L4.01155 10L5.08905 11.0775C5.23851 11.2275 5.32528 11.4287 5.33174 11.6403C5.3382 11.8519 5.26387 12.0581 5.12384 12.2169C4.98382 12.3757 4.78859 12.4753 4.57782 12.4953C4.36705 12.5154 4.15654 12.4545 3.98905 12.325L3.91072 12.2558L2.24405 10.5892C2.10057 10.4457 2.01438 10.2548 2.00164 10.0522C1.98891 9.84971 2.05051 9.6495 2.17488 9.48917L2.24405 9.41083ZM7.83322 9.16667L17.4166 9.16583C17.629 9.16607 17.8332 9.2474 17.9877 9.39321C18.1421 9.53901 18.2351 9.73829 18.2475 9.95033C18.26 10.1624 18.191 10.3711 18.0547 10.534C17.9183 10.6969 17.725 10.8016 17.5141 10.8267L17.4166 10.8333H7.83322C7.62082 10.8331 7.41652 10.7518 7.26208 10.606C7.10763 10.4602 7.01469 10.2609 7.00224 10.0488C6.98979 9.8368 7.05878 9.62802 7.1951 9.46514C7.33143 9.30226 7.5248 9.19759 7.73572 9.1725L7.83322 9.16667ZM7.83322 5H14.9166C15.129 5.00024 15.3332 5.08157 15.4877 5.22737C15.6421 5.37318 15.7351 5.57246 15.7475 5.7845C15.76 5.99653 15.691 6.20532 15.5547 6.36819C15.4183 6.53107 15.225 6.63575 15.0141 6.66083L14.9166 6.66667H7.83322C7.62082 6.66643 7.41652 6.5851 7.26208 6.43929C7.10763 6.29349 7.01469 6.09421 7.00224 5.88217C6.98979 5.67014 7.05878 5.46135 7.1951 5.29847C7.33143 5.1356 7.5248 5.03092 7.73572 5.00583L7.83322 5Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-indent-decrease"; }
  static get registryIs() { return "wpp-icon-indent-decrease-v4-0-0"; }
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
