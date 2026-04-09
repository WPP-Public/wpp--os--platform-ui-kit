import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconShieldError {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-shield-error", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10.36 2.12C12.3937 3.64522 14.4693 4.4 16.6 4.4C16.9314 4.4 17.2 4.66863 17.2 5V9.2C17.2 13.201 14.834 16.1406 10.22 17.9582C10.0786 18.0139 9.92146 18.0139 9.78013 17.9582C5.1661 16.1406 2.80005 13.201 2.80005 9.2V5C2.80005 4.66863 3.06868 4.4 3.40005 4.4C5.53078 4.4 7.60642 3.64522 9.64005 2.12C9.85338 1.96 10.1467 1.96 10.36 2.12ZM10 3.34225C8.06472 4.71063 6.06193 5.46068 4.00005 5.58234V9.2C4.00005 12.6045 5.96274 15.1031 10 16.7535C14.0374 15.1031 16 12.6045 16 9.2V5.58234C13.9382 5.46068 11.9354 4.71063 10 3.34225ZM10 13.2C10.3314 13.2 10.6 13.4686 10.6 13.8C10.6 14.1314 10.3314 14.4 10 14.4C9.66868 14.4 9.40005 14.1314 9.40005 13.8C9.40005 13.4686 9.66868 13.2 10 13.2ZM10 6.00285C10.3038 6.00285 10.5548 6.22857 10.5946 6.52143L10.6 6.60285V11.8018C10.6 12.1332 10.3314 12.4018 10 12.4018C9.69629 12.4018 9.44526 12.1761 9.40553 11.8832L9.40005 11.8018V6.60285C9.40005 6.27148 9.66868 6.00285 10 6.00285Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-shield-error"; }
  static get registryIs() { return "wpp-icon-shield-error-v4-0-0"; }
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
