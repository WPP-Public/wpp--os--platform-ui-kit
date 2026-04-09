import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconStatisticDocument$1 = /*@__PURE__*/ proxyCustomElement(class WppIconStatisticDocument extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-statistic-document", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M3.20837 3.5415C3.20837 2.43687 4.10374 1.5415 5.20837 1.5415H10.625C10.824 1.5415 11.0147 1.62052 11.1554 1.76117L16.572 7.17784C16.7127 7.31849 16.7917 7.50926 16.7917 7.70817V16.4582C16.7917 17.5628 15.8963 18.4582 14.7917 18.4582H5.20837C4.10374 18.4582 3.20837 17.5628 3.20837 16.4582V3.5415ZM5.20837 3.0415C4.93217 3.0415 4.70837 3.2653 4.70837 3.5415V16.4582C4.70837 16.7344 4.93217 16.9582 5.20837 16.9582H14.7917C15.0679 16.9582 15.2917 16.7344 15.2917 16.4582V8.45817H11.875C10.7704 8.45817 9.87504 7.5628 9.87504 6.45817V3.0415H5.20837ZM11.375 4.10216L14.231 6.95817H11.875C11.5988 6.95817 11.375 6.73437 11.375 6.45817V4.10216ZM10.2084 9.0415C10.6226 9.0415 10.9584 9.37729 10.9584 9.7915V15.2082C10.9584 15.6224 10.6226 15.9582 10.2084 15.9582C9.79416 15.9582 9.45837 15.6224 9.45837 15.2082V9.7915C9.45837 9.37729 9.79416 9.0415 10.2084 9.0415ZM13.125 11.1248C13.5393 11.1248 13.875 11.4606 13.875 11.8748V15.2082C13.875 15.6224 13.5393 15.9582 13.125 15.9582C12.7108 15.9582 12.375 15.6224 12.375 15.2082V11.8748C12.375 11.4606 12.7108 11.1248 13.125 11.1248ZM7.29171 12.3748C7.70592 12.3748 8.04171 12.7106 8.04171 13.1248V15.2082C8.04171 15.6224 7.70592 15.9582 7.29171 15.9582C6.87749 15.9582 6.54171 15.6224 6.54171 15.2082V13.1248C6.54171 12.7106 6.87749 12.3748 7.29171 12.3748Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-statistic-document-v3-6-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-statistic-document", "wpp-icon-statistic-document-v3-6-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-statistic-document-v3-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-statistic-document-v3-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconStatisticDocument$1);
      }
      break;
  } });
}

const WppIconStatisticDocument = WppIconStatisticDocument$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconStatisticDocument, defineCustomElement };
