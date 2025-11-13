import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$3 } from './wpp-quill-styles2.js';
import { d as defineCustomElement$2 } from './wpp-richtext-common-styles2.js';

const WppRichtextHtml$1 = /*@__PURE__*/ proxyCustomElement(class WppRichtextHtml extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.value = undefined;
  }
  render() {
    const classes = `ql-container ql-wpp quill-view-html`;
    return (h(Host, null, h("wpp-quill-styles-v3-3-1", null), h("wpp-richtext-common-styles-v3-3-1", null), h("div", { class: classes, "data-testid": "richtext-editor-container" }, h("div", { class: "ql-editor", innerHTML: this.value, "data-testid": "richtext-editor" }))));
  }
  static get registryIs() { return "wpp-richtext-html-v3-3-1"; }
}, [0, "wpp-richtext-html", "wpp-richtext-html-v3-3-1", {
    "value": [1025]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-richtext-html-v3-3-1", "wpp-quill-styles-v3-3-1", "wpp-richtext-common-styles-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-richtext-html-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppRichtextHtml$1);
      }
      break;
    case "wpp-quill-styles-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-richtext-common-styles-v3-3-1":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppRichtextHtml = WppRichtextHtml$1;
const defineCustomElement = defineCustomElement$1;

export { WppRichtextHtml, defineCustomElement };
