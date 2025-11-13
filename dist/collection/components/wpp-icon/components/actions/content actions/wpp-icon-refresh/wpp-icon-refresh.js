import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconRefresh {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-refresh", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10 3.875C6.61713 3.875 3.875 6.61713 3.875 10C3.875 13.3829 6.61713 16.125 10 16.125C13.3829 16.125 16.125 13.3829 16.125 10C16.125 9.69391 16.0948 9.38728 16.0465 9.07176C15.9839 8.66231 16.265 8.27961 16.6745 8.21696C17.0839 8.15431 17.4666 8.43545 17.5293 8.8449C17.5852 9.21022 17.625 9.59609 17.625 10C17.625 14.2113 14.2113 17.625 10 17.625C5.7887 17.625 2.375 14.2113 2.375 10C2.375 5.7887 5.7887 2.375 10 2.375C12.4443 2.375 14.6146 3.52847 16.0078 5.31305L16.008 5.3133L16.2164 5.58038C16.4711 5.90698 16.4129 6.37827 16.0863 6.63303C15.7597 6.8878 15.2884 6.82956 15.0336 6.50295L14.8255 6.23612C14.8254 6.23603 14.8254 6.23595 14.8253 6.23587C13.7027 4.79809 11.9606 3.875 10 3.875Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M15.625 2.375C16.0393 2.375 16.375 2.71079 16.375 3.125V6.04167C16.375 6.45588 16.0393 6.79167 15.625 6.79167H12.7084C12.2942 6.79167 11.9584 6.45588 11.9584 6.04167C11.9584 5.62745 12.2942 5.29167 12.7084 5.29167H14.875V3.125C14.875 2.71079 15.2108 2.375 15.625 2.375Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-refresh"; }
  static get registryIs() { return "wpp-icon-refresh-v3-3-1"; }
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
