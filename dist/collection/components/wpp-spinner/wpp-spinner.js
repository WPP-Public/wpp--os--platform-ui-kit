import { h, Host } from '@stencil/core';
const SPINNER_SIZES = {
  s: 7,
  m: 16,
  l: 32,
};
const SPINNER_RADIUS = {
  s: 6,
  m: 14,
  l: 29,
};
export class WppSpinner {
  constructor() {
    this.hostCssClasses = () => ({
      'wpp-spinner': true,
      [`wpp-size-${this.size}`]: true,
    });
    this.spinnerCssClasses = () => ({
      spinner: true,
      [`size-${this.size}`]: true,
    });
    this.color = 'var(--wpp-primary-color-500)';
    this.size = 's';
    this.ariaProps = undefined;
  }
  render() {
    const isAnnounced = this.ariaProps?.label && this.ariaProps?.label !== '';
    return (h(Host, { class: this.hostCssClasses(), role: isAnnounced ? 'status' : null, "aria-hidden": isAnnounced ? null : 'true', "aria-live": isAnnounced ? 'polite' : null, "aria-label": isAnnounced ? this.ariaProps?.label : null }, h("svg", { class: this.spinnerCssClasses(), "aria-hidden": "true", focusable: "false" }, h("circle", { cx: SPINNER_SIZES[this.size], cy: SPINNER_SIZES[this.size], r: SPINNER_RADIUS[this.size], fill: "transparent", stroke: this.color, "stroke-linecap": "round" }))));
  }
  static get is() { return "wpp-spinner"; }
  static get registryIs() { return "wpp-spinner-v3-3-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-spinner.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-spinner.css"]
    };
  }
  static get properties() {
    return {
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
          "text": "Defines the spinner color."
        },
        "attribute": "color",
        "reflect": false,
        "defaultValue": "'var(--wpp-primary-color-500)'"
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'s' | 'm' | 'l'",
          "resolved": "\"l\" | \"m\" | \"s\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the spinner size."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'s'"
      },
      "ariaProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "AriaProps",
          "resolved": "AriaProps | undefined",
          "references": {
            "AriaProps": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::AriaProps"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the spinner `aria-` props."
        }
      }
    };
  }
}
