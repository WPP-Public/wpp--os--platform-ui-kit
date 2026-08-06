import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';
import { d as defineCustomElement$3 } from './wpp-spinner2.js';
import { d as defineCustomElement$2 } from './wpp-typography2.js';

const wppChatThinkingCss = ":host{--ct-gap:var(--wpp-chat-thinking-gap, 8px);--ct-max-width:var(--wpp-chat-thinking-max-width, 600px);--ct-label-color:var(--wpp-chat-thinking-label-color, var(--wpp-grey-color-1000));display:inline-block;max-width:var(--ct-max-width)}.thinking{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:var(--ct-gap);min-width:0}.spinner{-ms-flex:0 0 auto;flex:0 0 auto}.label{min-width:0}.label::part(typography){overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:var(--ct-label-color)}";

const WppChatThinking$1 = /*@__PURE__*/ proxyCustomElement(class WppChatThinking extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.label = 'Thinking...';
  }
  render() {
    return (h(Host, { role: "status", "aria-live": "polite" }, h("div", { class: "thinking", part: "thinking" }, h("wpp-spinner-v4-3-0", { class: "spinner", part: "spinner", size: "s", "aria-hidden": "true" }), h("wpp-typography-v4-3-0", { class: "label", type: "s-body", part: "label" }, this.label))));
  }
  static get registryIs() { return "wpp-chat-thinking-v4-3-0"; }
  static get style() { return wppChatThinkingCss; }
}, [1, "wpp-chat-thinking", "wpp-chat-thinking-v4-3-0", {
    "label": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-chat-thinking-v4-3-0", "wpp-spinner-v4-3-0", "wpp-typography-v4-3-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-chat-thinking-v4-3-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppChatThinking$1);
      }
      break;
    case "wpp-spinner-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-typography-v4-3-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const WppChatThinking = WppChatThinking$1;
const defineCustomElement = defineCustomElement$1;

export { WppChatThinking, defineCustomElement };
