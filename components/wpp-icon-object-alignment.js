import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

var ObjectAlignmentDirectionIconPath;
(function (ObjectAlignmentDirectionIconPath) {
  ObjectAlignmentDirectionIconPath["top"] = "M2.6 3C2.26863 3 2 3.26863 2 3.6C2 3.93137 2.26863 4.2 2.6 4.2H17.4C17.7314 4.2 18 3.93137 18 3.6C18 3.26863 17.7314 3 17.4 3L2.6 3ZM3.6 7.2C3.6 6.20589 4.40589 5.4 5.4 5.4H7.4C8.39411 5.4 9.2 6.20589 9.2 7.2L9.2 15.6C9.2 16.5941 8.39411 17.4 7.4 17.4H5.4C4.40589 17.4 3.6 16.5941 3.6 15.6L3.6 7.2ZM5.4 6.6C5.06863 6.6 4.8 6.86863 4.8 7.2L4.8 15.6C4.8 15.9314 5.06863 16.2 5.4 16.2H7.4C7.73137 16.2 8 15.9314 8 15.6L8 7.2C8 6.86863 7.73137 6.6 7.4 6.6L5.4 6.6ZM10.8 7.2C10.8 6.20589 11.6059 5.4 12.6 5.4H14.6C15.5941 5.4 16.4 6.20589 16.4 7.2V12.8C16.4 13.7941 15.5941 14.6 14.6 14.6H12.6C11.6059 14.6 10.8 13.7941 10.8 12.8L10.8 7.2ZM12.6 6.6C12.2686 6.6 12 6.86863 12 7.2L12 12.8C12 13.1314 12.2686 13.4 12.6 13.4H14.6C14.9314 13.4 15.2 13.1314 15.2 12.8V7.2C15.2 6.86863 14.9314 6.6 14.6 6.6L12.6 6.6Z";
  ObjectAlignmentDirectionIconPath["right"] = "M17.4 2.6C17.4 2.26863 17.1314 2 16.8 2C16.4686 2 16.2 2.26863 16.2 2.6V17.4C16.2 17.7314 16.4686 18 16.8 18C17.1314 18 17.4 17.7314 17.4 17.4V2.6ZM13.2 3.6C14.1941 3.6 15 4.40589 15 5.4V7.4C15 8.39411 14.1941 9.2 13.2 9.2L4.8 9.2C3.80589 9.2 3 8.39411 3 7.4V5.4C3 4.40589 3.80589 3.6 4.8 3.6L13.2 3.6ZM13.8 5.4C13.8 5.06863 13.5314 4.8 13.2 4.8L4.8 4.8C4.46863 4.8 4.2 5.06863 4.2 5.4V7.4C4.2 7.73137 4.46863 8 4.8 8L13.2 8C13.5314 8 13.8 7.73137 13.8 7.4V5.4ZM13.2 10.8C14.1941 10.8 15 11.6059 15 12.6V14.6C15 15.5941 14.1941 16.4 13.2 16.4H7.6C6.60589 16.4 5.8 15.5941 5.8 14.6V12.6C5.8 11.6059 6.60589 10.8 7.6 10.8L13.2 10.8ZM13.8 12.6C13.8 12.2686 13.5314 12 13.2 12L7.6 12C7.26863 12 7 12.2686 7 12.6V14.6C7 14.9314 7.26863 15.2 7.6 15.2H13.2C13.5314 15.2 13.8 14.9314 13.8 14.6V12.6Z";
  ObjectAlignmentDirectionIconPath["bottom"] = "M2.6 17.4C2.26863 17.4 2 17.1314 2 16.8C2 16.4686 2.26863 16.2 2.6 16.2H17.4C17.7314 16.2 18 16.4686 18 16.8C18 17.1314 17.7314 17.4 17.4 17.4H2.6ZM3.6 13.2C3.6 14.1941 4.40589 15 5.4 15H7.4C8.39411 15 9.2 14.1941 9.2 13.2L9.2 4.8C9.2 3.80589 8.39411 3 7.4 3H5.4C4.40589 3 3.6 3.80589 3.6 4.8L3.6 13.2ZM5.4 13.8C5.06863 13.8 4.8 13.5314 4.8 13.2L4.8 4.8C4.8 4.46863 5.06863 4.2 5.4 4.2H7.4C7.73137 4.2 8 4.46863 8 4.8L8 13.2C8 13.5314 7.73137 13.8 7.4 13.8H5.4ZM10.8 13.2C10.8 14.1941 11.6059 15 12.6 15H14.6C15.5941 15 16.4 14.1941 16.4 13.2V7.6C16.4 6.60589 15.5941 5.8 14.6 5.8H12.6C11.6059 5.8 10.8 6.60589 10.8 7.6L10.8 13.2ZM12.6 13.8C12.2686 13.8 12 13.5314 12 13.2L12 7.6C12 7.26863 12.2686 7 12.6 7H14.6C14.9314 7 15.2 7.26863 15.2 7.6V13.2C15.2 13.5314 14.9314 13.8 14.6 13.8H12.6Z";
  ObjectAlignmentDirectionIconPath["left"] = "M3 2.6C3 2.26863 3.26863 2 3.6 2C3.93137 2 4.2 2.26863 4.2 2.6V17.4C4.2 17.7314 3.93137 18 3.6 18C3.26863 18 3 17.7314 3 17.4L3 2.6ZM7.2 3.6C6.20589 3.6 5.4 4.40589 5.4 5.4V7.4C5.4 8.39411 6.20589 9.2 7.2 9.2L15.6 9.2C16.5941 9.2 17.4 8.39411 17.4 7.4V5.4C17.4 4.40589 16.5941 3.6 15.6 3.6L7.2 3.6ZM6.6 5.4C6.6 5.06863 6.86863 4.8 7.2 4.8L15.6 4.8C15.9314 4.8 16.2 5.06863 16.2 5.4V7.4C16.2 7.73137 15.9314 8 15.6 8L7.2 8C6.86863 8 6.6 7.73137 6.6 7.4L6.6 5.4ZM7.2 10.8C6.20589 10.8 5.4 11.6059 5.4 12.6V14.6C5.4 15.5941 6.20589 16.4 7.2 16.4H12.8C13.7941 16.4 14.6 15.5941 14.6 14.6V12.6C14.6 11.6059 13.7941 10.8 12.8 10.8L7.2 10.8ZM6.6 12.6C6.6 12.2686 6.86863 12 7.2 12L12.8 12C13.1314 12 13.4 12.2686 13.4 12.6V14.6C13.4 14.9314 13.1314 15.2 12.8 15.2H7.2C6.86863 15.2 6.6 14.9314 6.6 14.6L6.6 12.6Z";
})(ObjectAlignmentDirectionIconPath || (ObjectAlignmentDirectionIconPath = {}));
const WppIconObjectAlignment$1 = /*@__PURE__*/ proxyCustomElement(class WppIconObjectAlignment extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.size = 'm';
    this.width = undefined;
    this.height = undefined;
    this.color = 'var(--wpp-icon-color)';
    this.direction = 'right';
  }
  render() {
    return (h(WppIcon, { name: "wpp-icon-object-alignment", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: ObjectAlignmentDirectionIconPath[this.direction], fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-object-alignment-v3-5-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-object-alignment", "wpp-icon-object-alignment-v3-5-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1],
    "direction": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-object-alignment-v3-5-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-object-alignment-v3-5-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconObjectAlignment$1);
      }
      break;
  } });
}

const WppIconObjectAlignment = WppIconObjectAlignment$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconObjectAlignment, defineCustomElement };
