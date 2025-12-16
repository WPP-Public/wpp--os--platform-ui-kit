import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconDislike$1 = /*@__PURE__*/ proxyCustomElement(class WppIconDislike extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
  }
  componentWillLoad() {
    console.warn('%cwpp-icon-dislike component is deprecated. Please, use wpp-icon-thumbs-down instead', 'color: black; font-size: 12px;');
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-dislike", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M13.7727 15.1299C13.7727 17.09 12.8576 18.5 11.3596 18.5C10.5771 18.5 10.2829 18.0644 10.0023 17.0586L9.83682 16.4391C9.7558 16.1511 9.6147 15.6609 9.41381 14.9694C9.40843 14.9509 9.40052 14.9334 9.39022 14.9173L7.08923 11.3169C6.545 10.4654 5.74197 9.81079 4.79816 9.44943L4.41828 9.30399C3.4176 8.92086 2.83662 7.87439 3.04059 6.82246L3.36526 5.14808C3.55904 4.14871 4.31647 3.35337 5.30518 3.11103L11.4275 1.61046C13.4592 1.11251 15.5127 2.34452 16.0295 4.37146L17.1652 8.82547C17.5211 10.2215 16.678 11.6418 15.2819 11.9977C15.0713 12.0514 14.8548 12.0786 14.6374 12.0786H13.174C13.5721 13.3892 13.7727 14.4004 13.7727 15.1299ZM4.22255 7.05165C4.12983 7.5298 4.39391 8.00547 4.84877 8.17962L5.22864 8.32506C6.41304 8.77853 7.42076 9.59993 8.10372 10.6686L10.4047 14.269C10.477 14.3821 10.5327 14.5049 10.57 14.6338L11.0131 16.1751L11.183 16.8103C11.2949 17.2019 11.3512 17.296 11.3596 17.296C12.0561 17.296 12.5687 16.5062 12.5687 15.1299C12.5687 14.42 12.3072 13.2554 11.7791 11.6665C11.6495 11.2768 11.9396 10.8746 12.3503 10.8746H14.6374C14.7545 10.8746 14.8711 10.86 14.9845 10.8311C15.7362 10.6394 16.1902 9.87464 15.9985 9.12294L14.8629 4.66893C14.5092 3.28207 13.1042 2.43912 11.7141 2.77982L5.59179 4.28039C5.0594 4.41088 4.65156 4.83914 4.54721 5.37726L4.22255 7.05165Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-dislike-v3-4-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-dislike", "wpp-icon-dislike-v3-4-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-dislike-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-dislike-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconDislike$1);
      }
      break;
  } });
}

const WppIconDislike = WppIconDislike$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconDislike, defineCustomElement };
