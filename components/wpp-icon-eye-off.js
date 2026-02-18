import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconEyeOff$1 = /*@__PURE__*/ proxyCustomElement(class WppIconEyeOff extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-eye-off", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M2.17574 2.17574C1.96272 2.38875 1.94336 2.72208 2.11764 2.95697L2.17574 3.02426L5.40339 6.25192C3.8658 7.33149 2.71662 8.94394 2.23911 10.8515C2.15864 11.173 2.354 11.4988 2.67545 11.5792C2.9969 11.6597 3.32272 11.4644 3.40319 11.1429C3.82677 9.45078 4.87289 8.03158 6.26733 7.11562L7.71503 8.5634C7.14902 9.14063 6.8 9.9314 6.8 10.8037C6.8 12.571 8.23269 14.0037 10 14.0037C10.8723 14.0037 11.6631 13.6547 12.2403 13.0887L16.9757 17.8243C17.2101 18.0586 17.5899 18.0586 17.8243 17.8243C18.0373 17.6113 18.0566 17.2779 17.8824 17.043L17.8243 16.9757L12.9334 12.0844L12.9344 12.0832L11.9743 11.1249L9.67838 8.82942L9.68 8.8288L7.37502 6.52626L7.376 6.5248L6.46937 5.62039L3.02426 2.17574C2.78995 1.94142 2.41005 1.94142 2.17574 2.17574ZM8.56326 9.41238L11.3913 12.2404C11.0313 12.5891 10.5407 12.8037 10 12.8037C8.89543 12.8037 8 11.9083 8 10.8037C8 10.263 8.21459 9.77236 8.56326 9.41238ZM10 4.8C9.19979 4.8 8.42331 4.91846 7.68887 5.14L8.67845 6.12895C9.10709 6.04425 9.54912 6 10 6C13.1385 6 15.8479 8.14421 16.5977 11.1465C16.678 11.468 17.0037 11.6636 17.3252 11.5833C17.6467 11.503 17.8422 11.1773 17.762 10.8558C16.8795 7.32217 13.6924 4.8 10 4.8ZM10.1557 7.60742L13.1968 10.648C13.1154 9.00246 11.7978 7.68611 10.1557 7.60742Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-eye-off-v3-5-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-eye-off", "wpp-icon-eye-off-v3-5-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-eye-off-v3-5-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-eye-off-v3-5-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconEyeOff$1);
      }
      break;
  } });
}

const WppIconEyeOff = WppIconEyeOff$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconEyeOff, defineCustomElement };
