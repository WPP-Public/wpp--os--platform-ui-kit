import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconCalendarDate {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-calendar-date", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M14.4722 3C15.8683 3 17 4.13172 17 5.52778V14.4722C17 15.8683 15.8683 17 14.4722 17H5.52778C4.13172 17 3 15.8683 3 14.4722V5.52778C3 4.13172 4.13172 3 5.52778 3H14.4722ZM15.8333 7.27778H4.16667V14.4722C4.16667 15.2239 4.77606 15.8333 5.52778 15.8333H14.4722C15.2239 15.8333 15.8333 15.2239 15.8333 14.4722V7.27778ZM11.5518 8.59635C12.0708 8.59635 12.4822 8.73434 12.786 9.01031C13.0898 9.28628 13.2418 9.65972 13.2418 10.1306C13.2418 10.4015 13.1721 10.6427 13.0329 10.8541C12.8936 11.0655 12.7037 11.232 12.4632 11.3535C12.7518 11.4877 12.974 11.6713 13.1297 11.9042C13.2854 12.1371 13.3633 12.4004 13.3633 12.6941C13.3633 13.1802 13.1987 13.5657 12.8696 13.8505C12.5404 14.1354 12.1024 14.2778 11.5556 14.2778C11.0061 14.2778 10.5662 14.1347 10.2358 13.8486C9.90543 13.5625 9.74023 13.1777 9.74023 12.6941C9.74023 12.3979 9.81872 12.1321 9.97569 11.8966C10.1327 11.6611 10.3529 11.4801 10.6365 11.3535C10.3985 11.232 10.2105 11.0655 10.0725 10.8541C9.93455 10.6427 9.86556 10.4015 9.86556 10.1306C9.86556 9.65972 10.0175 9.28628 10.3213 9.01031C10.6251 8.73434 11.0353 8.59635 11.5518 8.59635ZM8.61534 8.65332V14.2018H7.69629V9.76226L6.34049 10.2256V9.44705L8.49761 8.65332H8.61534ZM11.548 11.7333C11.2796 11.7333 11.065 11.8168 10.9042 11.9839C10.7435 12.151 10.6631 12.3726 10.6631 12.6485C10.6631 12.9195 10.7422 13.1359 10.9004 13.298C11.0587 13.46 11.2771 13.541 11.5556 13.541C11.8341 13.541 12.0512 13.4625 12.2069 13.3056C12.3626 13.1486 12.4404 12.9296 12.4404 12.6485C12.4404 12.3751 12.3588 12.1542 12.1955 11.9858C12.0322 11.8175 11.8163 11.7333 11.548 11.7333ZM11.5518 9.33691C11.3163 9.33691 11.1302 9.41097 10.9935 9.55908C10.8568 9.70719 10.7884 9.90911 10.7884 10.1648C10.7884 10.418 10.8574 10.6193 10.9954 10.7687C11.1334 10.918 11.3201 10.9927 11.5556 10.9927C11.791 10.9927 11.9777 10.918 12.1157 10.7687C12.2537 10.6193 12.3227 10.418 12.3227 10.1648C12.3227 9.9243 12.2531 9.72618 12.1138 9.57048C11.9746 9.41477 11.7872 9.33691 11.5518 9.33691ZM14.4722 4.16667H5.52778C4.77606 4.16667 4.16667 4.77606 4.16667 5.52778V6.11111H15.8333V5.52778C15.8333 4.77606 15.2239 4.16667 14.4722 4.16667Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-calendar-date"; }
  static get registryIs() { return "wpp-icon-calendar-date-v2-22-0"; }
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
