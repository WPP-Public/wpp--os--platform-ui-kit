import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconHash {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-hash", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M8.98913 2.87737C9.0594 2.46916 8.78545 2.08127 8.37724 2.01099C7.96904 1.94072 7.58115 2.21467 7.51087 2.62288L6.84293 6.50274L3.74965 6.50418C3.33544 6.50437 2.99981 6.84032 3 7.25453C3.00019 7.66874 3.33614 8.00437 3.75035 8.00418L6.58467 8.00286L5.89677 11.9987L2.74965 12.0001C2.33544 12.0003 1.99981 12.3363 2 12.7505C2.00019 13.1647 2.33614 13.5003 2.75035 13.5001L5.63851 13.4988L5.0146 17.1229C4.94432 17.5311 5.21827 17.919 5.62648 17.9892C6.03469 18.0595 6.42257 17.7856 6.49285 17.3774L7.1607 13.4981L11.638 13.496L11.0133 17.1229C10.943 17.5311 11.2169 17.919 11.6251 17.9893C12.0333 18.0596 12.4212 17.7857 12.4916 17.3775L13.1602 13.4953L16.2539 13.4938C16.6681 13.4936 17.0037 13.1577 17.0036 12.7435C17.0034 12.3292 16.6674 11.9936 16.2532 11.9938L13.4186 11.9951L14.1069 7.99934L17.2503 7.99787C17.6646 7.99768 18.0002 7.66174 18 7.24752C17.9998 6.83331 17.6639 6.49768 17.2496 6.49787L14.3653 6.49922L14.9891 2.87749C15.0594 2.46929 14.7855 2.08138 14.3773 2.01107C13.9691 1.94076 13.5812 2.21467 13.5109 2.62287L12.8431 6.49993L8.36512 6.50202L8.98913 2.87737ZM8.10686 8.00215L12.5847 8.00005L11.8964 11.9958L7.41896 11.9979L8.10686 8.00215Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-hash"; }
  static get registryIs() { return "wpp-icon-hash-v2-22-0"; }
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
