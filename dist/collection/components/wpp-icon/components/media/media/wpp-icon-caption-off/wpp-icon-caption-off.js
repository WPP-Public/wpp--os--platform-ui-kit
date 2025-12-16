import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconCaptionOff {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-caption-off", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M3.02427 2.17574C2.78996 1.94142 2.41006 1.94142 2.17574 2.17573C1.94142 2.41004 1.94142 2.78994 2.17573 3.02425L3.17584 4.02437C2.46768 4.48888 2 5.28981 2 6.19998V13.8036C2 15.2395 3.16406 16.4036 4.6 16.4036H15.4C15.4505 16.4036 15.5008 16.4021 15.5506 16.3993L16.9756 17.8243C17.2099 18.0586 17.5898 18.0586 17.8241 17.8243C18.0584 17.59 18.0584 17.2101 17.8241 16.9757L3.02427 2.17574ZM14.3549 15.2036H4.6C3.8268 15.2036 3.2 14.5768 3.2 13.8036V6.19998C3.2 5.61835 3.55469 5.11956 4.05956 4.90811L6.32149 7.17006C5.4343 7.63364 4.8 8.63961 4.8 9.99995C4.8 12.5146 6.97231 13.8197 8.89664 12.7252C9.18468 12.5613 9.28537 12.195 9.12154 11.907C8.95771 11.619 8.5914 11.5183 8.30336 11.6821C7.18729 12.3169 6 11.6036 6 9.99995C6 8.90406 6.55216 8.22472 7.25837 8.10695L14.3549 15.2036ZM16.7436 14.1982C16.7803 14.073 16.8 13.9406 16.8 13.8036V6.19998C16.8 5.42678 16.1732 4.79999 15.4 4.79999H7.34554L6.14556 3.6H15.4C16.8359 3.6 18 4.76405 18 6.19998V13.8036C18 14.278 17.8729 14.7227 17.651 15.1056L16.7436 14.1982ZM12.0425 9.49696L11.0846 8.53909C11.735 7.02916 13.3907 6.41939 14.8973 7.2788C15.1851 7.44299 15.2854 7.80943 15.1212 8.09726C14.957 8.38509 14.5905 8.48532 14.3027 8.32113C13.3092 7.75442 12.2633 8.25292 12.0425 9.49696Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-caption-off"; }
  static get registryIs() { return "wpp-icon-caption-off-v3-4-0"; }
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
