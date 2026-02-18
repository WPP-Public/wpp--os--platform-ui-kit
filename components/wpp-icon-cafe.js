import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconCafe$1 = /*@__PURE__*/ proxyCustomElement(class WppIconCafe extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-cafe", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M5.25 2.5C5.25 2.08579 4.91421 1.75 4.5 1.75C4.08579 1.75 3.75 2.08579 3.75 2.5C3.75 3.03486 4.04423 4.11064 5.16459 4.67082C5.64423 4.91064 5.75 5.3682 5.75 5.5C5.75 5.91421 6.08579 6.25 6.5 6.25C6.91421 6.25 7.25 5.91421 7.25 5.5C7.25 4.96514 6.95577 3.88936 5.83541 3.32918C5.35577 3.08936 5.25 2.6318 5.25 2.5Z", fill: "currentColor" }), h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.88 7H14.12C14.606 7 15 7.39399 15 7.88V9H16.0026C17.6595 9 19.0026 10.3431 19.0026 12C19.0026 13.6569 17.6595 15 16.0026 15H14.1973C13.1599 16.7934 11.2208 18 9 18C5.68629 18 3 15.3137 3 12V7.88C3 7.39399 3.39399 7 3.88 7ZM4.5 8.5V12C4.5 14.4853 6.51472 16.5 9 16.5C11.4853 16.5 13.5 14.4853 13.5 12V8.5H4.5ZM15 12V10.5H16.0026C16.8311 10.5 17.5026 11.1716 17.5026 12C17.5026 12.8284 16.8311 13.5 16.0026 13.5H14.811C14.9344 13.0206 15 12.518 15 12Z", fill: "currentColor" }), h("path", { d: "M7.5 1.75C7.91421 1.75 8.25 2.08579 8.25 2.5C8.25 2.6318 8.35577 3.08936 8.83541 3.32918C9.95577 3.88936 10.25 4.96514 10.25 5.5C10.25 5.91421 9.91421 6.25 9.5 6.25C9.08579 6.25 8.75 5.91421 8.75 5.5C8.75 5.3682 8.64423 4.91064 8.16459 4.67082C7.04423 4.11064 6.75 3.03486 6.75 2.5C6.75 2.08579 7.08579 1.75 7.5 1.75Z", fill: "currentColor" }), h("path", { d: "M11.25 2.5C11.25 2.08579 10.9142 1.75 10.5 1.75C10.0858 1.75 9.75 2.08579 9.75 2.5C9.75 3.03486 10.0442 4.11064 11.1646 4.67082C11.6442 4.91064 11.75 5.3682 11.75 5.5C11.75 5.91421 12.0858 6.25 12.5 6.25C12.9142 6.25 13.25 5.91421 13.25 5.5C13.25 4.96514 12.9558 3.88936 11.8354 3.32918C11.3558 3.08936 11.25 2.6318 11.25 2.5Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-cafe-v4-0-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-cafe", "wpp-icon-cafe-v4-0-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-cafe-v4-0-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-cafe-v4-0-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconCafe$1);
      }
      break;
  } });
}

const WppIconCafe = WppIconCafe$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconCafe, defineCustomElement };
