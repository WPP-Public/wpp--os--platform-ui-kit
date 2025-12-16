import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconAssistant$1 = /*@__PURE__*/ proxyCustomElement(class WppIconAssistant extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-assistant", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M9.74359 15.5385C9.40372 15.5385 9.12821 15.814 9.12821 16.1538C9.12821 16.4937 9.40372 16.7692 9.74359 16.7692C10.0835 16.7692 10.359 16.4937 10.359 16.1538C10.359 15.814 10.0835 15.5385 9.74359 15.5385ZM14.2564 8.5641V7.74359C14.2564 5.25123 12.236 3.23077 9.74359 3.23077C7.25123 3.23077 5.23077 5.25123 5.23077 7.74359V8.5641H7.28205C7.73521 8.5641 8.10256 8.93146 8.10256 9.38462V12.6667C8.10256 13.1198 7.73521 13.4872 7.28205 13.4872H5.23077V13.6923C5.23077 14.6694 5.98988 15.4692 6.95052 15.5342L7.07692 15.5385L8.00256 15.5383C8.25606 14.8213 8.93984 14.3077 9.74359 14.3077C10.7632 14.3077 11.5897 15.1342 11.5897 16.1538C11.5897 17.1734 10.7632 18 9.74359 18C8.93953 18 8.25552 17.486 8.00226 16.7686L7.07692 16.7692C5.4324 16.7692 4.08921 15.4791 4.00427 13.8557L4 13.6923V7.74359C4 4.57149 6.57149 2 9.74359 2C12.9157 2 15.4872 4.57149 15.4872 7.74359V11.8462C15.4872 12.7113 14.8177 13.42 13.9686 13.4827L13.8462 13.4872H12.2051C11.7843 13.4872 11.4375 13.1704 11.3901 12.7624L11.3846 12.6667V9.38462C11.3846 8.96383 11.7014 8.61702 12.1094 8.56962L12.2051 8.5641H14.2564ZM6.87179 9.79487H5.23077V12.2564H6.87179V9.79487ZM14.2564 9.79487H12.6154V12.2564H13.8462C14.0476 12.2564 14.2151 12.1113 14.2498 11.9199L14.2564 11.8462V9.79487Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-assistant-v3-4-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-assistant", "wpp-icon-assistant-v3-4-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-assistant-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-assistant-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconAssistant$1);
      }
      break;
  } });
}

const WppIconAssistant = WppIconAssistant$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconAssistant, defineCustomElement };
