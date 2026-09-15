import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { E as EmptyStateGraphic, a as EmptyStateGraphicView } from './EmptyStateGraphicView.js';
import { d as defineCustomElement$2 } from './wpp-skeleton2.js';

const wppImageCss = ":host{display:-ms-inline-flexbox;display:inline-flex;position:relative}.wpp-empty-state-animation{display:block;}.wpp-empty-state-animation image{-webkit-filter:url(\"#wpp-empty-state-shadow-tint\");filter:url(\"#wpp-empty-state-shadow-tint\")}.wpp-empty-state-tint{flood-color:var(--wpp-empty-state-shadow-color, transparent)}.wpp-empty-state-skeleton{position:absolute;inset:0}.wpp-empty-state-defs{position:absolute;width:0;height:0}";

const WppEmptyTable$1 = /*@__PURE__*/ proxyCustomElement(class WppEmptyTable extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.graphic = new EmptyStateGraphic('wpp-empty-table');
    this.width = undefined;
    this.height = undefined;
  }
  connectedCallback() {
    this.graphic.connect(this.host);
  }
  disconnectedCallback() {
    this.graphic.disconnect();
  }
  render() {
    return (h(EmptyStateGraphicView, { graphic: this.graphic, name: "wpp-empty-table", width: this.width, height: this.height }));
  }
  static get registryIs() { return "wpp-empty-table-v4-4-0"; }
  get host() { return this; }
  static get style() { return wppImageCss; }
}, [1, "wpp-empty-table", "wpp-empty-table-v4-4-0", {
    "width": [2],
    "height": [2]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-empty-table-v4-4-0", "wpp-skeleton-v4-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-empty-table-v4-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppEmptyTable$1);
      }
      break;
    case "wpp-skeleton-v4-4-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppEmptyTable = WppEmptyTable$1;
const defineCustomElement = defineCustomElement$1;

export { WppEmptyTable, defineCustomElement };
