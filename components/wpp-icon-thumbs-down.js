import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconThumbsDown$1 = /*@__PURE__*/ proxyCustomElement(class WppIconThumbsDown extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-thumbs-down", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M6.72732 15.1299C6.72732 17.09 7.64241 18.5 9.14038 18.5C9.92288 18.5 10.2171 18.0644 10.4977 17.0586L10.6632 16.4391C10.7442 16.1511 10.8853 15.6609 11.0862 14.9694C11.0916 14.9509 11.0995 14.9334 11.1098 14.9173L13.4108 11.3169C13.955 10.4654 14.758 9.81079 15.7018 9.44943L16.0817 9.30399C17.0824 8.92086 17.6634 7.87439 17.4594 6.82246L17.1347 5.14808C16.941 4.14871 16.1835 3.35337 15.1948 3.11103L9.07246 1.61046C7.0408 1.11251 4.98732 2.34452 4.4705 4.37146L3.33485 8.82547C2.9789 10.2215 3.82204 11.6418 5.21807 11.9977C5.4287 12.0514 5.64521 12.0786 5.86258 12.0786H7.32604C6.92789 13.3892 6.72732 14.4004 6.72732 15.1299ZM16.2775 7.05165C16.3702 7.5298 16.1061 8.00547 15.6512 8.17962L15.2714 8.32506C14.087 8.77853 13.0792 9.59993 12.3963 10.6686L10.0953 14.269C10.023 14.3821 9.96733 14.5049 9.92995 14.6338L9.48693 16.1751L9.31703 16.8103C9.20513 17.2019 9.14882 17.296 9.14038 17.296C8.44389 17.296 7.93128 16.5062 7.93128 15.1299C7.93128 14.42 8.19281 13.2554 8.72094 11.6665C8.85047 11.2768 8.56036 10.8746 8.14969 10.8746H5.86258C5.74553 10.8746 5.62895 10.86 5.51553 10.8311C4.76383 10.6394 4.30983 9.87464 4.50149 9.12294L5.63715 4.66893C5.99076 3.28207 7.39577 2.43912 8.78586 2.77982L14.9082 4.28039C15.4406 4.41088 15.8484 4.83914 15.9528 5.37726L16.2775 7.05165Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-thumbs-down-v3-3-1"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-thumbs-down", "wpp-icon-thumbs-down-v3-3-1", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-thumbs-down-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-thumbs-down-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconThumbsDown$1);
      }
      break;
  } });
}

const WppIconThumbsDown = WppIconThumbsDown$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconThumbsDown, defineCustomElement };
