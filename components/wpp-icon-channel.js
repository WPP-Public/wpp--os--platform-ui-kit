import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { W as WppIcon } from './WppIcon.js';

const wppIconCss = ":host{display:-ms-inline-flexbox;display:inline-flex;color:var(--wpp-prop-icon-color)}";

const WppIconChannel$1 = /*@__PURE__*/ proxyCustomElement(class WppIconChannel extends HTMLElement {
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
    return (h(WppIcon, { name: "wpp-icon-channel", width: this.width, height: this.height, size: this.size, color: this.color }, h("path", { d: "M14.4712 3C15.8191 3 16.9206 4.05502 16.995 5.38434L16.999 5.52778V14.4722C16.999 15.8201 15.9439 16.9216 14.6146 16.996L14.4712 17H5.52673C4.17882 17 3.07732 15.945 3.00295 14.6157L2.99895 14.4722L2.99873 7.95606C3.18125 8.0206 3.37767 8.05571 3.58229 8.05571C3.78688 8.05571 3.98328 8.02061 4.16578 7.95608L4.16562 14.4722C4.16562 15.1864 4.71559 15.772 5.4151 15.8288L5.52673 15.8333H14.4712C15.1853 15.8333 15.771 15.2834 15.8278 14.5839L15.8323 14.4722V5.52778C15.8323 4.81364 15.2823 4.22796 14.5828 4.17118L14.4712 4.16667H5.52673C5.05993 4.16667 4.64801 4.40166 4.40281 4.7598C4.15865 4.62944 3.8791 4.55556 3.58229 4.55556C3.44133 4.55556 3.30427 4.57222 3.17296 4.60368C3.52552 3.70699 4.37559 3.06037 5.38329 3.004L5.52673 3H14.4712ZM10.9681 10.7802C11.2902 10.7802 11.5514 11.0413 11.5514 11.3635C11.5514 11.6588 11.332 11.9029 11.0472 11.9415L10.9681 11.9468H7.46943C7.14727 11.9468 6.8861 11.6856 6.8861 11.3635C6.8861 11.0682 7.10555 10.8241 7.39028 10.7855L7.46943 10.7802H10.9681ZM12.5285 8.05262C12.8506 8.05262 13.1118 8.31379 13.1118 8.63596C13.1118 8.93127 12.8924 9.17534 12.6076 9.21396L12.5285 9.21929H7.46943C7.14727 9.21929 6.8861 8.95812 6.8861 8.63596C6.8861 8.34064 7.10555 8.09657 7.39028 8.05795L7.46943 8.05262H12.5285ZM3.58229 5.33333C4.11927 5.33333 4.55459 5.76865 4.55459 6.30563C4.55459 6.84262 4.11927 7.27794 3.58229 7.27794C3.0453 7.27794 2.60999 6.84262 2.60999 6.30563C2.60999 5.76865 3.0453 5.33333 3.58229 5.33333Z", fill: "currentColor" })));
  }
  static get registryIs() { return "wpp-icon-channel-v3-5-0"; }
  static get style() { return wppIconCss; }
}, [1, "wpp-icon-channel", "wpp-icon-channel-v3-5-0", {
    "size": [1],
    "width": [2],
    "height": [2],
    "color": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-icon-channel-v3-5-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-icon-channel-v3-5-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppIconChannel$1);
      }
      break;
  } });
}

const WppIconChannel = WppIconChannel$1;
const defineCustomElement = defineCustomElement$1;

export { WppIconChannel, defineCustomElement };
