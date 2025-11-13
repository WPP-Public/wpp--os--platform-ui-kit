import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconCalendarMonth$1 = /*@__PURE__*/ proxyCustomElement(class WppIconCalendarMonth extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-calendar-month", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M14.4722 3C15.8683 3 17 4.13172 17 5.52778V14.4722C17 15.8683 15.8683 17 14.4722 17H5.52778C4.13172 17 3 15.8683 3 14.4722V5.52778C3 4.13172 4.13172 3 5.52778 3H14.4722ZM14.4722 4.16667H5.52778C4.77606 4.16667 4.16667 4.77606 4.16667 5.52778V14.4722C4.16667 15.2239 4.77606 15.8333 5.52778 15.8333H14.4722C15.2239 15.8333 15.8333 15.2239 15.8333 14.4722V5.52778C15.8333 4.77606 15.2239 4.16667 14.4722 4.16667ZM6.69444 11.1667C7.23139 11.1667 7.66667 11.6019 7.66667 12.1389C7.66667 12.6758 7.23139 13.1111 6.69444 13.1111C6.1575 13.1111 5.72222 12.6758 5.72222 12.1389C5.72222 11.6019 6.1575 11.1667 6.69444 11.1667ZM10 11.1667C10.5369 11.1667 10.9722 11.6019 10.9722 12.1389C10.9722 12.6758 10.5369 13.1111 10 13.1111C9.46306 13.1111 9.02778 12.6758 9.02778 12.1389C9.02778 11.6019 9.46306 11.1667 10 11.1667ZM6.69444 7.27778C7.23139 7.27778 7.66667 7.71306 7.66667 8.25C7.66667 8.78694 7.23139 9.22222 6.69444 9.22222C6.1575 9.22222 5.72222 8.78694 5.72222 8.25C5.72222 7.71306 6.1575 7.27778 6.69444 7.27778ZM10 7.27778C10.5369 7.27778 10.9722 7.71306 10.9722 8.25C10.9722 8.78694 10.5369 9.22222 10 9.22222C9.46306 9.22222 9.02778 8.78694 9.02778 8.25C9.02778 7.71306 9.46306 7.27778 10 7.27778ZM13.3056 7.27778C13.8425 7.27778 14.2778 7.71306 14.2778 8.25C14.2778 8.78694 13.8425 9.22222 13.3056 9.22222C12.7686 9.22222 12.3333 8.78694 12.3333 8.25C12.3333 7.71306 12.7686 7.27778 13.3056 7.27778Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-calendar-month-v3-3-1"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-calendar-month", "wpp-icon-calendar-month-v3-3-1", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-calendar-month-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-calendar-month-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconCalendarMonth$1);
      }
      break;
  } });
}

const WppIconCalendarMonth = WppIconCalendarMonth$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconCalendarMonth, defineCustomElement };
