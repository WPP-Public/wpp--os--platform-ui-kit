import { h, Host } from '@stencil/core';
export class WppLegend {
  constructor() {
    this.hostCssClasses = () => ({
      'wpp-legend': true,
      'wpp-disabled': this.disabled,
    });
    this.dotCssClasses = () => ({
      dot: true,
    });
    this.label = undefined;
    this.disabled = false;
    this.color = 'var(--wpp-dataviz-color-cat-neutral-1)';
  }
  render() {
    return (h(Host, { class: this.hostCssClasses() }, h("svg", { class: this.dotCssClasses() }, h("circle", { cx: 6, cy: 6, r: 5, fill: this.color })), this.label && (h("wpp-typography-v4-1-0", { color: this.disabled ? 'var(--wpp-text-color-disabled)' : 'var(--wpp-grey-color-1000)', type: "xs-body" }, this.label))));
  }
  static get is() { return "wpp-legend"; }
  static get registryIs() { return "wpp-legend-v4-1-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-legend.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-legend.css"]
    };
  }
  static get properties() {
    return {
      "label": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "label",
        "reflect": false
      },
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "disabled",
        "reflect": false,
        "defaultValue": "false"
      },
      "color": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "`var(--wpp-${string})`",
          "resolved": "`var(--wpp-${string})` | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "color",
        "reflect": false,
        "defaultValue": "'var(--wpp-dataviz-color-cat-neutral-1)'"
      }
    };
  }
}
