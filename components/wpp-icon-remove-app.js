import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconRemoveApp$1 = /*@__PURE__*/ proxyCustomElement(class WppIconRemoveApp extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-remove-app", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M17.7601 7.41154L17.8266 7.3542C18.0368 7.14398 18.0559 6.815 17.8839 6.58319L17.8266 6.51677L16.0738 4.76505L17.8266 3.01282C18.0368 2.8026 18.0559 2.47362 17.8839 2.24181L17.8266 2.17539C17.6163 1.96516 17.2874 1.94605 17.0555 2.11806L16.9891 2.17539L15.2369 3.92814L13.4852 2.17539C13.275 1.96516 12.946 1.94605 12.7142 2.11806L12.6478 2.17539C12.4375 2.38562 12.4184 2.71459 12.5904 2.94641L12.6478 3.01282L14.3992 4.76505L12.6478 6.51677C12.4375 6.727 12.4184 7.05597 12.5904 7.28779L12.6478 7.3542C12.858 7.56443 13.187 7.58354 13.4188 7.41154L13.4852 7.3542L15.2369 5.60275L16.9891 7.3542C17.1994 7.56443 17.5283 7.58354 17.7601 7.41154ZM15.4352 17.002C16.4163 17.002 17.2117 16.2066 17.2117 15.2255V11.0804C17.2117 10.0993 16.4163 9.30396 15.4352 9.30396H10.698V4.56673C10.698 3.58562 9.90265 2.79027 8.92153 2.79027H4.77646C3.79535 2.79027 3 3.58562 3 4.56673V15.2255C3 16.2066 3.79535 17.002 4.77646 17.002H15.4352ZM9.51369 9.30475H4.18431V4.56673C4.18431 4.23969 4.44942 3.97458 4.77646 3.97458H8.92153C9.24857 3.97458 9.51369 4.23969 9.51369 4.56673V9.30475ZM15.4352 15.8176H10.698V10.4883H15.4352C15.7623 10.4883 16.0274 10.7534 16.0274 11.0804V15.2255C16.0274 15.5525 15.7623 15.8176 15.4352 15.8176ZM9.51369 15.8176H4.77646C4.44942 15.8176 4.18431 15.5525 4.18431 15.2255V10.4891L9.51369 10.4883V15.8176Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-remove-app-v3-3-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-remove-app", "wpp-icon-remove-app-v3-3-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-remove-app-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-remove-app-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconRemoveApp$1);
      }
      break;
  } });
}

const WppIconRemoveApp = WppIconRemoveApp$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconRemoveApp, defineCustomElement };
