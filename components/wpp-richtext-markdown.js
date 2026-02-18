import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { T as TurndownService } from './turndown.browser.es.js';
import { d as defineCustomElement$3 } from './wpp-quill-styles2.js';
import { d as defineCustomElement$2 } from './wpp-richtext-common-styles2.js';

const WppRichtextMarkdown$1 = /*@__PURE__*/ proxyCustomElement(class WppRichtextMarkdown extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.markdown = '';
    this.turndown = new TurndownService();
    this.value = undefined;
  }
  handleValueChange(newValue) {
    this.markdown = newValue ? this.turndown.turndown(newValue) : '';
  }
  connectedCallback() {
    this.handleValueChange(this.value);
  }
  render() {
    return (h(Host, null, h("wpp-quill-styles-v3-5-0", null), h("wpp-richtext-common-styles-v3-5-0", null), h("pre", { class: "richtext-markdown" }, this.markdown)));
  }
  static get registryIs() { return "wpp-richtext-markdown-v3-5-0"; }
  static get watchers() { return {
    "value": ["handleValueChange"]
  }; }
}, [0, "wpp-richtext-markdown", "wpp-richtext-markdown-v3-5-0", {
    "value": [1537]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-richtext-markdown-v3-5-0", "wpp-quill-styles-v3-5-0", "wpp-richtext-common-styles-v3-5-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-richtext-markdown-v3-5-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppRichtextMarkdown$1);
      }
      break;
    case "wpp-quill-styles-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-richtext-common-styles-v3-5-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppRichtextMarkdown = WppRichtextMarkdown$1;
const defineCustomElement = defineCustomElement$1;

export { WppRichtextMarkdown, defineCustomElement };
