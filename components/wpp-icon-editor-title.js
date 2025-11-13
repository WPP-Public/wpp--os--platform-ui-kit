import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconEditorTitle$1 = /*@__PURE__*/ proxyCustomElement(class WppIconEditorTitle extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-editor-title", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M12.5 3.25C12.9142 3.25 13.25 3.58579 13.25 4V8.65686C13.7426 8.24347 14.3469 8 15 8C16.6569 8 18 9.567 18 11.5C18 13.433 16.6569 15 15 15C14.3469 15 13.7426 14.7565 13.25 14.3431V14.5C13.25 14.9142 12.9142 15.25 12.5 15.25C12.0858 15.25 11.75 14.9142 11.75 14.5V4C11.75 3.58579 12.0858 3.25 12.5 3.25ZM15 13.5C15.6198 13.5 16.5 12.8298 16.5 11.5C16.5 10.1702 15.6198 9.5 15 9.5C14.3802 9.5 13.5 10.1702 13.5 11.5C13.5 12.8298 14.3802 13.5 15 13.5ZM6.49486 3.25007C6.81023 3.25448 7.08915 3.45572 7.19277 3.75361L10.8449 14.2536C10.981 14.6448 10.7742 15.0723 10.383 15.2084C9.99173 15.3445 9.56427 15.1376 9.42819 14.7464L8.64684 12.5L4.06127 12.5L3.20142 14.7661C3.05447 15.1533 2.6214 15.3482 2.23413 15.2012C1.84686 15.0543 1.65204 14.6212 1.79899 14.2339L5.78318 3.73393C5.89507 3.43904 6.1795 3.24567 6.49486 3.25007ZM4.63044 11L8.1251 11L6.45374 6.19485L4.63044 11Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-editor-title-v3-3-1"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-editor-title", "wpp-icon-editor-title-v3-3-1", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-editor-title-v3-3-1"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-editor-title-v3-3-1":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconEditorTitle$1);
      }
      break;
  } });
}

const WppIconEditorTitle = WppIconEditorTitle$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconEditorTitle, defineCustomElement };
