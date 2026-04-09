import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconMailAllRead {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-mail-all-read", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M9.30453 2.07147C9.12981 1.97618 8.91865 1.97618 8.74393 2.07147L2.64764 5.39672C2.2484 5.61449 2 6.03294 2 6.4877V12.9266C2 14.3275 3.13564 15.4631 4.53653 15.4631H13.5119C14.9128 15.4631 16.0485 14.3275 16.0485 12.9266V6.4877C16.0485 6.03294 15.8001 5.61449 15.4008 5.39672L9.30453 2.07147ZM9.02423 9.33305L3.45004 6.29259L9.02423 3.25212L14.5984 6.29259L9.02423 9.33305ZM9.30453 10.5137L14.8778 7.47375V12.9266C14.8778 13.6809 14.2663 14.2924 13.5119 14.2924H4.53653C3.7822 14.2924 3.17071 13.6809 3.17071 12.9266V7.47375L8.74393 10.5137C8.91865 10.609 9.12981 10.609 9.30453 10.5137ZM16.8297 6.49649C17.5335 6.94729 18 7.73617 18 8.634V13.3168C18 15.5798 16.1655 17.4143 13.9025 17.4143H6.8783C5.98047 17.4143 5.19159 16.9478 4.74079 16.244L13.9025 16.2436C15.5189 16.2436 16.8293 14.9332 16.8293 13.3168L16.8297 6.49649Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-mail-all-read"; }
  static get registryIs() { return "wpp-icon-mail-all-read-v4-0-0"; }
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
