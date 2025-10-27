import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconInbox$1 = /*@__PURE__*/ proxyCustomElement(class WppIconInbox extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-inbox", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M5.52778 3H14.4722C15.8201 3 16.9216 4.05502 16.996 5.38434L17 5.52778V14.4722C17 15.8201 15.945 16.9216 14.6157 16.996L14.4722 17H5.52778C4.17986 17 3.07836 15.945 3.004 14.6157L3 14.4722V5.52778C3 4.17986 4.05502 3.07836 5.38434 3.004L5.52778 3H14.4722H5.52778ZM4.16667 11.9444V14.4722C4.16667 15.1864 4.71664 15.772 5.41615 15.8288L5.52778 15.8333H14.4722C15.1864 15.8333 15.772 15.2834 15.8288 14.5839L15.8333 14.4722V11.9444H12.8583C12.5981 13.2264 11.497 14.2031 10.1558 14.2737L10 14.2778C8.6412 14.2778 7.49943 13.3486 7.1754 12.091L7.14168 11.9444H4.16667V14.4722V11.9444ZM14.4722 4.16667H5.52778C4.81364 4.16667 4.22796 4.71664 4.17118 5.41615L4.16667 5.52778V10.7778H7.66667C7.96199 10.7778 8.20605 10.9972 8.24468 11.282L8.25 11.3611C8.25 12.3276 9.0335 13.1111 10 13.1111C10.9262 13.1111 11.6844 12.3915 11.746 11.4809L11.75 11.3611C11.75 11.0658 11.9695 10.8217 12.2542 10.7831L12.3333 10.7778H15.8333V5.52778C15.8333 4.81364 15.2834 4.22796 14.5839 4.17118L14.4722 4.16667Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-inbox-v3-3-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-inbox", "wpp-icon-inbox-v3-3-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-inbox-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-inbox-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconInbox$1);
      }
      break;
  } });
}

const WppIconInbox = WppIconInbox$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconInbox, defineCustomElement };
