import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconFileZip {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-file-zip", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M7.99275 4.32188C7.69224 4.11303 7.33399 4 6.96554 4H3.8L3.67676 4.00415C2.74013 4.06748 2 4.84731 2 5.8V15L2.00415 15.1232C2.06748 16.0599 2.84731 16.8 3.8 16.8H16.2L16.3232 16.7958C17.2599 16.7325 18 15.9527 18 15V7.8L17.9958 7.67676L17.9828 7.55031C17.8613 6.67437 17.1094 6 16.2 6H10.0176L8.11787 4.4172L7.99275 4.32188ZM11.1974 7.2V8.99611C11.1974 9.32748 11.466 9.59611 11.7974 9.59611H12.3974V10.3981H12.1974C11.866 10.3981 11.5974 10.6667 11.5974 10.9981C11.5974 11.3295 11.866 11.5981 12.1974 11.5981H12.3974V12.7981H12.1974C11.866 12.7981 11.5974 13.0667 11.5974 13.3981C11.5974 13.7295 11.866 13.9981 12.1974 13.9981H12.3974V15.6H3.8L3.71858 15.5945C3.42572 15.5548 3.2 15.3038 3.2 15V9.1992L6.96554 9.2L7.12268 9.19313C7.48725 9.16119 7.83482 9.01867 8.11787 8.7828L10.0168 7.2H11.1974ZM13.5974 15.2003H13.7974C14.1287 15.2003 14.3974 14.9317 14.3974 14.6003C14.3974 14.269 14.1287 14.0003 13.7974 14.0003H13.5974V12.8003H13.7974C14.1287 12.8003 14.3974 12.5317 14.3974 12.2003C14.3974 11.869 14.1287 11.6003 13.7974 11.6003H13.5974V9.59611H14.1974C14.5287 9.59611 14.7974 9.32748 14.7974 8.99611V7.2H16.2L16.2814 7.20548C16.5743 7.24521 16.8 7.49624 16.8 7.8V15L16.7945 15.0814C16.7548 15.3743 16.5038 15.6 16.2 15.6H13.5974V15.2003ZM13.5974 7.2V8.39611L12.3974 8.39611V7.2H13.5974ZM3.8 5.2H6.96554L7.04904 5.20584C7.15915 5.22131 7.26339 5.26718 7.34965 5.33907L8.8624 6.5992L7.34965 7.86093L7.28177 7.9099C7.18728 7.96851 7.07783 8 6.96554 8L3.2 7.9992V5.8L3.20548 5.71858C3.24521 5.42572 3.49624 5.2 3.8 5.2Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-file-zip"; }
  static get registryIs() { return "wpp-icon-file-zip-v3-5-0"; }
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
