import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconAi$1 = /*@__PURE__*/ proxyCustomElement(class WppIconAi extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-ai", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M1.52216 7.17972C0.825878 7.40534 0.826012 8.39033 1.52216 8.61591L4.04341 9.4329C5.14367 9.78943 6.00621 10.652 6.36273 11.7522L7.17972 14.2735C7.40535 14.9698 8.39034 14.9696 8.61592 14.2735L9.43291 11.7522C9.78944 10.652 10.652 9.78943 11.7522 9.4329L14.2735 8.61591C14.9698 8.39029 14.9696 7.4053 14.2735 7.17972L11.7522 6.36273C10.652 6.0062 9.78944 5.14366 9.43291 4.04341L8.61592 1.52216C8.39029 0.825878 7.40531 0.826012 7.17972 1.52216L6.36274 4.04341C6.00621 5.14366 5.14367 6.0062 4.04341 6.36273L1.52216 7.17972ZM4.50544 8.00707L4.16829 7.89781L4.50544 7.78856C6.06291 7.28388 7.28389 6.06291 7.78857 4.50544L7.89782 4.16829L8.00707 4.50544C8.51176 6.06291 9.73273 7.28388 11.2902 7.78856L11.6274 7.89781L11.2902 8.00707C9.73273 8.51175 8.51176 9.73272 8.00707 11.2902L7.89782 11.6273L7.78857 11.2902C7.28389 9.73272 6.06291 8.51175 4.50544 8.00707ZM13.3841 14.9036C14.0564 14.5957 14.5961 14.056 14.9039 13.3837C15.2118 14.056 15.7515 14.5957 16.4238 14.9036C15.7515 15.2114 15.2118 15.7511 14.9039 16.4234C14.5961 15.7511 14.0564 15.2114 13.3841 14.9036ZM15.501 11.2416C15.3134 10.6628 14.4945 10.6628 14.3069 11.2416L13.8456 12.6652C13.6642 13.225 13.2254 13.6638 12.6656 13.8452L11.242 14.3065C10.6632 14.4941 10.6632 15.313 11.242 15.5006L12.6656 15.9619C13.2254 16.1433 13.6642 16.5821 13.8456 17.1419L14.3069 18.5655C14.4945 19.1443 15.3134 19.1443 15.501 18.5655L15.9623 17.1419C16.1437 16.5821 16.5825 16.1433 17.1423 15.9619L18.5659 15.5006C19.1447 15.313 19.1447 14.4941 18.5659 14.3065L17.1423 13.8452C16.5825 13.6638 16.1437 13.225 15.9623 12.6652L15.501 11.2416Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-ai-v3-4-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-ai", "wpp-icon-ai-v3-4-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-ai-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-ai-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconAi$1);
      }
      break;
  } });
}

const WppIconAi = WppIconAi$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconAi, defineCustomElement };
