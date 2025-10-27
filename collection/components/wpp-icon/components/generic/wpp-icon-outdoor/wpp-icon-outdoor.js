import { h } from '@stencil/core';
import { WppIcon } from '../../../WppIcon';
export class WppIconOutdoor {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-outdoor", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M7.02168 6.21127C7.0824 5.78625 7.31138 5.11433 7.78774 4.56226C8.24508 4.03222 8.93757 3.60001 10 3.60001C11.0624 3.60001 11.7549 4.03222 12.2123 4.56226C12.6886 5.11433 12.9176 5.78625 12.9783 6.21127C13.0177 6.48726 13.2204 6.71191 13.4908 6.77953C14.5728 7.05001 16.6286 8.21983 16.6286 10.6857C16.6286 12.4535 15.5918 13.5413 14.5721 14.1357C13.9552 14.4953 13.1839 14.5714 12.2857 14.5714C11.907 14.5714 11.6 14.8784 11.6 15.2571C11.6 15.6359 11.907 15.9429 12.2857 15.9429C13.2093 15.9429 14.3059 15.8783 15.2628 15.3205C16.5521 14.569 18 13.0949 18 10.6857C18 7.62232 15.6908 6.09281 14.2467 5.5783C14.0941 4.99163 13.7829 4.28321 13.2506 3.66633C12.5575 2.86303 11.4976 2.22858 10 2.22858C8.50243 2.22858 7.44254 2.86303 6.74941 3.66633C6.24357 4.25256 5.93736 4.92145 5.77726 5.48997C5.06457 5.63729 4.256 6.04842 3.57845 6.70903C2.68801 7.57721 2 8.89556 2 10.6857C2 12.4624 2.6409 13.7921 3.59055 14.6739C4.52596 15.5425 5.7247 15.9429 6.8 15.9429H9.31429V17.0857C9.31429 17.4644 9.62129 17.7714 10 17.7714C10.3787 17.7714 10.6857 17.4644 10.6857 17.0857V13.2555L13.6849 10.2563C13.9527 9.98852 13.9527 9.55435 13.6849 9.28656C13.4171 9.01877 12.9829 9.01877 12.7151 9.28656L10.6857 11.316V5.65715C10.6857 5.27844 10.3787 4.97143 10 4.97143C9.62129 4.97143 9.31429 5.27844 9.31429 5.65715V9.94454L7.28487 7.91513C7.01709 7.64734 6.58292 7.64734 6.31513 7.91513C6.04734 8.18292 6.04734 8.61709 6.31513 8.88488L9.31429 11.884V14.5714H6.8C6.04673 14.5714 5.18833 14.2861 4.52374 13.6689C3.87338 13.065 3.37143 12.109 3.37143 10.6857C3.37143 9.27588 3.90247 8.30852 4.53584 7.69098C5.19434 7.04894 5.9439 6.80001 6.34286 6.80001C6.6841 6.80001 6.97342 6.54908 7.02168 6.21127Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-outdoor"; }
  static get registryIs() { return "wpp-icon-outdoor-v3-3-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["../../../wpp-icon.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["../../../wpp-icon.css"]
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
