import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconRemoveCircle {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-remove-circle", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.04163 10.0001C3.04163 6.1571 6.15698 3.04175 9.99996 3.04175C13.8429 3.04175 16.9583 6.1571 16.9583 10.0001C16.9583 13.8431 13.8429 16.9584 9.99996 16.9584C6.15698 16.9584 3.04163 13.8431 3.04163 10.0001ZM9.99996 1.54175C5.32855 1.54175 1.54163 5.32867 1.54163 10.0001C1.54163 14.6715 5.32855 18.4584 9.99996 18.4584C14.6714 18.4584 18.4583 14.6715 18.4583 10.0001C18.4583 5.32867 14.6714 1.54175 9.99996 1.54175ZM6.45837 9.25C6.04416 9.25 5.70837 9.58579 5.70837 10C5.70837 10.4142 6.04416 10.75 6.45837 10.75H13.5417C13.9559 10.75 14.2917 10.4142 14.2917 10C14.2917 9.58579 13.9559 9.25 13.5417 9.25H6.45837Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-remove-circle"; }
  static get registryIs() { return "wpp-icon-remove-circle-v3-6-0"; }
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
