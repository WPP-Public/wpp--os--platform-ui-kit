import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconLink {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-link", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M11.6262 4.13519L9.2798 6.47693C8.98661 6.76954 8.51174 6.76906 8.21914 6.47588C7.92654 6.18269 7.92701 5.70782 8.2202 5.41522L10.5724 3.06768C11.4187 2.23512 12.5596 1.77069 13.7467 1.77552C14.9338 1.78035 16.071 2.25408 16.9104 3.0935C17.7498 3.93293 18.2235 5.07004 18.2284 6.25716C18.2332 7.44427 17.7688 8.58521 16.9362 9.43144L16.9315 9.43624L14.583 11.7808C14.2899 12.0734 13.815 12.073 13.5224 11.7799C13.2297 11.4867 13.2301 11.0119 13.5232 10.7192L15.8692 8.37717C16.4228 7.81324 16.7316 7.05361 16.7284 6.26327C16.7252 5.47186 16.4093 4.71378 15.8497 4.15416C15.2901 3.59455 14.532 3.27873 13.7406 3.27551C12.9501 3.27229 12.1902 3.58126 11.6262 4.13519Z", fill: "currentColor" }), h("path", { d: "M13.0303 6.96967C13.3232 7.26256 13.3232 7.73744 13.0303 8.03033L8.03033 13.0303C7.73744 13.3232 7.26256 13.3232 6.96967 13.0303C6.67678 12.7374 6.67678 12.2626 6.96967 11.9697L11.9697 6.96967C12.2626 6.67678 12.7374 6.67678 13.0303 6.96967Z", fill: "currentColor" }), h("path", { d: "M6.47684 9.2798C6.76944 8.98661 6.76897 8.51174 6.47578 8.21914C6.1826 7.92654 5.70772 7.92701 5.41512 8.2202L3.07136 10.5686L3.0676 10.5724C2.23504 11.4187 1.77059 12.5596 1.77543 13.7467C1.78026 14.9338 2.25399 16.071 3.09341 16.9104C3.93284 17.7498 5.06995 18.2235 6.25707 18.2284C7.44418 18.2332 8.58514 17.7688 9.43137 16.9362L11.7807 14.583C12.0733 14.2899 12.0729 13.815 11.7798 13.5224C11.4866 13.2297 11.0118 13.2301 10.7191 13.5232L8.37707 15.8692C7.81315 16.4228 7.05351 16.7316 6.26318 16.7284C5.47176 16.7252 4.71369 16.4093 4.15407 15.8497C3.59445 15.2901 3.27864 14.532 3.27542 13.7406C3.2722 12.9501 3.58117 12.1902 4.1351 11.6262L6.47684 9.2798Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-link"; }
  static get registryIs() { return "wpp-icon-link-v3-5-0"; }
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
