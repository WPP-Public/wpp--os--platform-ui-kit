import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconBluetoothOn {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-bluetooth-on", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M9.59541 10.8656L11.9803 12.8547L9.42351 15.6258V11.0089L9.59541 10.8656ZM10.637 9.99779L13.3726 7.71857C13.6657 7.47433 13.6945 7.03437 13.4357 6.75399L9.24667 2.21587C8.83496 1.76984 8.08989 2.06115 8.08989 2.66815V7.87338L7.09392 7.0427C6.81111 6.80682 6.39063 6.84487 6.15475 7.12768C5.91887 7.41049 5.95692 7.83097 6.23973 8.06685L8.08989 9.60997V10.3841L6.23999 11.9254C5.95706 12.1612 5.9188 12.5816 6.15453 12.8646C6.39026 13.1475 6.81073 13.1858 7.09366 12.95L8.08989 12.12V17.3318C8.08989 17.9389 8.83511 18.2302 9.24677 17.784L13.4358 13.2438C13.6944 12.9635 13.6657 12.5239 13.3728 12.2796L10.637 9.99779ZM9.59585 9.12942L9.42351 8.98567V4.37361L11.9799 7.14306L9.59585 9.12942Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-bluetooth-on"; }
  static get registryIs() { return "wpp-icon-bluetooth-on-v4-0-0"; }
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
