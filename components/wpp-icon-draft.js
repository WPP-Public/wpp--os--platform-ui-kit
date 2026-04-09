import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconDraft$1 = /*@__PURE__*/ proxyCustomElement(class WppIconDraft extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-draft", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M17.0429 2.72012L17.1648 2.83517L17.2799 2.95706C18.277 4.0768 18.2386 5.79393 17.1648 6.86772L7.62796 16.4046C7.40734 16.6252 7.13295 16.7844 6.83194 16.8665L2.75554 17.9783C2.30941 18.1 1.90005 17.6906 2.02172 17.2445L3.13346 13.1681C3.21556 12.867 3.37479 12.5927 3.59542 12.372L13.1323 2.83517C14.2061 1.76138 15.9232 1.72303 17.0429 2.72012ZM12.3597 5.29813L4.44059 13.2172C4.36705 13.2908 4.31398 13.3822 4.28661 13.4826L3.45005 16.55L6.51744 15.7134C6.61778 15.686 6.70924 15.6329 6.78278 15.5594L14.7017 7.64005L12.3597 5.29813ZM5.60637 9.23373L4.41111 10.429L2.59829 10.4293C2.26823 10.4293 2.00066 10.1618 2.00066 9.83171C2.00066 9.50164 2.26823 9.23407 2.59829 9.23407L5.60637 9.23373ZM8.79374 6.04637L7.59848 7.24163L2.59829 7.24197C2.26823 7.24197 2.00066 6.9744 2.00066 6.64434C2.00066 6.31427 2.26823 6.04671 2.59829 6.04671L8.79374 6.04637ZM13.9775 3.68035L13.2044 4.45268L15.5463 6.7954L16.3197 6.02254C16.9664 5.37576 16.9664 4.32712 16.3197 3.68035C15.6729 3.03357 14.6242 3.03357 13.9775 3.68035ZM11.9811 2.859L10.7858 4.05426L2.59829 4.0546C2.26823 4.0546 2.00066 3.78703 2.00066 3.45697C2.00066 3.12691 2.26823 2.85934 2.59829 2.85934L11.9811 2.859Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-draft-v3-6-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-draft", "wpp-icon-draft-v3-6-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-draft-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-draft-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconDraft$1);
      }
      break;
  } });
}

const WppIconDraft = WppIconDraft$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconDraft, defineCustomElement };
