'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-5f5af6a9.js');

const wppChatThinkingCss = ":host{--ct-gap:var(--wpp-chat-thinking-gap, 8px);--ct-max-width:var(--wpp-chat-thinking-max-width, 600px);--ct-label-color:var(--wpp-chat-thinking-label-color, var(--wpp-grey-color-1000));display:inline-block;max-width:var(--ct-max-width)}.thinking{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:var(--ct-gap);min-width:0}.spinner{-ms-flex:0 0 auto;flex:0 0 auto}.label{min-width:0}.label::part(typography){overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:var(--ct-label-color)}";

const WppChatThinking = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.label = 'Thinking...';
  }
  render() {
    return (index.h(index.Host, { role: "status", "aria-live": "polite" }, index.h("div", { class: "thinking", part: "thinking" }, index.h("wpp-spinner-v4-3-0", { class: "spinner", part: "spinner", size: "s", "aria-hidden": "true" }), index.h("wpp-typography-v4-3-0", { class: "label", type: "s-body", part: "label" }, this.label))));
  }
  static get registryIs() { return "wpp-chat-thinking-v4-3-0"; }
};
WppChatThinking.style = wppChatThinkingCss;

exports.wpp_chat_thinking = WppChatThinking;
