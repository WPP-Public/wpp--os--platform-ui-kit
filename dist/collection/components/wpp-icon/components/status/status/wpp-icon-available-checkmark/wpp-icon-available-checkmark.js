import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconAvailable {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-available-checkmark", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.04163 9.99984C3.04163 6.15686 6.15698 3.0415 9.99996 3.0415C13.8429 3.0415 16.9583 6.15686 16.9583 9.99984C16.9583 13.8428 13.8429 16.9582 9.99996 16.9582C6.15698 16.9582 3.04163 13.8428 3.04163 9.99984ZM9.99996 1.5415C5.32855 1.5415 1.54163 5.32843 1.54163 9.99984C1.54163 14.6712 5.32855 18.4582 9.99996 18.4582C14.6714 18.4582 18.4583 14.6712 18.4583 9.99984C18.4583 5.32843 14.6714 1.5415 9.99996 1.5415ZM13.6553 8.65533C13.9482 8.36244 13.9482 7.88756 13.6553 7.59467C13.3624 7.30178 12.8876 7.30178 12.5947 7.59467L8.95833 11.231L7.40533 9.678C7.11244 9.38511 6.63756 9.38511 6.34467 9.678C6.05178 9.9709 6.05178 10.4458 6.34467 10.7387L8.428 12.822C8.7209 13.1149 9.19577 13.1149 9.48866 12.822L13.6553 8.65533Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-available-checkmark"; }
  static get registryIs() { return "wpp-icon-available-checkmark-v3-4-0"; }
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
