import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconDiversity {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-diversity", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M10.7778 5.33333C10.7778 4.04467 11.8224 3 13.1111 3H14.6667C15.9553 3 17 4.04467 17 5.33333V6.88889C17 8.17755 15.9553 9.22222 14.6667 9.22222H13.1111C11.8224 9.22222 10.7778 8.17755 10.7778 6.88889V5.33333ZM4.98357 3.69878C5.45219 2.76707 6.77003 2.76707 7.23865 3.69878L9.08345 7.36667C9.51078 8.21631 8.89953 9.22222 7.95591 9.22222L4.26631 9.22222C3.32269 9.22222 2.71144 8.21631 3.13877 7.36667L4.98357 3.69878ZM6.06197 4.17868C6.05541 4.18256 6.04162 4.19161 6.02584 4.223L4.18104 7.89089C4.16778 7.91724 4.16603 7.93573 4.16682 7.9499C4.16778 7.96711 4.17348 7.9875 4.18546 8.00721C4.19744 8.02692 4.21153 8.03918 4.22242 8.04557C4.23049 8.0503 4.24234 8.05556 4.26631 8.05556L7.95591 8.05555C7.97988 8.05555 7.99174 8.0503 7.9998 8.04556C8.01069 8.03918 8.02478 8.02692 8.03676 8.00721C8.04874 7.9875 8.05444 7.96711 8.0554 7.9499C8.05619 7.93573 8.05444 7.91724 8.04119 7.89089L6.19638 4.223C6.1806 4.19161 6.16681 4.18256 6.16025 4.17868C6.14983 4.17251 6.13292 4.16667 6.11111 4.16667C6.0893 4.16667 6.07239 4.17251 6.06197 4.17868ZM9.22222 13.8889C9.22222 15.6071 7.82933 17 6.11111 17C4.39289 17 3 15.6071 3 13.8889C3 12.1707 4.39289 10.7778 6.11111 10.7778C7.82933 10.7778 9.22222 12.1707 9.22222 13.8889ZM8.05556 13.8889C8.05556 12.815 7.185 11.9444 6.11111 11.9444C5.7866 11.9444 5.48066 12.0239 5.2117 12.1645L7.83549 14.7883C7.97606 14.5193 8.05556 14.2134 8.05556 13.8889ZM6.11111 15.8333C6.43562 15.8333 6.74156 15.7538 7.01053 15.6133L4.38674 12.9895C4.24616 13.2584 4.16667 13.5644 4.16667 13.8889C4.16667 14.9628 5.03722 15.8333 6.11111 15.8333ZM13.5155 10.8683C13.7491 10.7476 14.0287 10.7476 14.2623 10.8683L16.5751 12.0627C16.8365 12.1977 17 12.4627 17 12.7513V15.0265C17 15.3151 16.8365 15.5801 16.5751 15.7151L14.2623 16.9095C14.0287 17.0302 13.7491 17.0302 13.5155 16.9095L11.2027 15.7151C10.9413 15.5801 10.7778 15.3151 10.7778 15.0265V12.7513C10.7778 12.4627 10.9413 12.1977 11.2027 12.0627L13.5155 10.8683ZM11.9444 12.9927V14.7851L13.8889 15.7893L15.8333 14.7851V12.9927L13.8889 11.9885L11.9444 12.9927Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-diversity"; }
  static get registryIs() { return "wpp-icon-diversity-v2-22-0"; }
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
