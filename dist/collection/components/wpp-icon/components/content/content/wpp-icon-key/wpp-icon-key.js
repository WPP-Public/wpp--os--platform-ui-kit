import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconKey {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-key", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M12.5714 1.75C9.43536 1.75 6.89286 4.2925 6.89286 7.42857C6.89286 7.80125 6.93119 8.16262 7.00011 8.51065L1.96967 13.5411C1.82902 13.6818 1.75 13.8725 1.75 14.0714V17.5C1.75 17.9142 2.08579 18.25 2.5 18.25H5.92857C6.34279 18.25 6.67857 17.9142 6.67857 17.5V16.5357H8.07143C8.48564 16.5357 8.82143 16.1999 8.82143 15.7857V14.3929H10.2143C10.6285 14.3929 10.9643 14.0571 10.9643 13.6429V12.8761C11.4743 13.0265 12.0138 13.1071 12.5714 13.1071C15.7075 13.1071 18.25 10.5646 18.25 7.42857C18.25 4.2925 15.7075 1.75 12.5714 1.75ZM8.39286 7.42857C8.39286 5.12093 10.2638 3.25 12.5714 3.25C14.8791 3.25 16.75 5.12093 16.75 7.42857C16.75 9.73622 14.8791 11.6071 12.5714 11.6071C11.8465 11.6071 11.1665 11.4229 10.5737 11.0993C10.3413 10.9724 10.0592 10.9775 9.83155 11.1126C9.60387 11.2477 9.46429 11.4928 9.46429 11.7576V12.8929H8.07143C7.65722 12.8929 7.32143 13.2286 7.32143 13.6429V15.0357H5.92857C5.51436 15.0357 5.17857 15.3715 5.17857 15.7857V16.75H3.25V14.3821L8.35662 9.27547C8.54783 9.08426 8.6213 8.80492 8.54891 8.54437C8.44884 8.18419 8.39286 7.81163 8.39286 7.42857ZM14 7C14 7.55228 13.5523 8 13 8C12.4477 8 12 7.55228 12 7C12 6.44772 12.4477 6 13 6C13.5523 6 14 6.44772 14 7Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-key"; }
  static get registryIs() { return "wpp-icon-key-v3-6-0"; }
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
