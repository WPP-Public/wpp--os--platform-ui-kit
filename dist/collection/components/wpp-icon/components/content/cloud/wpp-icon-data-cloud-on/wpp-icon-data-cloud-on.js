import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconDataCloudOn {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-data-cloud-on", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M5.35314 7.89744C5.74233 5.67611 7.6817 4 10 4C12.3183 4 14.2577 5.67611 14.6469 7.89744L14.7179 7.89744C16.5306 7.89744 18 9.36686 18 11.1795C18 12.9921 16.5306 14.4615 14.7179 14.4615H5.28205C3.46942 14.4615 2 12.9921 2 11.1795C2 9.36686 3.46942 7.89744 5.28207 7.89744L5.35314 7.89744ZM10 5.23077C8.1391 5.23077 6.60824 6.69231 6.51711 8.5431C6.50098 8.87082 6.23057 9.12824 5.90245 9.12823L5.28205 9.12821C4.14916 9.12821 3.23077 10.0466 3.23077 11.1795C3.23077 12.3124 4.14916 13.2308 5.28205 13.2308H14.7179C15.8508 13.2308 16.7692 12.3124 16.7692 11.1795C16.7692 10.0466 15.8508 9.12821 14.718 9.12821L14.0975 9.12823C13.7694 9.12824 13.499 8.87082 13.4829 8.5431C13.3918 6.69231 11.8609 5.23077 10 5.23077Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-data-cloud-on"; }
  static get registryIs() { return "wpp-icon-data-cloud-on-v2-22-0"; }
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
