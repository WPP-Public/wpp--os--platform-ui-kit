import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
// @deprecated - this component will be deleted in 3.0.0.
export class WppIconNotificationOn {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  componentWillLoad() {
    console.warn('%cwpp-icon-notification-on component is deprecated. Please, use wpp-icon-notification-new instead', 'color: black; font-size: 12px;');
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-notification-on", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M9.76322 3.04704C10.177 3.02755 10.4966 2.67634 10.4771 2.26258C10.4576 1.84883 10.1064 1.52921 9.69265 1.5487C6.23956 1.71134 3.62502 4.67436 3.62502 8.07537V11.0739L2.53381 13.2695L2.52673 13.2841C2.03316 14.3338 2.79791 15.5416 3.95919 15.5416H7.37792C7.44311 16.9333 8.59223 18.0417 10 18.0417C11.4078 18.0417 12.5569 16.9333 12.6221 15.5416H16.0404C17.2011 15.5416 17.9671 14.3343 17.4733 13.2841L17.4662 13.2695L16.375 11.0739V7.91662C16.375 7.5024 16.0392 7.16662 15.625 7.16662C15.2108 7.16662 14.875 7.5024 14.875 7.91662V11.2499C14.875 11.3658 14.9018 11.48 14.9534 11.5837L16.1175 13.9261C16.1403 13.9808 16.1001 14.0416 16.0404 14.0416H3.95919C3.9001 14.0416 3.8595 13.9813 3.88252 13.9261L5.04665 11.5837C5.09819 11.48 5.12502 11.3658 5.12502 11.2499V8.07537C5.12502 5.41887 7.16548 3.16939 9.76322 3.04704ZM11.1181 15.5416H8.88186C8.944 16.1041 9.421 16.5417 10 16.5417C10.579 16.5417 11.056 16.1041 11.1181 15.5416Z", fill: "currentColor" }), h("path", { d: "M16.5 3.5C16.5 4.88071 15.3807 6 14 6C12.6193 6 11.5 4.88071 11.5 3.5C11.5 2.11929 12.6193 1 14 1C15.3807 1 16.5 2.11929 16.5 3.5Z", fill: "#EB0000" })));
  }
  static get is() { return "wpp-icon-notification-on"; }
  static get registryIs() { return "wpp-icon-notification-on-v2-22-0"; }
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
