import { h } from '@stencil/core';
import { WppIcon } from '../../../../WppIcon';
export class WppIconStyleguide {
  constructor() {
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-styleguide", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M12.4061 2.08716C13.7609 1.72416 15.1534 2.52813 15.5164 3.8829L18.026 13.249C18.389 14.6037 17.5851 15.9962 16.2303 16.3593L10.4323 17.9128C9.0775 18.2758 7.68497 17.4719 7.32197 16.1171L4.81234 6.75104C4.44933 5.39628 5.25331 4.00375 6.60807 3.64074L12.4061 2.08716ZM4.80309 10.288L6.42996 16.3561C6.59708 16.9798 6.92421 17.5179 7.35536 17.9381L6.9464 17.9161C5.54577 17.8427 4.46983 16.6477 4.54324 15.2471L4.80309 10.288ZM12.7646 3.42517L6.96659 4.97875C6.35079 5.14376 5.98534 5.77672 6.15035 6.39252L8.65998 15.7586C8.82498 16.3744 9.45795 16.7398 10.0737 16.5748L15.8718 15.0212C16.4876 14.8562 16.853 14.2233 16.688 13.6075L14.1784 4.24141C14.0134 3.62561 13.3804 3.26017 12.7646 3.42517ZM3.94926 8.92298L3.62103 15.1988C3.58722 15.844 3.73227 16.4572 4.01283 16.9903L3.63014 16.842C2.32074 16.3393 1.66673 14.8704 2.16936 13.561L3.94926 8.92298ZM8.44011 6.018C8.93276 5.88599 9.43913 6.17835 9.57113 6.67099C9.70314 7.16363 9.41078 7.67 8.91814 7.80201C8.4255 7.93401 7.91912 7.64165 7.78712 7.14901C7.65512 6.65637 7.94747 6.15 8.44011 6.018Z", fill: "currentColor" })));
  }
  static get is() { return "wpp-icon-styleguide"; }
  static get registryIs() { return "wpp-icon-styleguide-v4-1-0"; }
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
