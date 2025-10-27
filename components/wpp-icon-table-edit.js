import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconTableEdit$1 = /*@__PURE__*/ proxyCustomElement(class WppIconTableEdit extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-table-edit", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M3 5.59977C3 4.16396 4.16396 3 5.59977 3H14.799C16.2348 3 17.3987 4.16396 17.3987 5.59977V9.40921C16.9936 9.37427 16.5819 9.43298 16.1988 9.58534V8.59951H12.9991L12.9991 11.7992H13.6831L11.7992 13.6831V12.9991H8.59951V16.1988H9.8322C9.82663 16.2192 9.82127 16.2397 9.81613 16.2603L9.53152 17.3987H5.59977C4.16396 17.3987 3 16.2348 3 14.799V5.59977ZM5.59977 4.19989C4.82664 4.19989 4.19989 4.82664 4.19989 5.59977V7.39961H7.39961V4.19989H5.59977ZM4.19989 8.59951V11.7992H7.39961L7.39961 8.59951H4.19989ZM8.59951 8.59951L8.59951 11.7992H11.7992L11.7992 8.59951H8.59951ZM12.9991 7.39961H16.1988V5.59977C16.1988 4.82664 15.5721 4.19989 14.799 4.19989H12.9991V7.39961ZM11.7992 4.19989H8.59951V7.39961H11.7992V4.19989ZM4.19989 12.9991V14.799C4.19989 15.5721 4.82664 16.1988 5.59977 16.1988H7.39961V12.9991H4.19989ZM16.4119 10.3641C16.339 10.3974 16.2678 10.4357 16.1988 10.4791C16.0852 10.5506 15.9777 10.6359 15.8788 10.7349L11.1572 15.4564C10.9454 15.6682 10.7809 15.9213 10.6733 16.1988C10.6411 16.282 10.6139 16.3673 10.5922 16.4543L10.2261 17.9187C10.0669 18.5556 10.6438 19.1325 11.2806 18.9732L12.7451 18.6071C13.1227 18.5127 13.4677 18.3174 13.743 18.0421L18.4645 13.3206C19.1785 12.6066 19.1785 11.4489 18.4645 10.7349C17.9431 10.2135 17.1852 10.0728 16.5363 10.3128C16.5258 10.3167 16.5153 10.3207 16.5049 10.3248C16.4736 10.337 16.4426 10.3501 16.4119 10.3641Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-table-edit-v3-3-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-table-edit", "wpp-icon-table-edit-v3-3-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-table-edit-v3-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-table-edit-v3-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconTableEdit$1);
      }
      break;
  } });
}

const WppIconTableEdit = WppIconTableEdit$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconTableEdit, defineCustomElement };
