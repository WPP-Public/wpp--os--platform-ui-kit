import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconCommentOff$1 = /*@__PURE__*/ proxyCustomElement(class WppIconCommentOff extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-comment-off", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M3.02426 2.17574C2.78995 1.94142 2.41005 1.94142 2.17574 2.17573C1.94142 2.41004 1.94142 2.78994 2.17573 3.02425L2.73741 3.58594C2.28109 4.05439 2 4.69436 2 5.39998V12.1999C2 13.6359 3.16405 14.7999 4.59998 14.7999H5.19935L5.19998 16.9998C5.19998 17.2156 5.26986 17.4257 5.39918 17.5986C5.72997 18.0408 6.35665 18.1312 6.79891 17.8004L10.8099 14.7999H13.9512L16.9754 17.8243C17.2098 18.0586 17.5896 18.0586 17.824 17.8243C18.0583 17.59 18.0583 17.2101 17.824 16.9757L3.02426 2.17574ZM12.7512 13.5999H10.4107L6.39985 16.6004L6.399 13.5999H4.59998C3.82679 13.5999 3.19999 12.9731 3.19999 12.1999V5.39998C3.19999 5.02573 3.34684 4.68578 3.58606 4.43461L12.7512 13.5999ZM16.7999 12.1999C16.7999 12.7556 16.4762 13.2356 16.0071 13.4618L16.8818 14.3365C17.5575 13.867 17.9999 13.0851 17.9999 12.1999V5.39998C17.9999 3.96405 16.8358 2.8 15.3999 2.8H5.34555L6.54552 3.99999H15.3999C16.1731 3.99999 16.7999 4.62679 16.7999 5.39998V12.1999Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-comment-off-v3-3-1"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-comment-off", "wpp-icon-comment-off-v3-3-1", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-comment-off-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-comment-off-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconCommentOff$1);
      }
      break;
  } });
}

const WppIconCommentOff = WppIconCommentOff$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconCommentOff, defineCustomElement };
