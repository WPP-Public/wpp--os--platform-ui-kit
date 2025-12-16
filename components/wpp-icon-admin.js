import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconAdmin$1 = /*@__PURE__*/ proxyCustomElement(class WppIconAdmin extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-admin", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10.9036 11.7532V11.7126H3.82092C2.81525 11.7126 2 12.5279 2 13.5335V14.0013C2 14.7242 2.25791 15.4234 2.72734 15.9731C3.99558 17.4583 5.92754 18.1912 8.47475 18.1912C8.76421 18.1912 9.04574 18.1817 9.31926 18.1628C9.29622 18.0405 9.28416 17.9144 9.28416 17.7854V16.9478C9.02423 16.967 8.75446 16.9766 8.47475 16.9766C6.25754 16.9766 4.66577 16.3728 3.65096 15.1844C3.3693 14.8545 3.21455 14.435 3.21455 14.0013V13.5335C3.21455 13.1987 3.48603 12.9272 3.82092 12.9272H9.45264C9.71285 12.3317 10.2513 11.8856 10.9036 11.7532ZM8.47475 2C10.7107 2 12.5233 3.81258 12.5233 6.04851C12.5233 8.28445 10.7107 10.097 8.47475 10.097C6.23882 10.097 4.42624 8.28445 4.42624 6.04851C4.42624 3.81258 6.23882 2 8.47475 2ZM8.47475 3.21455C6.9096 3.21455 5.64079 4.48336 5.64079 6.04851C5.64079 7.61367 6.9096 8.88247 8.47475 8.88247C10.0399 8.88247 11.3087 7.61367 11.3087 6.04851C11.3087 4.48336 10.0399 3.21455 8.47475 3.21455ZM11.7133 12.5224H11.3084C10.6376 12.5224 10.0939 13.0662 10.0939 13.737V17.7854C10.0939 18.4562 10.6376 19 11.3084 19H17.786C18.4568 19 19.0006 18.4562 19.0006 17.7854V13.737C19.0006 13.0662 18.4568 12.5224 17.786 12.5224H17.3812V11.5103C17.3812 10.7277 16.7468 10.0933 15.9642 10.0933H13.1302C12.3477 10.0933 11.7133 10.7277 11.7133 11.5103V12.5224ZM12.9278 11.5103C12.9278 11.3985 13.0185 11.3078 13.1302 11.3078H15.9642C16.076 11.3078 16.1667 11.3985 16.1667 11.5103V12.5224H12.9278V11.5103Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-admin-v3-4-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-admin", "wpp-icon-admin-v3-4-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-admin-v3-4-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-admin-v3-4-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconAdmin$1);
      }
      break;
  } });
}

const WppIconAdmin = WppIconAdmin$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconAdmin, defineCustomElement };
