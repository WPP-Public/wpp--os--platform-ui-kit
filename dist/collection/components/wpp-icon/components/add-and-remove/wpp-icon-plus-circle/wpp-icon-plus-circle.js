import { h } from '@stencil/core';
import { WppIcon } from '../../../WppIcon';
export class WppIconPlusCircle {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-plus-circle", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10.0001 3.04169C6.1571 3.04169 3.04175 6.15704 3.04175 10C3.04175 13.843 6.1571 16.9584 10.0001 16.9584C13.8431 16.9584 16.9584 13.843 16.9584 10C16.9584 6.15704 13.8431 3.04169 10.0001 3.04169ZM1.54175 10C1.54175 5.32861 5.32867 1.54169 10.0001 1.54169C14.6715 1.54169 18.4584 5.32861 18.4584 10C18.4584 14.6714 14.6715 18.4584 10.0001 18.4584C5.32867 18.4584 1.54175 14.6714 1.54175 10ZM10 5.70831C10.4142 5.70831 10.75 6.0441 10.75 6.45831V9.25H13.5416C13.9558 9.25 14.2916 9.58579 14.2916 10C14.2916 10.4142 13.9558 10.75 13.5416 10.75H10.75V13.5416C10.75 13.9559 10.4142 14.2916 10 14.2916C9.58579 14.2916 9.25 13.9559 9.25 13.5416V10.75H6.45825C6.04404 10.75 5.70825 10.4142 5.70825 10C5.70825 9.58579 6.04404 9.25 6.45825 9.25H9.25V6.45831C9.25 6.0441 9.58579 5.70831 10 5.70831Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-plus-circle"; }
  static get registryIs() { return "wpp-icon-plus-circle-v3-5-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["../../../wpp-icon.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["../../../wpp-icon.css"]
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
