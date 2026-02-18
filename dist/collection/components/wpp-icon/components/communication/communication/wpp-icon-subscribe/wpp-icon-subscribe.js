import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconSubscribe {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-subscribe", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M0.845947 11.0542V5.63751C0.845947 3.22501 2.80845 1.26251 5.22095 1.26251H13.1376C14.0918 1.26251 14.9334 1.76251 15.4168 2.51251H5.22095C3.49595 2.51251 2.09595 3.91251 2.09595 5.63751V13.3333C1.34595 12.85 0.845947 12.0083 0.845947 11.0542ZM5.62508 3.33331H15.2084C16.7001 3.33331 17.9167 4.54998 17.9167 6.04165V10.3166C17.5376 10.0166 17.1167 9.77081 16.6667 9.58331V7.51117L10.716 10.757C10.5294 10.8588 10.304 10.8588 10.1174 10.757L4.16675 7.51121V13.125C4.16675 13.9291 4.82091 14.5833 5.62508 14.5833H9.16675C9.16675 15.0125 9.21675 15.4333 9.31258 15.8333H5.62508C4.13341 15.8333 2.91675 14.6166 2.91675 13.125V6.04165C2.91675 4.54998 4.13341 3.33331 5.62508 3.33331ZM4.16675 6.08735L10.4167 9.49642L16.6667 6.08731V6.04165C16.6667 5.23748 16.0126 4.58331 15.2084 4.58331H5.62508C4.82091 4.58331 4.16675 5.23748 4.16675 6.04165V6.08735ZM10 14.5833C10 12.0521 12.0521 10 14.5833 10C17.1146 10 19.1667 12.0521 19.1667 14.5833C19.1667 17.1146 17.1146 19.1667 14.5833 19.1667C12.0521 19.1667 10 17.1146 10 14.5833ZM15 15H17.5C17.73 15 17.9167 14.8133 17.9167 14.5833C17.9167 14.3533 17.73 14.1667 17.5 14.1667H15V11.6667C15 11.4367 14.8133 11.25 14.5833 11.25C14.3533 11.25 14.1667 11.4367 14.1667 11.6667V14.1667H11.6667C11.4367 14.1667 11.25 14.3533 11.25 14.5833C11.25 14.8133 11.4367 15 11.6667 15H14.1667V17.5C14.1667 17.73 14.3533 17.9167 14.5833 17.9167C14.8133 17.9167 15 17.73 15 17.5V15Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-subscribe"; }
  static get registryIs() { return "wpp-icon-subscribe-v4-0-0"; }
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
