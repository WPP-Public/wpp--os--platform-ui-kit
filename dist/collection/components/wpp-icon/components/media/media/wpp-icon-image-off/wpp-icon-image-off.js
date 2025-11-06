import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconImageOff {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-image-off", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M3.02426 2.17574C2.78995 1.94142 2.41005 1.94142 2.17574 2.17573C1.94142 2.41004 1.94142 2.78994 2.17573 3.02425L3.1866 4.03515C2.94146 4.43185 2.79999 4.89939 2.79999 5.39998V14.5999C2.79999 16.0358 3.96404 17.1999 5.39997 17.1999H14.5999C15.1004 17.1999 15.5679 17.0585 15.9646 16.8134L16.9754 17.8243C17.2098 18.0586 17.5896 18.0586 17.824 17.8243C18.0583 17.59 18.0583 17.2101 17.824 16.9757L3.02426 2.17574ZM10.0544 10.9031L15.019 15.8678C15.0343 15.8857 15.0494 15.9034 15.0643 15.921C14.919 15.9721 14.7627 15.9999 14.5999 15.9999H5.39997C5.23688 15.9999 5.0803 15.972 4.93474 15.9207L9.58011 11.3718L10.0544 10.9031ZM9.29506 10.1437C9.09423 10.2291 8.90572 10.3526 8.74058 10.5143L4.0826 15.0748C4.02913 14.9265 3.99998 14.7666 3.99998 14.5999V5.39998C3.99998 5.23494 4.02854 5.07657 4.08099 4.92955L9.29506 10.1437ZM15.9999 13.4546V5.39998C15.9999 4.62679 15.3731 3.99999 14.5999 3.99999H6.54552L5.3461 2.80055C5.36401 2.80018 5.38197 2.8 5.39997 2.8H14.5999C16.0358 2.8 17.1999 3.96405 17.1999 5.39998V14.5999C17.1999 14.618 17.1997 14.636 17.1993 14.654L15.9999 13.4546ZM12.6016 5.59998C13.5967 5.59998 14.4033 6.40662 14.4033 7.40166C14.4033 8.3967 13.5967 9.20334 12.6016 9.20334C11.6066 9.20334 10.7999 8.3967 10.7999 7.40166C10.7999 6.40662 11.6066 5.59998 12.6016 5.59998ZM12.6016 6.79997C12.2693 6.79997 11.9999 7.06936 11.9999 7.40166C11.9999 7.73396 12.2693 8.00335 12.6016 8.00335C12.9339 8.00335 13.2033 7.73396 13.2033 7.40166C13.2033 7.06936 12.9339 6.79997 12.6016 6.79997Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-image-off"; }
  static get registryIs() { return "wpp-icon-image-off-v2-22-0"; }
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
