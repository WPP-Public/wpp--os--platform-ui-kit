import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$2 } from './wpp-typography2.js';

const wppLegendCss = ":host{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;gap:6px;cursor:default}.dot{width:12px;height:12px}:host(:hover) .wpp-typography{color:var(--wpp-grey-color-800) !important}:host(.wpp-disabled){pointer-events:none}:host(.wpp-disabled) .dot{opacity:0.5}";

const WppLegend$1 = /*@__PURE__*/ proxyCustomElement(class WppLegend extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
    return (h(Host, { class: this.hostCssClasses() }, h("svg", { class: this.dotCssClasses() }, h("circle", { cx: 6, cy: 6, r: 5, fill: this.color })), this.label && (h("wpp-typography-v3-3-0", { color: this.disabled ? 'var(--wpp-grey-color-500)' : 'var(--wpp-grey-color-1000)', type: "xs-body" }, this.label))));
  }
  static get registryIs() { return "wpp-legend-v3-3-0"; }
  static get style() { return wppLegendCss; }
}, [1, "wpp-legend", "wpp-legend-v3-3-0", {
    "label": [1],
    "disabled": [4],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-legend-v3-3-0", "wpp-typography-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-legend-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppLegend$1);
      }
      break;
    case "wpp-typography-v3-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppLegend = WppLegend$1;
const defineCustomElement = defineCustomElement$1;

export { WppLegend, defineCustomElement };
