import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconLeaf {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-leaf", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M14.1236 2.33407C13.9478 2.07032 13.6251 1.94556 13.3176 2.02244C11.7365 2.41769 9.48857 3.33775 7.52532 4.57124C6.54111 5.1896 5.60655 5.90029 4.85772 6.68201C4.11338 7.45905 3.51485 8.34564 3.27173 9.31814C2.81743 11.1353 3.23294 12.6534 4.21163 13.7098C4.80548 14.3507 5.57703 14.7901 6.41652 15.0308C5.4022 15.7793 4.43614 16.2779 3.74698 16.524C3.35689 16.6633 3.15361 17.0925 3.29292 17.4826C3.43224 17.8727 3.8614 18.0759 4.25148 17.9366C5.52932 17.4803 7.42428 16.3843 9.10784 14.6797C10.7987 12.9677 12.3135 10.6031 12.7417 7.60604C12.8003 7.19599 12.5153 6.81609 12.1053 6.75751C11.6952 6.69893 11.3153 6.98386 11.2568 7.39391C10.8849 9.9968 9.56641 12.0808 8.04062 13.6256C7.99949 13.6673 7.95824 13.7085 7.91688 13.7493C6.86715 13.73 5.91606 13.3424 5.31198 12.6903C4.71568 12.0467 4.38124 11.0648 4.72694 9.68195C4.88381 9.05445 5.29778 8.39104 5.94092 7.71964C6.57958 7.05293 7.40751 6.41674 8.32332 5.84136C9.94763 4.82082 11.7795 4.03417 13.163 3.62051C13.8015 4.67946 14.4977 6.16276 14.967 7.73351C15.5139 9.56368 15.7155 11.3895 15.2832 12.777C14.8468 14.1775 14.0685 14.8483 13.2657 15.1127C12.4293 15.3881 11.4474 15.2606 10.5847 14.8292C10.2142 14.644 9.7637 14.7941 9.57844 15.1646C9.39318 15.5351 9.54333 15.9856 9.9138 16.1708C11.0509 16.7395 12.4454 16.962 13.7349 16.5374C15.0578 16.1018 16.1547 15.0226 16.7153 13.2231C17.28 11.4106 16.9816 9.23641 16.4043 7.30409C15.8211 5.35234 14.9153 3.52188 14.1236 2.33407Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-leaf"; }
  static get registryIs() { return "wpp-icon-leaf-v4-1-0"; }
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
