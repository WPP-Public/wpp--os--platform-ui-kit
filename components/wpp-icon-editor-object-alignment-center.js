import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconEditorObjectAlignmentCenter$1 = /*@__PURE__*/ proxyCustomElement(class WppIconEditorObjectAlignmentCenter extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-editor-object-alignment-center", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M9.4 17.4V16.4H7.4C6.40589 16.4 5.6 15.5941 5.6 14.6V12.6C5.6 11.6059 6.40589 10.8 7.4 10.8H9.4V9.2H5.8C4.80589 9.2 4 8.39411 4 7.4V5.4C4 4.40589 4.80589 3.6 5.8 3.6H9.4V2.6C9.4 2.26863 9.66863 2 10 2C10.3314 2 10.6 2.26863 10.6 2.6V3.6H14.2C15.1941 3.6 16 4.40589 16 5.4V7.4C16 8.39411 15.1941 9.2 14.2 9.2H10.6V10.8H12.6C13.5941 10.8 14.4 11.6059 14.4 12.6V14.6C14.4 15.5941 13.5941 16.4 12.6 16.4H10.6V17.4C10.6 17.7314 10.3314 18 10 18C9.66863 18 9.4 17.7314 9.4 17.4ZM12.6 15.2C12.9314 15.2 13.2 14.9314 13.2 14.6V12.6C13.2 12.2686 12.9314 12 12.6 12H7.4C7.06863 12 6.8 12.2686 6.8 12.6V14.6C6.8 14.9314 7.06863 15.2 7.4 15.2H12.6ZM14.2 8C14.5314 8 14.8 7.73137 14.8 7.4V5.4C14.8 5.06863 14.5314 4.8 14.2 4.8H5.8C5.46863 4.8 5.2 5.06863 5.2 5.4V7.4C5.2 7.73137 5.46863 8 5.8 8L14.2 8Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-editor-object-alignment-center-v4-1-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-editor-object-alignment-center", "wpp-icon-editor-object-alignment-center-v4-1-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-editor-object-alignment-center-v4-1-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-editor-object-alignment-center-v4-1-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconEditorObjectAlignmentCenter$1);
      }
      break;
  } });
}

const WppIconEditorObjectAlignmentCenter = WppIconEditorObjectAlignmentCenter$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconEditorObjectAlignmentCenter, defineCustomElement };
