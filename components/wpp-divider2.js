import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const wppDividerCss = ":host{--divider-width:var(--wpp-divider-width, 100%);--divider-height:var(--wpp-divider-height, 1px);--divider-border-radius:var(--wpp-divider-border-radius, 2px);--divider-bg-color:var(--wpp-divider-bg-color, var(--wpp-grey-color-300));--divider-hover-bg-color:var(--wpp-divider-hover-bg-color, var(--wpp-grey-color-600));display:block}:host .wpp-divider-line{width:var(--divider-width);height:var(--divider-height);background-color:var(--divider-bg-color);border-radius:var(--divider-border-radius)}:host .wpp-divider-line.resizable:hover{--divider-height:var(--wpp-divider-height, 2px);background-color:var(--divider-hover-bg-color);cursor:row-resize}:host .wpp-divider-line.vertical{--divider-width:var(--wpp-divider-width, 1px);--divider-height:var(--wpp-divider-height, 100%)}:host .wpp-divider-line.vertical.resizable:hover{--divider-width:var(--wpp-divider-width, 2px);--divider-height:var(--wpp-divider-height, 100%);cursor:col-resize}";

const WppDivider = /*@__PURE__*/ proxyCustomElement(class WppDivider extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.hostCssClasses = () => ({
      'wpp-divider': true,
    });
    this.dividerCssClasses = () => ({
      'wpp-divider-line': true,
      resizable: this.resizable,
      vertical: this.vertical,
    });
    this.vertical = false;
    this.resizable = false;
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), role: "separator", "aria-orientation": this.vertical ? 'vertical' : 'horizontal', exportparts: "body" }, h("div", { class: this.dividerCssClasses(), part: "body" })));
  }
  static get registryIs() { return "wpp-divider-v4-1-0"; }
  get host() { return this; }
  static get style() { return wppDividerCss; }
}, [1, "wpp-divider", "wpp-divider-v4-1-0", {
    "vertical": [4],
    "resizable": [4]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-divider-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-divider-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppDivider);
      }
      break;
  } });
}

export { WppDivider as W, defineCustomElement as d };
