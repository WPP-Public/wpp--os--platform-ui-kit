import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconCodeView {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-code-view", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M12.9365 4.052C13.1033 3.67286 12.9312 3.23028 12.5521 3.06346C12.1729 2.89664 11.7303 3.06875 11.5635 3.44789L6.06352 15.9479C5.8967 16.327 6.06882 16.7696 6.44795 16.9364C6.82709 17.1033 7.26967 16.9311 7.43649 16.552L12.9365 4.052ZM14.2927 13.8444C13.9644 13.5919 13.903 13.121 14.1555 12.7927L16.3038 9.99996L14.1555 7.20725C13.903 6.87893 13.9644 6.40805 14.2927 6.15549C14.621 5.90294 15.0919 5.96436 15.3445 6.29268L17.8445 9.54268C18.0518 9.81227 18.0518 10.1877 17.8445 10.4572L15.3445 13.7072C15.0919 14.0356 14.621 14.097 14.2927 13.8444ZM5.70728 6.15557C6.0356 6.40812 6.09702 6.879 5.84447 7.20732L3.69622 10L5.84447 12.7928C6.09702 13.1211 6.0356 13.592 5.70728 13.8445C5.37897 14.0971 4.90808 14.0356 4.65553 13.7073L2.15553 10.4573C1.94816 10.1877 1.94816 9.81234 2.15553 9.54275L4.65553 6.29275C4.90808 5.96444 5.37897 5.90302 5.70728 6.15557Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-code-view"; }
  static get registryIs() { return "wpp-icon-code-view-v3-3-0"; }
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
