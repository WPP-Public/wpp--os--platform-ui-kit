import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconUserChat {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-user-chat", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M7.91829 12.9272C8.05783 12.4952 8.25169 12.0877 8.49182 11.7126H3.82089C2.81524 11.7126 2 12.5279 2 13.5335V14.0013C2 14.7242 2.2579 15.4234 2.72733 15.9731C3.8706 17.3119 5.55323 18.0394 7.73973 18.1698L8.10481 16.9708C6.07944 16.9065 4.60839 16.3056 3.65093 15.1844C3.36927 14.8545 3.21454 14.435 3.21454 14.0013V13.5335C3.21454 13.1987 3.48601 12.9272 3.82089 12.9272H7.91829ZM8.47465 2C10.7106 2 12.5231 3.81258 12.5231 6.04851C12.5231 8.28445 10.7106 10.097 8.47465 10.097C6.23876 10.097 4.4262 8.28445 4.4262 6.04851C4.4262 3.81258 6.23876 2 8.47465 2ZM8.47465 3.21455C6.90953 3.21455 5.64074 4.48336 5.64074 6.04851C5.64074 7.61367 6.90953 8.88247 8.47465 8.88247C10.0398 8.88247 11.3086 7.61367 11.3086 6.04851C11.3086 4.48336 10.0398 3.21455 8.47465 3.21455ZM17.381 14.5466C17.381 17.0062 15.3871 19 12.9277 19C12.1443 19 11.4082 18.7978 10.7688 18.4426L8.99823 18.9814C8.68836 19.0757 8.39873 18.786 8.49308 18.4762L9.03204 16.7061C8.67672 16.0665 8.47436 15.3302 8.47436 14.5466C8.47436 12.0871 10.4682 10.0933 12.9277 10.0933C15.3871 10.0933 17.381 12.0871 17.381 14.5466ZM11.3083 13.3321C11.0847 13.3321 10.9034 13.5133 10.9034 13.7369C10.9034 13.9605 11.0847 14.1418 11.3083 14.1418H14.547C14.7706 14.1418 14.9519 13.9605 14.9519 13.7369C14.9519 13.5133 14.7706 13.3321 14.547 13.3321H11.3083ZM10.9034 15.3563C10.9034 15.5799 11.0847 15.7612 11.3083 15.7612H12.9277C13.1512 15.7612 13.3325 15.5799 13.3325 15.3563C13.3325 15.1327 13.1512 14.9515 12.9277 14.9515H11.3083C11.0847 14.9515 10.9034 15.1327 10.9034 15.3563Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-user-chat"; }
  static get registryIs() { return "wpp-icon-user-chat-v3-5-0"; }
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
