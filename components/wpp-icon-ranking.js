import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconRanking$1 = /*@__PURE__*/ proxyCustomElement(class WppIconRanking extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-ranking", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M14.7916 3.875C14.5154 3.875 14.2916 4.0988 14.2916 4.375V15.625C14.2916 15.9012 14.5154 16.125 14.7916 16.125H15.2083C15.4845 16.125 15.7083 15.9012 15.7083 15.625V4.375C15.7083 4.0988 15.4845 3.875 15.2083 3.875H14.7916ZM12.7916 4.375C12.7916 3.27037 13.687 2.375 14.7916 2.375H15.2083C16.3129 2.375 17.2083 3.27037 17.2083 4.375V15.625C17.2083 16.7296 16.3129 17.625 15.2083 17.625H14.7916C13.687 17.625 12.7916 16.7296 12.7916 15.625V4.375ZM9.79163 8.04167C9.51542 8.04167 9.29163 8.26546 9.29163 8.54167V15.625C9.29163 15.9012 9.51542 16.125 9.79163 16.125H10.2083C10.4845 16.125 10.7083 15.9012 10.7083 15.625V8.54167C10.7083 8.26546 10.4845 8.04167 10.2083 8.04167H9.79163ZM7.79163 8.54167C7.79163 7.43704 8.687 6.54167 9.79163 6.54167H10.2083C11.3129 6.54167 12.2083 7.43704 12.2083 8.54167V15.625C12.2083 16.7296 11.3129 17.625 10.2083 17.625H9.79163C8.687 17.625 7.79163 16.7296 7.79163 15.625V8.54167ZM4.79163 12.2083C4.51542 12.2083 4.29163 12.4321 4.29163 12.7083V15.625C4.29163 15.9012 4.51542 16.125 4.79163 16.125H5.20829C5.4845 16.125 5.70829 15.9012 5.70829 15.625V12.7083C5.70829 12.4321 5.4845 12.2083 5.20829 12.2083H4.79163ZM2.79163 12.7083C2.79163 11.6037 3.687 10.7083 4.79163 10.7083H5.20829C6.31292 10.7083 7.20829 11.6037 7.20829 12.7083V15.625C7.20829 16.7296 6.31292 17.625 5.20829 17.625H4.79163C3.687 17.625 2.79163 16.7296 2.79163 15.625V12.7083Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-ranking-v2-22-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-ranking", "wpp-icon-ranking-v2-22-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-ranking-v2-22-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-ranking-v2-22-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconRanking$1);
      }
      break;
  } });
}

const WppIconRanking = WppIconRanking$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconRanking, defineCustomElement };
