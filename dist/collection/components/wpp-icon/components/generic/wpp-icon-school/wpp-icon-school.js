import { h } from '@stencil/core';
import { WppIcon } from '../../../WppIcon';
export class WppIconSchool {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-school", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M9.44098 4.38197C9.79289 4.20601 10.2071 4.20601 10.559 4.38197L12.5389 5.37192C12.5546 5.37847 12.5702 5.3856 12.5856 5.39331L16.5856 7.39331C16.8397 7.52036 17.0002 7.78005 17.0002 8.06413V8.52L18.3006 7.95105C18.5672 7.83441 18.7423 7.57406 18.7498 7.28314C18.7572 6.99223 18.5957 6.72326 18.3354 6.59311L11.2298 3.04033C10.4556 2.65323 9.54436 2.65322 8.77016 3.04033L1.66459 6.59311C1.4043 6.72326 1.24279 6.99223 1.25025 7.28314C1.2577 7.57406 1.43277 7.83441 1.69939 7.95105L4.25 9.06694V14.7639C4.25 14.9262 4.30263 15.0841 4.4 15.2139C5.04297 16.0712 6.96616 17.5139 10 17.5139C11.1969 17.5139 12.221 17.2894 13.0618 16.9648C12.7017 16.607 12.4402 16.1503 12.3213 15.6388C11.686 15.8594 10.9117 16.0139 10 16.0139C7.70406 16.0139 6.28012 15.0341 5.75 14.4869V9.72319L8.89775 11.1003C9.60043 11.4078 10.3996 11.4078 11.1023 11.1003L14.2499 9.72323V14.0139C13.9464 14.2419 13.75 14.605 13.75 15.0139C13.75 15.0571 13.7522 15.0997 13.7565 15.1417C13.8048 15.618 14.1206 16.0153 14.5513 16.181C14.6906 16.2345 14.8419 16.2639 15 16.2639C15.6904 16.2639 16.25 15.7043 16.25 15.0139C16.25 14.6049 16.0536 14.2418 15.7499 14.0138V8.76395C15.7499 8.47988 15.5894 8.22018 15.3353 8.09313L11.3353 6.09313C10.9648 5.90789 10.5143 6.05806 10.3291 6.42854C10.1439 6.79903 10.294 7.24953 10.6645 7.43477L13.0323 8.61867L10.501 9.7261C10.1816 9.86584 9.81838 9.86584 9.49898 9.7261L3.76764 7.21864L9.44098 4.38197Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-school"; }
  static get registryIs() { return "wpp-icon-school-v3-3-1"; }
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
