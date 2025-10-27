import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconDiamond {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-diamond", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M2.52712 11.2726C1.82429 10.5698 1.82429 9.43024 2.52712 8.72741L8.72741 2.52712C9.43024 1.82429 10.5698 1.82429 11.2726 2.52712L17.4729 8.72741C18.1757 9.43024 18.1757 10.5698 17.4729 11.2726L11.2726 17.4729C10.5698 18.1757 9.43024 18.1757 8.72741 17.4729L2.52712 11.2726ZM3.37551 9.5758C3.14124 9.81008 3.14124 10.1899 3.37551 10.4242L9.5758 16.6245C9.81008 16.8588 10.1899 16.8588 10.4242 16.6245L16.6245 10.4242C16.8588 10.1899 16.8588 9.81008 16.6245 9.5758L10.4242 3.37551C10.1899 3.14124 9.81008 3.14124 9.5758 3.37551L3.37551 9.5758Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-diamond"; }
  static get registryIs() { return "wpp-icon-diamond-v3-3-0"; }
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
